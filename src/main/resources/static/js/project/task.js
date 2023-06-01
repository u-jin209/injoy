$(document).ready(function () {
    btnColor()
    table_priority()
    startDateValue()
    endDateValue()

    $('.inputTaskTitle .detail').click(function (event) {
        $('.modal-footer').hide();
        $('.task-setUp').hide()
        $('.updateBtn-task-priority').remove()
        $('.comment-more-button').parent().css('display', 'block')
        $('#commentGroup-task-detail').empty()
        $('#task-update-priority').remove()
        $('#task-offcanvas').offcanvas('show');

    });


})

$(document).on('click', function (e) {
    let target = $(e.target);

    if (!target.closest('.post-option').length){
        $('.setUp-group').css('display','none')
    }

    if (!target.closest('.detail').length && !target.closest('#task-offcanvas').length){
        $('#task-offcanvas').offcanvas('hide');
    }

    // Check if the clicked element is outside the priorityTd
    if (!target.closest('.priorityTd').length) {
        $('.priority_ul').css('display', 'none');
    }

    if (!target.closest('.processTd').length) {
        $('.btn_ul').css('display', 'none');
    }

    if (!target.closest('.progressTd').length) {
        $('.progressUl').css('display', 'none')
    }
});

function startDateValue() {
    // 현재 날짜 가져오기
    let currentDate = new Date().toISOString().split('T')[0];
    $('.startDate').each(function () {
        let startDate = $(this).find('#startDate')
        // 현재 날짜보다 이전인 경우 플레이스홀더로 설정
        if (startDate.val() < currentDate) {
            startDate.attr('data-placeholder', startDate.val());
        }
    })

}

function endDateValue() {
    // 현재 날짜 가져오기
    let currentDate = new Date().toISOString().split('T')[0];
    $('.endDate').each(function () {
        let endDate = $(this).find('#endDate')
        // 현재 날짜보다 이전인 경우 플레이스홀더로 설정
        if (endDate.val() <= currentDate) {
            endDate.attr('data-placeholder', endDate.val());
            endDate.css('color', 'red')
        }
    })
}

function table_priority() {
    $('.table-priority').each(function () {
        switch ($(this).text()) {
            case '긴급' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="red"\n' +
                    '                                                                     class="bi bi-exclamation-octagon-fill me-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>\n' +
                    '                                                                </svg>')
                break;
            case '높음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="orange"\n' +
                    '                                                                     class="bi bi-arrow-up me-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path fill-rule="evenodd"\n' +
                    '                                                                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>\n' +
                    '                                                                </svg>');
                break
            case '보통' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="green"\n' +
                    '                                                                     class="bi bi-dash me-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>\n' +
                    '                                                                </svg>');
                break;
            case '낮음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="dark-violet"\n' +
                    '                                                                     class="bi bi-arrow-down me-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path fill-rule="evenodd"\n' +
                    '                                                                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>\n' +
                    '                                                                </svg>');
                break;
            case '없음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="gray"\n' +
                    '                                                                     class="bi bi-x-lg me-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n' +
                    '                                                                </svg>');
                break;

        }
    })
}

function btnColor() {
    $('.currentBtn').each(function () {
        switch ($(this).text()) {
            case '요청' :
                $(this).css('background-color', '#00B2FF');
                break;
            case '진행' :
                $(this).css('background-color', '#00B01C');
                break
            case '피드백' :
                $(this).css('background-color', '#FD7900');
                break;
            case '완료' :
                $(this).css('background-color', '#402A9D');
                break;
            case '보류' :
                $(this).css('background-color', '#777777');
                break;

        }
    })
}

$(function () {
    all()


    $('.comment-more-button').click(function (e) {
        let commentList = $(this).parent().parent().find('#commentGroup-task-detail li')

        for (let i = 2; i < commentList.length; i++) {
            commentList[i].classList.remove("hidden-comment");
        }
        $(this).parent().css('display', 'none')
    })

    let td = $('td')
    td.not('.priorityTd').click(function (e) {
        $('.priority_ul').css('display', 'none');
    });

    td.not('.processTd').click(function (e) {
        $('.btn_ul').css('display', 'none');
    });

    td.not('.progressTd').click(function (e) {
        $('.progressUl').css('display', 'none');
    });
})

