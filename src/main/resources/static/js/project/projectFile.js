// 제이쿼리도 지원
$("div.dropzone").dropzone({
    url: "/",
    method: 'post',
});

function openDrop(){
    const fileUpload = document.getElementById("fileUpload")
    fileUpload.style.display = 'unset'
}


function selectAll(selectAll)  {
    const checkboxes
        = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked
    })
}


