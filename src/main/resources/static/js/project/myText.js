$(document).ready(function () {
    $(".myText-div").click(function () {
        var target = $(this).data("bs-target");
        $(target).offcanvas("show");
    });

})

$(document).on('click', function (e) {
    let target = $(e.target);

    if (!target.closest('.myText-div').length && !target.closest('#task-myText').length && !target.closest('#board-myText').length && !target.closest('#calendar-myText').length) {
        $('.offcanvas').offcanvas('hide');
    }
})
$(function () {
    $('.myText-div').click(function (e) {

        if ($(this).attr('id') === 'board-text') {
            $('#commentGroup-myText-board').empty()
            $('.img-container-bmyText').html("")
            $('.myText-bfile-post-area').css('display', 'none')
            $('.file-container-bmyText').html("")

            let boardId = $(this).find('#myText-boardId').val();

            let formData = {
                boardId: boardId,
            }
            $.ajax({
                url: '/board/detailBoard',
                type: 'get',
                data: formData,
                success: (result) => {
                    showBoardText(result)
                }
            })
        } else if ($(this).attr('id') === 'task-text') {
            $('#commentGroup-myText').empty()
            $('.img-container-myText').html("")
            $('.myText-file-post-area').css('display', 'none')
            $('.file-container-myText').html("")

            let taskId = $(this).find('#myText-taskId').val();

            let formData = {
                taskId: taskId,
            }
            $.ajax({
                url: '/task/detailTask',
                type: 'get',
                data: formData,
                success: (result) => {
                    showTaskText(result)
                }
            })
        } else if ($(this).attr('id') === 'calendar-text') {
            $('#commentGroup-myText-calendar').empty()
            $('.img-container-myText').html("")
            $('.myText-file-post-area').css('display', 'none')
            $('.file-container-myText').html("")

            let calendarId = $(this).find('#myText-calendarId').val();

            let formData = {
                calendarId: calendarId,
            }
            $.ajax({
                url: '/calendar/detailCalendar',
                type: 'get',
                data: formData,
                success: (result) => {
                    showCalendarText(result)
                }
            })
        }

    })

})

function date_Format(date) {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const d = new Date(date);
    let format_date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const time = new Date(date).toTimeString().split(' ')[0];

    return format_date + ' ' + time;
}

function myText_priority(value) {
    let priority = $('.myText-priority-value')
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


function showTaskText(result) {


    //업무번호
    $('.myText-taskId em').text(result.taskId)
    //제목 설정
    $('.myText-taskTitle').text(result.taskTitle)
    //작성자 이름
    $('.myText-authorName').text(result.name)
    //작성자 profile
    document.getElementById('myText-profile').style.backgroundImage = "url('" + result.profilePhoto + "')";

    let date = date_Format(result.crtDate)
    //작성일
    $('.myText-postDate').text(date)

    // 상태
    let btn = document.querySelectorAll(".myText-process-btn");
    btn.forEach(function (btn, i) {
        if (btn.innerText === result.process) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active")
        }
    });

    //우선순위
    if (result.priority == null) {
        $('.priority-layer-myText').css('display', 'none')
        $('.prioritySpan-myText').css('display', 'none')

    } else {
        myText_priority(result.priority)
        $('.prioritySpan-myText').css('display', 'block')
        $('.priority-layer-myText').css('display', 'flex')
        $('.myText-priority-value').text(result.priority)
    }

    //진척도
    if (result.progress === 0) {
        $('.progress-layer-myText').css('display', 'none')
    } else {
        $('.progress-layer-myText').css('display', 'flex')
    }
    // 진척도 값 설정 & 배경 색상 변경
    $('.myText-progress-bar').css('width', result.progress)
    $('.myText-progress-percent').text(result.progress + '%')

    //시작일, 마감일 설정
    if (result.startDate == null && result.startDate === undefined) {
        $('.startDate-layer-myText').css('display', 'none')
    } else {
        $('.startDate-layer-myText').css('display', 'flex')
        $('.myText-startDate-value').text(dateWeek(result.startDate) + '부터')
    }

    if (result.closingDate == null) {
        $('.endDate-layer-myText').css('display', 'none')
    } else {
        $('.endDate-layer-myText').css('display', 'flex')
        $('.myText-endDate-value').text(dateWeek(result.closingDate) + '까지')
    }

    //내용
    $('.myText-taskContent').text(result.taskContent)
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

                $('#commentGroup-myText').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + comment[i].profilePhoto + ");\"></span>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"comment-container on\">\n" +
                    "                                    <div class=\"comment-user-area\">\n" +
                    "                                        <div class=\"comment-user\">\n" +
                    "                                           <input type=\"hidden\" class=\"comment-writer-myText\" value=\"" + comment[i].authorUserId + "\"/>\n" +
                    "                                            <span class=\"user-name\">" + comment[i].name + "</span>\n" +
                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                        <div class=\"comment-writer-menu\">\n" +
                    "                                        </div>\n" +
                    "                                    <div class=\"comment-content\">\n" +
                    "                                        <div class=\"comment-text-area\">\n" +
                    "                                            <div class=\"js-remark-text comment-text-myText\">" + comment[i].tComment + "</div>\n" +
                    "                                             <select id='translation-myText' class=\"form-select form-select-sm translation-myText\" aria-label=\".form-select-sm example\" >\n" +
                    "                                                   <option value='' disabled selected>번역하기</option>\n" +
                    "                                                   <option value=\"en\">English</option>\n" +
                    "                                                   <option value=\"ko\">korean</option>\n" +
                    "                                                   <option value=\"ar\">Aramaic</option>\n" +
                    "                                            </select>\n" +
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

            $('.comment-writer-myText').each(function () {
                let commentUserId = $(this).val();
                let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                if (commentUserId === $('.myText-login').val()) {
                    commentWriterMenu.show();
                } else {
                    commentWriterMenu.hide();
                }
            });

            $('.show-comment-myText').each(function () {
                let commentContainer = $(this).find('.comment-container');
                let selectElement = commentContainer.find('.translation-myText');
                selectElement.on('change', function () {
                    let selectedValue = $(this).val();
                    console.log(selectedValue);
                    let commentText = $(this).siblings('.comment-text-myText');
                    let text = commentText.text();
                    let formData = {
                        "text": text,
                        "lan": selectedValue
                    };
                    $.ajax({
                        url: "/translateText",
                        type: "POST",
                        data: formData,
                        success: function (response) {
                            console.log("결과 : " + response.resultText);
                            commentText.text(response.resultText);
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                icon: 'warning',
                                text: '선택한 언어와 현재 언어가 일치합니다.'
                            })
                        }
                    });
                });
            });
        }
    })
    TaskTextImg(result.taskId, result.projectId)
}

