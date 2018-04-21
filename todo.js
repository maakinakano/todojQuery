function init() {
	storageInit()
	$('#todo_input').keydown(function(e) {
		const todoName = e.target.value
		if(e.keyCode !== 13 || todoName === ''){
			return
		}
		const todo = {
			'todoName': todoName,
			'isDone': false
		}
		const id = readAndIncTodoNum()
		$('#todo_list').append(makeTodo(id, todo))
		writeTodo(id, todo)
		e.target.value = ""
		refiltering()
	})
	$('#filter_button').children().each((i, element)=>{
		$(element).click((e)=>{
			filtering($(e.target).val())
		})
	})

	const todoNum = readTodoNum()
	const todoList = $('#todo_list')
	for(let i=0; i<todoNum; i++) {
		console.log(i)
		const todo = readTodo(i)
		if(!todo){
			continue
		}
		todoList.append(makeTodo(i, todo, false))
	}
	$('#debug').click((e)=>{
		storageInitHard()
		location.reload()
	})
}

function makeTodo(id, todo) {
	const checkbox = $('<input>').attr('type', 'checkbox').prop('checked', todo['isDone']).click((e)=>{flipComplete($(e.target), $(e.target).prop('checked'))})
	const checkbox_th = $('<th class="checkbox_th">').html(checkbox)
	const todoName_th = $('<th class="todoName_th">').html(todo['todoName']).dblclick((e)=>{onClickEdit($(e.target))})
	const erase_th = $('<th class="erase_th">').html($('<input type="button">').click((e)=>{onErase($(e.target))}))
	const tr = $('<tr class="todo_tr">').attr('name', id).append(checkbox_th, todoName_th, erase_th)
	flipComplete(checkbox, todo['isDone'], false)
	return tr
}
///äÆóπ
function flipComplete(target, isDone, shouldWrite=true) {
	const todoName_th = target.parent().next()
	if(isDone) {
		todoName_th.css({
			'text-decoration': 'line-through',
			'color': 'rgba(150,150,150,0.5)'
		})
	} else {
		todoName_th.css({
			'text-decoration': 'none',
			'color': 'black'
		})
	}
	if(shouldWrite) {
		updateIsDone(target.parent().parent().attr('name'),isDone)
		refiltering()
	}
}

///ï“èW
function onClickEdit(target) {
	target.html($('<input type="text" class="todo_edit">').val(target.text()).blur((e)=>{onBlurEdit($(e.target))})).keydown((e)=>{
		if(e.keyCode !== 13){
			return
		}
		onBlurEdit($(e.target))
	})
	target.children().eq(0).focus()
}
function onBlurEdit(target) {
	const todoName = target.val()
	if(todoName === '') {
		onErase(target.parent().next().children().eq(0))
		return
	}
	updateTodoName(target.parent().parent().attr('name'), todoName)
	target.parent().html(todoName)
}

///çÌèú
function onErase(target) {
	const target_tr = target.parent().parent()
	removeTodo(target_tr.attr('name'))
	target_tr.remove()
}


function filtering(mode) {
	const todos = $('.todo_tr').each((i, element)=>{
		const check = $(element).find('input[type="checkbox"]').prop('checked')
		if(mode === 'active' && check) {
			$(element).hide()
		} else if(mode === 'completed' && !check) {
			$(element).hide()
		} else {
			$(element).show()
		}
	})
}

function refiltering() {
	filtering($('input[name="filter"]:checked').val())
}
