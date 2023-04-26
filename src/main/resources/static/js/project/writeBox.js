$(function (){

 // 현재 탭되어있는 탭 제거하기 아직 수정주이이이ㅣ이이이이ㅣ이이
    $('.board_li').click(()=> {
        $('#taskWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#taskWrite-tab-pane').removeClass('show active')
        $('#scheduleWrite-tab-pane').removeClass('show active')

        $('#boardWrite-tab').addClass('active')
        $('#boardWrite-tab-pane').addClass('show active')

    })

    $('.task_li').click(()=> {
        $('#boardWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#scheduleWrite-tab-pane').removeClass('show active')
        $('#boardWrite-tab-pane').removeClass('show active')

        $('#taskWrite-tab').addClass('active')
        $('#taskWrite-tab-pane').addClass('show active')

    })


    $('.schedule_li').click(()=>{
        $('#boardWrite-tab').removeClass('active')
        $('#boardWrite-tab-pane').removeClass('show active')
        $('#taskWrite-tab').removeClass('show active')
        $('#taskWrite-tab-pane').removeClass('show active')

        $('#scheduleWrite-tab').addClass('active')
        $('#scheduleWrite-tab-pane').addClass('show active')

    })


    $('.writeBoxTab[data-bs-toggle="tab"]').on('shown.bs.tab', function (e){
        if ($(e.target).attr('id') === "boardWrite-tab") {
            $('.reportWrite').click(function (){
                let formData = {
                    title : $('#boardTitle').val(),
                    content : $('.writeBoardContent').val()
                }

                $.ajax({
                    url : '/board/write',
                    data : formData,
                    type: 'post',
                    success: ((message) => {
                        location.reload()
                    })
                })
            })
        } else if($(e.target).attr('id') === "taskWrite-tab"){
            console.log("DDddd")
            $('.reportWrite').click(function (){
                let formData = {
                    title : $('#taskTitle').val(),
                    content : $('.writeContent').val()

                }

                $.ajax({
                    url : '/task/write',
                    data : formData,
                    type: 'post',
                    success: ((message) => {
                        location.reload()
                    })
                })
            })
        }
        else if($(e.target).attr('id') === "scheduleWrite-tab"){
            console.log("rrrd")
            $('.reportWrite').click(function (){
                let formData = {
                    title : $('#scheduleTitle').val(),
                    content : $('.writeScheduleContent').val()
                }


            })
        }
    })

})
