$('#addressInputId').on("input", function() {
    var val = $('#addressInputId').val().trim();
    // console.log("입력하고 있는 값 : " + val.trim() );
    if(val == ""){
        // console.log("Empty String. its gonna be removed");
        document.getElementById("imgDiv").style.display = "none";
    }
});

$('#modifyAddressInputId').on("input", function() {
    var val = $('#modifyAddressInputId').val().trim();
    // console.log("입력하고 있는 값 : " + val.trim() );

    if(val == ""){
        // console.log("Modify Empty String.");
        document.getElementById("modifyImgDiv").style.display = "none";
    }
});


$(document).ready(function() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('addressInputId'));

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var selectedPlace = autocomplete.getPlace();

        var selectedAddress = selectedPlace.formatted_address;
        // console.log('클릭 주소 :', selectedAddress);
        if(selectedAddress != "undefined") {
            getLngLat(selectedAddress, 'register');
        } else {

        }
    });
});

$(document).ready(function() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('modifyAddressInputId'));

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var selectedPlace = autocomplete.getPlace();

        var selectedAddress = selectedPlace.formatted_address;

        if(selectedAddress != "undefined") {
            getLngLat(selectedAddress, 'modify');
        } else {

        }
    });
});


function enterAddress(isNew){ //엔터 누룰시 동작되는 메서드
    var inputAddress;
    if(isNew == 'register') {
        inputAddress = document.getElementById('addressInputId').value;
    } else if(isNew == 'modify') {
        inputAddress = document.getElementById('modifyAddressInputId').value;
    }


    getLngLat(inputAddress, isNew);
}

