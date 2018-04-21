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
	const todoName_th = $('<th class="todoName_th">').html(todoName)
	const erase_th = $('<th class="erase_th">').html(
						$('<input type="button">'))
	return $('<tr>').append(checkbox_th, todoName_th, erase_th)
}