$(document).ready(function () {
    $('.writeBox').click(function () {
        $('.writeBoxTab').each(function () {
            if ($(this).hasClass('active')) {
                $(this).trigger('click')
            }
        })
    })
})

$(function () {

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
                    $('#submitWriteBtn').attr('id', 'boardWriteBtn')
                    boardWrite()
                } else if ($(this).attr('id') === 'taskWrite-tab') {
                    console.log("task")
                    $('#submitWriteBtn').attr('id', 'taskWriteBtn')
                    $('.requestBtn').trigger("click").addClass('active')

                    taskWrite()
                } else if ($(this).attr('id') === 'scheduleWrite-tab') {
                    console.log("schedule")
                    //scheduleWrite()
                }

            }
        })
    })

    $('.processBtn').click(function (e) {
        let btn = document.querySelectorAll(".processBtn");
        btn.forEach(function (btn, i) {
            if (e.currentTarget === btn) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    })

})

function findCurrentBtn(){

    let btn = document.querySelectorAll(".processBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    return currentBtn;
}

function boardWrite() {
    $('#boardWriteBtn').click(function () {
        let formData = {
            bTitle: $('#boardTitle').val(),
            bContent: $('.writeBoardContent').val(),
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

function taskWrite() {
    let currentBtn = findCurrentBtn()
    $('#taskWriteBtn').click(function () {
        let formData = {
            projectId: $('.writeProjectId').val(),
            taskTitle: $('#taskTitle').val(),
            taskContent: $('.writeContent').val(),
            process: currentBtn,
            managerId: $('.managerId').val(),

        }

        $.ajax({
            url: '/task/mainWrite',
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