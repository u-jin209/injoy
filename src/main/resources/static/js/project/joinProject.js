window.onload = function () {
    printWaitProject()
    // $(document).ready(function () {
    //     console.log("22222222222")
    //     $('.slider responsive').slick({
    //         dots: true,
    //         infinite: false,
    //         speed: 300,
    //         slidesToShow: 4,
    //         slidesToScroll: 4,
    //         responsive: [
    //             {
    //                 breakpoint: 1024,
    //                 settings: {
    //                     slidesToShow: 3,
    //                     slidesToScroll: 3,
    //                     infinite: true,
    //                     dots: true
    //                 }
    //             },
    //             {
    //                 breakpoint: 600,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 2
    //                 }
    //             },
    //             {
    //                 breakpoint: 480,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //             // You can unslick at a given breakpoint now by adding:
    //             // settings: "unslick"
    //             // instead of a settings object
    //         ]
    //     });
    // });


}


function setDisabled(value) {

    if (value.id == 'searchProject') {
        document.getElementById("searchInviteCode").disabled = true;
    } else {
        document.getElementById("searchProject").disabled = true;
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


                            $('#searchDivMain').append(

                                " <div class='card mb-3' style='max-width: 540px;'>" +
                                "<div class = 'row g-0'>" +
                                "<div class='col-md-4'>" +
                                " <img src='" + item.username + "' class='member' alt='...'>" +
                                "</div>" +
                                "<div class='col-md-8'>" +
                                "<div class='card-body' style='text-align: left'>" +
                                "<h5 class='card-title'>" + item.projectName + "</h5>" +
                                "<p class='card-text'>" + item.explanation + "</p>" +
                                "<div style='text-align: end'>" +
                                "<button class='btn-blue' style='width: 50px;' id='enterBtn' name='" + item.projectId + "' onclick='enterProject(1)'> 참가 </button>" +

                                "</div>" +

                                "</div>" +
                                "</div>" +
                                "</div>" +
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


// function pageNation(option){
//     if(option == -1){
//         const previous = document.getElementById("previousBtn").name
//         if (previous == 0){
//             Swal.fire({
//                 title: "가장 첫 페이지 입니다",
//                 icon: "warning"
//             });
//         }else{
//
//             document.getElementById("previousBtn").name = previous-2;
//             searchProject(previous-2);
//         }
//
//
//     }else if(option == 1) {
//
//
//     }
// }

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
            success: function (result) {

                console.log(result)
                if (result != null) {
                    const searchDiv = document.getElementById("searchCodeResult");
                    searchDiv.style.display = "";

                    if (result.length >= 1) {

                        $('#searchCodeDivMain').append(
                            " <div class='card mb-3' style='max-width: 540px;'>" +
                            "<div class = 'row g-0'>" +
                            "<div class='col-md-4'>" +
                            " <img src='" + result.username + "' class='member' alt='...'>" +
                            "</div>" +
                            "<div class='col-md-8'>" +
                            "<div class='card-body' style='text-align: left'>" +
                            "<h5 class='card-title'>" + result.projectName + "</h5>" +
                            "<p class='card-text'>" + result.explanation + "</p>" +
                            "<div style='text-align: end'>" +
                            "<button class='btn-blue' style='width: 50px;' id='enterBtnCode' name='" + result.projectId + "' onclick='enterProject(2)'> 참가 </button>" +

                            "</div>" +

                            "</div>" +
                            "</div>" +
                            "</div>" +
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
        url: "/member/insert/" + projectId,
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

    const data = {
        "massage": "wait"
    }
    $.ajax({
        type: 'GET',
        url: "/project/waitList",
        data: data,
        success: function (result) {

            console.log("waitLLLLLLs")
            console.log("result : " + result)
            $('#projectContainer').empty()


            if (result.length >= 1) {


                result.forEach(function (item) {
                    $(document).ready(function () {
                        const noneWait = document.getElementById("noneWait");
                        noneWait.style.display = "none";

                        $('#projectContainer').append(
                            " <div class='col-md-3' >" +
                            "<div class='project' style='padding: 10px 20px 10px 20px'>" +
                            "<div class='row'>" +
                            "<div style='float: left;'>" +
                            "<div class='subTitle'>" + item.projectName + "</div>" +
                            "<div class='explanationText'>" + item.explanation + "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
                        );

                    });

                })

            } else {
                $('#noneWait').append(
                    "<div class='card' style='min-height: 300px;padding: 150px; text-align: center;'>" +
                    "<h1 class='projectTitle'>승인 대기중인 프로젝트가 없습니다</h1>" +
                    "</div>"
                );
            }


        }
    });

}

