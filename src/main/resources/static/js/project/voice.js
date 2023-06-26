window.onload = function (){
    printVoiceList()
}


if (!("webkitSpeechRecognition") in window) {
    alert("Connect in Chrome Browser");
} else {
    const speech = new webkitSpeechRecognition;

    document.getElementById("rcdStart").addEventListener("click", () => {

        $("#startIcon").css("color", "#FC4C70")
        speech.start();
    });
    document.getElementById("rcdStop").addEventListener("click", () => {
        $("#startIcon").css("color", "")
        speech.stop();
    });

    speech.addEventListener("result", (event) => {
        console.log(event);
        const {transcript} = event["results"][0][0];
        console.log(transcript);
        resultListView(transcript);
    });

    function resultListView(transcript) {
        document.getElementById("resultList").value = transcript;
    }

}

function emptyTask(){
    Swal.fire({
        title: "작성된 업무가 없습니다",
        icon: "warning"
    })
}


function addVoice() {

    if(taskList.length !=0 ){
        const voiceTitle = document.getElementById("voiceTitle").value.toString()
        const resultList = document.getElementById("resultList").value.toString()


        const urlParams = new URL(location.href);
        const projectId = urlParams.pathname.split('/')[2];

        const data = {
            "voiceTitle": voiceTitle,
            "voiceText": resultList,
            "projectId": projectId
        }

        if (voiceTitle != "" && resultList !="") {
            $.ajax({
                type: 'GET',
                url: "/voice/insert",
                data: data,
                success: function (result) {
                    $("#voiceModalClose").click();
                    printVoiceList()

                }
            })

        }else if(voiceTitle == ""){
            Swal.fire({
                title: "선택된 업무가 없습니다",
                icon: "warning"
            })

        }else if(resultList == ""){
            Swal.fire({
                title: "피드백 내용이 없습니다",
                icon: "warning"
            })

        }




    }else{
        Swal.fire({
            title : "등록된 업무가 없습니다!",
            text :"업무 추가후 시도해 주세요",
            icon : "warning",

        })
    }

}
function deleteVoice(value){
    const voiceId = value.name

    const data = {
        "voiceId": voiceId,

    }

    $.ajax({
        type: 'POST',
        url: "/voice/delete",
        data: data,
        success: function (result) {
            printVoiceList()
        }
    })

}
function printVoiceList() {


    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];

    const data = {

        "projectId": projectId
    }

    $('#VoiceAccordion').empty();

    $.ajax({
        type: 'GET',
        url: "/voice/voiceList",
        data: data,
        success: function (result) {
            if (result.length >= 1) {

                result.forEach(function (item) {


                    $('#VoiceAccordion').append(
                        "  <div class='accordion-item'>" +
                        "<h2 class='accordion-header'>" +
                        "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse'" +
                        "data-bs-target='#collapse" + item.voiceId + "' aria-expanded='false' aria-controls='collapse" + item.voiceId + "'>" + item.voiceTitle + " 피드백" + "</button>" +
                        "</h2>" +
                        "<div id='collapse" + item.voiceId + "' class='accordion-collapse collapse ' data-bs-parent='#VoiceAccordion'>" +
                        " <div class='accordion-body'>" +
                        " <div class=\"row contentText\" style=\"margin-left: auto;margin-top: 20px\"> 피드백 내용 </div>"+
                        "<div class='row'><i style='margin-top: 20px' class=\"fa-solid fa-volume-high fa-lg\" id='feedBack" + item.voiceId + "' name='" + item.voiceText +"'></i></text></div>" +
                        " <div class=\"row contentText\" style=\"margin-left: auto;margin-top: 20px\"> 피드백 번역 </div>"+
                        "<div class='row'><div class='col-md-3'>"+
                        " <select id='translation" + item.voiceId + "'  style='margin-top: 20px'  class=\"form-select form-select-sm\" aria-label=\".form-select-sm example\">" +
                        "                                                   <option value='' disabled selected>번역하기</option>" +
                        "                                                   <option value=\"1\">English</option>" +
                        "                                                   <option value=\"2\">korean</option>" +
                        "                                            </select></div></div>" +
                        "<div class='row'><text style='margin-top: 20px'>" + item.voiceText + "</text></div>" +
                        "<div class='row' style='justify-content: end'><button type=\"button\" class=\"btn btn-orange\" style='width: 60px;' name='" + item.voiceId + "' onclick=\"deleteVoice(this)\"> 삭제 </button></div>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    )


                })
            }else{
                $('#VoiceAccordion').append(
                    "<div class='row' style='justify-content: center;margin-top: 100px'><img src='/img/warning.png' style='width:180px '/></div>"+
                    "  <div class='row contentText' style='justify-content: center'> 비어있습니다 피드백을 남겨 주세요 </div>"
                )

            }

        }
    })
}
