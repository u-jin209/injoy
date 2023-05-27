$(document).ready(function () {
    $('.writeBox').click(function () {
        $('.writeBoxTab').each(function () {
            if ($(this).hasClass('active')) {
                $(this).trigger('click')
            }
        })
    })
})

$(function () {
    $('.optionAddBtn').click(function () {
        let ulTag = $(this).parent().find('.option-group')

        ulTag.find('li').each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css('display', 'flex')
                $(this).parent().parent().find('.optionAddBtn').css('display', 'none')
            }

        })
    })
    //시작일 부분
    $('.writeBox-addStartDate').attr('min', new Date().toISOString().split("T")[0])
    $('.writeBox-addEndDate').attr('min', new Date().toISOString().split("T")[0])

    $('.writeBox-addStartDate').change(function () {
        $('.start-date-exist').css('display', 'block')
        $('.startDate-value').text($(this).val() + addWeek($(this).val()) + ' 부터')

        //마감일 최소값 지정
        $('.writeBox-addEndDate').attr('min', $(this).val())
        $(this).css('display', 'none')
    })

    $('#writeBox-startDate-removeBtn').click(function () {
        $('.start-date-exist').css('display', 'none')
        $('.writeBox-addStartDate').css('display', 'block').val('')
    })

    //마감일 부분

    $('.writeBox-addEndDate').change(function () {
        $('.end-date-exist').css('display', 'block')
        $('.endDate-value').text($(this).val() + addWeek($(this).val()) + ' 까지')
        $(this).css('display', 'none')
    })

    $('#writeBox-endDate-removeBtn').click(function () {
        $('.end-date-exist').css('display', 'none')
        $('.writeBox-addEndDate').css('display', 'block').val('')
    })

    // 우선순위 추가 부분
    $('.addPriority-writeBox').click(function () {
        let priority_ul = $('.addPriority_ul-writeBox')
        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                console.log()
                const element = document.getElementsByClassName('writeBox-priority-value')[0];
                element.innerHTML = ($(this).context.innerHTML)

                $('.addPriority-writeBox').css('display', 'none')
                $('.prioritySpan-writeBox').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else {
            priority_ul.css('display', 'none')

        }

    })

    $('#writeBox-priority-removeBtn').click(function () {
        $('.addPriority-writeBox').css('display', 'block')
        $('.prioritySpan-writeBox').css('display', 'none')
        $(this).closest('svg').remove()
        $(this).closest('.priorityText').remove()
    })

    //진척도 값
    document.querySelector('.writeBox-rangeInput').addEventListener('input', function (event) {
        let gradient_value = 100 / event.target.attributes.max.value;
        console.log(event.target.value)
        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
        $('.writeBox-progress-txt').text($(this).val() + '%')
    });


    $('.board_li').click(() => {
        $('#taskWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#taskWrite-tab-pane').removeClass('show active')
        $('#scheduleWrite-tab-pane').removeClass('show active')

        $('#boardWrite-tab').addClass('active')
        $('#boardWrite-tab-pane').addClass('show active')

    })

    $('.task_li').click(() => {
        $('#boardWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#scheduleWrite-tab-pane').removeClass('show active')
        $('#boardWrite-tab-pane').removeClass('show active')

        $('#taskWrite-tab').addClass('active')
        $('#taskWrite-tab-pane').addClass('show active')

    })


    $('.schedule_li').click(() => {
        $('#boardWrite-tab').removeClass('active')
        $('#boardWrite-tab-pane').removeClass('show active')
        $('#taskWrite-tab').removeClass('show active')
        $('#taskWrite-tab-pane').removeClass('show active')

        $('#scheduleWrite-tab').addClass('active')
        $('#scheduleWrite-tab-pane').addClass('show active')

    })

    let previewsContainer

    $('.writeBoxTab').click(function (event) {
        var activeTab = $(this);

        if (activeTab.hasClass('active')) {
            activeTab.addClass('active');
            activeTab.find('a').trigger('click');

            if (activeTab.attr('id') === 'boardWrite-tab') {
                console.log("board");
                $('.submitWriteBtn').attr('id', 'boardWriteBtn');
                $('#file').attr('class', 'boardFile')
                previewsContainer = document.querySelector('.previews');
                previewImg(previewsContainer)

            } else if (activeTab.attr('id') === 'taskWrite-tab') {
                console.log("task");
                $('.submitWriteBtn').attr('id', 'taskWriteBtn');
                $('#file').attr('class', 'taskFile')
                previewsContainer = document.querySelector('.task-previews');
                previewImg(previewsContainer)
console.log('dddd')
                $('.writeBox-requestBtn').trigger("click").addClass('active');
            } else if (activeTab.attr('id') === 'scheduleWrite-tab') {
                console.log("schedule");
                //scheduleWrite();
            }
        }

        let targetElement = event.target;
        let boardWriteTabPane = document.getElementById('boardWrite-tab-pane');
        let taskWriteTabPane = document.getElementById('taskWrite-tab-pane');

        // boardWrite-tab-pane 영역 이외의 클릭이 발생한 경우 값을 제거합니다.
        if (targetElement !== boardWriteTabPane && !boardWriteTabPane.contains(targetElement)) {
            document.getElementById('boardTitle').value = '';
            let writeBoardContentElements = document.getElementsByClassName('writeBoardContent');
            for (let i = 0; i < writeBoardContentElements.length; i++) {
                writeBoardContentElements[i].value = '';
            }
        }

        // taskWrite-tab-pane 영역 이외의 클릭이 발생한 경우 값을 제거합니다.
        if (targetElement !== taskWriteTabPane && !taskWriteTabPane.contains(targetElement)) {
            document.getElementById('taskTitle').value = '';
            $('.writeBox-requestBtn').trigger("click").addClass('active');

            $('.writeBox-addStartDate').val(null).css('display', 'block')
            $('.writeBox-startDate-exist').css('display', 'none')

            $('.writeBox-addEndDate').val(null).css('display', 'block')
            $('.writeBox-endDate-exist').css('display', 'none')

            $('.addPriority-writeBox').css('display', 'block')
            $('.prioritySpan-writeBox').css('display', 'none')


            $('.writeBox-rangeInput').val(0).css('background', 'linear-gradient(to right, rgb(255, 226, 131) 0%, rgb(255, 226, 131) 0%, rgb(236, 236, 236) 0%, rgb(236, 236, 236) 100%)')
            $('.writeBox-progress-txt').text('')

            $('.writeContent').val('')
        }
    });

    $('.processBtn').click(function (e) {
        let btn = document.querySelectorAll(".processBtn");
        btn.forEach(function (btn, i) {
            if (e.currentTarget === btn) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

    })

    $('.submitWriteBtn').click(function () {
        if ($(this).attr('id') === 'boardWriteBtn') {
            let formData = new FormData();

            formData.append('bTitle', $('#boardTitle').val());
            formData.append('bContent', $('.writeBoardContent').val());
            formData.append('projectId', Number($('.projectIdInput').val()));

            let files = document.querySelector('.boardFile').files;

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            $.ajax({
                url: '/board/write',
                data: formData,
                type: 'post',
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response);
                    if (response === "success") {
                        location.reload(); // 성공적인 응답을 받은 경우 페이지 리로드
                    } else {
                        Swal.fire({
                            "icon": "warning",
                            "title": "글 제목을 입력하세요"
                        });
                    }
                },
            });

        } else if ($(this).attr('id') === 'taskWriteBtn') {

            let formData = new FormData();

            formData.append('taskTitle', $('#taskTitle').val());
            formData.append('taskContent',  $('.writeContent').val());
            formData.append('projectId', Number($('.writeProjectId').val()));
            formData.append('process',writeCurrentBtn());
            formData.append('startDate', $('.writeBox-addStartDate').val() ? to_date2($('.writeBox-addStartDate').val()) : new Date(0));
            formData.append('closingDate', $('.writeBox-addEndDate').val() ? to_date2($('.writeBox-addEndDate').val()) : new Date(0));
            formData.append('progress', Number($('.writeBox-rangeInput').val()));
            formData.append('priority', $('.prioritySpan-writeBox .priorityText').text());

            let files = document.querySelector('.taskFile').files;

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            console.log(formData)

            $.ajax({
                url: '/task/mainWrite',
                data: formData,
                type: 'post',
                processData: false,
                contentType: false,
                success: ((message) => {
                    console.log(message)
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

    })






})

function previewImg(previewsContainer){
    const fileDOM = document.querySelector('#file');

    fileDOM.addEventListener('change', () => {
        const files = fileDOM.files;

        // 이미지 미리보기를 담을 컨테이너 초기화
        previewsContainer.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const file = files[i];

            reader.onload = () => {
                const preview = document.createElement('img');
                if (previewsContainer.classList.contains('previews')) {
                    preview.classList.add('image-board-box');
                } else if (previewsContainer.classList.contains('task-previews')) {
                    preview.classList.add('image-task-box');
                }

                preview.style.width = '100px';
                preview.style.height = '100px';
                preview.style.borderRadius = '10%';
                preview.style.marginRight = '10px';
                preview.src = reader.result;

                previewsContainer.appendChild(preview);
            };

            reader.readAsDataURL(file);
        }
    });
}

function writeCurrentBtn() {
    let btn = document.querySelectorAll(".processBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    return currentBtn;
}

function addWeek(date) {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];

    return ' (' + dayOfWeek + ')';
}


function to_date2(date_str) {
    let yyyyMMdd = String(date_str);
    let sYear = yyyyMMdd.substring(0, 4);
    let sMonth = yyyyMMdd.substring(5, 7);
    let sDate = yyyyMMdd.substring(8, 10);

    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
}


// function scheduleWrite() {
// $('.scheduleWriteBtn').click(function () {
//     let formData = {
//         title: $('#scheduleTitle').val(),
//         content: $('.writeScheduleContent').val(),
//         projectId: $('.projectIdInput').val()
//     }
//  })
//
// }
