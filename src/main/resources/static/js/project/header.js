const loginInfo = document.getElementById("login-info");
const logInConversation1 = document.getElementById("logInConversation1");
const logInConversation2 = document.getElementById("logInConversation2");
const loginInfoState1 = document.getElementById("loginInfoState1");
const loginInfoState2 = document.getElementById("loginInfoState2");
const showConnectionsHeader3 = document.getElementById("showConnectionsHeader3");
loginInfo.addEventListener('click', function (event) {
    event.stopPropagation();
});
function logout() {
    Swal.fire({
        text: '로그아웃 하시겠습니까?',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정

    }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
            stompClient.unsubscribe('/sub/connect');
            stompClient.disconnect();
            location.href = "/logout";
        }
    });
}

function withdrawal() {
    Swal.fire({
        text: '회원탈퇴하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/user/withdrawal',
                method: 'POST',
                success: function (response) {
                    Swal.fire({
                        text: '회원탈퇴를 완료하였습니다.',
                        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                    }).then(() => {
                        location.href = "/logout";
                    });
                },
                error: function (xhr, status, error) {
                    console.log(xhr)
                    console.log(status)
                    console.log(error)
                }
            })
        }
    });

}

function conversationUpdate(){
    $.ajax({
        url:'/user/updateConversation',
        type:'post',
        data:{
            'conversation':logInConversation
        },
        success:function (result){
            let item = JSON.parse(JSON.stringify(result));
            if (item.conversation == 'away') {
                logInConversation1.textContent ='활성'
            }else{
                logInConversation2.textContent ='자리 비움'
            }
        }
    });
}

function conversationAway() {
    stompClient.send("/pub/connect/conversationAway",
        {},JSON.stringify({
            id:logInId
        }))
    // stompClient.unsubscribe('/sub/connect');
    // stompClient.disconnect();

}

function conversationAvailable() {
    stompClient.subscribe('/sub/connect', onMessageReceived);

    // 서버에 username 을 가진 유저가 들어왔다는 것을 알림
    // /pub/chat/enterUser 로 메시지를 보냄
    stompClient.send("/pub/connect/conversationAvailable",
        {},JSON.stringify({
            id:logInId,
            conversation: logInConversation
        }))
}


function dropUser(){

    if($("#userDropbox").hasClass("show") === true) {

        $("#userDropbox").attr('class','dropdown-menu');

        console.log("ssdsss")

    } else {
        $("#userDropbox").attr('class','dropdown-menu show');
        console.log("rtrrrr")

    }
}

