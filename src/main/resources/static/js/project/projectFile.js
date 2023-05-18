Dropzone.autoDiscover = false;
const urlParams = new URL(location.href);
const projectId = urlParams.pathname.split('/')[2];
let folderRoot = document.getElementById("root").innerText;

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
            myDropzone.processQueue();  // 업로드 큐 처리
        });
        this.on("success", function(file, response) {
            console.log("파일 업로드 성공: " + response);
        });
        this.on("error", function(file, errorMessage) {
            console.log("파일 업로드 오류: " + errorMessage);
        });
    }
});

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

    folderRoot =  document.getElementById("root").innerText;

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
                    if(item.folderName == undefined){
                        $('#listBody').append(
                            "<tr class='folder-tr' >" +
                            "<td class='h-none text-center' ></td>" +
                            "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                            "<td class='h-none'></td>" +
                            "<td class='h-none'></td>" +
                            "<td class='h-none'></td>" +
                            "</tr>"
                        )
                        root.innerText= '/'
                    }else{
                        $('#listBody').append(
                            "<tr class='folder-tr'>" +
                            "<td class='h-none text-center'>" +
                            "<input class='folder-checkBox' type='checkbox'  value='" + item.folderId + "' name='checkfolder'/>" +
                            "</td>" +
                            "<td class='folder-name-area'  onclick='moveFolder(" + item.folderId + ")'>" +

                            "<div class='folder-img'>" +
                            "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#FFB30D' className='bi bi-folder-fill' viewBox='0 0 16 16'><path d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z'/></svg>" +
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
                        "<tr class='folder-tr' >" +
                        "<td class='h-none text-center' ></td>" +
                        "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "</tr>"
                    )

            }


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