function all() {
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

    $('.taskTitle').change(function () {

        let taskId = $(this).closest('tr').find('#taskId').text();
        // 타이틀 값 변경 ajax
        let formData = {
            taskId: taskId,
            taskTitle: $(this).val(),
        }
        $.ajax({
            url: '/task/updateTitle',
            type: 'post',
            data: formData,
            success: () => {

                $('#taskTable').load(window.location.href + ' #taskTable', function () {
                    btnColor()
                    table_priority()
                    all()
                    startDateValue()
                    endDateValue()
                    Toast.fire({
                        title: '업무명이 변경되었습니다.'
                    })
                })
            }
        })


    })

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

// 업무명 js

    let tasktr = $('.taskTr')
    let titleTd = tasktr.find('.titleTd')
    let processTd = tasktr.find('.processTd')
    let priorityTd = tasktr.find('.priorityTd')
    //let managerTd = tasktr.find('.managerTd')
    let progressTd = tasktr.find('.progressTd')

    titleTd.mouseover(function () {
        $(this).find('.inputTaskTitle').show()
        $(this).find('span').hide()
    })

    titleTd.mouseout(function () {
        $(this).find('.inputTaskTitle').hide()
        $(this).find('span').show()
    })

    titleTd.click(function (e) {
        if (!$(e.target).hasClass('taskTitle')) {
            let taskId = $(this).closest('tr').find('#taskId').text();
            let formData = {
                taskId: taskId,
            }
            $.ajax({
                url: '/task/detailTask',
                type: 'get',
                data: formData,
                success: (result) => {
                    $('.task-file-post-area').css('display','none')
                    $('.file-container-taskPage').html("")
                    $('.img-container-taskPage').html("")
                    showTaskDetail(result)
                }
            })
        }

    })

// 진행 이벤트

    processTd.click(function (e) {
        e.stopPropagation();

        let btnUl = $(this).find('.btn_ul')
        let taskId = $(this).closest('tr').find('#taskId').text();

        if (btnUl.css('display') === 'block') {
            btnUl.css('display', 'none')
        } else {
            $('.btn_ul').css('display', 'none');
            btnUl.css('display', 'block')
            btnUl.find('.changeBtn').click(function (e) {
                // 프로세스 값 변경 ajax
                let formData = {
                    taskId: taskId,
                    process: $(this).text(),
                }
                $.ajax({
                    url: '/task/updateProcess',
                    type: 'post',
                    data: formData,
                    success: () => {
                        $('#taskTable').load(window.location.href + ' #taskTable', function () {
                            btnColor()
                            table_priority()
                            all()
                            startDateValue()
                            endDateValue()
                            Toast.fire({
                                title: '상태가 변경되었습니다.'
                            })
                        })
                    }
                })
            })
        }
    })


// 우선순위 버튼


    priorityTd.click(function (e) {
        e.stopPropagation();

        let priority_ul = $(this).find('.priority_ul');
        let taskId = $(this).closest('tr').find('#taskId').text();

        if (priority_ul.css('display') === 'block') {
            priority_ul.css('display', 'none')
        } else {
            $('.priority_ul').css('display', 'none');
            priority_ul.css('display', 'block')
            priority_ul.find('.priorityBtn').click(function (e) {
                // 프로세스 값 변경 ajax
                let formData = {
                    taskId: taskId,
                    priority: $(this).find('.priorityText').text(),
                }
                $.ajax({
                    url: '/task/updatePriority',
                    type: 'post',
                    data: formData,
                    success: () => {
                        $('#taskTable').load(window.location.href + ' #taskTable', function () {
                            btnColor()
                            table_priority()
                            all()
                            startDateValue()
                            endDateValue()
                            Toast.fire({
                                title: '우선순위가 변경되었습니다.'
                            })
                        })
                    }
                })
            })
        }

    })

//담당자 이벤트
//     managerTd.click(function () {
//         let managerDiv = $(this).find('.managerDiv')
//         if (managerDiv.css('display') === 'block') {
//             //managerDiv.css('display', 'none')
//         } else {
//             managerDiv.css('display', 'block')
//
//             let memberSpan = $(this).find('.memberSpan')
//
//             // 멤버 검색하기
//             $(this).find('.managerSearch').click(function () {
//                 alert('검색창 클릭')
//             })
//
//             // 멤버 선택항목 전체 삭제
//             $(this).find('.deleteAllBtn').click(function () {
//                 $('.memberSpan *').remove()
//                 $('input[name=memberCheckBox]:checkbox').prop('checked', false)
//                 $('.memberLi').css('background-Color', 'white').css('color', 'black')
//
//             })
//
//             // 멤버 선택하기
//             $(this).find('.memberUl li').click(function () {
//                 if (!$(this).find('input').prop('checked')) {
//                     memberSpan.addClass('active')
//                     $(this).find('input').prop('checked', true)
//                     console.log($(this).find('input').prop('checked'))
//                     if ($(this).find('input').prop('checked') === true) {
//                         $(this).css('background-Color', 'rgba(48, 100, 179, 0.51)').css('color', 'white')
//                     }
//
//                     memberSpan.append("<span class=\"memberItem\">\n" +
//                         "                                <span class=\"memberIcon\">\n" +
//                         "                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"\n" +
//                         "                                         fill=\"currentColor\" class=\"bi bi-person-circle\" viewBox=\"0 0 16 16\">\n" +
//                         "                                                <path d=\"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\"/>\n" +
//                         "                                                <path fill-rule=\"evenodd\"\n" +
//                         "                                                      d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z\"/>\n" +
//                         "                                    </svg>\n" +
//                         "                                </span>\n" +
//                         "                                <span class=\"memberNameSpan\" th:text='${member.name}'>" +
//                         $(this).find('.memberName').text() +
//                         "</span>\n" +
//                         "                                <button class=\"memberCloseBtn\">\n" +
//                         "                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
//                         "                                         class=\"bi bi-x\" viewBox=\"0 0 16 16\">\n" +
//                         "                                    <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n" +
//                         "                                    </svg>\n" +
//                         "                                </button>\n" +
//                         "                            </span>")
//                 } else {
//                     $(this).find('input').prop('checked', false)
//
//                     if ($(this).find('input').prop('checked') === false) {
//                         $(this).css('background-Color', 'white').css('color', 'black')
//
//                     }
//
//                 }
//
//             })
//         }
//
//         // 멤버 선택항목 개별 삭제
//         $('.memberCloseBtn').click(function () {
//             let name = $(this).parent().find('.memberNameSpan').text()
//             // memberName.each(()=>{
//             //    console.log($(this))
//             //     // if ($(this).innerText.className === name) {
//             //     //     $(this).parent().parent().find('.memberLi').css('background-Color', 'white').css('color', 'black')
//             //     // }
//             // })
//             $(this).parent().remove()
//         })
//
//         // 담당자 등록하기
//         $(this).find('.selectMemberBtn').click(function () {
//             $.ajax({})
//         })
//
//     })

//날짜 이벤트
    let start = tasktr.find('#startDate')
    let end = tasktr.find('#endDate');

    start.prop("min", new Date().toISOString().split("T")[0])

    start.on('change', function () {
        if (start.value)
            end.min = start.value;
    }, false)

    end.on('change', function () {
        if (end.value)
            start.max = end.value;
    }, false)

    $('.startDate input').change(function () {
        let taskId = $(this).closest('tr').find('#taskId').text();
        let formData = {
            taskId: taskId,
            startDate: $(this).val(),
        }
        $.ajax({
            url: '/task/updateStartDate',
            type: 'post',
            data: formData,
            success: () => {
                $('#taskTable').load(window.location.href + ' #taskTable', function () {
                    btnColor()
                    table_priority()
                    all()
                    startDateValue()
                    endDateValue()
                    Toast.fire({
                        title: '시작일이 변경되었습니다.'
                    })
                })
            }
        })

    })

    // 시작일 유무에 따른 마감일 min 값 설정하기
    $('.endDate input').each(function () {
        let minDate = $(this).attr('min')

        if (minDate === undefined || minDate === '') {
            let currentDate = new Date().toISOString().split("T")[0];
            $(this).attr('min', currentDate);
        } else if (minDate !== undefined || minDate !== '') {
            $(this).attr('min', minDate);
        }

    });

    $('.endDate input').change(function () {

        let taskId = $(this).closest('tr').find('#taskId').text();
        let formData = {
            taskId: taskId,
            endDate: $(this).val(),
        }
        $.ajax({
            url: '/task/updateEndDate',
            type: 'post',
            data: formData,
            success: () => {
                $('#taskTable').load(window.location.href + ' #taskTable', function () {
                    btnColor()
                    table_priority()
                    all()
                    startDateValue()
                    endDateValue()
                    Toast.fire({
                        title: '마감일이 변경되었습니다.'
                    })
                })
            }
        })

    })

    //진행도 부분
    progressTd.click(function (e) {
        e.stopPropagation();

        let progress_ul = $(this).find('.progressUl');
        let taskId = $(this).closest('tr').find('#taskId').text();

        if (progress_ul.css('display') === 'block') {
            progress_ul.css('display', 'none')
        } else {
            $('.progressUl').css('display', 'none');
            progress_ul.css('display', 'block')
            progress_ul.find('.progress-btn').click(function (e) {
                // 프로세스 값 변경 ajax
                let formData = {
                    taskId: taskId,
                    progress: Number($(this).find('.progress-text').text()),
                }

                $.ajax({
                    url: '/task/updateProgress',
                    type: 'post',
                    data: formData,
                    success: () => {
                        $('#taskTable').load(window.location.href + ' #taskTable', function () {
                            btnColor()
                            table_priority()
                            all()
                            startDateValue()
                            endDateValue()
                            Toast.fire({
                                title: '진행도가 변경되었습니다.'
                            })
                        })
                    }
                })
            })
        }

    })

    $('.addButton').click(function () {
        $('.taskPage-requestBtn').trigger("click").addClass('active')
    })

    document.querySelector('.task-rangeInput').addEventListener('input', function (event) {
        let gradient_value = 100 / event.target.attributes.max.value;

        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
        $('.task-add-progress').text(event.target.value + '%')
    });


    //업무 작성하기 부분 설정

    // 업무 추가 항목 추가입력 클릭시
    $('#taskPage-addOption').click(function () {
        $('#taskPage-AddUl').find('li').each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css('display', 'flex')
                $('#taskPage-addOption').css('display', 'none')
            } else {
                document.querySelector("body").addEventListener("click", function (e) {
                    if (e.target.className === e.currentTarget.querySelector("#addTaskModal").className) {
                        console.log("correct")
                        $('#taskPage-AddUl').find('li').each(function () {

                            if ($(this).attr('class') === 'process-layer' || $(this).attr('class') === 'manager-layer') {
                                $(this).css('display', 'flex')
                            } else {
                                $(this).css('display', 'none')
                            }
                        })

                        $('#taskPage-addOption').css('display', 'block')
                    }
                })
            }
        })
    })

    //우선순위
    // 우선순위 추가 부분
    $('.taskPage-addPriority').click(function () {
        let priority_ul = $('.taskPage-addPriority_ul')
        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {

                const element = document.getElementsByClassName('task-priority-value')[0];
                element.innerHTML = ($(this).context.innerHTML)

                $('.taskPage-addPriority').css('display', 'none')
                $('.prioritySpan-add-taskPage').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else {
            priority_ul.css('display', 'none')

        }

    })
    //우선순위 삭제 부분
    $('.removeBtn-priority-taskPage').click(function () {
        $('.taskPage-addPriority').css('display', 'block')
        $('.prioritySpan-add-taskPage').css('display', 'none')
        $(this).closest('svg').remove()
        $(this).closest('.priorityText').remove()
    })
    //시작일
    $('.task-addStartDate').attr('min', new Date().toISOString().split("T")[0])
    $('.task-addEndDate').attr('min', new Date().toISOString().split("T")[0])
    $('.task-addStartDate').change(function () {
        $('.task-addEndDate').attr('min', $(this).val())

    })

    //업무 디테일 부분
    $('.task-optionAddBtn-detail').click(function () {
        let ulTag = $(this).parent().find('.task-content-group')

        ulTag.find('li').each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css('display', 'flex')
                $(this).parent().parent().find('.task-optionAddBtn-detail').css('display', 'none')
            }

        })
    })

    $('.set-btn').click(function () {

        let nowSetUp = $(this).parent().find('.task-setUp')
        if (nowSetUp.css('display') === 'block') {
            nowSetUp.css('display', 'none')
        } else {
            nowSetUp.css('display', 'block')
        }
    })

    //업무 수정하기 taskPage
    $('.modify-task-detail').click(function () {
        let taskId = $(this).parents('.postHeader').parent().find('.task-detail-taskId em').text()
        let formData = {taskId: taskId}
        $('.setUp-group').css('display', 'none')

        $.ajax({
            url: '/task/detailTask',
            type: 'get',
            data: formData,
            success: (result) => {
                $('.startDate-layer-task').css('display', 'flex')
                $('.endDate-layer-task').css('display', 'flex')
                $('.priority-layer-task').css('display', 'flex')
                $('.task-detail-footer').css('display', 'flex')
                $('#update-taskDetail-file').click(function (){
                    $('.img-container-taskPage').html("")
                    $('.task-file-post-area').css('display','block')
                    $('.file-container-taskPage').html("")
                })
                taskDetailFileSelection()
                let min = new Date().toISOString().split("T")[0]

                // 업무 제목 수정하기
                $('.task-detail-taskTitle').html("<input class='task-detail-taskTitle-input' type='text' value='" + result.taskTitle + "'/>")

                // 업무 내용 수정하기
                $('.task-taskContent').html("<div class=\"writeContentDiv\">\n" +
                    "                        <label>\n" +
                    "                            <textarea class=\"task-detail-content\">" + result.taskContent + "</textarea>\n" +
                    "                        </label>\n" +
                    "                    </div>")

                // 상태 수정하기
                $('.process-layer-task').find('.task-detail-processBtn').css('pointer-events', 'auto')
                $('.task-process-btn').click(function (e) {
                    let btn = document.querySelectorAll(".task-process-btn");
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
                    $('.addPriority-task-detail').css('display', 'block')
                } else {
                    $('.prioritySpan-task-detail').append("<button class=\"updateBtn-task-priority\"\n style=\"margin-left: 10px;border: none; background-color: transparent;\">우선순위 변경\n" +
                        "                                        </button>" +
                        "                                           <div class=\"taskDetail-priority_ul\" id=\"task-update-priority\"\n" +
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
                $('.updateBtn-task-priority').click(function () {
                    if ($('#task-update-priority').css('display') === 'block') {
                        $('#task-update-priority').css('display', 'none')
                    } else {
                        $('#task-update-priority').css('display', 'block')
                    }

                })

                $('#task-update-priority').find('.priorityBtn').click(function () {
                    let btnTag = $(this).html()

                    $('#task-update-priority').css('display', 'none')
                    $('.updateBtn-task-priority').prev().remove()
                    $('.updateBtn-task-priority').prev().replaceWith(btnTag);
                })

                //시작일 수정하기

                if (result.startDate === undefined) {
                    $('.taskDetail-startDate-value').html("<input class=\"task-detail-addStartDate\" data-placeholder=\"시작일 선택\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\"/>")
                } else {
                    $('.taskDetail-startDate-value').html("<input class=\"task-detail-addStartDate\" data-placeholder=\"" + formatDate(result.startDate) + "\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\" value=\"" + formatDate(result.startDate) + "\"/>")
                }

                // 마감일 수정하기
                if (result.closingDate === undefined) {
                    $('.taskDetail-endDate-value').html("<input class=\"task-detail-addEndDate\" data-placeholder=\"마감일 선택\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\"/>")

                } else {
                    $('.taskDetail-endDate-value').html("<input class=\"task-detail-addEndDate\" data-placeholder=\"" + formatDate(result.closingDate) + "\"\n" +
                        "                                                       required\n" +
                        "                                                       aria-required=\"true\" type=\"date\"\n" +
                        "                                                       style=\"border: 0 solid black\" value=\"" + formatDate(result.closingDate) + "\"/>")
                }

                //날짜 최소값 설정하기
                $('.task-detail-addStartDate').attr('min', min)
                if (result.startDate == null) {
                    $('.task-detail-addStartDate').attr('min', min)
                } else {
                    $('.task-detail-addStartDate').attr('min', formatDate(result.startDate))
                }

                $('.task-detail-addStartDate').change(function () {
                    $('.task-detail-addEndDate').attr('min', $(this).val())
                })


                //진척도 변경
                $('.task-progress-input').html("<input id=\"task-detail-rangeInput\" class=\"task-detail-rangeInput\" max=\"100\" min=\"0\" step=\"10\" type=\"range\" value=\"" + result.progress + "\" style=\"background: linear-gradient(to right, #FFE283 0%, #FFE283 " + result.progress + "%, #ececec " + result.progress + "%, #ececec 100%)!important\"/>" +
                    "                                            <span class=\"progress-txt task-detail-progress\">" + result.progress + "%</span>\n")

                document.querySelector('#task-detail-rangeInput').addEventListener('input', function (event) {
                    let gradient_value = 100 / event.target.attributes.max.value;

                    event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
                    $('.task-detail-progress').text(event.target.value + '%')
                });

            }
        })

    })


// 업무 상세 보기 우선순위 추가 부분
    $('.addPriority-task-detail').click(function () {
        let updateBtn = $('.updateBtn-task-priority')
        updateBtn.prev().remove()
        let priority_ul = $('#task-detail-priority_ul')
        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                let btnTag = $(this).html()


                updateBtn.prev().replaceWith(btnTag);


                $('.addPriority-task-detail').css('display', 'none')
                $('.prioritySpan-task-detail').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else {
            priority_ul.css('display', 'none')

        }

    })

    taskPageDeleteTask()
    taskFileSelection()
}

function date_Format(date) {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const d = new Date(date);
    let format_date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const time = new Date(date).toTimeString().split(' ')[0];

    return format_date + ' ' + time;
}

function dateWeek(date) {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const d = new Date(date);
    const localDate = new Date(d.getTime() + TIME_ZONE);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[localDate.getDay()];

    return formattedDate + ' (' + dayOfWeek + ')';
}


function taskDetail_priority(value) {
    let priority = $('.taskDetail-priority-value')
    priority.prevAll().remove();
    switch (value) {
        case '긴급' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="red"\n' +
                '                                                                     class="bi bi-exclamation-octagon-fill me-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>\n' +
                '                                                                </svg>')
            break;
        case '높음' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="orange"\n' +
                '                                                                     class="bi bi-arrow-up me-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path fill-rule="evenodd"\n' +
                '                                                                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>\n' +
                '                                                                </svg>');
            break
        case '보통' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="green"\n' +
                '                                                                     class="bi bi-dash me-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>\n' +
                '                                                                </svg>');
            break;
        case '낮음' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="dark-violet"\n' +
                '                                                                     class="bi bi-arrow-down me-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path fill-rule="evenodd"\n' +
                '                                                                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>\n' +
                '                                                                </svg>');
            break;
        case '없음' :
            priority.before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                '                                                                     fill="gray"\n' +
                '                                                                     class="bi bi-x-lg me-2" viewBox="0 0 16 16">\n' +
                '                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n' +
                '                                                                </svg>');
            break;

    }
}

