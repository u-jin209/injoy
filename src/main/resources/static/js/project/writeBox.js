$(document).ready(function () {
    $('.writeBox').click(function () {
        $('.writeBoxTab').each(function () {
            if ($(this).hasClass('active')) {
                $(this).trigger('click')
                $('.requestBtn').trigger("click")
                $('.requestBtn').focus()
            }
        })
    })
})

$(function () {

    $('.processBtn').click(function () {
        console.log($(this).text())
        const btnValue = $(this).text();
        taskWrite(btnValue)
    })

    // 현재 탭되어있는 탭 제거하기 아직 수정주이이이ㅣ이이이이ㅣ이이
    $('.board_li').click(() => {
        $('#taskWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#taskWrite-tab-pane').removeClass('show active')
        $('#scheduleWrite-tab-pane').removeClass('show active')

        $('#boardWrite-tab').addClass('active')
        $('#boardWrite-tab-pane').addClass('show active')

    })

    $('.task_li').click(() => {
        $('#boardWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#scheduleWrite-tab-pane').removeClass('show active')
        $('#boardWrite-tab-pane').removeClass('show active')

        $('#taskWrite-tab').addClass('active')
        $('#taskWrite-tab-pane').addClass('show active')

    })


    $('.schedule_li').click(() => {
        $('#boardWrite-tab').removeClass('active')
        $('#boardWrite-tab-pane').removeClass('show active')
        $('#taskWrite-tab').removeClass('show active')
        $('#taskWrite-tab-pane').removeClass('show active')

        $('#scheduleWrite-tab').addClass('active')
        $('#scheduleWrite-tab-pane').addClass('show active')

    })

    $('.writeBoxTab').click(function () {
        $(this).each(function () {
            if ($(this).hasClass('active')) {
                $(this).addClass('active')
                $(this).find('a').trigger('click')

                if ($(this).attr('id') === 'boardWrite-tab') {
                        console.log("board")
                        boardWrite()
                } else if ($(this).attr('id') === 'taskWrite-tab') {
                        console.log("task")
                        $('.requestBtn').trigger("click")
                        $('.requestBtn').focus()
                        taskWrite()
                } else if ($(this).attr('id') === 'scheduleWrite-tab') {
                        console.log("schedule")
                        //scheduleWrite()
                }

            }
        })
    })

})

function boardWrite() {
    $('.boardWriteBtn').click(function () {
        let formData = {
            title: $('#boardTitle').val(),
            content: $('.writeBoardContent').val(),
            projectId: $('.projectIdInput').val()
        }

        $.ajax({
            url: '/board/write',
            data: formData,
            type: 'post',
            success: ((message) => {
                location.reload()
            })
        })
    })
}

function taskWrite(btnValue) {
    $('.taskWriteBtn').click(function () {
        let formData = {
            projectId: $('.projectIdInput').val(),
            title: $('#taskTitle').val(),
            content: $('.writeContent').val(),
            process: btnValue,
            managerId: $('#managerId').val(),

        }

        $.ajax({
            url: '/task/write',
            data: formData,
            type: 'post',
            success: ((message) => {
                location.reload()
            })
        })
    })
}

// function scheduleWrite() {
// $('.scheduleWriteBtn').click(function () {
//     let formData = {
//         title: $('#scheduleTitle').val(),
//         content: $('.writeScheduleContent').val(),
//         projectId: $('.projectIdInput').val()
//     }
//  })
//
// }