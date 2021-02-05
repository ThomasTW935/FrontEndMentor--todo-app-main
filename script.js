init()

function init() {
  let todos = [
    {
      todo: 'Run 5km',
      status: 0
    },
    {
      todo: 'Bike 10km',
      status: 1
    }

  ]
  renderTodos(todos)
}
function renderTodos(todos) {
  let todoList = document.querySelector('.todo__list')

  todos.forEach(todo => {
    let listItem = renderTodo(todo)
    todoList.append(listItem)
  })

}
function renderTodo(todo) {
  let item = document.createElement('li')
  let checkBox = document.createElement('input')
  let p = document.createElement('p')
  let text = document.createTextNode(todo.todo)
  let close = document.createElement('button')
  let img = document.createElement('img')

  checkBox.type = 'checkbox'
  checkBox.checked = todo.status

  img.src = './images/icon-cross.svg'
  close.append(img)
  p.append(text)

  item.append(checkBox)
  item.append(p)
  item.append(close)

  return item
}