function showTaskDetail(result) {
    $('.taskDetail-comment-taskId').val(result.taskId)
    //제목 설정
    $('.post-title-h4').text(result.taskTitle)
    //작성자 이름
    $('.authorName').text(result.name)
    //작성자 profile
    document.getElementById('task-profile').style.backgroundImage = "url('" + result.profilePhoto + "')";

    let crtDate = date_Format(result.crtDate)

    //작성일
    $('.postDate').text(crtDate)
    //업무번호
    $('.task-number em').text(result.taskId)
    // 상태
    let btn = document.querySelectorAll(".task-process-btn");
    btn.forEach(function (btn, i) {
        if (btn.innerText === result.process) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active")
        }
    });

    //우선순위
    if (result.priority == null) {
        $('.priority-layer-task').css('display', 'none')
        $('.prioritySpan-task-detail').css('display', 'none')
        $('.addPriority-task-detail').css('display', 'block')

    } else {
        taskDetail_priority(result.priority)
        $('.prioritySpan-task-detail').css('display', 'block')
        $('.priority-layer-task').css('display', 'flex')
        $('.taskDetail-priority-value').text(result.priority)
        $('.addPriority-task-detail').css('display', 'none')
    }

    //진척도
    if (result.progress === 0) {
        $('.progress-layer-task').css('display', 'none')
    } else {
        $('.progress-layer-task').css('display', 'flex')
    }
    // 진척도 값 설정 & 배경 색상 변경
    $('.taskOffcanvas-progress-bar').css('width', result.progress)
    $('.taskOffcanvas-progress-percent').text(result.progress + '%')

    //시작일, 마감일 설정
    if (result.startDate == null && result.startDate === undefined) {
        $('.startDate-layer-task').css('display', 'none')
    } else {
        $('.startDate-layer-task').css('display', 'flex')
        $('.taskDetail-startDate-value').text(dateWeek(result.startDate) + '부터')
        $('.task-detail-addStartDate').css('display', 'none')
    }

    if (result.closingDate == null) {
        $('.endDate-layer-task').css('display', 'none')
    } else {
        $('.endDate-layer-task').css('display', 'flex')
        $('.taskDetail-endDate-value').text(dateWeek(result.closingDate) + '까지')
        $('.task-detail-addEndDate').css('display', 'none')
    }

    //내용
    $('.task-taskContent').text(result.taskContent)
    //댓글
    let formData = {
        taskId: result.taskId,
        projectId: result.projectId,
    }

    $.ajax({
        url: '/tComment/showAll',
        type: 'get',
        data: formData,
        success: (comment) => {

            if (comment.length === 0) {
                $('.comment-header').css('display', 'none')
            } else {

                for (let i = 0; i < comment.length; i++) {
                    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

                    const date = new Date(comment[i].crtDate);
                    let entryDate = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);

                    if (comment.length < 3) {
                        $('.comment-header').css('display', 'none')

                    } else {
                        $('.comment-header').css('display', 'block')
                        $('.task-comment-count').text("(" + (comment.length - 2) + ")")
                    }


                    if (i < 2) {
                        $('#commentGroup-task-detail').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                            "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + comment[i].profilePhoto + ");\"></span>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"comment-container on\">\n" +
                            "                                    <div class=\"comment-user-area\">\n" +
                            "                                        <div class=\"comment-user\">\n" +
                            "                                           <input type=\"hidden\" class=\"comment-writer-task-detail\" value=\"" + comment[i].authorUserId + "\"/>\n" +
                            "                                            <span class=\"user-name\">" + comment[i].name + "</span>\n" +
                            "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"comment-writer-menu\">\n" +
                            "                                            <button type=\"button\" class=\"modify-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"modifyTComment(this)\">\n" +
                            "                                                수정</button>\n" +
                            "                                            <button type=\"button\" class=\"delete-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"deleteTComment(" + comment[i].tCommentId + ")\">\n" +
                            "                                                삭제</button>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"comment-content\">\n" +
                            "                                        <div class=\"comment-text-area\">\n" +
                            "                                            <div class=\"js-remark-text comment-text\">" + comment[i].tComment + "</div>\n" +
                            "                                        </div>\n" +
                            "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                            "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                            "                                    </div>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"edit-tComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                            "                                    <form  action=\"/tComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                            "                                        <input type=\"hidden\" name=\"tCommentId\" class=\"tCommentId-comment\" value=\"" + comment[i].tCommentId + "\"/>\n" +
                            "                                        <input type=\"text\" class=\"commentInput\" value=\"" + comment[i].tComment + "\" name=\"tComment\" style=\"width: 100%\"/>\n" +
                            "                                    </form>\n" +
                            "                                </div></li>")

                    } else {
                        $('#commentGroup-task-detail').append("<li class='comment-li hidden-comment'><div class=\"comment-thumbnail\">\n" +
                            "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + comment[i].profilePhoto + ");\"></span>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"comment-container on\">\n" +
                            "                                    <div class=\"comment-user-area\">\n" +
                            "                                        <div class=\"comment-user\">\n" +
                            "                                           <input type=\"hidden\" class=\"comment-writer-task-detail\" value=\"" + comment[i].authorUserId + "\"/>\n" +
                            "                                            <span class=\"user-name\">" + comment[i].name + "</span>\n" +
                            "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"comment-writer-menu\">\n" +
                            "                                            <button type=\"button\" class=\"modify-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"modifyTComment(this)\">\n" +
                            "                                                수정</button>\n" +
                            "                                            <button type=\"button\" class=\"delete-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"deleteTComment(" + comment[i].tCommentId + ")\">\n" +
                            "                                                삭제</button>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"comment-content\">\n" +
                            "                                        <div class=\"comment-text-area\">\n" +
                            "                                            <div class=\"js-remark-text comment-text\">" + comment[i].tComment + "</div>\n" +
                            "                                        </div>\n" +
                            "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                            "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                            "                                    </div>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"edit-tComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                            "                                    <form  action=\"/tComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                            "                                        <input type=\"hidden\" name=\"tCommentId\" class=\"tCommentId-comment\" value=\"" + comment[i].tCommentId + "\"/>\n" +
                            "                                        <input type=\"text\" class=\"commentInput\" value=\"" + comment[i].tComment + "\" name=\"tComment\" style=\"width: 100%\"/>\n" +
                            "                                    </form>\n" +
                            "                                </div></li>")
                    }

                }

            }
            $('.comment-writer-task-detail').each(function () {
                let commentUserId = $(this).val();
                let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                if (commentUserId === $('.taskDetail-comment-logIn').val()) {
                    commentWriterMenu.show();
                } else {
                    commentWriterMenu.hide();
                }
            });
        }
    })
    TaskPageImg(result.taskId, result.projectId)

}

