$(document).ready(function () {
    // 모달 창이 열릴 때 발생하는 이벤트
    $('#kanbanModal').on('show.bs.modal', function () {
        $('.kanban-modal-footer').hide(); // modal-footer 숨기기
        $('.kanban-setUp').hide()
        $('.updateBtn-kanban-priority').remove()
        $('#kanban-update-priority').remove()
    });
});

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

$(function () {
    $('.kanbanBtn').click(function () {
        let text = $(this).parent().find('.taskProcess').text()

        $('.kanbanProcessBtn button').each(function () {
            if (text === $(this).text()) {
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
    $('#kanbanAddOption').click(function () {
        $('#optionKanbanAdd').find('li').each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css('display', 'flex')
                $('#kanbanAddOption').css('display', 'none')
            } else {
                document.querySelector("body").addEventListener("click", function (e) {
                    if (e.target.className === e.currentTarget.querySelector("#kanbanAddModal").className) {
                        console.log("correct")
                        $('#optionKanbanAdd').find('li').each(function () {

                            if ($(this).attr('class') === 'process-layer' || $(this).attr('class') === 'manager-layer') {
                                $(this).css('display', 'flex')
                            } else {
                                $(this).css('display', 'none')
                            }
                        })

                        $('#kanbanAddOption').css('display', 'block')
                    }
                })
            }
        })
    })

    // 업무 상세 보기 우선순위 추가 부분
    $('.addPriority-kanban').click(function () {
        let updateBtn = $('.updateBtn-kanban-priority')
        updateBtn.prev().remove()
        let priority_ul = $('#kanban-priority_ul')
        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                let btnTag = $(this).html()

                updateBtn.prev().replaceWith(btnTag);


                $('.addPriority-kanban').css('display', 'none')
                $('.prioritySpan-kanban').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else {
            priority_ul.css('display', 'none')

        }

    })

    $('.kanban-addStartDate').attr('min', new Date().toISOString().split("T")[0])
    $('.kanban-addEndDate').attr('min', new Date().toISOString().split("T")[0])

    //시작일 부분
    $('.kanban-addStartDate').change(function () {
        $('.start-date-exist').css('display', 'block')
        $('.startDate-value').text($(this).val() + addWeek($(this).val()) + ' 부터')

        //마감일 최소값 지정
        $('.kanban-addEndDate').attr('min', $(this).val())
        $(this).css('display', 'none')
    })

    $('#kanban-startDate-removeBtn').click(function () {
        $('.start-date-exist').css('display', 'none')
        $('.kanban-addStartDate').css('display', 'block').val('')
    })

    //마감일 부분

    $('.kanban-addEndDate').change(function () {
        $('.end-date-exist').css('display', 'block')
        $('.endDate-value').text($(this).val() + addWeek($(this).val()) + ' 까지')
        $(this).css('display', 'none')
    })

    $('#kanban-endDate-removeBtn').click(function () {
        $('.end-date-exist').css('display', 'none')
        $('.kanban-addEndDate').css('display', 'block').val('')
    })

    // 우선순위 추가 부분
    $('.addPriority').click(function () {
        let priority_ul = $('.addPriority_ul')
        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {

                const element = document.getElementsByClassName('kanban-priority-value')[0];
                element.innerHTML = ($(this).context.innerHTML)

                $('.addPriority').css('display', 'none')
                $('.prioritySpan').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else {
            priority_ul.css('display', 'none')

        }

    })

    $('#kanban-priority-removeBtn').click(function () {
        $('.addPriority').css('display', 'block')
        $('.prioritySpan').css('display', 'none')
        $(this).closest('svg').remove()
        $(this).closest('.priorityText').remove()
    })

    //진척도 값
    $('.kanban-rangeInput').change(function () {
        $('.progress-txt').text($(this).val() + '%')
    })

    document.querySelector('.kanban-rangeInput').addEventListener('input', function (event) {
        let gradient_value = 100 / event.target.attributes.max.value;
        console.log(event.target.value)
        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
    });


    // 칸반보드 상세보기 부분
    $('.control').click(function () {
        let formData = {
            taskId: $(this).find('.kanabanTaskId').val()
        }
        $.ajax({
            url: '/task/detailTask',
            type: 'get',
            data: formData,
            success: (result) => {
                showKanbanDetail(result)
            }
        })
    })

    //업무 수정하기
    $('.modify-kanban').click(function () {
        let taskId = $(this).parents('.postHeader').parent().find('.kanban-taskId em').text()
        let formData = {taskId: taskId}
        $('.setUp-group').css('display', 'none')

        $.ajax({
            url: '/task/detailTask',
            type: 'get',
            data: formData,
            success: (result) => {
                $('.startDate-layer-kanban').css('display', 'flex')
                $('.endDate-layer-kanban').css('display', 'flex')
                $('.priority-layer-kanban').css('display', 'flex')
                $('.kanban-modal-footer').css('display', 'flex')

                let min = new Date().toISOString().split("T")[0]

                // 업무 제목 수정하기
                $('.kanban-takTitle').html("<input class='kanban-taskTitle-input' type='text' value='" + result.taskTitle + "'/>")

                // 업무 내용 수정하기
                $('.kanban-taskContent').html("<div class=\"writeContentDiv\">\n" +
                    "                        <label>\n" +
                    "                            <textarea class=\"kanban-modal-content\">" + result.taskContent + "</textarea>\n" +
                    "                        </label>\n" +
                    "                    </div>")

                // 상태 수정하기
                $('.process-layer').find('.process-modal-button').css('pointer-events', 'auto')
                $('.kanban-process-btn').click(function (e) {
                    let btn = document.querySelectorAll(".kanban-process-btn");
                    btn.forEach(function (btn, i) {
                        if (e.currentTarget === btn) {
                            btn.classList.add("active");
                        } else {
                            btn.classList.remove("active");
                        }
                    });
                })


                // 업무 우선순위 수정하기
                if (result.priority === null) {
                    $('.addPriority-kanban').css('display', 'block')
                } else {
                    $('.prioritySpan-kanban').append("<button class=\"updateBtn-kanban-priority\"\n style=\"margin-left: 10px;border: none; background-color: transparent;\">우선순위 변경\n" +
                        "                                        </button>" +
                        "                                           <div class=\"kanban-priority_ul\" id=\"kanban-update-priority\"\n" +
                        "                                             style=\"display: none\">\n" +
                        "                                            <ul class=\"button_priority\"\n" +
                        "                                                style=\"position: absolute; transform: none; top: 25px; left: 65px; width: 80px; text-align: start\">\n" +
                        "                                                <li class=\"mb-1 px-2\">\n" +
                        "                                                    <button class=\"priorityBtn\">\n" +
                        "                                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\"\n" +
                        "                                                             height=\"15\"\n" +
                        "                                                             fill=\"red\"\n" +
                        "                                                             class=\"bi bi-exclamation-octagon-fill\"\n" +
                        "                                                             viewBox=\"0 0 16 16\">\n" +
                        "                                                            <path d=\"M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z\"/>\n" +
                        "                                                        </svg>\n" +
                        "                                                        <span class=\"priorityText\">긴급</span>\n" +
                        "                                                    </button>\n" +
                        "                                                </li>\n" +
                        "                                                <li class=\"mb-1  px-2\">\n" +
                        "                                                    <button class=\"priorityBtn\">\n" +
                        "                                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\"\n" +
                        "                                                             height=\"15\"\n" +
                        "                                                             fill=\"orange\"\n" +
                        "                                                             class=\"bi bi-arrow-up\" viewBox=\"0 0 16 16\">\n" +
                        "                                                            <path fill-rule=\"evenodd\"\n" +
                        "                                                                  d=\"M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z\"/>\n" +
                        "                                                        </svg>\n" +
                        "                                                        <span class=\"priorityText\">높음</span>\n" +
                        "                                                    </button>\n" +
                        "                                                </li>\n" +
                        "                                                <li class=\"mb-1  px-2\">\n" +
                        "                                                    <button class=\"priorityBtn\">\n" +
                        "                                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\"\n" +
                        "                                                             height=\"15\"\n" +
                        "                                                             fill=\"green\"\n" +
                        "                                                             class=\"bi bi-dash\" viewBox=\"0 0 16 16\">\n" +
                        "                                                            <path d=\"M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z\"/>\n" +
                        "                                                        </svg>\n" +
                        "                                                        <span class=\"priorityText\">보통</span>\n" +
                        "                                                    </button>\n" +
                        "                                                </li>\n" +
                        "                                                <li class=\"mb-1  px-2\">\n" +
                        "                                                    <button class=\"priorityBtn\">\n" +
                        "                                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\"\n" +
                        "                                                             height=\"15\"\n" +
                        "                                                             fill=\"dark-violet\"\n" +
                        "                                                             class=\"bi bi-arrow-down\" viewBox=\"0 0 16 16\">\n" +
                        "                                                            <path fill-rule=\"evenodd\"\n" +
                        "                                                                  d=\"M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z\"/>\n" +
                        "                                                        </svg>\n" +
                        "                                                        <span class=\"priorityText\">낮음</span>\n" +
                        "                                                    </button>\n" +
                        "                                                </li>\n" +
                        "                                                <li class=\" px-2\">\n" +
                        "                                                    <button class=\"priorityBtn\">\n" +
                        "                                                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\"\n" +
                        "                                                             height=\"15\"\n" +
                        "                                                             fill=\"gray\"\n" +
                        "                                                             class=\"bi bi-x-lg\" viewBox=\"0 0 16 16\">\n" +
                        "                                                            <path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z\"/>\n" +
                        "                                                        </svg>\n" +
                        "                                                        <span class=\"priorityText\">없음</span>\n" +
                        "                                                    </button>\n" +
                        "                                                </li>\n" +
                        "                                            </ul>\n" +
                        "                                        </div>")
                }
                $('.updateBtn-kanban-priority').click(function () {
                    if ($('#kanban-update-priority').css('display') === 'block') {
                        $('#kanban-update-priority').css('display', 'none')
                    } else {
                        $('#kanban-update-priority').css('display', 'block')
                    }

                })

                $('#kanban-update-priority').find('.priorityBtn').click(function () {
                    let btnTag = $(this).html()
                    console.log(btnTag)
                    $('#kanban-update-priority').css('display', 'none')
                    $('.updateBtn-kanban-priority').prev().remove()
                    $('.updateBtn-kanban-priority').prev().replaceWith(btnTag);
                })

                //시작일 수정하기

                if (result.startDate === undefined) {
                    $('.kanban-startDate-value').html("<input class=\"kanban-modal-addStartDate\" data-placeholder=\"시작일 선택\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\"/>")
                } else {
                    $('.kanban-startDate-value').html("<input class=\"kanban-modal-addStartDate\" data-placeholder=\"" + formatDate(result.startDate) + "\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\" value=\"" + formatDate(result.startDate) + "\"/>")
                }

                // 마감일 수정하기
                if (result.closingDate === undefined) {
                    $('.kanban-endDate-value').html("<input class=\"kanban-modal-addEndDate\" data-placeholder=\"마감일 선택\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\"/>")

                } else {
                    $('.kanban-endDate-value').html("<input class=\"kanban-modal-addEndDate\" data-placeholder=\"" + formatDate(result.closingDate) + "\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\" value=\"" + formatDate(result.closingDate) + "\"/>")
                }

                //날짜 최소값 설정하기
                $('.kanban-modal-addStartDate').attr('min', min)
                if (result.startDate == null) {
                    $('.kanban-modal-addEndDate').attr('min', min)
                } else {
                    $('.kanban-modal-addEndDate').attr('min', formatDate(result.startDate))
                }

                $('.kanban-modal-addStartDate').change(function () {
                    $('.kanban-modal-addEndDate').attr('min', $(this).val())
                })


                //진척도 변경
                $('.progress-input').html("<input id=\"kanban-rangeInput-modal\" class=\"kanban-rangeInput\" max=\"100\" min=\"0\" step=\"10\" type=\"range\" value=\"" + result.progress + "\" style=\"background: linear-gradient(to right, #FFE283 0%, #FFE283 " + result.progress + "%, #ececec " + result.progress + "%, #ececec 100%)!important\"/>" +
                    "                                            <span class=\"progress-txt kanban-progress\">" + result.progress + "%</span>\n")

                document.querySelector('#kanban-rangeInput-modal').addEventListener('input', function (event) {
                    let gradient_value = 100 / event.target.attributes.max.value;
                    console.log(event.target.value)
                    event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
                    $('.kanban-progress').text(event.target.value + '%')
                });

            }
        })

    })

    kanbanDeleteTask()

})

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function showKanbanDetail(result) {
    console.log(result)
    //제목 설정
    $('.kanban-takTitle').text(result.taskTitle)
    //작성자 이름
    $('.kanban-authorName').text(result.name)
    //작성자 profile
    document.getElementById('kanban-profile').style.backgroundImage = "url('" + result.profilePhoto + "')";

    let crtDate = dateFormat(result.crtDate)

    //작성일
    $('.kanban-crtDate').text(crtDate)
    //업무번호
    $('.kanban-taskId em').text(result.taskId)
    // 상태
    let btn = document.querySelectorAll(".kanban-process-btn");
    btn.forEach(function (btn, i) {
        if (btn.innerText === result.process) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active")
        }
    });

    //우선순위
    if (result.priority == null) {
        $('.priority-layer-kanban').css('display', 'none')
        $('.prioritySpan-kanban').css('display', 'none')
        $('.addPriority-kanban').css('display', 'block')
    } else {
        kanban_priority(result.priority)
        $('.prioritySpan-kanban').css('display', 'block')
        $('.priority-layer-kanban').css('display', 'flex')
        $('.kanban-modal-priority-value').text(result.priority)
        $('.addPriority-kanban').css('display', 'none')
    }

    //진척도
    if (result.progress === 0) {
        $('.progress-layer-kanban').css('display', 'none')
    } else {
        $('.progress-layer-kanban').css('display', 'flex')
    }

    // 진척도 값 설정 & 배경 색상 변경
    $('.modal-progress-bar').css('width', result.progress)
    $('.modal-progress-percent').text(result.progress + '%')

    console.log(result.startDate)
    console.log(result.closingDate)
    //시작일, 마감일 설정

    if (result.startDate == null && result.startDate === undefined) {
        $('.startDate-layer-kanban').css('display', 'none')
    } else {
        $('.startDate-layer-kanban').css('display', 'flex')
        $('.kanban-startDate-value').text(dateWeek(result.startDate) + '부터')
        $('.kanban-modal-addStartDate').css('display', 'none')
    }

    if (result.closingDate == null && result.closingDate === undefined) {
        $('.endDate-layer-kanban').css('display', 'none')
    } else {
        $('.endDate-layer-kanban').css('display', 'flex')
        $('.kanban-endDate-value').text(dateWeek(result.closingDate) + '까지')
        $('.kanban-modal-addEndDate').css('display', 'none')
    }


    //내용
    $('.kanban-taskContent').text(result.taskContent)
}


function addWeek(date) {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];

    return ' (' + dayOfWeek + ')';
}

function kanbanUpdateTask() {
    let taskId = Number($('.kanban-taskId em').text())
    let taskTitle = $('.kanban-taskTitle-input').val()
    let taskContent = $('.kanban-modal-content').val()
    let startDate = to_date2($('.kanban-modal-addStartDate').val())
    let closingDate = to_date2($('.kanban-modal-addEndDate').val())
    let process
    let btn = document.querySelectorAll(".kanban-process-btn");
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            process = btn.textContent;
        }
    });
    let priority = $('.prioritySpan-kanban').find('.priorityText').first().text()
    let progress = $('#kanban-rangeInput-modal').val()

    let formData = {
        taskId: taskId,
        taskTitle: taskTitle,
        taskContent: taskContent,
        startDate: $('.kanban-modal-addStartDate').val() ? startDate : new Date(0),
        closingDate: $('.kanban-modal-addEndDate').val() ? closingDate : new Date(0),
        progress: progress,
        process: process,
        priority: priority
    }

    console.log(formData)

    $.ajax({
        url: '/task/updateTask',
        type: 'post',
        data: formData,
        success: (result) => {
            Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).fire({
                title: '업무가 수정되었습니다.'
            })
            showKanbanDetail(result)
            $('.kanban-modal-footer').css('display', 'none')
            $('.updateBtn-kanban-priority').css('display', 'none')
        }
    })

}

