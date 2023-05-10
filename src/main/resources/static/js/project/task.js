$(document).ready(function () {
    btnColor()
})

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
    let managerTd = tasktr.find('.managerTd')

    titleTd.mouseover(function () {
        $(this).find('.inputTaskTitle').show()
        $(this).find('span').hide()
    })

    titleTd.mouseout(function () {
        $(this).find('.inputTaskTitle').hide()
        $(this).find('span').show()
    })

    titleTd.click(function (e){
        if (!$(e.target).hasClass('taskTitle')){
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

    processTd.click(function () {
        let btnUl = $(this).find('.btn_ul')
        let taskId = $(this).closest('tr').find('#taskId').text();

        if (btnUl.css('display') === 'block') {
            btnUl.css('display', 'none')
        } else {
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

    priorityTd.click(function () {
        let priority_ul = $(this).find('.priority_ul');
        let taskId = $(this).closest('tr').find('#taskId').text();

        if (priority_ul.css('display') === 'block') {
            priority_ul.css('display', 'none')
        } else {
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
    managerTd.click(function () {
        let managerDiv = $(this).find('.managerDiv')
        if (managerDiv.css('display') === 'block') {
            //managerDiv.css('display', 'none')
        } else {
            managerDiv.css('display', 'block')

            let memberSpan = $(this).find('.memberSpan')

            // 멤버 검색하기
            $(this).find('.managerSearch').click(function () {
                alert('검색창 클릭')
            })

            // 멤버 선택항목 전체 삭제
            $(this).find('.deleteAllBtn').click(function () {
                $('.memberSpan *').remove()
                $('input[name=memberCheckBox]:checkbox').prop('checked', false)
                $('.memberLi').css('background-Color', 'white').css('color', 'black')

            })

            // 멤버 선택하기
            $(this).find('.memberUl li').click(function () {
                if (!$(this).find('input').prop('checked')) {
                    memberSpan.addClass('active')
                    $(this).find('input').prop('checked', true)
                    console.log($(this).find('input').prop('checked'))
                    if ($(this).find('input').prop('checked') === true) {
                        $(this).css('background-Color', 'rgba(48, 100, 179, 0.51)').css('color', 'white')
                    }

                    memberSpan.append("<span class=\"memberItem\">\n" +
                        "                                <span class=\"memberIcon\">\n" +
                        "                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"\n" +
                        "                                         fill=\"currentColor\" class=\"bi bi-person-circle\" viewBox=\"0 0 16 16\">\n" +
                        "                                                <path d=\"M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z\"/>\n" +
                        "                                                <path fill-rule=\"evenodd\"\n" +
                        "                                                      d=\"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z\"/>\n" +
                        "                                    </svg>\n" +
                        "                                </span>\n" +
                        "                                <span class=\"memberNameSpan\" th:text='${member.name}'>" +
                        $(this).find('.memberName').text() +
                        "</span>\n" +
                        "                                <button class=\"memberCloseBtn\">\n" +
                        "                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\n" +
                        "                                         class=\"bi bi-x\" viewBox=\"0 0 16 16\">\n" +
                        "                                    <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\n" +
                        "                                    </svg>\n" +
                        "                                </button>\n" +
                        "                            </span>")
                } else {
                    $(this).find('input').prop('checked', false)

                    if ($(this).find('input').prop('checked') === false) {
                        $(this).css('background-Color', 'white').css('color', 'black')

                    }

                }

            })
        }

        // 멤버 선택항목 개별 삭제
        $('.memberCloseBtn').click(function () {
            let name = $(this).parent().find('.memberNameSpan').text()
            // memberName.each(()=>{
            //    console.log($(this))
            //     // if ($(this).innerText.className === name) {
            //     //     $(this).parent().parent().find('.memberLi').css('background-Color', 'white').css('color', 'black')
            //     // }
            // })
            $(this).parent().remove()
        })

        // 담당자 등록하기
        $(this).find('.selectMemberBtn').click(function () {
            $.ajax({})
        })

    })

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

    $('.addButton').click(function () {
        $('.requestBtn').trigger("click").addClass('active')
    })

    document.querySelector('.rangeInput').addEventListener('input',function(event){
        let gradient_value = 100 / event.target.attributes.max.value;
        console.log(event.target.value)
        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 '+gradient_value * event.target.value +'%, rgb(236, 236, 236) ' +gradient_value *  event.target.value + '%, rgb(236, 236, 236) 100%)';
    });

// td 공통 부분

    // document.addEventListener('click', function (e) {
    //     let container = document.getElementById('btn_ul');
    //     let process_td = document.getElementById('processTd');
    //     if (!container.contains(e.target) && !process_td.contains(e.target)) {
    //         container.style.display = 'none';
    //     }
    // });
}

function dateFormat(date){
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const d = new Date(date);
    let format_date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const time = new Date(date).toTimeString().split(' ')[0];

    return format_date + ' ' + time;
}

function dateWeek(date){
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const d = new Date(date);
    let format_date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];
    console.log(format_date)

    return format_date + ' (' + dayOfWeek+')';
}

function showTaskDetail(result){
//제목 설정
    $('.post-title-h4').text(result.taskTitle)
    //작성자 이름
    $('.authorName').text(result.authorUserId)

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
    $('.progress-txt').text(result.progress +'%')

    console.log(result.startDate)
    console.log(result.closingDate)
    //시작일, 마감일 설정
    $('.startDate-value').text(dateWeek(result.startDate) +'부터')
    $('.endDate-value').text(dateWeek(result.closingDate)+ '까지')

    //내용
    $('.post-taskContent').text(result.taskContent)
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

function addTaskTab() {
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