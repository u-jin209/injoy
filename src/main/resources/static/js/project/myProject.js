/*<![CDATA[*/




$('#memberModal').on('shown.bs.modal', function (e) {
    const model = document.getElementById("memberModal");
    console.log(model.value);
    console.log(model.name);


});


function bookMark(projectId, userId) {

    console.log("projectId : " + projectId);

    console.log("projectId : " + userId);
    const data = {
        "projectId": projectId, "userId": userId
    }
    const star = document.getElementById("star");
    const starfill = document.getElementById("starFill");


    if (star.style.display == "") {


        $.ajax({
            type: 'GET', url: "/bookMark/insert", data: data, success: function (result) {
                star.style.display = "none";
                starfill.style.display = "";
            }
        });
    } else if (star.style.display == "none") {

        $.ajax({
            type: 'GET', url: "/bookMark/delete", data: data, success: function (result) {
                starfill.style.display = "none";
                star.style.display = "";
            }
        });
    }

}


/*]]>*/