function getLngLat(rawAddress, isNew){


    var geocoder;
    var map;
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': rawAddress}, function (results, status) {


        if (status == 'OK') {

            const apiKey = 'AIzaSyABN0ndYhxNu4zHlvEfKi_r42aSUMeVUaI';

            const latitude = results[0].geometry.location.lat()
            const longitude = results[0].geometry.location.lng()

            // Set the map center and other parameters
            const mapCenter = `center=${latitude},${longitude}`;
            const mapZoom = 'zoom=14'; // Optional: Specify the zoom level

            const mapMarkers = `markers=color:red%7Clabel:%7C${latitude}, ${longitude}`;

            const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?${mapCenter}&${mapZoom}&size=646x220&${mapMarkers}&key=${apiKey}`;

            if(isNew == 'register') {
                document.getElementById("mapImagee").src = imageUrl;
                document.getElementById('imgDiv').style.display = 'block';
            } else if(isNew == 'modify') {
                document.getElementById("mapImageeM").src = imageUrl;
                document.getElementById('modifyImgDiv').style.display = 'block';
            }

            // var ads = addressLogic(latitude, longitude);
            // console.log(addressLogic(latitude, longitude))
            // console.log("ads : " + ads);

        } else {

        }
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function showDelnMod(writerId) {
    currentId = document.getElementById("logInnn").value;

    if(currentId != writerId){
        document.getElementById("modScheduleLi").style.display ='none';
        document.getElementById("delScheduleLi").style.display ='none';
    } else {
        document.getElementById("modScheduleLi").style.display ='block';
        document.getElementById("delScheduleLi").style.display ='block';
    }
}

function deleteScheduleMethod(projectId, scheduleId){
    // console.log("삭제 캘린더 번호  " + scheduleId);
    let data = {"projectId" : projectId,
        "scheduleId" : scheduleId
    };
    $.ajax({
        url: "/deleteSchedule",
        type: "POST",
        data: data,
        success: function () {
            location.reload();
        }
    });

}

function closeModifyModal(){
    $('#modifyScheduleModal').hide();
    document.getElementById("addressInputId").value = "";
}

function openModifySchedule() {
    closeTab();

    var calIdId = document.getElementById("calendarIdId").value;
    document.getElementById("slideCalendarIdId").value = calIdId;


    var startDate = document.getElementById('startDateShow').innerHTML;
    var endDate = document.getElementById("endDateShow").innerHTML;

    startDateStr = startDate.toString();
    endDateStr = endDate.toString();


    var startSub = startDate.substring(0,11);
    var endSub = endDate.substring(0,11);
    var arggg =  {endStr:endSub, startStr:startSub, modify:"yes"};

    setDateTime(arggg);


    document.getElementById("modifyScheduleTitle").value = document.getElementById("slideCalTitle").innerHTML;

    var calAddressDiv = document.getElementById("calAddressId").innerHTML;
    if(calAddressDiv != '') {
        var addressInputId = document.getElementById("modifyAddressInputId");
        addressInputId.value = calAddressDiv;

        var calImgSrcId = document.getElementById("calImgSrcId");
        var calImgSrcStr = calImgSrcId.src.toString();
        var isNon = calImgSrcStr.substring(calImgSrcStr.length-3, calImgSrcStr.length);


        if(isNon != 'non'){
            // codeAddress();
            // codeAddress('modify');
            enterAddress('modify');
        }

    }

    document.getElementById("modifyWriteScheduleContent").value = document.getElementById("calRegisterId").innerHTML;



    $('#modifyScheduleModal').show();

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                 comment modify
function modifyCalComment(commentId, projectId, calendarId){
    var cmtId = document.getElementById("tmptmp"+commentId);
    cmtId.style.display = "none";

    var col11 = document.getElementById("comment"+commentId);
    var commment = document.getElementById("cmtcmt"+commentId);
    commenttt =  commment.innerText;

    const w = "non";

    $(col11).append(
        "<div class='comment-container' style='padding: 0; width: 100%;'>" +
        "<input type='text' class='commentInput' id='commentModifyId"+commentId+"'  style='padding: 0; !important; width: 100%;' placeholder='댓글을 입력은 Enter 입니다.' value='"+commenttt+"' aria-label='' aria-describedby='button-addon2' onKeyUp='if(window.event.keyCode==13){cmtModifyMethod(" + commentId + ","+ projectId + ","+ calendarId +",\"" + w +"\")}'/>" +
        "</div>"
    );
}

function modifyCalComment2(commentId, projectId, calendarId){

    var cmtId = document.getElementById("2tmptmp"+commentId);
    cmtId.style.display = "none";

    var col11 = document.getElementById("11col"+commentId);
    var commment = document.getElementById("2cmtcmt"+commentId);
    commenttt =  commment.innerText;

    const w = "oui";

    $(col11).append(
        "<div class='comment-container' style='padding: 0; width: 100%;'>" +
        "<input type='text' class='commentInput' id='2commentModifyId"+commentId+"' style='padding: 0; !important; width: 100%;' placeholder='댓글을 입력은 Enter 입니다.' value='"+commenttt+"' aria-label='' aria-describedby='button-addon2' onKeyUp='if(window.event.keyCode==13){cmtModifyMethod(" + commentId + ","+ projectId + ","+ calendarId +",\"" + w +"\")}'/>" +
        "</div>"
    );
}

function cmtModifyMethod(commentId, projectId, calendarId, isNew){

    var commentVal
    if(isNew == 'non') {
        commentVal = document.getElementById("commentModifyId"+commentId).value;
    } else {
        commentVal = document.getElementById("2commentModifyId"+commentId).value;

    }

    commentData = {"projectId" : projectId,
        "calendarId" : calendarId,
        "commentId" : commentId,
        "commentVal" : commentVal
    };

    $.ajax({
        url: "/modifyComment",
        type: "POST",
        data: commentData,
        success: function () {
            if(isNew == 'non') {
                var cmtId = document.getElementById("tmptmp"+commentId);
                cmtId.style.display = "block";

                var commentModifyIdTag = document.getElementById("commentModifyId"+commentId);
                // commentModifyIdTag.style.display = "none";
                commentModifyIdTag.remove();

                $("#cmtcmt"+commentId).text(commentVal);
            } else {
                var cmtId2 = document.getElementById("2tmptmp"+commentId);
                cmtId2.style.display = "block";

                var commentModifyIdTag2 = document.getElementById("2commentModifyId"+commentId);
                // commentModifyIdTag2.style.display = "none";
                commentModifyIdTag2.remove();


                $("#2cmtcmt"+commentId).text(commentVal);

            }
        }
    });

}

////////////////////////////댓글 ///////////////////////////////////////////////////////////////////////////
function sendComment() {
    const commentInput = document.getElementById('post_comment_input');
    const projectIdId = document.getElementById('projectIdId').value;
    const loginUserId = document.getElementById("logInnn").value;
    const logInUsername = document.getElementById("logInnname").value;

    let comData = {
        "comment": commentInput.value,
        "projectIdId": projectIdId,
        "calId": Obj.id,
        "loginUserId" : loginUserId
    };


    $.ajax({
        type: "post",
        url: "/insertCalComment",
        data: comData,
        success: function (data) {
            // 댓글 입력시 요소 생성

            const addNewComment = () => {
                // const newCommentLocation = document.getElementsByClassName('comment_list_ul')[0];
                // const newCommentLocation = document.getElementById("comment_list_div");
                const newCommentLocation = document.getElementById("comment_list_ul");
                const newComment = document.createElement('li');
                newComment.id = data.commentId;
                newComment.classList.add("comment-li")



                newComment.innerHTML = `
                     <div style="display: flex;" class="m-3">
                        <div class="col-1">
                           <span class="thumbnail size40 radius16" style="background-image: url(${data.profileSrc})"></span>
                        </div>

                        <div class="col-11" id="11col${data.commentId}">
                        <div id="2tmptmp${data.commentId}">
                            <div style="display: flex; justify-content: space-between">

                                <div style="display: flex; flex-direction: row">
                                    <div class="" style="margin-right: 10px;"><strong>${data.username}</strong></div>
                                    <div class="" style="font-size: 14px; padding-top: 3px; color: #AAAAAA;">${data.registerDateStr}
                                    </div>
                                </div>

                                <div style="display: flex;flex-direction: row">


                                    <div class="" style="margin-right: 5px"><!--수정-->
                                        <a class="bi bi-pencil-square" type="button" style="color: #AAAAAA;" href="#"
                                           onclick="modifyCalComment2(${data.commentId}, ${data.calComProjectId}, ${data.calComCalId})"></a>
                                    </div>
                                    <div class=""><!--삭제-->
                                        <a class="bi bi-trash3" type="button" style="color: #AAAAAA;" href="#"
                                           onclick="deleteCalComment(${data.commentId}, ${data.calComProjectId}, ${data.calComCalId})"></a>
                                    </div>
                                </div>
                            </div>

                            <div id="2cmtcmt${data.commentId}" style="padding-top: 8px; font-size: 15px;">${commentInput.value}</div>
                            </div>

                        </div>
                    </div>
                    <hr style="color: rgb(126,125,125);">
                 `;

                // newComment.innerHTML += `<!--<h5>이런식으로 추가가 가능합니다.</h5>-->`;


                newCommentLocation.appendChild(newComment);
                 commentInput.value = '';
            }


            if (commentInput.value) {
                addNewComment();
            } else {
                alert('댓글이 입력되지 않았습니다 😳');
            }


        }
    });


}


function deleteCalComment(commentId, projectId, calendarId ) {

    let data = {"commentId": commentId,
        "projectIdId" : projectId,
        "calendarId" : calendarId
    };
    $.ajax({
        type: "post",
        url: "/deleteCalComment",
        data: data,
        success: function (data) {
            document.getElementById(commentId).remove();
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
function closeModal() {
    $('#addScheduleModal').hide();
    $('#calendarForm')[0].reset();
    // $(".btn-close").click();
    // document.getElementById("mapImagee").remove();
    document.getElementById('imgDiv').style.display = 'none';

}

var fpStart = flatpickr(".startCalDate", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
});
var fpEnd = flatpickr(".endCalDate", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
});

function setDateTime(arg) {//일정 드래그 후, start end에 값 세팅하는 메서드
    // console.log("arg start : " + arg.startStr);
    // console.log("arg end : " + arg.endStr)

    var end;
    if(arg.modify == "yes") {
        end = new Date(new Date(arg.endStr).getTime());
    } else {
        end = new Date(new Date(arg.endStr).getTime() - 86400000);
    }
    var endDate = dateFormat(end).toString();

    var start = new Date(arg.startStr);
    var startDate = dateFormat(start).toString();

    if(arg.modify == "yes") {
        var fpStart2 = flatpickr(".modifyStartCalDate", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true,
            defaultDate: startDate
        });
        var fpEnd2 = flatpickr(".modifyEndCalDate", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true,
            defaultDate: endDate
        });

        fpStart2.setDate(startDate);
        fpEnd2.setDate(endDate);
    } else {
        fpStart.setDate(startDate);
        fpEnd.setDate(endDate);
    }
}

function dateFormat(date) {//yyyy-mm-dd 00:00(현재시간) 형식으로 반환하는 메서드
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    var today = new Date();
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}

// 사이드 스케줄
function closeTab() {
    $('.js-show-schedule').removeClass('show-header-cart');
}


// Next버튼을 누르면 달력 첫 번째, 마지막 날짜
$(document).on("click", "#calendar .fc-prev-button", function () {
    // console.log("pressed prev button");
    var calObj = calendarObj;
    // console.log(calObj.view.activeStart);
    // console.log(calObj.view.activeEnd);
});

// Prev버튼을 누르면 달력 첫 번째, 마지막 날짜
$(document).on("click", "#calendar .fc-next-button", function () {
    // console.log("pressed next button");
    var calObj = calendarObj;
    // console.log(calObj.view.activeStart);
    // console.log(calObj.view.activeEnd);
});


$(function () {
    $('#submitCalSchedule').on("click", function () {
        // var form1 = $("#frm").serialize();

        // var form1 = $("#calendarForm").serializeObject();
        var form1 = $("#calendarForm").serializeArray();
        // console.log("여러분 : " + JSON.stringify(form1));

        // console.log("폼입니다 : " + form1);
        // console.log("폼입니다 : " + form1.scheduleTitle);
        // console.log("폼입니다 : " + form1.startDate);
        // console.log("폼입니다 : " + form1.endDate);
        //
        // console.log("폼입니다 : " + form1.writeScheduleContent);
        // console.log("폼입니다다다다 : " + form1.addressInputId);
        // console.log("폼입니다다다닫 : " + form1.mapImage);

        var imageUrl = $('#mapImagee').attr('src');
        // console.log("hogggg  : " + imageUrl);
        // form1.mapImage = imageUrl;

        form1.push({name : "mapImage" , value : imageUrl});

        var projectIdd = document.getElementById("projectIdId").value;
        form1.push({name : "projectIdd" , value : projectIdd});

        dataType: 'json',
            $.ajax({
                type: "post",
                url: "/registerSchedule",
                data: form1,
                success: function (data) {
                    location.reload();
                }
            });
    });
});


// 수정
$(function () {
    $('#modifySubmitCalShedule').on("click", function () {
        var form2 = $("#modifyCalendarForm").serializeArray();

        var imageUrl = $('#mapImageeM').attr('src');
        // console.log("수정src :: " + imageUrl);
        form2.push({name : "mapImage" , value : imageUrl});
        var calId = document.getElementById("slideCalendarIdId").value;
        form2.push({name : "calId" , value : calId});
        var pjIdId = document.getElementById("projectIdId").value;
        form2.push({name : "projectId" , value : pjIdId});
        //
        var address = document.getElementById("modifyAddressInputId").value;
        form2.push({name : "address" , value : address});

        // console.log("수정씨 : " + JSON.stringify(form2));


        $.ajax({
            type: "post",
            url: "/modifySchedule",
            data: form2,
            success: function (data) {
                location.reload();
            }
        });
    });
});
