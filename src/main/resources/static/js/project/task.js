$(document).ready(function () {
    btnColor()
    table_priority()
    startDateValue()
    endDateValue()

    $('.titleTd').click(function(event) {
        // Check if the click happened within the input field or its sibling elements
        if ($(event.target).is('.taskTitle')) {
            return; // If clicked on the input field or its sibling elements, do nothing
        }
        $('.modal-footer').hide(); // modal-footer 숨기기
        $('.task-setUp').hide()
        $('.updateBtn-task-priority').remove()
        $('.comment-more-button').parent().css('display', 'block')
        $('#commentGroup-task-detail').empty()
        $('#task-update-priority').remove()
        $('#offcanvasScrolling').offcanvas('show');

    });


})

$(document).on('click', function (e) {
    let target = $(e.target);

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

function startDateValue(){
    // 현재 날짜 가져오기
    let currentDate = new Date().toISOString().split('T')[0];
    $('.startDate').each(function (){
        let startDate = $(this).find('#startDate')
        // 현재 날짜보다 이전인 경우 플레이스홀더로 설정
        if (startDate.val() < currentDate) {
            startDate.attr('data-placeholder', startDate.val());
        }
    })

}

function endDateValue(){
    // 현재 날짜 가져오기
    let currentDate = new Date().toISOString().split('T')[0];
    $('.endDate').each(function (){
        let endDate = $(this).find('#endDate')
        // 현재 날짜보다 이전인 경우 플레이스홀더로 설정
        if (endDate.val() < currentDate) {
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
                    '                                                                     class="bi bi-exclamation-octagon-fill mr-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>\n' +
                    '                                                                </svg>')
                break;
            case '높음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="orange"\n' +
                    '                                                                     class="bi bi-arrow-up mr-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path fill-rule="evenodd"\n' +
                    '                                                                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>\n' +
                    '                                                                </svg>');
                break
            case '보통' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="green"\n' +
                    '                                                                     class="bi bi-dash mr-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>\n' +
                    '                                                                </svg>');
                break;
            case '낮음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="dark-violet"\n' +
                    '                                                                     class="bi bi-arrow-down mr-2" viewBox="0 0 16 16">\n' +
                    '                                                                    <path fill-rule="evenodd"\n' +
                    '                                                                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>\n' +
                    '                                                                </svg>');
                break;
            case '없음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"\n' +
                    '                                                                     fill="gray"\n' +
                    '                                                                     class="bi bi-x-lg mr-2" viewBox="0 0 16 16">\n' +
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

    // document.querySelector('.rangeInput').addEventListener('input', function (event) {
    //     let gradient_value = 100 / event.target.attributes.max.value;
    //     console.log(event.target.value)
    //     event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
    // });

 //업무 작성하기 부분 설정

    //시작일
    $('.task-addStartDate').attr('min', new Date().toISOString().split("T")[0])
    $('.task-addEndDate').attr('min', new Date().toISOString().split("T")[0])

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
        console.log('click')
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

                let min = new Date().toISOString().split("T")[0]

                // 업무 제목 수정하기
                $('.task-detail-taskTitle').html("<input class='task-detail-taskTitle-input' type='text' value='" + result.taskTitle + "'/>")

                // 업무 내용 수정하기
                $('.post-taskContent-detail').html("<div class=\"writeContentDiv\">\n" +
                    "                        <label>\n" +
                    "                            <textarea class=\"task-detail-content\">" + result.taskContent + "</textarea>\n" +
                    "                        </label>\n" +
                    "                    </div>")

                // 상태 수정하기
                $('.process-layer-task').find('.task-detail-processBtn').css('pointer-events','auto')
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

                $('#task-update-priority').find('.priorityBtn').click(function (){
                    let btnTag = $(this).html()
                    console.log(btnTag)
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
                    console.log(event.target.value)
                    event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
                    $('.task-detail-progress').text(event.target.value+'%')
                });

            }
        })

    })
}

function dateFormat(date) {
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

    console.log(formattedDate);

    return formattedDate + ' (' + dayOfWeek + ')';
}


function taskDetail_priority(value) {
    let priority = $('.taskDetail-priority-value')
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

    let crtDate = dateFormat(result.crtDate)

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

    console.log(result.startDate)
    console.log(result.closingDate)
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
    $('.post-taskContent-detail').text(result.taskContent)



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
            for (let i = 0; i < comment.length; i++) {
                const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

                const date = new Date(comment[i].crtDate);
                let entryDate = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
                if (comment.length<3){
                    $('.comment-header').css('display', 'none')
                }
                $('.task-comment-count').text("("+ (comment.length - 2) + ")")


                if (i < 2) {
                    $('#commentGroup-task-detail').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                        "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + comment[i].profilePhoto + ");\"></span>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"comment-container on\">\n" +
                        "                                    <div class=\"comment-user-area\">\n" +
                        "                                        <div class=\"comment-user\">\n" +
                        "                                           <input type=\"hidden\" class=\"comment-writer-task-detail\" value=\""+comment[i].authorUserId+"\"/>\n" +
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
                        "                                           <input type=\"hidden\" class=\"comment-writer-task-detail\" value=\""+comment[i].authorUserId+"\"/>\n" +
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
            $('.comment-writer-task-detail').each(function() {
                let commentUserId = $(this).val();
                let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                console.log(commentUserId)
                if (commentUserId === $('.taskDetail-comment-logIn').val()) {
                    commentWriterMenu.show();
                } else {
                    commentWriterMenu.hide();
                }
            });
        }
    })


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

    let currentBtn = findCurrentBtn()
    let formData = {
        projectId: Number($('.projectIdInput').val()),
        taskTitle: $('#taskAddTitle').val(),
        taskContent: $('.writeTaskContent').val(),
        process: currentBtn,
        //managerId: $('#managerId').val(),
        startDate: $('.task-addStartDate').val() ? to_date2($('.task-addStartDate').val()) : new Date(0),
        closingDate: $('.task-addEndDate').val() ? to_date2($('.task-addEndDate').val()) : new Date(0),
        progress: Number($('.task-rangeInput').val()),
        priority: $('.prioritySpan .priorityText').text()


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

function taskDetailUpdate() {
    let taskId = $('.task-detail-taskId em').text()
    let taskTitle = $('.task-detail-taskTitle-input').val()
    let taskContent = $('.post-taskContent-detail').val()
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

    let formData = {
        taskId: taskId,
        taskTitle: taskTitle,
        taskContent: taskContent,
        startDate: startDate,
        closingDate: closingDate,
        progress: progress,
        process : process,
        priority : priority
    }

    console.log(formData)

    $.ajax({
        url: '/task/updateTask',
        type: 'post',
        data: formData,
        success: (result) => {
            $('#taskTable').load(window.location.href + ' #taskTable', function () {
                btnColor()
                table_priority()
                all()
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
            showTaskDetail(result)
            $('.task-detail-footer').css('display', 'none')
        }
    })

}