function findCurrentBtn() {
    let btn = document.querySelectorAll(".taskProcessBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    return currentBtn;
}

function addTaskTab() {
    let formData = new FormData();

    formData.append('taskTitle', $('#taskTitle-addTaskPage').val());
    formData.append('taskContent',$('.write-taskAdd-content').val());
    formData.append('projectId', Number($('.projectIdInput').val()));
    formData.append('process', findCurrentBtn());
    formData.append('startDate', $('.task-addStartDate').val() ? to_date2($('.task-addStartDate').val()) : new Date(0));
    formData.append('closingDate', $('.task-addEndDate').val() ? to_date2($('.task-addEndDate').val()) : new Date(0));
    formData.append('progress', Number($('.task-rangeInput').val()));
    formData.append('priority', $('.prioritySpan-add-taskPage .priorityText').text());

    let files = document.querySelector('#task-file').files;

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    $.ajax({
        url: '/task/taskPageWrite',
        data: formData,
        type: 'post',
        processData: false,
        contentType: false,
        success: ((message) => {
            if (message === "success"){
                location.reload()
            } else {
                Swal.fire({
                    "icon" : "warning",
                    "title" : "업무 제목을 입력하세요"
                })
            }
        })
    })
}

function taskPageDeleteTask() {
    $('.delete-task-detail').click(function () {
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
                let taskId = $(this).parents('.postHeader').parent().find('.task-detail-taskId em').text()

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

function searchTaskEnter(projectId) {
    if (event.keyCode === 13) {
        const keyword = document.getElementById('searchTask').value;

        if (keyword !== "") {
            const formData = {
                "keyword": keyword,
                "projectId": projectId
            }

            $.ajax({
                type: 'GET',
                url: "/task/search",
                data: formData,
                success: (result) => {
                    if (result.length >= 1) {
                        $('#taskTable').load(window.location.href + ' #taskTable', function () {
                            btnColor()
                            $('.taskTableTbody tr').each(function () {
                                for (let i = 0; i < result.length; i++) {
                                    if (parseInt($(this).find('#taskId').text()) === result[i].taskId) {

                                        let newTr = $(this).context.outerHTML
                                        $('.searchTbody').append(newTr)
                                        $('.taskTableTbody').css('display', 'none')

                                    }

                                }
                            })
                            all()
                            startDateValue()
                            endDateValue()
                        })

                    } else {
                        Swal.fire({
                            title: "검색 결과가 없습니다.",
                            icon: "question"
                        });
                    }
                }
            })
        } else {
            const searchDiv = document.getElementById("searchResult");
            searchDiv.style.display = "none";
            Swal.fire({
                title: "검색어를 입력해 주세요",
                icon: "warning"
            });
        }

    }
}

function to_date2(date_str) {
    let yyyyMMdd = String(date_str);
    let sYear = yyyyMMdd.substring(0, 4);
    let sMonth = yyyyMMdd.substring(5, 7);
    let sDate = yyyyMMdd.substring(8, 10);

    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

function taskDetailUpdate() {
    let taskId = Number($('.task-detail-taskId em').text())
    let taskTitle = $('.task-detail-taskTitle-input').val()
    let taskContent = $('.task-detail-content').val()
    let startDate = to_date2($('.task-detail-addStartDate').val())
    let closingDate = to_date2($('.task-detail-addEndDate').val())
    let process
    let btn = document.querySelectorAll(".task-process-btn");
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            process = btn.textContent;
        }
    });
    let priority = $('.prioritySpan-task-detail').find('.priorityText').first().text()
    let progress = $('#task-detail-rangeInput').val()

    let formData = new FormData();
    formData.append('taskId', taskId);
    formData.append('taskTitle', taskTitle);
    formData.append('taskContent',taskContent);
    formData.append('process', process);
    formData.append('startDate', $('.task-detail-addStartDate').val() ? startDate : new Date(0));
    formData.append('closingDate',  $('.task-detail-addEndDate').val() ? closingDate : new Date(0));
    formData.append('progress', progress);
    formData.append('priority', priority);

    let files = document.querySelector('#update-taskDetail-file').files;

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    $.ajax({
        url: '/task/updateTask',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: (result) => {
            $('#taskTable').load(window.location.href + ' #taskTable', function () {
                btnColor()
                table_priority()
                all()
                startDateValue()
                endDateValue()
            })
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
            $('.task-file-post-area').css('display', 'none')
            $('.img-container-taskPage').html("")
            $('.file-container-taskPage').html("")
            showTaskDetail(result)
            $('.task-detail-footer').css('display', 'none')
        }
    })

}

function TaskPageImg(taskId, projectId) {
    if (taskId !== undefined && projectId !== undefined) {
        let formData = {
            taskId: taskId
        }

        $.ajax({
            url: '/task/getImg',
            data: formData,
            type: "get",
            success: (response) => {
                const previewsContainer = $('.img-container-taskPage');
                let count = 1;
                for (let i = 0; i < response.length; i++) {
                    const fileExtension = response[i].fileExtension.toLowerCase();

                    // 이미지 확장자인 경우에만 미리보기 추가
                    if (fileExtension === '.jfif' || fileExtension === '.jpg' || fileExtension === '.jpeg' || fileExtension === '.png' || fileExtension === '.gif') {

                        const preview = document.createElement('img');
                        preview.classList.add('image-post-box');
                        preview.style.width = '150px'
                        preview.style.height = '150px'
                        preview.style.borderRadius = '10%'
                        preview.style.marginRight = '10px'
                        preview.addEventListener('click', function () {
                            downloadTaskImg(response[i].fileId);
                        });
                        preview.src = response[i].fileRealPath + response[i].uniqueName + response[i].fileExtension;


                        previewsContainer.append(preview);
                    } else {

                        $('.task-file-post-area').css('display', 'block')
                        const fPreviewsContainer = $('.file-container-taskPage');
                        const filePreview = document.createElement('div');
                        filePreview.classList.add('file-preview');
                        filePreview.textContent = count + '. ' + response[i].uniqueName + response[i].fileExtension;
                        filePreview.addEventListener('click', function () {
                            downloadTaskImg(response[i].fileId);
                        });

                        fPreviewsContainer.append(filePreview);
                        count++;
                    }


                }
            }

        })
    }
}

function taskDetailFileSelection() {
    const fileDOM = document.querySelector('#update-taskDetail-file');
    let previewsContainer = document.querySelector('.img-container-taskPage');

    fileDOM.addEventListener('change', () => {
        const files = fileDOM.files;
        tDetailHandleImageFiles(files, previewsContainer, fileDOM);
    });
}

function taskFileSelection() {
    const fileDOM = document.querySelector('#task-file');
    let previewsContainer = document.querySelector('.taskPage-previews');

    fileDOM.addEventListener('change', () => {
        const files = fileDOM.files;
        tHandleImageFiles(files, previewsContainer, fileDOM);
    });
}

function tDetailHandleImageFiles(files, previewsContainer, fileDOM) {
    const imageFiles = [];
    const otherFiles = [];

    Array.from(files).forEach(file => {
        if (isImageFile(file)) {
            imageFiles.push(file);
        } else {
            otherFiles.push(file);
        }
    });

    if (imageFiles.length > 0) {
        TaskPagePreviewImg(imageFiles, previewsContainer, fileDOM);
    }

    previewsContainer.innerHTML = '';
    previewsContainer = document.querySelector('.file-container-taskPage');

    TaskFile(otherFiles, previewsContainer, fileDOM);


}

function tHandleImageFiles(files, previewsContainer, fileDOM) {
    const imageFiles = [];
    const otherFiles = [];

    Array.from(files).forEach(file => {
        if (isImageFile(file)) {
            imageFiles.push(file);
        } else {
            otherFiles.push(file);
        }
    });

    if (imageFiles.length > 0) {
        TaskPagePreviewImg(imageFiles, previewsContainer, fileDOM);
    }

    previewsContainer.innerHTML = '';
    previewsContainer = document.querySelector('.file-taskPage-previews');

    TaskFile(otherFiles, previewsContainer, fileDOM);


}

function TaskPagePreviewImg(files, previewsContainer, fileDOM) {
    const previews = [];

    // 이미지 미리보기를 담을 컨테이너 초기화
    previewsContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.onload = () => {
            const previewContainer = document.createElement('div');
            const previewImage = document.createElement('img');
            const overlayImage = document.createElement('img');
            overlayImage.classList.add('overlay-image');

            previewContainer.classList.add('image-kanban-box');

            previewContainer.classList.add('preview-container');
            previewContainer.style.position = 'relative';
            previewContainer.style.display = 'inline-block';

            previewImage.style.width = '100px';
            previewImage.style.height = '100px';
            previewImage.style.borderRadius = '10%';
            previewImage.style.marginRight = '10px';
            previewImage.src = reader.result;

            overlayImage.style.position = 'absolute';
            overlayImage.style.top = '0';
            overlayImage.style.left = '0';
            overlayImage.style.opacity = '0';
            overlayImage.style.transition = 'opacity 0.3s ease-in-out';
            overlayImage.style.width = '100px';
            overlayImage.style.height = '100px';
            overlayImage.src = '/img/pngwing.com.png';

            previewContainer.appendChild(previewImage);
            previewContainer.appendChild(overlayImage);
            previewsContainer.appendChild(previewContainer);

            previewContainer.addEventListener('mouseover', () => {
                overlayImage.style.opacity = '80%';
            });

            previewContainer.addEventListener('mouseleave', () => {
                overlayImage.style.opacity = '0';
            });

            previewContainer.addEventListener('click', () => {
                Swal.fire({
                    title: '해당 이미지를 삭제하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 클릭한 미리보기 요소의 인덱스 찾기
                        const index = previews.indexOf(previewContainer);
                        if (index !== -1) {
                            removePreview(previewContainer, index, files, previewsContainer, fileDOM);
                        }

                        Swal.fire({
                            title: '삭제완료!',
                            icon: 'success',
                        });
                    }
                });
            });

            previews.push(previewContainer); // 미리보기 요소를 배열에 추가
        };

        reader.readAsDataURL(file);
    }
}

