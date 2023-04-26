$(document).ready(function (){
    $('.taskAddButton').click(function (){
        $('#requestBtn').trigger("click")
        $('.requestBtn').focus()
    })

    $('.inputTaskTitle').hide()
    $('.btn_ul').hide()
    $('.priority_ul').hide()

})
$(function (){

    $('.processBtn').click(function (){
        console.log($(this).text())
        const btnValue = $(this).text();
        addTask(btnValue)
    })

    $('.titleTd').on('mouseover', function (){
        $('.inputTaskTitle').show()
        $(this).find('span').hide()
    })

    $('.titleTd').on('mouseout', function (){
        $('.inputTaskTitle').hide()
        $(this).find('span').show()
    })

    $('.processTd').click(function (){
        if ($('.btn_ul').css('display')==='block'){
            $('.btn_ul').css('display', 'none')
        } else {
            $('.btn_ul').css('display', 'block')
        }

    })


    document.addEventListener('click', function(e) {
        let container = document.getElementById('btn_ul');
        let td = document.getElementById('processTd');
        if (!container.contains(e.target) && !td.contains(e.target)) {
            container.style.display = 'none';
        }
    });

    $('.priorityTd').click(function (){
        if ($('.priority_ul').css('display')==='block'){
            $('.priority_ul').css('display', 'none')
        } else {
            $('.priority_ul').css('display', 'block')
        }

    })


    // $(document).mousedown(function( e ) {
    //     if ($(".btn_ul").show()) {
    //         $(".btn_ul").each(function () {
    //             var l_position = $(this).offset();
    //             l_position.right = parseInt(l_position.left) + ($(this).width());
    //             l_position.bottom = parseInt(l_position.top) + parseInt($(this).height());
    //
    //             if ((l_position.left <= e.pageX && e.pageX <= l_position.right)
    //                 && (l_position.top <= e.pageY && e.pageY <= l_position.bottom)) {
    //             } else {
    //                 $(this).hide();
    //             }
    //         });
    //         $(this).hide()
    //     }
    // })




})

function addTask(btnValue){
    $('.taskAddButton').click(function (){
        let formData = {
            projectId : $('.projectIdInput').val(),
            title : $('#taskTitle').val(),
            content : $('.writeContent').val(),
            process : btnValue,
            managerId : $('#managerId').val(),


        }

        $.ajax({
            url: '/task/write',
            data: formData,
            type: 'post',
            success: ((message) => {
                location.reload()
            })
        })
    })
}