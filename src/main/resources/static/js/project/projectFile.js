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
                myDropzone.destroy();
                $(".btn-close").click();// 업로드 큐 처리
            });
            this.on("success", function(file, response) {
                console.log("파일 업로드 성공: " + response);
                myDropzone.destroy();

                printFolder(document.getElementById("root").innerText)
            });
            this.on("error", function(file, errorMessage) {
                console.log("파일 업로드 오류: " + errorMessage);
            });
        }
    });


};
function openDrop() {
    const fileUpload = document.getElementById("fileUpload")
    fileUpload.style.display = 'unset'
}


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

    console.log("folderRoot :" + folderRoot)

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
                            "<td class='text-center'  >" + item.name + "</td>" +
                            "<td class='text-center' >" + item.crtDate + "</td>" +
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


    root.innerText = backRoot


    printFolder(backRoot)


}

function moveFolder(folderId) {
    const root = document.getElementById("root")
    const name = document.getElementById("folderName" + folderId).innerText
    const newRoot = root.innerText + name + "/"

    root.innerText = newRoot

    printFolder(newRoot)
}


function folderDeleteClick() {
    const root = document.getElementById("root")

    var checkBoxArr = "";
    $("input:checkbox[name='checkfolder']:checked").each(function () {
        checkBoxArr = checkBoxArr + $(this).val() + ",";     // 체크된 것만 값을 뽑아서 배열에 push
    })
    if (checkBoxArr.length != 0) {
        $.ajax({
            type: "POST",
            url: "/folder/delete",
            data: {
                checkBoxArr: checkBoxArr        // folder seq 값을 가지고 있음.
            },
            success: function (result) {
                printFolder(root.innerText)
            }
        });


    } else {
        Swal.fire({
            title: "선택 항목이 없습니다.",
            icon: "question"
        });
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

    console.log("printFile folderId: "  +folderRoot)
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

                    result.forEach(function (item) {
                        $(document).ready(function () {
                            $('#listBody').empty()

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

                    })



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
