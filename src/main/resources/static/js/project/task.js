$(document).ready(function (){
    $('.taskAddButton').click(function (){
        $('#requestBtn').trigger("click")
        $('.requestBtn').focus()
    })

    $('.inputTaskTitle').hide()
    $('.btn_ul').hide()
    $('.priority_ul').hide()
})
$(function (){

    $('.processBtn').click(function (){
        console.log($(this).text())
        const btnValue = $(this).text();
        addTask(btnValue)
    })

    // 업무명 js

    $('.titleTd').on('mouseover', function (){
        $('.inputTaskTitle').show()
        $(this).find('span').hide()
    })

    $('.titleTd').on('mouseout', function (){
        $('.inputTaskTitle').hide()
        $(this).find('span').show()
    })

    // 진행상황 버튼 JS

    $('.processTd').click(function (){
        if ($('.btn_ul').css('display')==='block'){
            $('.btn_ul').css('display', 'none')
        } else {
            $('.btn_ul').css('display', 'block')
        }

    })

    // 우선순위 버튼

    $('.priorityTd').click(function (){
        if ($('.priority_ul').css('display')==='block'){
            $('.priority_ul').css('display', 'none')
        } else {
            $('.priority_ul').css('display', 'block')
        }

    })

    //날짜 이벤트
    let start = document.getElementById('startDate')
    let end = document.getElementById('endDate');

    $('#startDate').prop("min", new Date().toISOString().split("T")[0])

    start.addEventListener('change', function() {
        if (start.value)
            end.min = start.value;
    }, false)

    end.addEventListener('change', function (){
        if (end.value)
            start.max = end.value;
    }, false)

    // td 공통 부분

    document.addEventListener('click', function(e) {
        let container = document.getElementById('btn_ul');
        let process_td = document.getElementById('processTd');
        let priority_td = document.getElementById('priorityTd')
        if (!container.contains(e.target) && !process_td.contains(e.target)) {
            container.style.display = 'none';
        }
    });



})

function addTask(btnValue){
    $('.taskAddButton').click(function (){
        let formData = {
            projectId : $('.projectIdInput').val(),
            title : $('#taskTitle').val(),
            content : $('.writeContent').val(),
            process : btnValue,
            managerId : $('#managerId').val(),


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