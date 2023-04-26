/*<![CDATA[*/




$('#memberModal').on('shown.bs.modal', function () {
    $('#modalList').empty();
    const projectId = $('#modal-body').attr('name');
    console.log("PROJECTiD:"+projectId);
    console.log("int :"+parseInt(projectId));
    const data ={
        "projectId":projectId
    }

    $.ajax({
        type: 'GET',
        url: "/member/selectMember",
        data: data,
        success: function (result) {


                result.forEach(function(item) {
                    $(document).ready(function () {
                        console.log("item", item);



                        $('#modalList').append(
                            "<div class='card mb-3' style='max-width: 540px;'>"+
                                "<div class='row g-0'>"+
                                    "<div class='col-md-4'>"+
                                        "<img src='/img/moru.jpg' class='member' alt='...'>"+
                                    "</div>"+
                                    "<div class='col-md-8'>"+
                                        "<div class='card-body' style='text-align: left'>"+
                                            "<h5 class='card-title'>"+item.name+"</h5>"+
                                            "<p class='card-text'>"+item.username+"</p>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"
                        );
                    });

            })

            }
    });


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
