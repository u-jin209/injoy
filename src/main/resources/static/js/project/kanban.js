/**
 * [x] 엘리먼트의 .draggable, .container의 배열로 선택자를 지정합니다.
 * [x] draggables를 전체를 루프하면서 dragstart, dragend를 이벤트를 발생시킵니다.
 * [x] dragstart, dragend 이벤트를 발생할때 .dragging라는 클래스를 토글시킨다.
 * [x] dragover 이벤트가 발생하는 동안 마우스 드래그하고 마지막 위치해놓은 Element를 리턴하는 함수를 만듭니다.
 */
function dragAndDrop() {

    const $ = (select) => document.querySelectorAll(select);
    const draggables = $('.draggable');
    const containers = $('.control');

    draggables.forEach(el => {
        el.addEventListener('dragstart', () => {
            el.classList.add('dragging');
        });

        el.addEventListener('dragend', () => {
            el.classList.remove('dragging')
        });
    });


    containers.forEach(container => {
        container.addEventListener("dragover", e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientX);
            const draggable = document.querySelector(".dragging");
            if (afterElement === undefined) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        });
        container.addEventListener("drop", e => {
            //console.log('drop')
            e.preventDefault();
            const draggable = document.querySelector(".dragging");

            let taskId = draggable.getElementsByTagName('input')[0].value
            let changeProcess = container.parentElement.getElementsByClassName('taskProcess')[0].innerText

            update(taskId, changeProcess)
        });
    });

    function getDragAfterElement(container, x) {
        const draggableElements = [
            ...container.querySelectorAll(".draggable:not(.dragging)"),
        ];

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = x - box.left - box.width / 2;
                // console.log(offset);
                if (offset < 0 && offset > closest.offset) {
                    return {offset: offset, element: child};
                } else {
                    return closest;
                }
            },
            {offset: Number.NEGATIVE_INFINITY},
        ).element;
    }
}
$(function (){
    $('.kanbanBtn').click(function (){
        let text = $(this).parent().find('.taskProcess').text()

        $('.kanbanProcessBtn button').each(function (){
            if (text === $(this).text()){
                $(this).trigger("click").addClass('active')
            }
        })

        $('.kanban-addStartDate').css('display', 'block').val('')
        $('.start-date-exist').css('display', 'none')
        $('.kanban-addEndDate').css('display', 'block').val('')
        $('.end-date-exist').css('display', 'none')
        $('.addPriority').css('display', 'block')
        $('.prioritySpan').css('display', 'none')
        $('.addPriority_ul').css('display', 'none')

    })

    // 프로세스 버튼 클릭시 변경
    $('.taskProcessBtn').click(function (e) {
        let btn = document.querySelectorAll(".taskProcessBtn");
        btn.forEach(function (btn, i) {
            if (e.currentTarget === btn) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    })


    dragAndDrop()

    // 업무 추가 항목 추가입력 클릭시
    $('.optionAddBtn').click(function (){
        $('.option-group').find('li').each(function (){
            if($(this).css('display') === 'none'){
                $(this).css('display', 'flex')
                $('.optionAddBtn').css('display', 'none')
            } else {
                document.querySelector("body").addEventListener("click", function(e) {
                    if(e.target.className === e.currentTarget.querySelector(".modal").className) {
                        console.log("correct")
                        $('.option-group').find('li').each(function (){

                        if ($(this).attr('class') === 'process-layer' || $(this).attr('class') === 'manager-layer'){
                            $(this).css('display', 'flex')
                        } else {
                            $(this).css('display', 'none')
                        }
                        })

                        $('.optionAddBtn').css('display', 'block')
                    }
                })
            }
        })
    })

    //시작일 부분
    $('.kanban-addStartDate').change(function (){
        $('.start-date-exist').css('display', 'block')
        $('.startDate-value').text($(this).val() + addWeek($(this).val()) + ' 부터')

        //마감일 최소값 지정
        $('.kanban-addEndDate').attr('min', $(this).val())
        $(this).css('display', 'none')
    })

    $('.removeBtn-startDate').click(function (){
        $('.start-date-exist').css('display', 'none')
        $('.kanban-addStartDate').css('display', 'block').val('')
    })

    //마감일 부분

    $('.kanban-addEndDate').change(function (){
        $('.end-date-exist').css('display', 'block')
        $('.endDate-value').text($(this).val() + addWeek($(this).val()) + ' 까지')
        $(this).css('display', 'none')
    })

    $('.removeBtn-endDate').click(function (){
        $('.end-date-exist').css('display', 'none')
        $('.kanban-addEndDate').css('display', 'block').val('')
    })

    // 우선순위 추가 부분
    $('.addPriority').click(function (){
        let priority_ul = $('.addPriority_ul')
        if (priority_ul.css('display') === 'none'){
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                console.log()
                const element = document.getElementsByClassName('kanban-priority-value')[0];
                element.innerHTML = ($(this).context.innerHTML)

                $('.addPriority').css('display','none')
                $('.prioritySpan').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else{
            priority_ul.css('display', 'none')

        }

    })

    $('.removeBtn-priority').click(function (){
        $('.addPriority').css('display', 'block')
        $('.prioritySpan').css('display', 'none')
        $(this).closest('svg').remove()
        $(this).closest('.priorityText').remove()
    })

    //진척도 값
    $('.kanban-rangeInput').change(function (){
        $('.progress-txt').text($(this).val() + '%')
    })

    document.querySelector('.kanban-rangeInput').addEventListener('input',function(event){
        let gradient_value = 100 / event.target.attributes.max.value;
        console.log(event.target.value)
        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 '+gradient_value * event.target.value +'%, rgb(236, 236, 236) ' +gradient_value *  event.target.value + '%, rgb(236, 236, 236) 100%)';
    });

})

function addWeek(date){
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];

    return ' (' + dayOfWeek+')';
}

function update(taskId, changeProcess){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let formData = {
        taskId: taskId,
        process: changeProcess,
    }
    $.ajax({
        url: '/task/updateProcess',
        type: 'post',
        data: formData,
        success: () => {
            $('#taskTable').load(window.location.href + ' #taskTable', function () {
                btnColor()
                all()
                Toast.fire({
                    title: '상태가 변경되었습니다.'
                })
            })
        }
    })
}

function kanbanCurrentBtn() {
    let btn = document.querySelectorAll(".taskProcessBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    console.log(currentBtn)
    return currentBtn;
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

function kanbanAddTask() {

    let currentBtn = kanbanCurrentBtn()
    let formData = {
        projectId: Number($('.projectIdInput').val()),
        taskTitle: $('#kanbanAddTitle').val(),
        taskContent: $('.writekanbanContent').val(),
        process: currentBtn,
        //managerId: $('#kanbanManagerId').text(),
        startDate : $('.kanban-addStartDate').val() ? to_date2($('.kanban-addStartDate').val()) : new Date (0),
        closingDate : $('.kanban-addEndDate').val() ? to_date2($('.kanban-addEndDate').val()) : new Date (0),
        progress : Number($('.kanban-rangeInput').val()),
        priority : $('.prioritySpan .priorityText').text()
    }

    console.log(formData)

    $.ajax({
        url: '/task/taskPageWrite',
        data: formData,
        type: 'post',
        success: ((message) => {
            location.reload()
        })
    })
}

