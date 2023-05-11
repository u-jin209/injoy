$(function (){
    $('.toolBtn').click(function (){
        console.log('click')
        let nowSetUp = $(this).parent().find('.setUp-group')
        if (nowSetUp.css('display') === 'block'){
            nowSetUp.css('display','none')
        } else {
            nowSetUp.css('display','block')
        }
    })

    //프로세스 변경하기
    $('.task-process-btn').click(function (){
        Swal.fire({
            text: '상태를 변경하시겠습니까?',
            width : '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId : taskId,
                    process : $(this).text()
                }
                console.log(formData)
                $.ajax({
                    url: '/task/updateProcess',
                    type : 'post',
                    data : formData,
                    success : ()=>{
                        location.reload()
                    }
                })
            }
        })
    })

    //시작일 추가하기
    $('.addStartDate').change(function (){
        Swal.fire({
            text: '시작일을 추가하시겠습니까?',
            width : '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId : taskId,
                    startDate: $(this).val()
                }
                $.ajax({
                    url: '/task/updateStartDate',
                    type : 'post',
                    data : formData,
                    success : ()=>{
                        location.reload()
                    }
                })
            }
        })
    })


    // 시작일 삭제하기
    $('.removeBtn-startDate').click(function (){
        $('.start-date-exist').css('display', 'block')
        Swal.fire({
            text: '시작일을 삭제하시겠습니까?',
            width : '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId : taskId
                }
                $.ajax({
                    url: '/task/deleteStartDate',
                    type : 'post',
                    data : formData,
                    success : ()=>{
                        location.reload()
                    }
                })
            }
        })
    })

    //마감일 추가하기
    $('.addEndDate').change(function (){
        Swal.fire({
            text: '마감일을 추가하시겠습니까?',
            width : '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId : taskId,
                    endDate: $(this).val()
                }
                $.ajax({
                    url: '/task/updateEndDate',
                    type : 'post',
                    data : formData,
                    success : ()=>{
                        location.reload()
                    }
                })
            }
        })
    })

    //마감일 삭제하기
    $('.removeBtn-endDate').click(function (){
        Swal.fire({
            text: '마감일을 삭제하시겠습니까?',
            width : '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId : taskId
                }
                $.ajax({
                    url: '/task/deleteEndDate',
                    type : 'post',
                    data : formData,
                    success : ()=>{
                        location.reload()
                    }
                })
            }
        })
    })

    //우선순위 삭제하기
    $('.removeBtn-priority').click(function (){
        Swal.fire({
            text: '우선순위 삭제하시겠습니까?',
            width : '300px',
            showCancelButton: true,
            confirmButtonColor: '#3064B3',
            cancelButtonColor: 'red',
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                let formData = {
                    taskId : taskId
                }
                $.ajax({
                    url: '/task/deletePriority',
                    type : 'post',
                    data : formData,
                    success : ()=>{
                        location.reload()
                    }
                })
            }
        })
    })

    //우선순위 추가하기
    $('.addPriority-home').click(function (){
        let priority_ul = $(this).parent().find('.home-priority_ul')

        if (priority_ul.css('display') === 'none'){
            priority_ul.css('display', 'block')
            priority_ul.find('button').click(function (e) {
                Swal.fire({
                    text: '우선순위를 추가하시겠습니까?',
                    width : '300px',
                    showCancelButton: true,
                    confirmButtonColor: '#3064B3',
                    cancelButtonColor: 'red',
                    confirmButtonText: '확인',
                    cancelButtonText : '취소'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let taskId = $(this).parents('.post-content').find('#taskId-post').val()

                        let formData = {
                            taskId : taskId,
                            priority : $(this).text()
                        }
                        $.ajax({
                            url: '/task/updatePriority',
                            type : 'post',
                            data : formData,
                            success : ()=>{
                                location.reload()
                            }
                        })
                    }
                })

            })
        } else{
            priority_ul.css('display', 'none')

        }
    })

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

    //진행도 변경하기
    $('.rangeInput').change(function (){
        $('.progress-txt').text($(this).val() + '%')
        let formData = {
            taskId:  $(this).parents('.post-content').find('#taskId-post').val(),
            progress : $(this).val(),
        }

        $.ajax({
            url : '/task/updateProgress',
            data: formData,
            type : 'post',
            success : () =>{
                Toast.fire({
                    title: '진행도가 변경되었습니다.'
                })
            },
            done : () => {
                // 진행중
                location.reload()
            }
        })
    })

})


