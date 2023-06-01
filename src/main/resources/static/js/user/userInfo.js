$(document).ready(function () {
    console.log(":Sdmksd")

        $("#organId").select2({
            dropdownParent: $("#memberModal"),
            closeOnSelect : true,
            dropdownAutoWidth : true,
            width: '100%'});
    $("#organId").focus();


});
function setThumbnail(event) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = document.getElementById("image-show")
        img.setAttribute("src", event.target.result);
        document.querySelector("div#image_container").appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
}


function toBase64(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (event) {
        var base64 = event.target.result;// img -> base64
        var img = document.getElementById("image-show")
        img.setAttribute("src", base64);

        const profilePhoto = document.getElementById("profilePhoto")
        profilePhoto.setAttribute("value", base64.toString())

    };
}


function submitOk() {
    Swal.fire({
        title: "수정 완료되었습니다 ",
        icon: "success"
    });
}


var autoHypenPhone = function (str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 4) {
        return str;
    } else if (str.length < 7) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    } else if (str.length < 11) {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    } else {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }

    return str;
}


var phoneNum = document.getElementById('phoneNum');

phoneNum.onkeyup = function () {
    console.log(this.value);
    this.value = autoHypenPhone(this.value);
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

function checkOrganName(){
    var name = $('#newOrgan').val();
    $.ajax({
        url:'/organ/checkName', //Controller에서 요청 받을 주소
        type:'post', //POST 방식으로 전달
        data:{"keyword":name},
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

function  addSetting() {

    let organNameDiv =document.getElementById("organNameDiv");

    const state = organNameDiv.style.display;

    if(state == "none"){
        organNameDiv.style.display = "block"

    }else{
        organNameDiv.style.display = "none"
    }


}

//비밀번호 변경 시작
function openRePasswordBox() {
    let rePasswordBox = document.getElementById("rePasswordBox")
    if(rePasswordBox.style.display=="none"){
        $.ajax({
            url: '/user/checkUserType',
            method: 'POST',
            success: function (response) {
                if (!response.flag) {
                    Swal.fire({
                        text: "소셜로그인한 유저는 비밀번호 재설정이 불가 합니다.",
                        confirmButtonText: "확인",
                        confirmButtonColor: '#3085d6',
                    })
                }else {
                    rePasswordBox.style.display = "block";
                }
            },
            error:function(xhr, status, error){
                console.log(xhr)
                console.log(status)
                console.log(error)
            }
        })
    }
}

function closeRePasswordBox() {
    let currentPassword = document.getElementById("currentPassword")
    let newPassword = document.getElementById("newPassword")
    let newPasswordConfirm = document.getElementById("newPasswordConfirm")
    currentPassword.value = "";
    newPassword.value = "";
    newPasswordConfirm.value = "";
    document.getElementById("rePasswordBox").style.display = "none";
}

function resetPassword() {
    let currentPassword = document.getElementById("currentPassword")
    let newPassword = document.getElementById("newPassword")
    let newPasswordConfirm = document.getElementById("newPasswordConfirm")
    let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (currentPassword.value.trim() === '') {
        currentPassword.focus()
        return;
    }
    if (newPassword.value.trim() === '') {
        newPassword.focus()
        return;
    }
    if (newPasswordConfirm.value.trim() === '') {
        newPasswordConfirm.focus()
        return;
    }

    if (passwordRegex.test(newPassword.value)) {
        if (newPassword.value != newPasswordConfirm.value) {
            Swal.fire({
                text: "비밀번호 확인이 일치하지 않습니다.",
                confirmButtonText: "확인",
                confirmButtonColor: '#3085d6',
            })
            return;
        }else{
            $.ajax({
                url: '/user/resetPassword',
                method: 'POST',
                data:({
                    currentPassword: currentPassword.value,
                    newPassword: newPassword.value
                }),
                success: function (response) {
                    if(response.flag){
                        Swal.fire({
                            text: "비밀번호가 변경되었습니다. 다시 로그인해주세요.",
                            confirmButtonText: "확인",
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            if(result.value){
                                location.href="/logout"
                            }
                        })
                    }else {
                        Swal.fire({
                            text: "현재 비밀번호가 일치하지 않습니다. 다시 한번 입력해주세요.",
                            confirmButtonText: "확인",
                            confirmButtonColor: '#3085d6',
                        })
                    }

                },
                error:function(xhr, status, error){
                    console.log(xhr)
                    console.log(status)
                    console.log(error)
                }
            })
        }
    }else{
        Swal.fire({
            text: "비밀번호는 영문,숫자,특수문자 포함 8자리 이상이어야 합니다.",
            confirmButtonText: "확인",
            confirmButtonColor: '#3085d6',
        })
        return;
    }
}
//비밀번호 변경 끝