function kanbanDeleteTask() {
    $('.delete-kanban').click(function () {
        Swal.fire({
            text: '업무를 삭제하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.postHeader').parent().find('.kanban-taskId em').text()

                let formData = {
                    taskId: taskId,
                }

                console.log(formData)

                $.ajax({
                    url: '/task/deleteTask',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })
}

function update(taskId, changeProcess) {
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
    return currentBtn;
}

function to_date2(date_str) {
    let yyyyMMdd = String(date_str);
    let sYear = yyyyMMdd.substring(0, 4);
    let sMonth = yyyyMMdd.substring(5, 7);
    let sDate = yyyyMMdd.substring(8, 10);

    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

function kanbanAddTask() {

    let currentBtn = kanbanCurrentBtn()
    let formData = {
        projectId: Number($('.projectIdInput').val()),
        taskTitle: $('#kanbanAddTitle').val(),
        taskContent: $('.writekanbanContent').val(),
        process: currentBtn,
        //managerId: $('#kanbanManagerId').text(),
        startDate: $('.kanban-addStartDate').val() ? to_date2($('.kanban-addStartDate').val()) : new Date(0),
        closingDate: $('.kanban-addEndDate').val() ? to_date2($('.kanban-addEndDate').val()) : new Date(0),
        progress: Number($('.kanban-rangeInput').val()),
        priority: $('.prioritySpan .priorityText').text()
    }

    console.log(formData)

    $.ajax({
        url: '/task/taskPageWrite',
        data: formData,
        type: 'post',
        success: ((message) => {
            if (message === "success") {
                location.reload()
            } else {
                Swal.fire({
                    "icon": "warning",
                    "title": "업무 제목을 입력하세요"
                })
            }
        })
    })
}

function kanban_priority(value) {
    let priority = $('.kanban-modal-priority-value')
    priority.prevAll().remove();
    switch (value) {
        case '긴급' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="red"\n' +
                '                                                                     class="bi bi-exclamation-octagon-fill mr-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>\n' +
                '                                                                </svg>')
            break;
        case '높음' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="orange"\n' +
                '                                                                     class="bi bi-arrow-up mr-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path fill-rule="evenodd"\n' +
                '                                                                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>\n' +
                '                                                                </svg>');
            break
        case '보통' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="green"\n' +
                '                                                                     class="bi bi-dash mr-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>\n' +
                '                                                                </svg>');
            break;
        case '낮음' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="dark-violet"\n' +
                '                                                                     class="bi bi-arrow-down mr-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path fill-rule="evenodd"\n' +
                '                                                                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>\n' +
                '                                                                </svg>');
            break;
        case '없음' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="gray"\n' +
                '                                                                     class="bi bi-x-lg mr-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n' +
                '                                                                </svg>');
            break;
        case null :
            priority.before('<svg></svg>');
            break;


    }
}

