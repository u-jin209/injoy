Dropzone.autoDiscover = false;
const urlParams = new URL(location.href);
const projectId = urlParams.pathname.split('/')[2];

document.getElementById("addFileBtn").onclick =function (){

    let folderRoot ;
    const root = document.getElementById("root").innerText;
    if (root == "/"){
        folderRoot = root;
    }else{
        folderRoot = root.slice(0,-1)
    }

    var myDropzone = new Dropzone("#my-dropzone", {


        url: "/file/insert", // 업로드 처리를 수행할 서버의 엔드포인트 URL을 여기에 입력하세요
        paramName: "file",
        autoProcessQueue: false,// 서버에서 파일을 처리하는데 사용할 매개변수 이름을 여기에 입력하세요
        maxFilesize: 10, // 업로드 가능한 파일의 최대 크기를 메가바이트 단위로 여기에 입력하세요
        addRemoveLinks: true, // 파일 제거 링크를 표시할지 여부를 여기에 입력하세요
        dictRemoveFile: "Remove", // 파일 제거 링크에 표시할 텍스트를 여기에 입력하세요
        params: {  // 추가 데이터 지정
            "projectId": projectId,
            "folderRoot" : folderRoot
        },

        init: function() {


            // 업로드 버튼 클릭 시 이벤트 처리
            document.querySelector("#upload-btn").addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                myDropzone.processQueue();



            });
            this.on("success", function(file, response) {
                $(".btn-close").click();// 업로드 큐 처리
                printFolder(document.getElementById("root").innerText)
                console.log("파일 업로드 성공: " + response);
                myDropzone.destroy();

            });
            this.on("error", function(file, errorMessage) {
                console.log("파일 업로드 오류: " + errorMessage);
            });

        }
    });


};


function addFolder() {
    const folderRoot = document.getElementById("root").innerText.toString()
    const folderName = document.getElementById("folderName").value.toString()
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];

    const data = {
        "folderRoot": folderRoot,
        "folderName": folderName,
        "projectId": projectId
    }

    $.ajax({
        type: 'GET',
        url: "/folder/insert",
        data: data,
        success: function (result) {
            $('.btn-close').click();
            document.getElementById("folderName").value=''
            printFolder(folderRoot);
        }
    })
}

function printFolder(folderRoot) {


    $('#listBody').empty();
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];
    $.ajax({
        type: 'GET',
        url: "/folder/folderList",
        data: {
            "folderRoot": folderRoot,
            "projectId": projectId
        },

        success: function (result) {

            if (folderRoot != "/") {
                $('#listBody').append(
                    "<tr class='folder-tr' onclick='backFolder()' >" +
                    "<td class='h-none text-center' >" +

                    "<i class='fa-solid fa-chevron-up fa-fade'></i>" +


                    "</td>" +
                    "<td class='h-none'>뒤로가기</td>" +
                    "<td class='h-none'></td>" +
                    "<td class='h-none'></td>" +
                    "<td class='h-none'></td>" +
                    "</tr>"
                )

            }

            if (result.length >= 1) {

                result.forEach(function (item) {
                    const root = document.getElementById("root")
                    root.name= item.folderId
                    if (item.folderName != undefined){



                        $('#listBody').append(
                            "<tr class='folder-tr'>" +
                            "<td class='h-none text-center'>" +
                            "<input class='folder-checkBox' type='checkbox'  value='" + item.folderId + "' name='checkfolder'/>" +
                            "</td>" +
                            "<td class='folder-name-area'  onclick='moveFolder(" + item.folderId + ")'>" +

                            "<div class='folder-img'>" +
                            "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#FFB30D' class='bi bi-folder-fill' viewBox='0 0 16 16'><path d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z'/></svg>" +
                            "</div>" +
                            "<span class='folder-name'  id='folderName" + item.folderId + "' >" + item.folderName + "</span>" +
                            "</td>" +
                            "<td class='text-center' >-</td>" +
                            "<td class='text-center'  >" + item.name  +"</td>" +
                            "<td class='text-center' >" + item.crtDate + "</td>" +
                            "</tr>"
                        )
                    }else if(result.length == 1 && item.folderName == undefined){
                        $('#listBody').append(
                            "<tr class='folder-tr' id='emptyFolder'>" +
                            "<td class='h-none text-center' ></td>" +
                            "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                            "<td class='h-none'></td>" +
                            "<td class='h-none'></td>" +
                            "<td class='h-none'></td>" +
                            "</tr>"
                        )
                    }


                })

            } else {

                    $('#listBody').append(
                        "<tr class='folder-tr' id='emptyFolder'>" +
                        "<td class='h-none text-center' ></td>" +
                        "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "</tr>"
                    )

            }

            printFile(folderRoot)
        }
    })

}

