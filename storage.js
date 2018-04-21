///read
function readTodo(id) {
	const str = localStorage['todo-' + id]
	if(str === '') {
		return false
	}
	return JSON.parse(str)
}

///write update remove
function writeTodo(id, todo) {
	localStorage['todo-' + id] = JSON.stringify(todo)
}


function updateTodoName(id, todoName) {
	const todo = readTodo(id)
	todo['todoName'] = todoName
	writeTodo(id, todo)
}

function updateIsDone(id, isDone) {
	const todo = readTodo(id)
	todo['isDone'] = isDone
	writeTodo(id, todo)
}

function removeTodo(id) {
	localStorage['todo-' + id] = ''
}


///countån
function readTodoNum() {
	return localStorage['todoNum']
}

function readAndIncTodoNum() {
	const todoNum = localStorage['todoNum']
	localStorage['todoNum'] = +todoNum+1
	return todoNum
}


///èâä˙âª
function storageInit() {
	if(localStorage['todoNum'] === '') {
		localStorage['todoNum'] = 0
	}
}
function storageInitHard() {
	localStorage['todoNum'] = 0
}
