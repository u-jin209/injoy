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



function checkName(value){
    console.log("value: "+value.name.toString())

    var name = value.value
    var organId = value.name
    console.log("name: "+name)
    console.log("organId :" +organId)

    if (organId  == null){
        organId =-1;
    }
    const data ={
        'keyword':name,
        'organId':organId
    }

        $.ajax({
            url:'/project/checkName', //Controller에서 요청 받을 주소
            type:'post', //POST 방식으로 전달
            data: data,
            dataType:'json',
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


};


function updateProject(value){
    const projectName = document.getElementById("projectName").value
    const explanation = document.getElementById("explanation").value
    const projectId = value.value

    const data =
        {"projectName" : projectName,
        "explanation" :  explanation,
            "projectId" : projectId
        }

    $.ajax({
        url:'/project/update', //Controller에서 요청 받을 주소
        type:'post', //POST 방식으로 전달
        data: data,
        dataType:'json',
        success:function(){
            Swal.fire({
                title: "수정되었습니다",
                icon: "success"
            })
            const projectTitle = document.getElementById("projectTitle")
            projectTitle.innerText = projectName

            $('#btn-close').click();
        },
        error:function(){
            alert("에러입니다");
        }
    });

}

