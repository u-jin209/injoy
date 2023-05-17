$(document).ready(function () {
    btnColor()
    table_priority()
    startDateValue()
    endDateValue()
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
    let format_date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];
    console.log(format_date)

    return format_date + ' (' + dayOfWeek + ')';
}

function showTaskDetail(result) {
    console.log(result)
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

    //진척도
    $('.rangeInput').val(result.progress)
    $('.progress-txt').text(result.progress + '%')

    console.log(result.startDate)
    console.log(result.closingDate)
    //시작일, 마감일 설정
    if (result.startDate == null) {
        $('.startDate-layer-task').css('display', 'none')
    } else {
        $('.startDate-layer-task').css('display', 'flex')
    }

    if (result.closingDate == null) {
        $('.endDate-layer-task').css('display', 'none')
    } else {
        $('.endDate-layer-task').css('display', 'flex')
    }
    $('.startDate-value').text(dateWeek(result.startDate) + '부터')
    $('.endDate-value').text(dateWeek(result.closingDate) + '까지')


    //내용
    $('.post-taskContent-detail').text(result.taskContent)
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
