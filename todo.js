function init() {
	$('#todo_input').keydown(function(e) {
		if(e.keyCode !== 13){
			return
		}
		
		
		$('#todo_list').append(makeTodo(e.target.value))
		e.target.value = ""
	})
}

function makeTodo(todoName) {
	const checkbox_th = $('<th class="checkbox_th">').html(
							$('<input>').attr('type', 'checkbox'))
	const todoName_th = $('<th class="todoName_th">').html(todoName).dblclick((e)=>{onClickEdit($(e.target))})
	const erase_th = $('<th class="erase_th">').html($('<input type="button">').click((e)=>{onErase($(e.target))}))
	return $('<tr>').append(checkbox_th, todoName_th, erase_th)
}
///ï“èW
function onClickEdit(target) {
	target.html($('<input type="text" class="todo_edit">').val(target.text()).blur((e)=>{onBlurEdit($(e.target))}))
	target.children().eq(0).focus();
}
function onBlurEdit(target) {
	target.parent().html(target.val());
}
///çÌèú
function onErase(target) {
	target.parent().parent().remove();
}
