$(function () {
    let hom_tab = '#home-tab';
    let home_tabPane = '#home-tab-pane'
    $(hom_tab).addClass('active')
    $(home_tabPane).addClass('show active')

    $('.mainNav[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        localStorage.setItem('selectedTab', $(e.target).attr('id'))
        localStorage.setItem('selectedPane', $(e.target).attr('data-bs-target'))
    })
    let selectedTab = localStorage.getItem('selectedTab');
    let selectedPane = localStorage.getItem('selectedPane');

    if (selectedTab) {

        $(hom_tab).removeClass('active')
        $(home_tabPane).removeClass('show active')
        $('#' + selectedTab).addClass('active');
        $(selectedPane).addClass('show active');


    }

    // $('#home-tab').click(function (){
    //    location.reload()
    // })

    $('#home-tab').click(function (){

        $('#home-tab-pane').load(location.href + ' #home-tab-pane', function (){

            // writeBox.js 스크립트 파일을 추가합니다.
            var writeBoxScript = document.createElement('script');
            writeBoxScript.src = '/js/project/writeBox.js';
            writeBoxScript.defer = true;
            document.body.appendChild(writeBoxScript);

            // projectHome.js 스크립트 파일을 추가합니다.
            var projectHomeScript = document.createElement('script');
            projectHomeScript.src = '/js/project/projectHome.js';
            projectHomeScript.defer = true;
            document.body.appendChild(projectHomeScript);

            let request_value = $('#main-request').val();
            let progress_value = $('#main-progress').val();
            let feedback_value = $('#main-feedback').val();
            let finish_value = $('#main-finish').val();
            let hold_value = $('#main-hold').val();

            const data = {
                datasets: [{
                    data: [request_value, progress_value, feedback_value, finish_value, hold_value],
                    backgroundColor: [
                        '#00b2ff',
                        '#00b01c',
                        '#fd7900',
                        '#402a9d',
                        '#777777'
                    ],
                    hoverOffset: 2
                }]
            };

            const config = {
                type: 'doughnut',
                data: data,
            };

            new Chart(
                document.getElementById('taskChart'),
                config
            );
        })
    })

    $('#kanban-tab').click(function (){
        $('#kanban-tab-pane').load(location.href + ' #kanban-tab-pane', function (){
            // writeBox.js 스크립트 파일을 추가합니다.
            var kanbanScript = document.createElement('script');
            kanbanScript.src = '/js/project/kanban.js';
            kanbanScript.defer = true;
            document.body.appendChild(kanbanScript);

        })
    })

    $('#schedule-tab').click(function () {
        var calendarEll = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEll, {});
        let data = {
            "activeStart": calendar.view.activeStart,
            "activeEnd": calendar.view.activeEnd,
            "projectId" : $('#projectIdId').val()
        }
        var request = $.ajax({

            url: "/loadSchedule", // URL 새로운거로 다시 넣어주기. 일정 뿌려주기
            method: "GET",
            dataType: "json",
            data: data
        });

        request.done(function (data) {
            calendarObj.setOption('themeSystem', 'bootstrap5');
            calendarObj.setOption('initialView', 'dayGridMonth');
            calendarObj.setOption('locale', 'ko');
            calendarObj.setOption('allDay', false);
            calendarObj.setOption('editable', false);
            calendarObj.setOption('selectable', true);
            calendarObj.setOption('headerToolbar', {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            });
            calendarObj.setOption('events', data);
            calendarObj.setOption('select', function (arg) {
                $('#addScheduleModal').show();
                setDateTime(arg);

                calendar.unselect();
            });

            calendarObj.setOption('eventClick', function (event) {
                Obj = event.event;

                const projectName = document.getElementById('projectNameName').value;
                // console.log("프로젝트 이름 : " + projectName);

                const projectIdId = document.getElementById('projectIdId').value;

                const loginUserId = document.getElementById("logInnn").value;

                let dataa = {
                    "calendarId": Obj.id,
                    "projectName": projectName,
                    "projectIdId": projectIdId,
                    "loginUserId": loginUserId
                }
                $.ajax({
                    url: "/testtt",
                    type: "POST",
                    data: dataa,
                }).done(function (fragment) {
                    // console.log("frag: " + fragment);
                    $("#slideee").replaceWith(fragment);
                });

                var userId = dataa.loginUserId;
                // console.log("현재 로그인 : " + userId);
                // $.ajax({
                //     url: "/showCalComment",
                //     type: "POST",
                //     data: dataa,
                //     success: function (result) {
                //         // var ul = document.createElement('ul');
                //         var ul = document.getElementById("comment_list_ul");
                //
                //         // ul.id = "comment_list_ul"
                //         // ul.style.cssText = "list-style:none; padding: 0;";
                //
                //         // console.log($("#comment_list_div"));
                //         //     console.log(result);
                //             result.forEach(function (comment) {
                //
                //                 if (userId == comment.calComUserId) {
                //                     $(ul).append(
                //                         "<li id='" + comment.calCommentId + "'>" +
                //                         "<div style='display: flex;' class='m-3'>" +
                //                         "<div class='col-1'>" +
                //                         "<span class='thumbnail size40 radius16' style='background-image: url("+comment.profilePhoto+")'>" +
                //                         "</span></div>" +
                //                         "<div class='col-11'>" +
                //                         "<div style='display: flex; justify-content: space-between'>" +
                //
                //                         "<div style='display: flex; flex-direction: row'>" +
                //                         "<div style='margin-right: 10px;'>" +
                //                         "<strong>" + comment.calComUsername + "</strong>" +
                //                         "</div>" +
                //                         "<div class='' style='font-size: 14px; padding-top: 3px; color: #AAAAAA;'>" + comment.calComRegisterDateStr + "</div>" +
                //                         "</div>" +
                //
                //                         "<div id='commentDelnModi'>" +
                //                         "<div class='' style='margin-right: 5px'>" +
                //                         "<a class='bi bi-pencil-square' type='button' style='color: #AAAAAA;' onClick='method()'></a>" +
                //                         "</div>" +
                //                         "<div class=''>" +
                //                         "<a class='bi bi-trash3' type='button' style='color: #AAAAAA;' onclick='deleteCalComment(" + comment.calCommentId + "," + comment.calComProjectId + "," + comment.calComCalId + ")'></a>" +
                //                         "</div>" +
                //                         "</div>" +
                //
                //
                //                         "</div>" +
                //
                //                         "<div style='padding-top: 8px; font-size: 15px;'>" + comment.calComContent + "</div>" +
                //                         "</div>" +
                //                         "</div>" +
                //                         "<hr style='color: rgb(126,125,125);'>" +
                //                         "</li>");
                //                 } else {
                //                     $(ul).append(
                //                         "<li id='" + comment.calCommentId + "'>" +
                //                         "<div style='display: flex;' class='m-3'>" +
                //                         "<div class='col-1'>" +
                //                         "<span class='thumbnail size40 radius16' style='background-image: url("+comment.profilePhoto+")'>" +
                //                         "</span></div>" +
                //                         "<div class='col-11'>" +
                //                         "<div style='display: flex; justify-content: space-between'>" +
                //
                //                         "<div style='display: flex; flex-direction: row'>" +
                //                         "<div style='margin-right: 10px;'>" +
                //                         "<strong>" + comment.calComUsername + "</strong>" +
                //                         "</div>" +
                //                         "<div class='' style='font-size: 14px; padding-top: 3px; color: #AAAAAA;'>" + comment.calComRegisterDateStr + "</div>" +
                //                         "</div>" +
                //
                //                         "</div>" +
                //
                //                         "<div style='padding-top: 8px; font-size: 15px;'>" + comment.calComContent + "</div>" +
                //                         "</div>" +
                //                         "</div>" +
                //                         "<hr style='color: rgb(126,125,125);'>" +
                //                         "</li>");
                //                 }
                //             });
                //
                //         // console.log(ul.innerHTML);
                //
                //
                //         // $($("#comment_list_div")).append(ul);
                //             // console.log($("#comment_list_div"));
                //     }
                //
                //
                //
                // })


                $('.js-show-schedule').addClass('show-header-cart');
            });
            $('.fc-scrollgrid-sync-table').css('height', '1253px');
            calendarObj.render();
        });

        request.fail(function (jqXHR, textStatus) {
            //alert("Request failed : " + textStatus);
        });


    });

})
