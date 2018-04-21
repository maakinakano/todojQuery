function init() {
	$('#todo_input').keydown(function(e) {
		if(e.keyCode !== 13 || e.target.value === ''){
			return
		}
		
		
		$('#todo_list').append(makeTodo(e.target.value))
		e.target.value = ""
	})
}

function makeTodo(todoName) {
	const checkbox_th = $('<th class="checkbox_th">').html($('<input>').attr('type', 'checkbox').click((e)=>{flipComplete($(e.target), $(e.target).prop('checked'))}))
	const todoName_th = $('<th class="todoName_th">').html(todoName).dblclick((e)=>{onClickEdit($(e.target))})
	const erase_th = $('<th class="erase_th">').html($('<input type="button">').click((e)=>{onErase($(e.target))}))
	return $('<tr>').append(checkbox_th, todoName_th, erase_th)
}
///äÆóπ
function flipComplete(target, isDone) {
	const todoName_th = target.parent().next();
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
}

///ï“èW
function onClickEdit(target) {
	target.html($('<input type="text" class="todo_edit">').val(target.text()).blur((e)=>{onBlurEdit($(e.target))}))
	target.children().eq(0).focus();
}
function onBlurEdit(target) {
	target.parent().html(target.val())
}
///çÌèú
function onErase(target) {
	target.parent().parent().remove()
}
