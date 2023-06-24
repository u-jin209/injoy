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

function addVoice() {

    const voiceTitle = document.getElementById("voiceTitle").value.toString()
    const resultList = document.getElementById("resultList").value.toString()

    console.log("voiceTitle  : " + voiceTitle)
    console.log("resultList  : " + resultList)


    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];

    const data = {
        "voiceTitle": voiceTitle,
        "voiceText": resultList,
        "projectId": projectId
    }
    $.ajax({
        type: 'GET',
        url: "/voice/insert",
        data: data,
        success: function (result) {
            $("#voiceModalClose").click();
            printVoiceList()

        }
    })
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
                      "  <div class='accordion-item'>"+
                            "<h2 class='accordion-header'>"+
                                "<button class='accordion-button collapsed' type='button' data-bs-toggle='collapse'"+
                                        "data-bs-target='#collapse"+item.voiceId+"' aria-expanded='false' aria-controls='collapse"+item.voiceId+"'>"+ item.voiceTitle+" 피드백" +"</button>"+
                            "</h2>"+
                            "<div id='collapse"+item.voiceId+"' class='accordion-collapse collapse ' data-bs-parent='#VoiceAccordion'>"+
                        " <div class='accordion-body'>" +
                        "<div class='row'><text>"+ item.voiceText +"</text></div>" +
                                    "<div class='row' style='justify-content: end'><button type=\"button\" class=\"btn btn-orange\" style='width: 60px;' name='"+item.voiceId+"' onclick=\"deleteVoice(this)\"> 삭제 </button></div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"
                    )


                })
            }
        }
    })
}
