$(document).ready(function () {
    set_priority()

    //항목 추가입력 버튼
    $('.home-content-group').each(function () {

        let count = 0
        $(this).find('li').each(function () {
            if ($(this).css('display') === 'none') {
                count++;
            }
        })
        if (count === 0) {
            $(this).parent().parent().find('.home-optionAddBtn').css('display', 'none')
        } else {
            $(this).parent().parent().find('.home-optionAddBtn').css('display', 'block')
        }
    })

    $('.rangeInput-home').each(function () {
        let value = $(this).val()
        let gradient_value = 100 / $(this).attr('max');
        $(this).css('background', 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * value + '%, rgb(236, 236, 236) ' + gradient_value * value + '%, rgb(236, 236, 236) 100%)')
    })

    limitTComment()
    limitBComment()

})

function set_priority() {
    $('.priority-value').each(function () {
        switch ($(this).text()) {
            case '긴급' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"\n' +
                    '                                                                     fill="red"\n' +
                    '                                                                     class="bi bi-exclamation-octagon-fill mr-1" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>\n' +
                    '                                                                </svg>')
                break;
            case '높음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"\n' +
                    '                                                                     fill="orange"\n' +
                    '                                                                     class="bi bi-arrow-up mr-1" viewBox="0 0 16 16">\n' +
                    '                                                                    <path fill-rule="evenodd"\n' +
                    '                                                                          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>\n' +
                    '                                                                </svg>');
                break
            case '보통' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"\n' +
                    '                                                                     fill="green"\n' +
                    '                                                                     class="bi bi-dash mr-1" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>\n' +
                    '                                                                </svg>');
                break;
            case '낮음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"\n' +
                    '                                                                     fill="dark-violet"\n' +
                    '                                                                     class="bi bi-arrow-down mr-1" viewBox="0 0 16 16">\n' +
                    '                                                                    <path fill-rule="evenodd"\n' +
                    '                                                                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>\n' +
                    '                                                                </svg>');
                break;
            case '없음' :
                $(this).before('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"\n' +
                    '                                                                     fill="gray"\n' +
                    '                                                                     class="bi bi-x-lg mr-1" viewBox="0 0 16 16">\n' +
                    '                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n' +
                    '                                                                </svg>');
                break;

        }
    })
}

//업무리포트 토글부분
function toggleCollapse() {

    let taskReportLayer = document.querySelector('.task-report-layer');
    if (taskReportLayer.style.display === 'none') {
        $('.bi-chevron-down').css('display', 'none')
        $('.bi-chevron-up').css('display', 'block')
        $('.task-report-layer').slideToggle('slow');
        taskReportLayer.style.display = 'block';
    } else {
        $('.bi-chevron-up').css('display', 'none')
        $('.bi-chevron-down').css('display', 'block')
        $('.task-report-layer').slideUp('slow', function () {
            taskReportLayer.style.display = 'none';
        });
    }
}

