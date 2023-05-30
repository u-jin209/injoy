window.onload = function () {
    printWaitProject()


}


function setDisabled(value) {

    if (value.id == 'searchProject') {
        document.getElementById("searchInviteCode").disabled = true;
    } else {
        document.getElementById("searchProject").disabled = true;
    }


}

function  setAble(value){
    if (value.id == 'searchProject') {
        document.getElementById("searchInviteCode").disabled = false;
    } else {
        document.getElementById("searchProject").disabled = false;
    }
}
function enter(value) {

    if (window.event.keyCode == 13) {


        if (value.id == 'searchProject') {
            searchProject(0);
        } else {
            searchInviteCode();
        }

    }
}

function searchProject() {


    const keyword = document.getElementById('searchProject').value;

    console.log("searchProject keyword : " + keyword);

    $('#searchDivMain').empty()

    if (keyword != "") {
        const data = {
            "keyword": keyword
        }

        $.ajax({
            type: 'GET',
            url: "/project/search",
            data: data,
            success: function (result) {


                if (result.length >= 1) {
                    const searchDiv = document.getElementById("searchResult");
                    searchDiv.style.display = "";


                    result.forEach(function (item) {
                        $(document).ready(function () {

                            let organ =' ';
                            if( item.organName != undefined){
                                organ= item.organName
                            }


                            $('#searchDivMain').append(

                                "<div class='col-md-3 '  style='float: left'>"+
                                "<div class='project' style='padding: 10px 20px 10px 20px'>"+


                                "<div class='row' id= "+item.projectId+"style='height:20px ;' >"+
                                "<div class='col' style='text-align: left;'>" +
                                "<div class='subTitle' id='organName"+item.projectId+"' >"+organ+"</div>"+
                                "</div></div>"+


                                " <div class='row' style='height:100px ;text-align: left; display: block; MARGIN-RIGHT: 0;' id= "+item.projectId+" onclick='goProject(this)'>"+
                                "<div class='col projectTitle' style='float: left;margin: 5px 10px 0px 10px; OVERFLOW: hidden; TEXT-OVERFLOW: ellipsis;' >"+item.projectName+"</div>"+
                                "<div class='col explanationText' > "+item.explanation+"</div>"+
                                "</div>"+

                                "<div class ='row' style='justify-content: space-around'>" +
                                "<button class='btn btn-green' style='width: 65px;' id='enterBtnCode' name='" + item.projectId + "' onclick='enterProject(2)'> 참가 </button>" +

                                "</div>" +


                                "</div>"+
                                "</div>"
                            );

                        });

                    })



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
    document.getElementById("searchInviteCode").disabled = false;

}




function searchInviteCode() {


    const keyword = document.getElementById('searchInviteCode').value;

    console.log("code keyword : " + keyword);
    $('#searchCodeDivMain').empty()

    if (keyword != "") {
        const data = {
            "keyword": keyword
        }


        $.ajax({
            type: 'GET',
            url: "/project/inviteCode",
            data: data,
            success: function (item) {


                let organ =' ';
                if( item.organName != undefined){
                    organ= item.organName
                }


                    if (item.length != 0) {
                        console.log(item)
                        const searchDiv = document.getElementById("searchCodeResult");
                        searchDiv.style.display = "";
                        $('#searchCodeDivMain').append(
                            "<div class='col-md-3 '  style='float: left'>"+
                            "<div class='project' style='padding: 10px 20px 10px 20px'>"+


                            "<div class='row' id= "+item.projectId+"style='height:20px ;' >"+
                            "<div class='col' style='text-align: left;'>" +
                            "<div class='subTitle' id='organName"+item.projectId+"' >"+organ+"</div>"+
                            "</div></div>"+


                            " <div class='row' style='height:100px ;text-align: left; display: block; MARGIN-RIGHT: 0;' id= "+item.projectId+" onclick='goProject(this)'>"+
                            "<div class='col projectTitle' style='float: left;margin: 5px 10px 0px 10px; OVERFLOW: hidden; TEXT-OVERFLOW: ellipsis;' >"+item.projectName+"</div>"+
                            "<div class='col explanationText' > "+item.explanation+"</div>"+
                            "</div>"+

                            "<div class ='row' style='justify-content: space-around'>" +
                            "<button class='btn btn-green' style='width: 65px;' id='enterBtnCode' name='" + item.projectId + "' onclick='enterProject(2)'> 참가 </button>" +

                            "</div>" +


                            "</div>"+
                            "</div>"

                        );

                        printWaitProject()
                    } else {
                        const searchDiv = document.getElementById("searchCodeResult");
                        searchDiv.style.display = "none";

                        Swal.fire({
                            title: "검색 결과가 없습니다.",
                            icon: "question"
                        });
                    }



            }

        });
    } else {
        const searchDiv = document.getElementById("searchCodeResult");
        searchDiv.style.display = "none";
        Swal.fire({
            title: "검색어를 입력해 주세요",
            icon: "warning"
        });

    }
    document.getElementById("searchProject").disabled = false;

}


function enterProject(option) {
    var projectId;
    console.log("sssssssss");
    if (option == 1) {
        projectId = document.getElementById("enterBtn").name;


    } else if (option == 2) {
        projectId = document.getElementById("enterBtnCode").name;
    }

    const data = {
        "projectId": projectId
    }


    $.ajax({
        type: 'GET',
        url: "/member/insert/" + projectId+"/REQUEST",
        data: data,
        success: function (result) {
            if (option == 1) {
                const searchDiv = document.getElementById("searchResult");
                searchDiv.style.display = "none";

            } else if (option == 2) {
                const searchDiv = document.getElementById("searchCodeResult");
                searchDiv.style.display = "none";
            }
            printWaitProject()

            Swal.fire({
                title: "참여 요청 완료되었습니다",
                icon: "success"
            })


        }
    });


}

function printWaitProject() {

    console.log("fdfsdfweflwifohdsiugokhdsk;igesd")
    const data = {
        "massage": "wait"
    }
    $.ajax({
        type: 'GET',
        url: "/project/waitList",
        data: data,
        success: function (result) {


            console.log("result :" +result)
            $('#projectContainer').empty()

            if (result.length >= 1) {


                result.forEach(function (item) {
                    $(document).ready(function () {
                        const noneWait = document.getElementById("noneWait");
                        noneWait.style.display = "none";
                        let organ =' ';
                        if( item.organName != undefined){
                            organ= item.organName
                        }


                        $('#projectContainer').append(
                            "<div class='col-md-3 '  style='float: left'>"+
                            "<div class='project' style='padding: 10px 20px 10px 20px'>"+

                            "<div class='row' id= "+item.projectId+" >"+
                            "<div class='col' style='float: left;'>" +
                            "<div class='subTitle' id='organName"+item.projectId+"' >"+organ+"</div>"+
                            "</div></div>"+

                            " <div class='row' style='display: block; MARGIN-RIGHT: 0;min-height: 100px' id= "+item.projectId+" onclick='goProject(this)'>"+
                            "<div class='col projectTitle' style='margin: 5px 10px 0px 10px; OVERFLOW: hidden; TEXT-OVERFLOW: ellipsis;' >"+item.projectName+"</div>"+
                            "<div class='col explanationText' > "+item.explanation+"</div>"+
                            "</div>"+

                            " <div class='row' style='display: block; text-align: right;MARGIN-RIGHT: 0;'>"+

                            "<button class='btn ' onclick='cancelEnter("+item.projectId+","+item.userId+")' > <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25'\n" +
                            "                    fill='#F5544D' class='bi bi-dash-square' viewBox='0 0 16 16'>\n" +
                            "                    <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/>\n" +
                            "                     <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'/>\n" +
                            "                                            </svg> </button>"+
                            "</div>"+
                            "</div>"
                        );
                        if (item.organName ==null){

                            const organName = document.getElementById("organName"+item.projectId)
                            organName.innerText = ""
                        }
                    });

                })

            } else {


               const  noneWait  = document.getElementById("noneWait")
                noneWait.style.display ="block"


            }


        }
    });

}

function cancelEnter(projectId, userId){

    const data = {
        "projectId":projectId,
        "userId":userId
    }
    $.ajax({
        type: 'GET',
        url: "/member/delete",
        data: data,
        success: function (result) {
            printWaitProject()
            Swal.fire({
                title: "취소 되었습니다",
                icon: "success"
            })


        }
    })

}


