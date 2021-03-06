function init() {
	storageInit()
	///event handlerの設定
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
		reflectTasks()
	})
	$('#all_checkbox').click((e)=>{
		const check = $(e.target).prop('checked')
		$('.todo_tr input[type="checkbox"]').each((i, checkbox)=>{
			$(checkbox).prop('checked', check)
			flipComplete($(checkbox), check)
		})
	})
	$('#filter_button').children().each((i, element)=>{
		$(element).click((e)=>{
			filtering($(e.target).val())
		})
	})
	$('#debug').click((e)=>{
		storageInitHard()
		location.reload()
	})
	$('#clear_completed').click((e)=>{
		$('.todo_tr input[type="checkbox"]:checked').each((i, checkbox)=>{
			onErase($(checkbox).parent().next().next().children().eq(0))
		})
	})
	///Todoの読み込み
	const todoNum = readTodoNum()
	const todoList = $('#todo_list')
	for(let i=0; i<todoNum; i++) {
		const todo = readTodo(i)
		if(!todo){
			continue
		}
		todoList.append(makeTodo(i, todo, false))
	}
	///allcheckboxのチェックの変更
	reflectTasks()
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

function reflectTasks() {
	recheckAllCheckBox()
	countActive()
	countTaskNum()
}
function recheckAllCheckBox() {
	let isAllCheck = true
	$('.todo_tr input[type="checkbox"]').each((i, checkbox)=>{
		isAllCheck &= $(checkbox).prop('checked')
	})
	$('#all_checkbox').prop('checked', isAllCheck)
}
function countActive() {
	let count = 0;
	$('.todo_tr input[type="checkbox"]').each((i, checkbox)=>{
		if(!$(checkbox).prop('checked')){
			count++;
		}
	})
	$('#item_left').html(count+' item left')
}
function countTaskNum() {
	let count = 0;
	$('.todo_tr input[type="checkbox"]').each((i, checkbox)=>{
		count++;
	})
	if(count == 0){
		$('#all_checkbox').hide()
		$('#filter_button').hide()
	} else {
		$('#all_checkbox').show()
		$('#filter_button').show()
	}
}
///完了
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
	reflectTasks()
}

///編集
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

///削除
function onErase(target) {
	const target_tr = target.parent().parent()
	removeTodo(target_tr.attr('name'))
	target_tr.remove()
	reflectTasks()
}

///フィルタリング
function filtering(mode) {
	$('.todo_tr').each((i, element)=>{
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

