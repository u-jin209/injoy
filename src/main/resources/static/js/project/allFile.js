
window.onload = function (){
    printAllFile()
}
function printAllFile(){
    $('#listBody').empty()
    $.ajax({
        url: '/file/allList', //Controller에서 요청 받을 주소
        type: 'GET', //POST 방식으로 전달
        data: {

        },
        success: function (result) {
            const text = "전체 "+result.length
            $('#allFile-total').text(text);

            if (result.length >= 1) {




                result.forEach(function (item) {

                    let folderName = ""
                    if (item.folderName != undefined){
                        folderName = item.folderName;
                    }


                    $('#listBody').append(
                        "<tr class='file-tr'>" +
                        "<td class='h-none text-center'>" +
                        "<input class='file-checkBox' type='checkbox'  value='" + item.fileId + "' name='checkFile'/>" +
                        "</td>" +
                        "<td class='file-name-area'>" +
                        "<div class='file-img' id ='file-img"+item.fileId+"' style='display: inline-table;'>" +

                        "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#3064B3'class='bi bi-image-fill' viewBox='0 0 16 16'><path d='M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z'/> </svg>" +
                        "</div> " +
                        "<span class='file-name '>"+item.fileName +item.fileExtension+"</span> " +
                        "</td>" +
                        "<td class='text-center'>"+item.projectName+ "</td>" +
                        "<td class='text-center' >"+item.folderRoot+ folderName+ "</td>" +
                        "<td class='text-center'>"+item.fileSize+"</td>" +
                        "   <td class='text-center'>"+item.name+"</td>" +
                        "    <td class='text-center'>"+date_Format(item.crtDate)+"</td>"+
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
            }else{
                $('#listBody').append(
                    "<tr class='folder-tr' id='emptyFolder'>" +
                    "<td class='h-none text-center' ></td>" +
                    "<td class='h-none text-center '>폴더가 비어있습니다</td>" +
                    "<td class='h-none'></td>" +
                    "<td class='h-none'></td>" +
                    "<td class='h-none'></td>" +
                    "<td class='h-none'></td>" +
                    "<td class='h-none'></td>" +
                    "</tr>"
                )
            }
        }

    })
}
function date_Format(date) {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const d = new Date(date);
    let format_date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const time = new Date(date).toTimeString().split(' ')[0];

    return format_date + ' ' + time;
}
function  downloadFile(){

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
            success: (result) => {
                result.forEach(function (response) {

                    let element = document.createElement('a');

                    element.setAttribute('id','downFile')
                    element.setAttribute('href', response.fileRealPath);
                    element.setAttribute('download', response.fileName + response.fileExtension);

                    document.body.appendChild(element);

                    fnSleep(1000);


                    element.click();

                });



                Swal.fire({
                    title: '다운이 완료되었습니다!',
                    text: '다운로드 폴더를 확인해주세요',
                    icon: 'success'
                })
            }
        })
    }else{
        Swal.fire({
            title: '선택 항목이 없습니다!',
            icon: 'warning'
        })
    }


}
fnSleep = function (delay){

    var start = new Date().getTime();
    while (start + delay > new Date().getTime());

};

function FileSearchEnter(value) {

    if (window.event.keyCode == 13) {

        searchAllFile(value.value)


    }
}


function searchAllFile(keyword) {

    if (keyword != "") {

        const data = {
            "keyword": keyword,

        }
        $.ajax({
            type: 'GET',
            url: "/file/allSearchFile",
            data: data
            ,
            success: function (result) {


                if (result.length >= 1) {
                    $('#listBody').empty()
                    $('#listBody').append(
                        "<tr class='folder-tr' onclick='printAllFile()' >" +
                        "<td class='h-none text-center' >" +

                        "<i class='fa-solid fa-x fa-beat' style='color: #FC4C70; '></i>" +


                        "</td>" +
                        "<td class='h-none' style='color: #FC4C70;font-weight: bold;font-size: large;'>검색종료</td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "<td class='h-none'></td>" +
                        "</tr>"
                    )
                    result.forEach(function (item) {


                        let folderName = ""
                        if (item.folderName != undefined){
                            folderName = item.folderName;
                        }


                        $('#listBody').append(
                            "<tr class='file-tr'>" +
                            "<td class='h-none text-center'>" +
                            "<input class='file-checkBox' type='checkbox'  value='" + item.fileId + "' name='checkFile'/>" +
                            "</td>" +
                            "<td class='file-name-area'>" +
                            "<div class='file-img' id ='file-img"+item.fileId+"' style='display: inline-table;'>" +

                            "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='#3064B3'class='bi bi-image-fill' viewBox='0 0 16 16'><path d='M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z'/> </svg>" +
                            "</div> " +
                            "<span class='file-name '>"+item.fileName +item.fileExtension+"</span> " +
                            "</td>" +
                            "<td class='text-center'>"+item.projectName+ "</td>" +
                            "<td class='text-center' >"+item.folderRoot+ folderName+ "</td>" +
                            "<td class='text-center'>"+item.fileSize+"</td>" +
                            "   <td class='text-center'>"+item.name+"</td>" +
                            "    <td class='text-center'>"+date_Format(item.crtDate)+"</td>"+
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
