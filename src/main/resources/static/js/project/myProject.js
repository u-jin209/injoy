/*<![CDATA[*/


function memberList(value) {
    console.log(value.id)
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


            result.forEach(function (item) {


                $(document).ready(function () {
                    console.log("item", item);


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
    });


}



function bookMark(projectId, userId) {

    console.log("projectId : " + projectId);

    console.log("projectId : " + userId);
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
