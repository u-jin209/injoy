$(document).ready(function (){
    $('.taskAddButton').click(function (){
        $('#requestBtn').trigger("click")
        $('.requestBtn').focus()
    })

    $('.inputTaskTitle').hide()
    $('.btn_ul').hide()
    $('.priority_ul').hide()
    $('.managerDiv').hide()
})
$(function (){

    $('.processBtn').click(function (){
        console.log($(this).text())
        const btnValue = $(this).text();
        addTask(btnValue)
    })

    // 업무명 js

    let tasktr = $('.taskTr')
    let titleTd = tasktr.find('.titleTd')
    let processTd = tasktr.find('.processTd')
    let priorityTd = tasktr.find('.priorityTd')
    let managerTd = tasktr.find('.managerTd')

    titleTd.mouseover( function (){
        $(this).find('.inputTaskTitle').show()
        $(this).find('span').hide()
    })

    titleTd.mouseout(function (){
        $(this).find('.inputTaskTitle').hide()
        $(this).find('span').show()
    })

    // 진행 이벤트

    processTd.click(function (){
        let btnUl = $(this).find('.btn_ul')
        let taskId = $(this).closest('tr').find('#taskId').text();
        let taskTitle = $(this).closest('tr').find('.titleTask-view').text();
        if (btnUl.css('display')==='block'){
            btnUl.css('display', 'none')
        } else {
            btnUl.css('display', 'block')
            btnUl.find('.changeBtn').click( function(e) {
                // 프로세스 값 변경 ajax
                let formData = {
                    taskId : taskId,
                    process : $(this).text(),
                    projectId: $('.projectIdInput').val(),
                    title : taskTitle,
                }
                $.ajax({
                    url : '/task/updateProcess',
                    type: 'post',
                    data : formData,
                    success : () => {
                        location.reload()
                    }
                })
            })
        }

    })



    // 우선순위 버튼

    priorityTd.click( function (){
        let priority_ul  = $(this).find('.priority_ul');
        if (priority_ul.css('display') === 'block'){
            priority_ul.css('display', 'none')
        } else {
            priority_ul.css('display', 'block')
        }

    })

    //담당자 이벤트
    managerTd.click( function (){
        let managerDiv = $(this).find('.managerDiv')
        if (managerDiv.css('display')==='block'){
            managerDiv.css('display', 'none')
        } else {
            managerDiv.css('display', 'block')
        }

    })

    //날짜 이벤트
    let start = tasktr.find('#startDate')
    let end = tasktr.find('#endDate');

    start.prop("min", new Date().toISOString().split("T")[0])

    start.on('change', function() {
        if (start.value)
            end.min = start.value;
    }, false)

    end.on('change', function (){
        if (end.value)
            start.max = end.value;
    }, false)

    // td 공통 부분

    // document.addEventListener('click', function(e) {
    //     let container = document.getElementById('btn_ul');
    //     let process_td = document.getElementById('processTd');
    //     if (!container.contains(e.target) && !process_td.contains(e.target)) {
    //         container.style.display = 'none';
    //     }
    // });



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