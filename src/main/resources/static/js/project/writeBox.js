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
        //시작일 부분
    $('.writeBox-addStartDate').attr('min', new Date().toISOString().split("T")[0])
    $('.writeBox-addEndDate').attr('min', new Date().toISOString().split("T")[0])

    $('.writeBox-addStartDate').change(function (){
        $('.start-date-exist').css('display', 'block')
        $('.startDate-value').text($(this).val() + addWeek($(this).val()) + ' 부터')

        //마감일 최소값 지정
        $('.writeBox-addEndDate').attr('min', $(this).val())
        $(this).css('display', 'none')
    })

    $('.removeBtn-startDate').click(function (){
        $('.start-date-exist').css('display', 'none')
        $('.writeBox-addStartDate').css('display', 'block').val('')
    })

    //마감일 부분

    $('.writeBox-addEndDate').change(function (){
        $('.end-date-exist').css('display', 'block')
        $('.endDate-value').text($(this).val() + addWeek($(this).val()) + ' 까지')
        $(this).css('display', 'none')
    })

    $('.removeBtn-endDate').click(function (){
        $('.end-date-exist').css('display', 'none')
        $('.writeBox-addEndDate').css('display', 'block').val('')
    })

    // 우선순위 추가 부분
    $('.addPriority-writeBox').click(function (){
        let priority_ul = $('.addPriority_ul-writeBox')
        if (priority_ul.css('display') === 'none'){
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                console.log()
                const element = document.getElementsByClassName('writeBox-priority-value')[0];
                element.innerHTML = ($(this).context.innerHTML)

                $('.addPriority-writeBox').css('display','none')
                $('.prioritySpan-writeBox').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else{
            priority_ul.css('display', 'none')

        }

    })

    $('.removeBtn-priority-writeBox').click(function (){
        $('.addPriority-writeBox').css('display', 'block')
        $('.prioritySpan-writeBox').css('display', 'none')
        $(this).closest('svg').remove()
        $(this).closest('.priorityText').remove()
    })

    //진척도 값
    $('.writeBox-rangeInput').change(function (){
        $('.writeBox-progress-txt').text($(this).val() + '%')
    })


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
        var activeTab = $(this);

        $('#writeBoxContent').empty();
        if (activeTab.hasClass('active')) {
            activeTab.addClass('active');
            activeTab.find('a').trigger('click');

            if (activeTab.attr('id') === 'boardWrite-tab') {
                console.log("board");
                $('.submitWriteBtn').attr('id', 'boardWriteBtn');
                boardWrite();
            } else if (activeTab.attr('id') === 'taskWrite-tab') {
                console.log("task");
                $('.submitWriteBtn').attr('id', 'taskWriteBtn');
                $('.writeBox-requestBtn').trigger("click").addClass('active');
                taskWrite();
            } else if (activeTab.attr('id') === 'scheduleWrite-tab') {
                console.log("schedule");
                //scheduleWrite();
            }
        }
    });

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

function writeCurrentBtn() {
    let btn = document.querySelectorAll(".processBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    return currentBtn;
}

function addWeek(date){
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];

    return ' (' + dayOfWeek+')';
}


function boardWrite() {
    $('#boardWriteBtn').click(function () {
        let formData = {
            bTitle: $('#boardTitle').val(),
            bContent: $('.writeBoardContent').val(),
            projectId: Number($('.projectIdInput').val())
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

function to_date2(date_str)
{
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0,4);
    var sMonth = yyyyMMdd.substring(5,7);
    var sDate = yyyyMMdd.substring(8,10);

    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
}


function taskWrite() {

    $('#taskWriteBtn').click(function () {
        let formData = {
            projectId: Number($('.writeProjectId').val()),
            taskTitle: $('#taskTitle').val(),
            taskContent: $('.writeContent').val(),
            process: writeCurrentBtn(),
            //managerId: $('.managerId').val(),
            startDate :  $('.writeBox-addStartDate').val() ? to_date2($('.writeBox-addStartDate').val()) : new Date (0),
            closingDate : $('.writeBox-addEndDate').val() ? to_date2($('.writeBox-addEndDate').val()) : new Date (0),
            progress : Number($('.writeBox-rangeInput').val()),
            priority : $('.prioritySpan-writeBox .priorityText').text()

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