function TaskFile(files, previewsContainer, fileDOM) {
    const previews = [];

    // 이미지 미리보기를 담을 컨테이너 초기화
    previewsContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.onload = () => {
            const fileContainer = document.createElement('div');
            fileContainer.classList.add('file-container');

            const fileInfo = document.createElement('div');
            fileInfo.classList.add('file-info');

            const fileNameContainer = document.createElement('div');
            fileNameContainer.classList.add('file-name-container');

            const fileName = document.createElement('div');
            fileName.classList.add('preview-file-name');
            fileName.textContent = file.name;
            fileName.style.display = 'inline-block'

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`;
            removeButton.style.border = 'none';
            removeButton.style.backgroundColor = 'transparent';

            removeButton.addEventListener('click', () => {
                Swal.fire({
                    title: '해당 이미지를 삭제하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const previewContainer = removeButton.closest('.file-container');
                        const index = Array.from(previewsContainer.children).indexOf(previewContainer);
                        const files = Array.from(previewsContainer.children).map((container) => container.file);

                        const dataTransfer = new DataTransfer();
                        for (let j = 0; j < fileDOM.files.length; j++) {
                            const inputFile = fileDOM.files[j];
                            if (inputFile.name !== file.name) {
                                dataTransfer.items.add(inputFile);
                            }
                        }
                        fileDOM.files = dataTransfer.files;

                        removePreview(previewContainer, index, files, previewsContainer, fileDOM);
                    }
                    Swal.fire({
                        title: '삭제완료!',
                        icon: 'success',
                    });
                });
            });

            fileNameContainer.appendChild(fileName);
            fileNameContainer.appendChild(removeButton);

            fileInfo.appendChild(fileNameContainer);

            fileContainer.appendChild(fileInfo);
            previewsContainer.appendChild(fileContainer);

            previews.push(fileContainer); // 미리보기 요소를 배열에 추가
        };

        reader.readAsDataURL(file);
    }
}