function TaskTextImg(taskId, projectId) {
    if (taskId !== undefined && projectId !== undefined) {
        let formData = {
            taskId: taskId
        }

        $.ajax({
            url: '/task/getImg',
            data: formData,
            type: "get",
            success: (response) => {
                const previewsContainer = $('.img-container-myText');
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
                        preview.src = response[i].fileRealPath;


                        previewsContainer.append(preview);
                    } else {

                        $('.myText-file-post-area').css('display', 'block')
                        const fPreviewsContainer = $('.file-container-myText');
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

function showBoardText(result) {

    //업무번호
    $('.myText-boardId em').text(result.boardId)
    //제목 설정
    $('.myText-bTitle').text(result.bTitle)
    //작성자 이름
    $('.myText-board-author').text(result.name)
    //작성자 profile
    document.getElementById('myText-board-profile').style.backgroundImage = "url('" + result.profilePhoto + "')";

    let date = date_Format(result.entryDate)
    //작성일
    $('.myText-postDate').text(date)

    //내용
    $('.myText-bContent').text(result.bContent)
    //댓글
    let formData = {
        boardId: result.boardId,
        projectId: result.projectId,
    }

    $.ajax({
        url: '/bComment/showAll',
        type: 'get',
        data: formData,
        success: (comment) => {

            for (let i = 0; i < comment.length; i++) {
                const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

                const date = new Date(comment[i].crtDate);
                let entryDate = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
                $('#commentGroup-myText-board').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + comment[i].profilePhoto + ");\"></span>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"comment-container on\">\n" +
                    "                                    <div class=\"comment-user-area\">\n" +
                    "                                        <div class=\"comment-user\">\n" +
                    "                                           <input type=\"hidden\" class=\"comment-writer-myText\" value=\"" + comment[i].authorUserId + "\"/>\n" +
                    "                                            <span class=\"user-name\">" + comment[i].name + "</span>\n" +
                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"comment-writer-menu\">\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"comment-content\">\n" +
                    "                                        <div class=\"comment-text-area\">\n" +
                    "                                            <div class=\"js-remark-text comment-text-myText\">" + comment[i].bComment + "</div>\n" +
                    "                                             <select id='translation-myText' class=\"form-select form-select-sm translation-myText\" aria-label=\".form-select-sm example\" >\n" +
                    "                                                   <option value='' disabled selected>번역하기</option>\n" +
                    "                                                   <option value=\"en\">English</option>\n" +
                    "                                                   <option value=\"ko\">korean</option>\n" +
                    "                                                   <option value=\"ar\">Aramaic</option>\n" +
                    "                                            </select>\n" +
                    "                                        </div>\n" +
                    "                                        <ul class=\"js-remark-upload-file upload-document-group\"></ul>\n" +
                    "                                        <ul class=\"js-remark-upload-img comment-upload-img\"></ul>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"edit-bComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                    "                                    <form  action=\"/bComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                    "                                        <input type=\"hidden\" name=\"bCommentId\" class=\"bCommentId-comment\" value=\"" + comment[i].bCommentId + "\"/>\n" +
                    "                                        <input type=\"text\" class=\"commentInput\" value=\"" + comment[i].bComment + "\" name=\"bComment\" style=\"width: 100%\"/>\n" +
                    "                                    </form>\n" +
                    "                                </div></li>")


            }

            $('.comment-writer-myText').each(function () {
                let commentUserId = $(this).val();
                let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                if (commentUserId === $('.myText-login').val()) {
                    commentWriterMenu.show();
                } else {
                    commentWriterMenu.hide();
                }
            });

            $('.show-comment-myText').each(function () {
                let commentContainer = $(this).find('.comment-container');
                let selectElement = commentContainer.find('.translation-myText');
                selectElement.on('change', function () {
                    let selectedValue = $(this).val();
                    console.log(selectedValue);
                    let commentText = $(this).siblings('.comment-text-myText');
                    let text = commentText.text();
                    let formData = {
                        "text": text,
                        "lan": selectedValue
                    };
                    $.ajax({
                        url: "/translateText",
                        type: "POST",
                        data: formData,
                        success: function (response) {
                            console.log("결과 : " + response.resultText);
                            commentText.text(response.resultText);
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                icon: 'warning',
                                text: '선택한 언어와 현재 언어가 일치합니다.'
                            })
                        }
                    });
                });
            });
        }
    })
    BoardTextImg(result.boardId, result.projectId)
}

function BoardTextImg(boardId, projectId) {
    if (boardId !== undefined && projectId !== undefined) {
        let formData = {
            boardId: boardId
        }

        $.ajax({
            url: '/board/getImg',
            data: formData,
            type: "get",
            success: (response) => {
                const previewsContainer = $('.img-container-bmyText');
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
                        preview.src = response[i].fileRealPath;


                        previewsContainer.append(preview);
                    } else {

                        $('.myText-bfile-post-area').css('display', 'block')
                        const fPreviewsContainer = $('.file-container-bmyText');
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

function getTime(date){
    let today = new Date(date);

    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);

    let time_now = hours + ':' + minutes;
    return time_now;
}

function showCalendarText(result) {


    //업무번호
    $('.myText-calendarId em').text(result.calendarId)
    //제목 설정
    $('.myText-cTitle').text(result.calTitle)
    //작성자 이름
    $('.myText-calendar-author').text(result.name)
    //작성자 profile
    document.getElementById('myText-calendar-profile').style.backgroundImage = "url('" + result.profilePhoto + "')";

    let date = date_Format(result.calRegisterDate)

    const d = new Date(result.calStart);

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    let sTime =getTime(result.calStart)
    let eTime =getTime(result.calEnd)


    $('.myText-calendar-month').text(year+'-'+month)
    $('.myText-calendar-day').text(day)

    let start = dateWeek(result.calStart)
    let end = dateWeek(result.calEnd)
    $('.myText-calendar-period-area').text(start+', '+ sTime +' - ' + end+', '+ eTime)
    //작성일
    $('.myText-postDate').text(date)
    if (result.calAddress == null || result.calAddress === '') {
        $('.post-calendar-place').css('display', 'none')
    } else {
        $('.post-calendar-place').css('display', 'flex')
    }

    $('.post-ellipsis').text(result.calAddress)

    showHomeMap(result.calAddress,  $('#myTextView'));

    if (result.calContent == null || result.calContent === '') {
        $('.post-calendar-content').css('display', 'none')
    } else {
        $('.post-calendar-content').css('display', 'flex')
    }
    //내용
    $('#myText-calendar-content').text(result.calContent)
    //댓글
    let formData = {
        calendarId: result.calendarId,
        projectId: result.projectId,
    }

    $.ajax({
        url: '/cComment/showAll',
        type: 'get',
        data: formData,
        success: (comment) => {

            for (let i = 0; i < comment.length; i++) {
                const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간

                const date = new Date(comment[i].calComRegisterDate);
                let entryDate = new Date(date.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
                $('#commentGroup-myText-calendar').append("<li class='comment-li'><div class=\"comment-thumbnail\">\n" +
                    "                                    <span class=\"thumbnail size40 radius16\" style=\"background-image:url( " + comment[i].profilePhoto + ");\"></span>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"comment-container on\">\n" +
                    "                                    <div class=\"comment-user-area\">\n" +
                    "                                        <div class=\"comment-user\">\n" +
                    "                                           <input type=\"hidden\" class=\"comment-writer-home\" value=\"" + comment[i].calComUserId + "\"/>\n" +
                    "                                            <span class=\"user-name\">" + comment[i].name + "</span>\n" +
                    "                                            <span class=\"record-date\">" + entryDate + "</span>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"comment-content\">\n" +
                    "                                        <div class=\"comment-text-area\">\n" +
                    "                                            <div class=\"js-remark-text comment-text-myText\">" + comment[i].calComContent + "</div>\n" +
                    "                                             <select id='translation-myText' class=\"form-select form-select-sm translation-myText\" aria-label=\".form-select-sm example\" >\n" +
                    "                                                   <option value='' disabled selected>번역하기</option>\n" +
                    "                                                   <option value=\"en\">English</option>\n" +
                    "                                                   <option value=\"ko\">korean</option>\n" +
                    "                                                   <option value=\"ar\">Aramaic</option>\n" +
                    "                                            </select>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"edit-cComment-form\" style=\"overflow: hidden; width: 100%; margin-bottom: 10px; display: none\">\n" +
                    "                                    <form  action=\"/cComment/update\" method=\"post\" class=\"comment-container\" style=\"padding: 0;\">\n" +
                    "                                        <input type=\"hidden\" name=\"calCommentId\" class=\"cCommentId-comment\" value=\"" + comment[i].calCommentId + "\"/>\n" +
                    "                                        <input type=\"text\" class=\"commentInput\" value=\"" + comment[i].calComContent + "\" name=\"calComContent\" style=\"width: 100%\"/>\n" +
                    "                                    </form>\n" +
                    "                                </div></li>")


            }

            $('.comment-writer-myText').each(function () {
                let commentUserId = $(this).val();
                let commentWriterMenu = $(this).closest('.comment-li').find('.comment-writer-menu');

                if (commentUserId === $('.myText-login').val()) {
                    commentWriterMenu.show();
                } else {
                    commentWriterMenu.hide();
                }
            });

            $('.show-comment-myText').each(function () {
                let commentContainer = $(this).find('.comment-container');
                let selectElement = commentContainer.find('.translation-myText');
                selectElement.on('change', function () {
                    let selectedValue = $(this).val();
                    console.log(selectedValue);
                    let commentText = $(this).siblings('.comment-text-myText');
                    let text = commentText.text();
                    console.log(text)
                    let formData = {
                        "text": text,
                        "lan": selectedValue
                    };
                    $.ajax({
                        url: "/translateText",
                        type: "POST",
                        data: formData,
                        success: function (response) {
                            console.log("결과 : " + response.resultText);
                            commentText.text(response.resultText);
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                icon: 'warning',
                                text: '선택한 언어와 현재 언어가 일치합니다.'
                            })
                        }
                    });
                });
            });
        }
    })

}

function showHomeMap(mapAddress, mapView){
    let imgTag = document.createElement('img');
    imgTag.id = "mapImage";
    imgTag.name = "mapImage"
    imgTag.src = "";
    imgTag.alt = "static img";
    imgTag.style.visibility = 'hidden'
    imgTag.style.width = '600px';

    mapView.append(imgTag);

    let geocoder;
    let map;
    geocoder = new google.maps.Geocoder();
    let address = mapAddress;

    geocoder.geocode({'address': address}, function (results, status) {

        if (status == 'OK') {




            const apiKey = 'AIzaSyABN0ndYhxNu4zHlvEfKi_r42aSUMeVUaI';

            const latitude = results[0].geometry.location.lat()
            const longitude = results[0].geometry.location.lng()

            // Set the map center and other parameters
            const mapCenter = `center=${latitude},${longitude}`;
            const mapZoom = 'zoom=14'; // Optional: Specify the zoom level

            const mapMarkers = `markers=color:red%7Clabel:%7C${latitude}, ${longitude}`;

            const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?${mapCenter}&${mapZoom}&size=646x220&${mapMarkers}&key=${apiKey}`;

            // Set the image source to the constructed URL

            const mapImage = mapView.find('#mapImage');
            mapImage.attr('src', imageUrl)
            mapImage.css('visibility','visible')



        } else {
            // console.log("this is an !ERROR!" + status);
            // alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

