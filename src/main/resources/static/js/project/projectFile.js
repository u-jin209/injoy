// 제이쿼리도 지원
$("div.dropzone").dropzone({
    url: "/",
    method: 'post',
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

            if (result.length >= 1) {

                result.forEach(function (item) {

                    $('#listBody').append(
                        "<tr class='folder-tr' onclick='moveFolder("+item.folderId+")'>" +
                        "<td class='folder-name-area'>" +
                        "<input class='folder-checkBox' type='checkbox' value='"+item.folderId+"' name='checkfolder'/>" +
                        "<div class='folder-img'>" +
                        "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#FFB30D' className='bi bi-folder-fill' viewBox='0 0 16 16'><path d='M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z'/></svg>" +
                        "</div>" +
                        "<span class='folder-name'  id='folderName"+item.folderId+"' >" + item.folderName + "</span>" +
                        "</td>" +
                        "<td class='text-center'>-</td>" +
                        "<td class='text-center'>" + item.name + "</td>" +
                        "<td class='text-center'>" + item.crtDate + "</td>" +
                        "</tr>"
                    )


                })
            } else {

            }
        }


    })

}

function moveFolder(folderId) {
    const root = document.getElementById("root")
    const name = document.getElementById("folderName"+folderId).innerText
    console.log("folderName : " + name)
    const newRoot = root.innerText +name
    console.log("newRoot : " + newRoot)

    root.innerText=newRoot

    printFolder(newRoot)
}


function folderDeleteClick(){
    const root = document.getElementById("root")

    var checkBoxArr = "";
    $("input:checkbox[name='checkfolder']:checked").each(function() {
        checkBoxArr =checkBoxArr + $(this).val()+",";     // 체크된 것만 값을 뽑아서 배열에 push
        console.log(checkBoxArr);
    })
    if (checkBoxArr.length !=0){
        $.ajax({
            type  : "POST",
            url    : "/folder/delete",
            data: {
                checkBoxArr : checkBoxArr        // folder seq 값을 가지고 있음.
            },
            success: function(result){
                printFolder(root.innerText)
            }
        });


    }else{
        Swal.fire({
            title: "선택 항목이 없습니다.",
            icon: "question"
        });
    }


}


function checkFolderName(){
    var folderName = $('#folderName').val();
    const urlParams = new URL(location.href);
    const projectId = urlParams.pathname.split('/')[2];
    const folderRoot = document.getElementById("root").innerText
    $.ajax({
        url:'/folder/checkName', //Controller에서 요청 받을 주소
        type:'post', //POST 방식으로 전달
        data:{
            "folderName":folderName,
            "projectId" : projectId,
            "folderRoot":folderRoot
        },
        success:function(cnt){ //컨트롤러에서 넘어온 cnt값을 받는다
            if(cnt == 0){ //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                $('#existFolderName').css("display","none");

            } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                $('#existFolderName').css("display","inline-block");
            }
        },
        error:function(){
            alert("에러입니다");
        }
    });
};
