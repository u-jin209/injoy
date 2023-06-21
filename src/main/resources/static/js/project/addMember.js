/*<![CDATA[*/

$(document).ready(function () {
    const authority = document.getElementById("authority")
    console.log("eeeeeeeeee authority : " + authority)
    if( localStorage.getItem('selectedTab') == "home-tab"  ){

        if( authority.innerText == "MANAGER" ){
            alertWaitList();
        }

    }


    inviteMemberList();
})


function alertWaitList() {
    console.log("localStorage.getItem('selectedTab')"+localStorage.getItem('selectedTab'))

    console.log("alertWaitList : start ")
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];


    $.ajax({
        url: "/member/selectWaitMember",
        data: {"projectId": projectId},
        type: "GET",
        success: function (result) {

            if (result.length >= 1) {

                Swal.fire({
                    title: '프로젝트 참여 요청이 있습니다', text: '확인하시겠습니까?', icon: 'info',

                    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
                    confirmButtonText: '확인', // confirm 버튼 텍스트 지정

                }).then(result => {
                    // 만약 Promise리턴을 받으면,
                    if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

                        localStorage.setItem('selectedTab', 'member-tab')
                        localStorage.setItem('selectedPane', '#member-tab-pane')
                        location.href = "/project/" + projectId;

                    }
                });
            }
        }
    });


}

function copyCode() {

    const code = document.getElementById("code");
    window.navigator.clipboard.writeText(code.value).then(() => {
        // 복사가 완료되면 호출된다.
        Swal.fire({
            title: "초대코드 복사 완료",
            icon: "success"
        });
    });
}

function deleteUser(userId, option) {
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];
    const data = {
        "userId": userId,
        "projectId": projectId
    }

    if (option == 1) {
        Swal.fire({

            title: '멤버를 삭제 하시겠습니까?',
            text: '확인을 누르면 삭제됩니다.',
            icon: 'warning',


            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            confirmButtonText: '삭제', // confirm 버튼 텍스트 지정

        }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

                $.ajax({
                    url: "/member/delete",
                    data: data,
                    type: "GET",
                }).done(function () {

                    const userDiv = document.getElementById("user" + userId);

                    userDiv.remove();

                    Swal.fire({
                        title: "삭제되었습니다.",
                        icon: "success"
                    });
                });
            }
        });
    } else if (option == 2) {
        Swal.fire({

            title: '승인을 거절 하시겠습니까?',
            text: '확인을 누르면 거절됩니다.',
            icon: 'warning',


            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            confirmButtonText: '거절', // confirm 버튼 텍스트 지정

        }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

                $.ajax({
                    url: "/member/delete",
                    data: data,
                    type: "GET",
                }).done(function () {

                    const userDiv = document.getElementById("user" + userId);

                    userDiv.remove();

                    Swal.fire({
                        title: "거절되었습니다.",
                        icon: "success"
                    });
                });
            }
        });
    }


}


function approveUser(userId, projectId) {

    const data = {
        "userId": userId,
        "projectId": projectId
    }


    Swal.fire({
        title: '승인 하시겠습니까?',
        text: '확인을 누르면 승인됩니다.',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        confirmButtonText: '승인', // confirm 버튼 텍스트 지정

    }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

            $.ajax({
                url: "/member/approve",
                data: data,
                type: "GET",
            }).done(function () {

                const waitDiv = document.getElementById("user" + userId);
                const plusBtn = document.getElementById("plus" + userId);
                const minus = document.getElementById("minus" + userId);

                $("#minus" + userId).attr("onclick", "deleteUser(" + userId + ",1)")
                plusBtn.style.display = "none";


                const newDiv = document.createElement('div').appendChild(waitDiv);
                document.getElementById('field').appendChild(newDiv);
                const waitBody = document.getElementById("waitBody")


                if (waitBody.children.length == 0) {
                    const noneWait = document.getElementById("noneWait");
                    noneWait.style.display = ''
                    const waitList = document.getElementById("waitList");
                    waitList.style.display = 'none'


                }


            });
        }
    });


}

function enter(projectId, logInUser) {

    if (window.event.keyCode == 13) {
        searchUser(projectId, logInUser);
    }
}

