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
    const checkbox_th = $('<th>')
                            .attr('class', 'checkbox_th')
                            .html('<input type="checkbox" class="done_check" onclick="onCheck(this)">');
    const text_th = $('<th>')
                        .attr('class', 'text_th')
                        .html(todoName).dblclick((e)=>{onClickEdit($(e.target))});
    const erase_th = $('<th>')
                        .attr('class', 'erase_th')
                        .html('<input type="button" onclick="onclickErase(this)">');

    return $('<tr>').attr({
            class: 'todo'
        }).append(checkbox_th, text_th, erase_th);
}

function onClickEdit(th) {
    const input = $('<input>')
                    .attr({
                        type: 'text',
                        class: 'input_todo_box',
                        value: th.text()
                    })
                    .blur((e)=>{onBlurEdit($(e.target))})
    th.html(input);
    th.children().eq(0).focus();
}

function onBlurEdit(input) {
    input.parent().html(input.val());
}