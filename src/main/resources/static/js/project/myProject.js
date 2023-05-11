/*<![CDATA[*/

function projectList(){
    $('#projectListBody').empty();
    $.ajax({
        type: 'GET',
        url: "/project/projectList",

        success: function (result) {


            if (result.length >= 1) {
                result.forEach(function (item) {


                    $(document).ready(function () {
                        $('#projectListBody').append(
                            "<div class='col-md-3 '  style='float: left'>"+
                                "<div class='project' style='padding: 10px 20px 10px 20px'>"+
                                    "<div class='row' >"+
                                        "<div class='col' style='text-align: left'>"+
                                            "<button  class='btn' id='star"+item.projectId+"'  style='display: none'  onclick='bookMark("+ item.projectId +","+ item.userId+")'>"+
                                            "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#000' class='bi bi-star' viewBox='0 0 16 16'>"+
                                                "<path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'/>"+
                                            "</svg></button>"+
                                        "<button id='starFill"+item.projectId+"' class='btn' style='display: none'  onclick='bookMark("+ item.projectId +","+ item.userId+")'>"+
                                        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#FFB30D ' class='bi bi-star-fill' viewBox='0 0 16 16'>"+
                                            "<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'/>"+
                                        "</svg> </button> </div>"+
                                "<div class='col' style='text-align: end'>"+
                                    "<button class='btn ' type='button' id= "+item.projectId+"  data-toggle='modal' data-target='#memberModal' onclick='memberList(this)'>" +
                                        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-people-fill' viewBox='0 0 16 16'>"+
                                            "<path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'/>"+
                                        "</svg></button> </div> </div>" +

                        "<div class='row' id= "+item.projectId+" >"+
                            "<div class='col' style='float: left;'>" +
                                "<div class='subTitle' id='organName"+item.projectId+"' >"+item.organName+"</div>"+
                            "</div></div>"+


                       " <div class='row' style='display: block; MARGIN-RIGHT: 0;' id= "+item.projectId+" onclick='goProject(this)'>"+
                            "<div class='col projectTitle' style='margin: 5px 10px 0px 10px; OVERFLOW: hidden; TEXT-OVERFLOW: ellipsis;' >"+item.projectName+"</div>"+
                            "<div class='col explanationText' > "+item.explanation+"</div>"+
                        "</div>"+
                    "</div>"+
                        "<div class='modal fade' id='memberModal' name = "+item.projectId+" tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true' >"+

                            "<div class='modal-dialog' role='document'>"+
                                "<div class='modal-content'>"+
                                    "<div class='modal-header'>"+
                                        "<div class='col-md-10'>"+
                                            "<h5 class='modal-title' id='exampleModalLabel'>참여중인 멤버</h5>"+
                                        "</div>"+
                                        "<div class='col-md-1' id='modalMain'>"+
                                            "<button type='button' class='close btn 'id='url'>"+
                                                "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-person-plus-fill' viewBox='0 0 16 16'>"+
                                                    "<path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'/>"+
                                                    "<path fill-rule='evenodd' d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'/>"+
                                                "</svg></button> </div>" +
                                        "<div class='col-md-1'>"+

                                            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"+
                                                "<span aria-hidden='true'>&times;</span>"+
                                            "</button></div></div>"+
                                    "<div class='modal-body scrollDiv' id='modal-body' value= "+item.projectId+"  name = "+item.projectId+" style='height: 500px;overflow-y: scroll  '>"+
                                        "<div class='row mt-5 mb-5' style='justify-content: center; '>"+
                                            "<div class='col-md-10' id='modalList'></div></div></div>"+
                                    "<div class='modal-footer'>"+
                                        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"+

                                    "</div> </div></div></div> </div>"

                        );
                        console.log("item.organName :" + item.organName )
                        if (item.bookMarkId == 0){
                            const star = document.getElementById("star"+item.projectId)
                            star.style.display = "unset"
                        }else{
                            const star = document.getElementById("starFill"+item.projectId)
                            star.style.display = "unset"
                        }

                        if (item.organName ==null){

                            const organName = document.getElementById("organName"+item.projectId)
                            organName.innerText = ""
                        }


                    });

                })

            }else {
                Swal.fire({
                    title: '참여중인 팀이 없습니다', text: '팀을 만들거나 참여하시겠습니까?', icon: 'warning',

                    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
                    confirmButtonText: '참여', // confirm 버튼 텍스트 지정

                }).then(result => {
                    // 만약 Promise리턴을 받으면,
                    if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
                        location.href = "/project/newProjectMain";
                    }
                });
            }
        }
    });

}




