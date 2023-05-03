$(document).ready(function () {
    $("#organId").select2({
       width: '100%'
    });

});
function  addSetting() {

    let organNameDiv =document.getElementById("organNameDiv");

    const state = organNameDiv.style.display;

    if(state == "none"){
        organNameDiv.style.display = "block"

    }else{
        organNameDiv.style.display = "none"
    }


}

function submitOrgan(){

    let title = document.getElementById("projectName");
    const domainDisplay = document.getElementById("existDomain").style.display
    const TeamDisplay = document.getElementById("existTeamName").style.display


    if (title.value.length == 0 || domainDisplay != "none" || TeamDisplay !="none") {
        if(title.value.length == 0){
            Swal.fire({
                title: "팀 이름을 입력해 주세요.",
                icon: "warning"
            });
        }

        if(domainDisplay != "none" ){
            Swal.fire({
                title: "도메인을 확인해 주세요.",
                icon: "warning"
            });
        }

        if(TeamDisplay != "none" ){
            Swal.fire({
                title: "팀 이름을 확인해 주세요.",
                icon: "warning"
            });
        }


    }else {

        const formElement = document.getElementById('newProjectForm');
        formElement.submit();
    }



}


function  addCompany(){
    const newOrgan = document.getElementById("newOrgan");

    const newName = newOrgan.value
    if (newOrgan.value.length != 0){


        const data ={
            "organName":newName
        }

        const display = document.getElementById("existOrganName").style.display
        if(display == 'none'){
            $.ajax({
                type: 'GET',
                url: "/organ/insert",
                data: data,
                success: function (result) {
                    let item = JSON.parse(JSON.stringify(result));

                    $("#organId").append("<option selected value='"+item.organId+"'>"+item.organName+"</option>");


                }

            });
        } else{
            Swal.fire({
                title: "이미 있는 조직은 추가할 수 없습니다.",
                icon: "warning"
            })
        }



    }
    else{

        Swal.fire({
            title: "조직명을 입력해 주세요",
            icon: "warning"
        })

    }




}
function checkTeamName(){
    let organNameDiv =document.getElementById("organNameDiv");
    const state = organNameDiv.style.display;

    var name = $('#projectName').val();
    var organId = $('#organId').val();
    if(state != "none"){
        $.ajax({
            url:'/project/checkName', //Controller에서 요청 받을 주소
            type:'post', //POST 방식으로 전달
            data:{keyword:name,
                organId:organId},
            success:function(cnt){ //컨트롤러에서 넘어온 cnt값을 받는다
                if(cnt == 0){ //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                    $('#existTeamName').css("display","none");

                } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                    $('#existTeamName').css("display","inline-block");
                }
            },
            error:function(){
                alert("에러입니다");
            }
        });
    }

};

function checkOrganName(){
    var name = $('#newOrgan').val();
    $.ajax({
        url:'/organ/checkName', //Controller에서 요청 받을 주소
        type:'post', //POST 방식으로 전달
        data:{keyword:name},
        success:function(cnt){ //컨트롤러에서 넘어온 cnt값을 받는다
            if(cnt == 0){ //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                $('#existOrganName').css("display","none");

            } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                $('#existOrganName').css("display","inline-block");
            }
        },
        error:function(){
            alert("에러입니다");
        }
    });
};


function checkDomain(){
    var domain = $('#domain').val();
    var organId = $('#organId').val();
    $.ajax({
        url:'/project/checkDomain', //Controller에서 요청 받을 주소
        type:'post', //POST 방식으로 전달
        data:{keyword:domain,
            organId:organId },
        success:function(cnt){ //컨트롤러에서 넘어온 cnt값을 받는다
            if(cnt == 0){ //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                $('#existDomain').css("display","none");

            } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                $('#existDomain').css("display","inline-block");
            }
        },
        error:function(){
            alert("에러입니다");
        }
    });
};