function backFolder() {

    const root = document.getElementById("root")
    const nowRoot = document.getElementById("root").innerText.toString().slice(0, -1)
    const back = nowRoot.lastIndexOf("/")
    const backRoot = nowRoot.slice(0, back + 1)
    const moveRoot = document.getElementById("moveRoot")
    const moveNowRoot = document.getElementById("moveNowRoot")

    root.innerText = backRoot

    moveRoot.innerText = backRoot
    moveNowRoot.innerText= backRoot
    printFolder(backRoot)


}

function moveFolder(folderId) {
    const root = document.getElementById("root")
    const name = document.getElementById("folderName" + folderId).innerText
    const newRoot = root.innerText + name + "/"
    const moveRoot = document.getElementById("moveRoot")
    const moveNowRoot = document.getElementById("moveNowRoot")
    root.innerText = newRoot

    moveRoot.innerText = newRoot
    moveNowRoot.innerText = newRoot
    printFolder(newRoot)
}

function modalBackFolder() {


    const nowRoot = document.getElementById("moveNowRoot").innerText.toString().slice(0, -1)
    const back = nowRoot.lastIndexOf("/")
    const backRoot = nowRoot.slice(0, back + 1)
    const moveNowRoot = document.getElementById("moveNowRoot")

    moveNowRoot.innerText = backRoot
    movePrint(backRoot)


}

function  modalMoveFolder(folderId) {
    const moveNowRoot = document.getElementById("moveNowRoot")
    const name = document.getElementById("modalFolder" + folderId).innerText
    const newRoot = moveNowRoot.innerText + name + "/"


    moveNowRoot.innerText = newRoot;

    movePrint(newRoot)


}



function deleteClick(){
    const root = document.getElementById("moveNowRoot")

    var folderArr = "";
    $("input:checkbox[name='checkfolder']:checked").each(function () {
        folderArr = folderArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    var fileArr = "";
    $("input:checkbox[name='checkFile']:checked").each(function () {
        fileArr = fileArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    if (fileArr.length == 0 && folderArr.length == 0 ) {
        Swal.fire({
            title: "선택 항목이 없습니다.",
            icon: "question"
        });
    }
    if (folderArr.length != 0) {


        Swal.fire({
            title: '모든 하위폴더와 파일이 삭제 됩니다. ', text: '그래도 삭제하시겠습니까?', icon: 'warning',
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: '/folder/delete',
                    type: 'post',
                    data: {"folderArr":folderArr},
                    success: () => {
                        if(fileArr.length != 0){
                            $.ajax({
                                url: '/file/delete',
                                type: 'post',
                                data: {
                                    "fileArr" : fileArr
                                },
                                success: () => {

                                }
                            })
                        }
                        printFolder(root.innerText)
                    }
                })
            }
        })
    }
    else if (fileArr.length != 0){
        $.ajax({
            url: '/file/delete',
            type: 'post',
            data: {
                "fileArr" : fileArr
            },
            success: () => {
                printFolder(root.innerText)
            }
        })
    }

}

function checkFolderName() {
    var folderName = $('#folderName').val();
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];
    const folderRoot = document.getElementById("root").innerText
    $.ajax({
        url: '/folder/checkName', //Controller에서 요청 받을 주소
        type: 'post', //POST 방식으로 전달
        data: {
            "folderName": folderName,
            "projectId": projectId,
            "folderRoot": folderRoot
        },
        success: function (cnt) { //컨트롤러에서 넘어온 cnt값을 받는다
            if (cnt == 0) { //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                $('#existFolderName').css("display", "none");

            } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                $('#existFolderName').css("display", "inline-block");
            }
        },
        error: function () {
            alert("에러입니다");
        }
    });
};