function searchUser(projectId, logInUser) {

    console.log("logInUser : " + logInUser)
    const keyword = document.getElementById('searchKeyword').value;
    $('#searchDivMain').empty();

    let url;
    if (keyword != "") {
        const data = {
            "keyword": keyword,
            "projectId": projectId
        }


        if (logInUser == "MANAGER") {

            console.log("MANAGER")
            url = "/member/searchUser"
        } else {
            console.log("sssss")
            url = "/member/searchMember"
        }
        console.log("url :" + url)

        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: function (result) {


                if (result.length >= 1) {

                    const searchDiv = document.getElementById("searchResult");
                    searchDiv.style.display = "";


                    result.forEach(function (item) {


                        console.log(item.name)


                        $('#searchDivMain').append(
                            " <div class='card mb-3' style='max-width: 540px;' >" +
                            "<div class = 'row g-0'>" +
                            "<div class='col-md-4'>" +
                            " <img src='" + item.profilePhoto + "' class='member' onerror=this.src='/img/user.jpg'>" +
                            "</div>" +
                            "<div class='col-md-8'>" +
                            "<div class='card-body' style='text-align: left'>" +
                            "<h5 class='card-title'>" + item.name + "</h5>" +
                            "<p class='card-text'>" + item.email + "</p>" +
                            "<div style='text-align: end; display: none'  id = 'inviteBtn" + item.id + "' >" +
                            "<button class='btn-blue' style='width: 50px;' id='" + item.id + "' onclick='inviteMember(this)'> 초대 </button>" +

                            "</div>" +

                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        );

                        if (logInUser == "MANAGER") {
                            const inviteBtn = document.getElementById("inviteBtn" + item.id)
                            inviteBtn.style.display = 'block'
                        }


                    })
                    inviteMemberList()

                } else {
                    const searchDiv = document.getElementById("searchResult");
                    searchDiv.style.display = "none";

                    Swal.fire({
                        title: "검색 결과가 없습니다.",
                        icon: "question"
                    });
                }
            }
        })
    } else {
        const searchDiv = document.getElementById("searchResult");
        searchDiv.style.display = "none";
        Swal.fire({
            title: "검색어를 입력해 주세요",
            icon: "warning"
        });
    }


}

function inviteMember(value) {


    const userId = value.id;
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];


    $.ajax({
        type: 'GET',
        url: "/member/insert/" + projectId + "/INVITE",
        data: {"userId": userId},

        success: function (result) {

            const searchResult = document.getElementById("searchResult");
            searchResult.style.display = "none";


            Swal.fire({
                title: "초대 완료되었습니다",
                icon: "success"
            })

            inviteMemberList()
        }
    });

}

function inviteMemberList() {

    const urlParams = new URL(location.href);

    const projectId = urlParams.pathname.split('/')[2];


    $.ajax({
        type: 'GET',
        url: "/member/inviteList",
        data: {"projectId": projectId},
        success: function (result) {
            $('#inviteContainer').empty()

            if (result.length >= 1) {
                result.forEach(function (item) {
                    $(document).ready(function () {
                        console.log("item : " + item.name)
                        const noneInvite = document.getElementById("noneInvite");
                        noneInvite.style.display = "none";

                        $('#inviteContainer').append(
                            "<div class='col-md-6'>" +
                            "<div class='card mb-3' style='max-width: 540px; height: 100%;'>" +
                            "<div class='row'>" +
                            "<div class='col-md-4'>" +
                            "<img  class='member' id='userImg" + item.userId + "'  onerror=\"src='/img/moru.jpg'\"   src='" + item.profilePhoto + "' >" +
                            "</div>" +
                            "<div class='col-md-8'>" +
                            "<div class='card-body'>" +
                            "<h5 class='card-title'>" + item.name + "</h5>" +
                            "<p class='card-text'>" + item.email + "</p>" +

                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        );
                        console.log("item.profilePhoto : " + item.profilePhoto)
                        // 아이디 추가하기~
                        const userImg = document.getElementById("userImg" + item.userId)
                        if (item.profilePhoto == null) {

                            userImg.src = '/img/user.jpg'

                        } else {

                            userImg.src = item.profilePhoto

                        }


                    })
                })

            } else {
                $('#noneInvite').append(
                    "<div class='card'  style='min-height: 300px;padding: 150px; text-align: center;'>" +
                    "<h1 class='projectTitle' style='font-size: 2.6rem'> 초대한 회원이 없습니다 </h1>" +
                    "</div>"
                );
            }


        }
    })


}


/*]]>*/