$(function () {

    $('.comment-more-button').click(function (e) {
        let commentList = $(this).parent().parent().find('.post-comment-group li')

        for (let i = 2; i < commentList.length; i++) {
            commentList[i].classList.remove("hidden-comment");
        }
        $(this).parent().css('display', 'none')
    })

    $('.toolBtn').click(function () {
        let nowSetUp = $(this).parent().find('.setUp-group')
        if (nowSetUp.css('display') === 'block') {
            nowSetUp.css('display', 'none')
        } else {
            nowSetUp.css('display', 'block')
        }
    })

    $('.home-optionAddBtn').click(function () {
        let ulTag = $(this).parent().find('.home-content-group')

        ulTag.find('li').each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css('display', 'flex')
                $(this).parent().parent().find('.home-optionAddBtn').css('display', 'none')
            }

        })
    })

    //프로세스 변경하기
    $('.home-process-btn').click(function () {
        Swal.fire({
            text: '상태를 변경하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId,
                    process: $(this).text()
                }
                $.ajax({
                    url: '/task/updateProcess',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })

    $('.addStartDate').attr('min', new Date().toISOString().split("T")[0])

    //시작일 추가하기
    $('.addStartDate').change(function () {
        Swal.fire({
            text: '시작일을 추가하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId,
                    startDate: $(this).val()
                }
                $.ajax({
                    url: '/task/updateStartDate',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })


    // 시작일 삭제하기
    $('.removeBtn-startDate').click(function () {
        $('.start-date-exist').css('display', 'block')
        Swal.fire({
            text: '시작일을 삭제하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId
                }
                $.ajax({
                    url: '/task/deleteStartDate',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })

    // 시작일 유무에 따른 마감일 min 값 설정하기
    $('.addEndDate').each(function () {
        let minDate = $(this).attr('min')

        if (minDate === undefined || minDate === '') {
            let currentDate = new Date().toISOString().split("T")[0];
            $(this).attr('min', currentDate);
        } else if (minDate !== undefined || minDate !== '') {
            $(this).attr('min', minDate);
        }

    });

    //마감일 추가하기
    $('.addEndDate').change(function () {
        Swal.fire({
            text: '마감일을 추가하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId,
                    endDate: $(this).val()
                }
                $.ajax({
                    url: '/task/updateEndDate',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })

    //마감일 삭제하기
    $('.removeBtn-endDate').click(function () {
        Swal.fire({
            text: '마감일을 삭제하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId
                }
                $.ajax({
                    url: '/task/deleteEndDate',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })

    //우선순위 삭제하기
    $('.removeBtn-priority').click(function () {
        Swal.fire({
            text: '우선순위 삭제하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId
                }
                $.ajax({
                    url: '/task/deletePriority',
                    type: 'post',
                    data: formData,
                    success: () => {
                        location.reload()
                    }
                })
            }
        })
    })

    //우선순위 추가하기
    $('.addPriority-home').click(function () {
        let priority_ul = $(this).parent().find('.home-priority_ul')

        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                Swal.fire({
                    text: '우선순위를 추가하시겠습니까?',
                    width: '300px',
                    showCancelButton: true,
                    confirmButtonColor: '#3064B3',
                    cancelButtonColor: 'red',
                    confirmButtonText: '확인',
                    cancelButtonText: '취소'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                        let formData = {
                            taskId: taskId,
                            priority: $(this).find('.priorityText').text()
                        }

                        $.ajax({
                            url: '/task/updatePriority',
                            type: 'post',
                            data: formData,
                            success: () => {
                                location.reload()
                            }
                        })
                    }
                })

            })
        } else {
            priority_ul.css('display', 'none')

        }
    })

    document.querySelector('.rangeInput-home').addEventListener('input', function (event) {
        let gradient_value = 100 / event.target.attributes.max.value;

        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
    });

    //진행도 변경하기
    $('.rangeInput-home').change(function () {
        $(this).parent().find('.progress-txt').text($(this).val() + '%')
        let formData = {
            taskId: $(this).parents('.post-content').find('#taskId-post').val(),
            progress: $(this).val(),
        }

        $.ajax({
            url: '/task/updateProgress',
            data: formData,
            type: 'post',
            success: () => {
                location.reload()

            },
        })
    })

    modifyTask()
    modifyBoard()
    deleteTask()
    deleteBoard()


})

function modifyTask() {
    $('.modify-task').click(function () {
        Swal.fire({
            text: '업무를 수정하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId: taskId,
                    priority: $(this).find('.priorityText').text()
                }

                // $.ajax({
                //     url: '/task/update',
                //     type: 'post',
                //     data: formData,
                //     success: () => {
                //         location.reload()
                //     }
                // })
            }
        })

    })
}

function modifyBoard() {
    $('.modify-board').click(function () {
        Swal.fire({
            text: '업무를 수정하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.postHeader').parent().find('.home-title em').text()

                let formData = {
                    taskId: taskId,
                    priority: $(this).find('.priorityText').text()
                }

                // $.ajax({
                //     url: '/board/update',
                //     type: 'post',
                //     data: formData,
                //     success: () => {
                //         location.reload()
                //     }
                // })
            }
        })

    })
}

function deleteTask() {
    $('.delete-task').click(function () {
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
                let taskId = $(this).parents('.postHeader').parent().find('.home-title em').text()

                let formData = {
                    taskId: taskId,
                }

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

function deleteBoard() {
    $('.delete-board').click(function () {
        Swal.fire({
            text: '글를 삭제하시겠습니까?',
            width: '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let boardId = $(this).parents('.postHeader').parent().find('#boardId').val()

                let formData = {
                    boardId: boardId,
                }

                $.ajax({
                    url: '/board/deleteBoard',
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

function modifyTComment(e) {
    $(e).closest('.comment-container').css('display', 'none')
    $(e).parents('.comment-li').find('.edit-tComment-form').css('display', 'block')
}

function modifyBComment(e){
    $(e).closest('.comment-container').css('display', 'none')
    $(e).parents('.comment-li').find('.edit-bComment-form').css('display', 'block')
}

function limitBComment(){
    $('.boardBox').each(function () {
        let boardId = $(this).find('.boardId-comment').val()
        let projectId = $(this).find('.projectId-comment').val()
        if (boardId !== undefined && projectId !== undefined) {
            let formData = {
                boardId: boardId,
                projectId: projectId,
            }

            $.ajax({
                url: '/bComment/showAll',
                type: 'get',
                data: formData,
                success: (result) => {
                    if (result.length === 0) {
                        $(this).find('.comment-header').css('display', 'none')
                    } else {

                        for (let i = 0; i < result.length; i++) {
                            const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

                            const date = new Date(result[i].crtDate);
                            let entryDate = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
                            if (result.length < 3) {
                                $(this).find('.comment-header').css('display', 'none')

                            } else {
                                $(this).find('.comment-header').css('display', 'block')
                                $(this).find('.board-comment-count').text("(" + (result.length - 2) + ")")
                            }


                            if (i < 2) {
                                $(this).find('#commentGroup-board').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + result[i].profilePhoto + ");\"></span>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"comment-container on\">\n" +
                                    "                                    <div class=\"comment-user-area\">\n" +
                                    "                                        <div class=\"comment-user\">\n" +
                                    "                                           <input type=\"hidden\" class=\"comment-writer-home\" value=\"" + result[i].authorUserId + "\"/>\n" +
                                    "                                            <span class=\"user-name\">" + result[i].name + "</span>\n" +
                                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                                    "                                        </div>\n" +
                                    "                                        <div class=\"comment-writer-menu\">\n" +
                                    "                                            <button type=\"button\" class=\"modify-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"modifyBComment(this)\">\n" +
                                    "                                                수정</button>\n" +
                                    "                                            <button type=\"button\" class=\"delete-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"deleteBComment(" + result[i].bCommentId + ")\">\n" +
                                    "                                                삭제</button>\n" +
                                    "                                        </div>\n" +
                                    "                                    </div>\n" +
                                    "                                    <div class=\"comment-content\">\n" +
                                    "                                        <div class=\"comment-text-area\">\n" +
                                    "                                            <div class=\"js-remark-text comment-text\">" + result[i].bComment + "</div>\n" +
                                    "                                        </div>\n" +
                                    "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                                    "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                                    "                                    </div>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"edit-bComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                                    "                                    <form  action=\"/bComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                                    "                                        <input type=\"hidden\" name=\"bCommentId\" class=\"bCommentId-comment\" value=\"" + result[i].bCommentId + "\"/>\n" +
                                    "                                        <input type=\"text\" class=\"commentInput\" value=\"" + result[i].bComment + "\" name=\"bComment\" style=\"width: 100%\"/>\n" +
                                    "                                    </form>\n" +
                                    "                                </div></li>")

                            } else {
                                $(this).find('#commentGroup-board').append("<li class='comment-li hidden-comment'><div class=\"comment-thumbnail\">\n" +
                                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + result[i].profilePhoto + ");\"></span>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"comment-container on\">\n" +
                                    "                                    <div class=\"comment-user-area\">\n" +
                                    "                                        <div class=\"comment-user\">\n" +
                                    "                                           <input type=\"hidden\" class=\"comment-writer-home\" value=\"" + result[i].authorUserId + "\"/>\n" +
                                    "                                            <span class=\"user-name\">" + result[i].name + "</span>\n" +
                                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                                    "                                        </div>\n" +
                                    "                                        <div class=\"comment-writer-menu\">\n" +
                                    "                                            <button type=\"button\" class=\"modify-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"modifyBComment(this)\">\n" +
                                    "                                                수정</button>\n" +
                                    "                                            <button type=\"button\" class=\"delete-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"deleteBComment(" + result[i].bCommentId + ")\">\n" +
                                    "                                                삭제</button>\n" +
                                    "                                        </div>\n" +
                                    "                                    </div>\n" +
                                    "                                    <div class=\"comment-content\">\n" +
                                    "                                        <div class=\"comment-text-area\">\n" +
                                    "                                            <div class=\"js-remark-text comment-text\">" + result[i].bComment + "</div>\n" +
                                    "                                        </div>\n" +
                                    "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                                    "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                                    "                                    </div>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"edit-bComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                                    "                                    <form  action=\"/bComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                                    "                                        <input type=\"hidden\" name=\"bCommentId\" class=\"bCommentId-comment\" value=\"" + result[i].bCommentId + "\"/>\n" +
                                    "                                        <input type=\"text\" class=\"commentInput\" value=\"" + result[i].bComment + "\" name=\"bComment\" style=\"width: 100%\"/>\n" +
                                    "                                    </form>\n" +
                                    "                                </div></li>")
                            }


                        }

                    }
                    $('.comment-writer-home').each(function () {
                        let commentUserId = $(this).val();
                        let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                        if (commentUserId === $('.home-comment-logIn').val()) {
                            commentWriterMenu.show();
                        } else {
                            commentWriterMenu.hide();
                        }
                    });
                }
            })
        }
    })

}

function limitTComment() {
    $('.boardBox').each(function () {
        let taskId = $(this).find('.taskId-comment').val()
        let projectId = $(this).find('.projectId-comment').val()
        if (taskId !== undefined && projectId !== undefined) {
            let formData = {
                taskId: taskId,
                projectId: projectId,
            }

            $.ajax({
                url: '/tComment/showAll',
                type: 'get',
                data: formData,
                success: (result) => {
                    if (result.length === 0) {
                        $(this).find('.comment-header').css('display', 'none')
                    } else {

                        for (let i = 0; i < result.length; i++) {
                            const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

                            const date = new Date(result[i].crtDate);
                            let entryDate = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
                            if (result.length < 3) {
                                $(this).find('.comment-header').css('display', 'none')

                            } else {
                                $(this).find('.comment-header').css('display', 'block')
                                $(this).find('.task-comment-count').text("(" + (result.length - 2) + ")")
                            }


                            if (i < 2) {
                                $(this).find('#commentGroup').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + result[i].profilePhoto + ");\"></span>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"comment-container on\">\n" +
                                    "                                    <div class=\"comment-user-area\">\n" +
                                    "                                        <div class=\"comment-user\">\n" +
                                    "                                           <input type=\"hidden\" class=\"comment-writer-home\" value=\"" + result[i].authorUserId + "\"/>\n" +
                                    "                                            <span class=\"user-name\">" + result[i].name + "</span>\n" +
                                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                                    "                                        </div>\n" +
                                    "                                        <div class=\"comment-writer-menu\">\n" +
                                    "                                            <button type=\"button\" class=\"modify-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"modifyTComment(this)\">\n" +
                                    "                                                수정</button>\n" +
                                    "                                            <button type=\"button\" class=\"delete-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"deleteTComment(" + result[i].tCommentId + ")\">\n" +
                                    "                                                삭제</button>\n" +
                                    "                                        </div>\n" +
                                    "                                    </div>\n" +
                                    "                                    <div class=\"comment-content\">\n" +
                                    "                                        <div class=\"comment-text-area\">\n" +
                                    "                                            <div class=\"js-remark-text comment-text\">" + result[i].tComment + "</div>\n" +
                                    "                                        </div>\n" +
                                    "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                                    "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                                    "                                    </div>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"edit-tComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                                    "                                    <form  action=\"/tComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                                    "                                        <input type=\"hidden\" name=\"tCommentId\" class=\"tCommentId-comment\" value=\"" + result[i].tCommentId + "\"/>\n" +
                                    "                                        <input type=\"text\" class=\"commentInput\" value=\"" + result[i].tComment + "\" name=\"tComment\" style=\"width: 100%\"/>\n" +
                                    "                                    </form>\n" +
                                    "                                </div></li>")

                            } else {
                                $(this).find('#commentGroup').append("<li class='comment-li hidden-comment'><div class=\"comment-thumbnail\">\n" +
                                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + result[i].profilePhoto + ");\"></span>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"comment-container on\">\n" +
                                    "                                    <div class=\"comment-user-area\">\n" +
                                    "                                        <div class=\"comment-user\">\n" +
                                    "                                           <input type=\"hidden\" class=\"comment-writer-home\" value=\"" + result[i].authorUserId + "\"/>\n" +
                                    "                                            <span class=\"user-name\">" + result[i].name + "</span>\n" +
                                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                                    "                                        </div>\n" +
                                    "                                        <div class=\"comment-writer-menu\">\n" +
                                    "                                            <button type=\"button\" class=\"modify-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"modifyTComment(this)\">\n" +
                                    "                                                수정</button>\n" +
                                    "                                            <button type=\"button\" class=\"delete-tComment comment-writer-button on\" style=\"background-color: transparent; border: none\" onclick=\"deleteTComment(" + result[i].tCommentId + ")\">\n" +
                                    "                                                삭제</button>\n" +
                                    "                                        </div>\n" +
                                    "                                    </div>\n" +
                                    "                                    <div class=\"comment-content\">\n" +
                                    "                                        <div class=\"comment-text-area\">\n" +
                                    "                                            <div class=\"js-remark-text comment-text\">" + result[i].tComment + "</div>\n" +
                                    "                                        </div>\n" +
                                    "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                                    "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                                    "                                    </div>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"edit-tComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                                    "                                    <form  action=\"/tComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                                    "                                        <input type=\"hidden\" name=\"tCommentId\" class=\"tCommentId-comment\" value=\"" + result[i].tCommentId + "\"/>\n" +
                                    "                                        <input type=\"text\" class=\"commentInput\" value=\"" + result[i].tComment + "\" name=\"tComment\" style=\"width: 100%\"/>\n" +
                                    "                                    </form>\n" +
                                    "                                </div></li>")
                            }


                        }

                    }
                    $('.comment-writer-home').each(function () {
                        let commentUserId = $(this).val();
                        let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                        if (commentUserId === $('.home-comment-logIn').val()) {
                            commentWriterMenu.show();
                        } else {
                            commentWriterMenu.hide();
                        }
                    });
                }
            })
        }
    })

}

function deleteBComment(commentId){
    Swal.fire({
        text: '댓글을 삭제하시겠습니까?',
        width: '300px',
        showCancelButton: true,
        confirmButtonColor: '#3064B3',
        cancelButtonColor: 'red',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            let formData = {
                bCommentId: commentId
            }
            $.ajax({
                url: '/bComment/delete',
                type: 'get',
                data: formData,
                success: () => {
                    location.reload()
                }
            })
        }
    })
}
function deleteTComment(commentId) {
    Swal.fire({
        text: '댓글을 삭제하시겠습니까?',
        width: '300px',
        showCancelButton: true,
        confirmButtonColor: '#3064B3',
        cancelButtonColor: 'red',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            let formData = {
                tCommentId: commentId
            }
            $.ajax({
                url: '/tComment/delete',
                type: 'get',
                data: formData,
                success: () => {
                    location.reload()
                }
            })
        }
    })
}