function printFile(folderRoot){

    console.log("printFile folderRoot: "  +folderRoot)
    $.ajax({
        url: '/file/fileList', //Controller에서 요청 받을 주소
        type: 'GET', //POST 방식으로 전달
        data: {
            "folderRoot": folderRoot.slice(0,-1),
            "projectId": projectId
        },
        success: function (result) {
            if (result.length >= 1) {

                $('#emptyFolder').css('display','none');


                result.forEach(function (item) {



                    $('#listBody').append(
                        "<tr class='file-tr'>" +
                        "<td class='h-none text-center'>" +
                        "<input class='file-checkBox' type='checkbox'  value='" + item.fileId + "' name='checkFile'/>" +
                        "</td>" +
                        "<td class='file-name-area'>" +
                        "<div class='file-img' id ='file-img"+item.fileId+"' style='display: inline-table;'>" +

                        "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#3064B3'class='bi bi-image-fill' viewBox='0 0 16 16'><path d='M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z'/> </svg>" +
                        "</div> " +
                        "<span class='file-name '>"+item.fileName+item.fileExtension+"</span> " +
                        "</td>" +
                        "<td class='text-center'>"+item.fileSize+"</td>" +
                        "   <td class='text-center'>"+item.name+"</td>" +
                        "    <td class='text-center'>"+item.crtDate+"</td>"+
                        "</tr>"
                    )

                    if(item.fileExtension == '.pdf'){
                        $('#file-img'+item.fileId).empty()
                        $('#file-img'+item.fileId).append(
                            "<svg xmlns='http://www.w3.org/2000/svg' fill='#3064B3' viewBox='0 0 512 512'><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d='M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z'/></svg>"
                        )


                    }else if(item.fileExtension == '.txt'){
                        $('#file-img'+item.fileId).empty()
                        $('#file-img'+item.fileId).append(
                            "<svg xmlns='http://www.w3.org/2000/svg' fill='#3064B3' viewBox='0 0 512 512'><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d='M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z'/></svg>"
                        )

                    }else if(item.fileExtension == '.csv'){
                        $('#file-img'+item.fileId).empty()
                        $('#file-img'+item.fileId).append(

                            "<svg xmlns='http://www.w3.org/2000/svg' fill='#3064B3'  viewBox='0 0 512 512'><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d='M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM200 352h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40zm133.1 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H333.1c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16v31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66V368c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V368c0-8.8 7.2-16 16-16z'/></svg> "
                        )
                    }
                    else if(item.fileExtension == '.ppt' || item.fileExtension == '.pptx'){
                        $('#file-img'+item.fileId).empty()
                        $('#file-img'+item.fileId).append(

                            "<i class=' fa-solid fa-file-powerpoint fa-2xl'  style='color:#3064B3; ' ></i>"
                        )
                    }
                    else if(item.fileExtension == '.docx'||item.fileExtension == '.doc' || item.fileExtension =='.hwp'){
                        $('#file-img'+item.fileId).empty()
                        $('#file-img'+item.fileId).append(
                            "<i class='fa-solid fa-file-word fa-2xl' style='color:#3064B3; ' ></i>"
                        )
                    }


                })
            }
        }

    })
}

function FileSearchEnter(value) {

    if (window.event.keyCode == 13) {

        searchProject(value.value)
        console.log("input value :" + value.value)

    }
}


function searchProject(keyword) {



    if (keyword != "") {
        const data = {
            "keyword": keyword,
            "projectId": projectId
        }

        $.ajax({
            type: 'GET',
            url: "/file/searchFile",
            data: data,
            success: function (result) {

                console.log("sfdklsdhfoisdfhgoiweshoiewe")
                if (result.length >= 1) {
                    $('#listBody').empty()
                    $('#listBody').append(
                        "<tr class='folder-tr' onclick='printFolder(\""+'/'+"\")' >" +
                        "<td class='h-none text-center' >" +

                        "<i class='fa-solid fa-x fa-beat' style='color: #FC4C70; '></i>" +


                        "</td>" +
                        "<td class='h-none' style='color: #FC4C70;font-weight: bold;font-size: large;'>검색종료</td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "</tr>"
                    )
                    result.forEach(function (item) {



                            $('#listBody').append(
                                "<tr class='file-tr'>" +
                                "<td class='h-none text-center'>" +
                                "<input class='file-checkBox' type='checkbox'  value='" + item.fileId + "' name='checkFile'/>" +
                                "</td>" +
                                "<td class='file-name-area'>" +
                                "<div class='file-img'>" +
                                "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#3064B3'class='bi bi-image-fill' viewBox='0 0 16 16'><path d='M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z'/> </svg>" +
                                "</div> " +
                                "<span class='file-name '>"+item.fileName+"</span> " +
                                "</td>" +
                                "<td class='text-center'>"+item.fileSize+"</td>" +
                                "   <td class='text-center'>"+item.name+"</td>" +
                                "    <td class='text-center'>"+item.crtDate+"</td>"+
                                "</tr>"
                            )
                        });





                } else {

                    Swal.fire({
                        title: "검색 결과가 없습니다.",
                        icon: "question"
                    });
                }

            }
        })
    } else {
        Swal.fire({
            title: "검색어를 입력해 주세요",
            icon: "warning"
        });

    }


}

