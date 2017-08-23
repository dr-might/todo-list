$(document).ready(function () {

    $('button#add').on('click', function () {
        var $newTask = $('#new-task').val();
        if ($newTask === '') {
            $('.warning').html('<i class="glyphicon glyphicon-warning-sign"></i> Введите название задачи').show();
            $('.success').hide();
        } else {
            $('.success').html('<i class="glyphicon glyphicon-ok"></i> Задача добавлена').fadeIn('slow').delay(500).fadeOut();
            $('.warning').hide();

            var newListItem = '<li>';
            newListItem += '<input type="checkbox">';
            newListItem += '<label>' + $newTask + '</label>';
            newListItem += '<button class="delete">Удалить</button>';
            newListItem += '</li>';

            $('ul#active-tasks').append(newListItem);
            $('.inputTask').val($newTask);

            $('#new-task').val('');
        }
        ;
        countTask();
    });

    $('ul').on('change', 'input[type="checkbox"]', function () {

        var grandpa = $(this).parent().parent();
        var parent = $(this).parent();

        if (grandpa.is('#active-tasks')) {
            parent.remove();
            $('#completed-tasks').append(parent);
        } else if (grandpa.is('#completed-tasks')) {
            parent.remove();
            $('#active-tasks').append(parent);
        }
        countTask();
    });

    $('ul').on('click', '.delete', function () {
        $(this).parent().remove();
        countTask();
    });

    function countTask() {
        var remainTask = $('#active-tasks li').length;
        $('#counter').hide().fadeIn(300).html(remainTask);
    };
    countTask();

    $('#filter').keyup(function () {
        var filter = $(this).val(), count = 0;

        $('ul li').each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();
            } else {
                $(this).show();
                count++;
            }
        });

        var numberItems = count;
        $('#filter-count').text("Number of Comments = " + count);
    });

    $('#sort').change(function () {
        $(this).find('option:selected').each(function () {
            if ($(this).attr('value') == "default") {
                $('#active, #completed').show();
            }
            else if ($(this).attr("value") == "active") {
                $('#completed').hide();
                $('#active').show();
            }
            else if ($(this).attr("value") == "completed") {
                $('#active').hide();
                $('#completed').show();
            }
        });
    }).change();

});