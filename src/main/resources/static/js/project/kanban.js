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


    })

    dragAndDrop()
})

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

function findCurrentBtn() {
    let btn = document.querySelectorAll(".processBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    return currentBtn;
}

function kanbanAddTask() {
    let currentBtn = findCurrentBtn()
    let formData = {
        projectId: $('.projectIdInput').val(),
        taskTitle: $('#taskAddTitle').val(),
        taskContent: $('.writeTaskContent').val(),
        process: currentBtn,
        managerId: $('#managerId').val(),


    }

    $.ajax({
        url: '/task/taskPageWrite',
        data: formData,
        type: 'post',
        success: ((message) => {
            location.reload()
        })
    })
}

