let todos = [
  {
    todo: 'Run 5km',
    status: 'active'
  },
  {
    todo: 'Bike 10km',
    status: 'completed'
  },
  {
    todo: 'Bike 50km',
    status: 'active'
  }

]

init()

function init() {

  renderTodos(todos)
  setStatusEvents()
}
function renderTodos(todos) {
  let todoList = document.querySelector('.todo__list')
  let todoCount = document.querySelector('.todo__listCount')
  let count = todos.length
  todoCount.innerHTML = count
  todos.forEach(todo => {
    let listItem = renderTodo(todo)
    todoList.append(listItem)
  })

}
function renderTodo(todo) {
  let item = document.createElement('li')
  let checkBox = document.createElement('input')
  let checkBoxLabel = document.createElement('label')
  let checkBoxSpan = document.createElement('span')


  let p = document.createElement('p')
  let text = document.createTextNode(todo.todo)

  let close = document.createElement('button')
  let img = document.createElement('img')

  checkBox.type = 'checkbox'
  checkBox.checked = (todo.status == 'completed') ? 1 : 0

  img.src = './images/icon-cross.svg'
  close.append(img)
  p.append(text)
  checkBoxLabel.append(checkBox)
  checkBoxLabel.append(checkBoxSpan)

  let className = (todo.status == 'completed') ? 'todo__item--active' : 'todo__item'
  item.classList.add(className)
  item.append(checkBoxLabel)
  item.append(p)
  item.append(close)

  return item
}
function filterTodos(todos, statusSelected) {
  let newTodos = todos.filter(({ status }) => status === statusSelected)
  return newTodos
}
function setStatusEvents() {
  let statuses = document.querySelectorAll('.todo__status label input')
  statuses.forEach(status => {
    status.addEventListener('change', () => {
      let newTodos = (status.value != 'all') ? filterTodos(todos, status.value) : todos
      removeListItems()
      renderTodos(newTodos)
    })
  })
}
function removeListItems() {
  let todoList = document.querySelector('.todo__list')
  let count = todoList.childNodes.length

  for (let i = count - 1; i >= 0; i--) {
    todoList.childNodes[i].remove()
  }
}