function  downloadFile(){
    const root = document.getElementById("root")

    var folderArr = "";
    $("input:checkbox[name='checkfolder']:checked").each(function () {
        folderArr = folderArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    var fileArr = "";
    $("input:checkbox[name='checkFile']:checked").each(function () {
        fileArr = fileArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    if (folderArr.length != 0 || fileArr.length != 0){

        $.ajax({
            url: '/file/downloadFile',
            type: 'GET',
            data: {"fileArr":fileArr},
            success: () => {}
        })
    }else{
        Swal.fire({
            title: '선택 항목이 없습니다!',
            icon: 'warning'
        })
    }


}




function movePrint(folderRoot){
    console.log("folderRoot :" + folderRoot)
    $('#moveBody').empty();

    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];
    $.ajax({
        type: 'GET',
        url: "/folder/folderList",
        data: {
            "folderRoot": folderRoot,
            "projectId": projectId
        },

        success: function (result) {

            if (folderRoot != "/") {

                $('#moveBody').append(
                    "<tr class='folder-tr' onclick='modalBackFolder()' >" +

                    "<td class='h-none'>" +
                    "<i class='fa-solid fa-chevron-up fa-fade' style='margin-right: 30px'></i>" +
                    "뒤로가기</td>" +

                    "</tr>"
                )
            }

            if (result.length >= 1) {

                result.forEach(function (item) {
                    const root = document.getElementById("moveNowRoot")
                    root.name= item.folderId
                    if (item.folderName != undefined){


                        $('#moveBody').append(
                            "<tr class='folder-tr'>" +

                            "<td class='folder-name-area'  onclick='modalMoveFolder(" + item.folderId + ")'>" +

                            "<div class='folder-img'>" +
                            "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#FFB30D' class='bi bi-folder-fill' viewBox='0 0 16 16'><path d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z'/></svg>" +
                            "</div>" +
                            "<span class='folder-name'  id='modalFolder" + item.folderId + "' >" + item.folderName + "</span>" +
                            "</td>" +

                            "</tr>"
                        )



                    }else if(result.length == 1 && item.folderName == undefined){
                        $('#moveBody').append(
                            "<tr class='folder-tr' id='emptyFolder'>" +

                            "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                            "</tr>"
                        )
                    }


                })

            } else {

                $('#moveBody').append(
                    "<tr class='folder-tr' id='emptyFolder'>" +

                    "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                    "</tr>"
                )

            }
        }
    })

}

function openMoveModal(){
    const root = document.getElementById("moveNowRoot")
    movePrint(root.innerText);


    var folderArr = "";
    $("input:checkbox[name='checkfolder']:checked").each(function () {
        folderArr = folderArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    console.log("move folderArr : "+ folderArr);
    var fileArr = "";
    $("input:checkbox[name='checkFile']:checked").each(function () {
        fileArr = fileArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    if (fileArr.length == 0 && folderArr.length == 0 ) {
        Swal.fire({
            title: "선택 항목이 없습니다.",
            icon: "question"
        });
    }else{



        setCookie("folderArr", folderArr, 1);
        setCookie("fileArr", fileArr, 1);


        $('#moveModal').modal('show');
    }


}

function moveFile(){

    const root = document.getElementById("moveNowRoot")

    const fileArr = getCookie("fileArr");
    const folderArr = getCookie("folderArr");

    console.log("folderArr not null " + folderArr.length)

    if(folderArr.length != 0){
        $.ajax({
            url: '/folder/update',
            type: 'get',
            data: { "root" :root.innerText,
                "folder":folderArr},
            success: () => {
                deleteCookie(folderArr)
                if(fileArr.length == 0){
                    deleteCookie(fileArr)
                    $("#moveModal").modal('hide');
                }
                printFolder( document.getElementById("moveRoot").innerText)
            }
        })
    }

    if (fileArr.length != 0){
        $.ajax({
            url: '/file/update',
            type: 'get',
            data: {
                "root" :root.innerText,
                "file" : fileArr
            },
            success: () => {
                deleteCookie(folderArr)
                deleteCookie(fileArr)
                $("#moveModal").modal('hide');
                printFolder( document.getElementById("moveRoot").innerText)

            }
        })


    }




}


var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

var deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
