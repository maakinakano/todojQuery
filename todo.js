function init() {
    $('#todo_input').html(
        '<tr>' +
            '<th class="checkbox_th">' +
               '<input type="checkbox" onclick="onCheckAll(this)">' +
            '</th>' +
            '<th class="input_th">' +
                '<form>' + 
                    '<input type="text" id="input_todo_box" autocomplete="off", placeholder="Whats need to be done?">' +
                '</form>' +
            '</th>' +
            '<th class="erase_th"></th>' +
        '</tr>');
        
    $('#todo_input tr th.input_th form').on('submit', (event => {
        event.preventDefault();
        const todoName = $('#input_todo_box').val();
        if(todoName === ''){return;}
    
        $('#todo_input tr').eq(0).after(makeTodo(todoName));
        $('#input_todo_box').val('');
    }));
}

function makeTodo(todoName) {
    return $('<tr>').attr({
            class: 'todo'
        }).append(
            $('<th>').attr('class', 'checkbox_th').html('<input type="checkbox" class="done_check" onclick="onCheck(this)">'),
            $('<th>').attr({
                class: 'text_th',
                ondblclick: 'onClickEdit(this)'
            }).html(todoName),
            $('<th>').attr('class', 'erase_th').html('<input type="button" onclick="onclickErase(this)">'));
}
