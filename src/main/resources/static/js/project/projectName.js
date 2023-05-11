function bookMark(projectId, userId) {

    const data = {
        "projectId": projectId, "userId": userId
    }
    const star = document.getElementById("star" + projectId);
    const starfill = document.getElementById("starFill" + projectId);


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

function goAddProject(value) {
    const projectId = value.id
    console.log("goAddProject : " + projectId)
    localStorage.setItem('selectedTab', 'member-tab')
    localStorage.setItem('selectedPane', '#member-tab-pane')
    location.href = "/project/" + projectId;


}

function outProject(value) {

    const userId = value.name.toString().split("/")[0]
    const projectId = value.name.toString().split("/")[1]
    console.log("value : " +userId +"/" +projectId)
    const data ={
        "userId" : userId,
        "projectId" : projectId
    }

    Swal.fire({
        title: '정말로 프로젝트를 나가시겠습니까?',
        text: '확인을 누르면 프로젝트에서 나갑니다.',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정

    }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면


            $.ajax({
                url: "/member/delete",
                data: data,
                type: "GET",
            }).done(function () {

                location.href = "project/myProject"

            })
        }


    })
}


function deleteProject(projectId) {

    const data ={

        "projectId" : projectId
    }

    Swal.fire({
        title: '정말로 프로젝트를 삭제하시겠습니까?',
        text: '확인을 누르면 프로젝트를 삭제합니다.',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정

    }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면


            $.ajax({
                url: "/project/delete",
                data: data,
                type: "GET",
            }).done(function () {

                location.href = "/project/myProject"

            })
        }


    })
}

