let todos = [
  {
    id: 01,
    todo: 'Run 5km',
    status: 0
  },
  {
    id: 02,
    todo: 'Bike 10km',
    status: 1
  },
  {
    id: 03,
    todo: 'Bike 50km',
    status: 0
  }

]

init()

function init() {
  renderTodos(todos)
  setStatusEvents()
  setListItemStatus()
  formSubmit()
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
  setRemoveListItemEvent()
  setListItemStatus()

  let clearButton = document.querySelector('.todo__clear')
  clearButton.addEventListener('click', clearCompletedTodos)

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
  checkBox.checked = todo.status
  checkBox.classList.add('todo__checkBox')
  checkBox.setAttribute('data-id', todo.id)

  img.src = './images/icon-cross.svg'
  close.classList.add('todo__remove')
  close.setAttribute('data-id', todo.id)
  close.append(img)
  p.append(text)
  checkBoxLabel.append(checkBox)
  checkBoxLabel.append(checkBoxSpan)

  let className = (todo.status) ? 'todo__item--active' : 'todo__item'
  item.classList.add(className)
  item.append(checkBoxLabel)
  item.append(p)
  item.append(close)

  return item
}
function filterTodos(todos, statusSelected) {
  let newTodos = todos.filter(({ status }) => status == statusSelected)
  return newTodos
}
function setListItemStatus() {
  let inputs = document.querySelectorAll('.todo__checkBox')
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      setObjectStatus(input.attributes['data-id'].value, input.checked)
    })
  })
}
function setObjectStatus(id, checked) {
  todos.forEach(todo => {
    if (todo.id == id) {
      todo.status = (checked) ? 1 : 0
      removeListItems()
      setStatusEvents()
    }
  })
}
function setStatusEvents() {
  let statuses = document.querySelectorAll('.todo__status label input')
  statuses.forEach(status => {
    if (status.checked) renderTodosFilteredByStatus(status)
    status.addEventListener('change', () => renderTodosFilteredByStatus(status))
  })
}
function renderTodosFilteredByStatus(status) {
  let newTodos = (status.value != -1) ? filterTodos(todos, status.value) : todos
  removeListItems()
  renderTodos(newTodos)
}
function removeListItems() {
  let todoList = document.querySelector('.todo__list')
  let count = todoList.childNodes.length

  for (let i = count - 1; i >= 0; i--) {
    todoList.childNodes[i].remove()
  }
}
function removeListItem(removeButton) {
  let removeID = removeButton.attributes['data-id'].value
  todos = todos.filter(({ id }) => id != removeID)
  removeListItems()
  renderTodos(todos)
}
function setRemoveListItemEvent() {
  let removeButtons = document.querySelectorAll('.todo__remove')
  removeButtons.forEach(removeButton => [
    removeButton.addEventListener('click', () => removeListItem(removeButton))
  ])
}
function clearCompletedTodos() {
  todos = filterTodos(todos, 0)
  setStatusEvents()
}

function formSubmit() {
  let form = document.querySelector('.todo__create')
  form.addEventListener('submit', () => {
    event.preventDefault()
    let children = form.children
    let newTodo = {}
    newTodo['id'] = Date.now()
    for (let i = 0; i < children.length; i++) {
      let name = children[i].name
      let value = children[i].value
      if (name == 'status') value = (children[i].checked) ? 1 : 0
      newTodo[name] = value
    }
    todos.push(newTodo)
    removeListItems()
    renderTodos(todos)
  })
}