function refuse(value){
    const userId = value.name.toString().split("/")[0];
    const projectId = value.name.toString().split("/")[1];
    const data ={
        "projectId" : projectId,
        "userId" : userId
    }


    $.ajax({
        url: "/member/delete",
        data: data,
        type: "GET",
        success: function (result) {
            inviteList();
        }
    })

}
function approve(value){
    const userId = value.name.toString().split("/")[0];
    const projectId = value.name.toString().split("/")[1];

    const data ={
        "projectId" : projectId,
        "userId" : userId
    }
    $.ajax({
        url: "/member/approve",
        data: data,
        type: "GET",
        success: function (result) {

            projectList();
            inviteList();
        }
    })


}

function inviteList(){
    console.log("inviteLicst")
    $('#inviteListBody').empty();
    $.ajax({
        type: 'GET',
        url: "/project/inviteList",

        success: function (result) {


            if (result.length >= 1) {
                result.forEach(function (item) {


                    $(document).ready(function () {


                        $('#inviteListBody').append(
                            "<div class='col-md-12  ' style='padding: 10px 20px 10px 20px'>" +
                            "<div class='row'>" +
                            "<div class='col-md-6' style='float: left;'>" +
                            "<div class='subtitle' > " + item.projectName + "</div>" +
                            "</div>" +
                            "<div class='col-md-6' style='text-align: end'>" +
                            "<button class='btn btn-red' style='margin-right: 5px' name='" + item.userId + "/" + item.projectId + "' onclick='refuse(this)'>거절</button>" +
                            "<button class='btn btn-green'  name='" + item.userId + "/" + item.projectId + "'  onclick='approve(this)'>수락</button>" +
                            "</div>" +

                            "</div>" +
                            "</div>"
                        );

                        $("#inviteModalBtn").click();
                    });

                })

            }else {
                $("#inviteClose").click();
            }
        }
    });
}

function memberList(value) {

    const projectId = value.id
    $('#url').click (function (){
        localStorage.setItem('selectedTab','member-tab')
        localStorage.setItem('selectedPane', '#member-tab-pane')
        location.href="/project/"+projectId;
    });

    $('#modalList').empty();


    const data = {
        "projectId": projectId
    }

    $.ajax({
        type: 'GET',
        url: "/member/selectMember",
        data: data,
        success: function (result) {

            if(result.length >=1){
                result.forEach(function (item) {


                    $(document).ready(function () {


                        $('#modalList').append(
                            "<div class='card mb-3' style='max-width: 540px;'>" +
                            "<div class='row g-0'>" +
                            "<div class='col-md-4'>" +
                            "<img class='member'   src='"+ item.profilePhoto +"' , onerror=this.src='/img/moru.jpg'>" +
                            "</div>" +
                            "<div class='col-md-8'>" +
                            "<div class='card-body' style='text-align: left'>" +
                            "<i class='fa-solid fa-crown' style='color: #ffb30d;' th:if=${"+ item.authority +".toString.equals('MANAGER')} '></i>"+
                            "<h5 class='card-title'>" + item.name + "</h5>" +
                            "<p class='card-text'>" + item.username + "</p>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        );
                    });

                })

            }



        }
    });



}



function bookMark(projectId, userId) {

    const data = {
        "projectId": projectId, "userId": userId
    }
    const star = document.getElementById("star"+projectId);
    const starfill = document.getElementById("starFill"+projectId);



    if (star.style.display == "unset") {


        $.ajax({
            type: 'GET', url: "/bookMark/insert", data: data, success: function (result) {
                star.style.display = "none";
                starfill.style.display = "unset";
            }
        });
    } else if (star.style.display == "none") {

        $.ajax({
            type: 'GET', url: "/bookMark/delete", data: data, success: function (result) {
                starfill.style.display = "none";
                star.style.display = "unset";
            }
        });
    }

}

function goProject(value){
    localStorage.setItem('selectedTab','home-tab')
    localStorage.setItem('selectedPane', '#home-tab-pane')
    location.href="/project/"+value.id;
}
/*]]>*/
