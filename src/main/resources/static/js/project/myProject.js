/*<![CDATA[*/

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
            inviteList();
        }
    })


}

function inviteList(){
    $('#inviteListBody').empty();
    $.ajax({
        type: 'GET',
        url: "/project/inviteList",

        success: function (result) {


            result.forEach(function (item) {


                $(document).ready(function () {


                    $('#inviteListBody').append(
                        "<div class='col-md-12  ' style='padding: 10px 20px 10px 20px'>" +
                            "<div class='row'>"+
                                "<div class='col-md-6' style='float: left;'>"+
                                        "<div class='subtitle' > "+ item.projectName+"</div>"+
                                "</div>"+
                                "<div class='col-md-6' style='text-align: end'>"+
                                    "<button class='btn btn-red' style='margin-right: 5px' name='"+item.userId+"/"+item.projectId+"' onclick='refuse(this)'>거절</button>"+
                                    "<button class='btn btn-green'  name='"+item.userId+"/"+item.projectId+"'  onclick='approve(this)'>수락</button>"+
                                "</div>"+

                            "</div>"+
                        "</div>"
                    );
                });

            })

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
                            "<p class='card-text'>" + item.email + "</p>" +
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
