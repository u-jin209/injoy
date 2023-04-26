/*<![CDATA[*/



$('.filtering').slick({
    slidesToShow: 4,
    slidesToScroll: 4
});

var filtered = false;

$('.js-filter').on('click', function(){
    if (filtered === false) {
        $('.filtering').slick('slickFilter',':even');
        $(this).text('Unfilter Slides');
        filtered = true;
    } else {
        $('.filtering').slick('slickUnfilter');
        $(this).text('Filter Slides');
        filtered = false;
    }
});


function copyCode() {

    const code = document.getElementById("code");
    window.navigator.clipboard.writeText(code.value).then(() => {
        // 복사가 완료되면 호출된다.
        Swal.fire({
            title: "초대코드 복사 완료",
            icon: "success"
        });
    });
}

function deleteUser(userId,option) {

    const data = {
        "userId": userId
    }

    if(option ==1){
        Swal.fire({

            title: '멤버를 삭제 하시겠습니까?',
            text: '확인을 누르면 삭제됩니다.',
            icon: 'warning',


            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            confirmButtonText: '삭제', // confirm 버튼 텍스트 지정

        }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

                $.ajax({
                    url: "/member/delete",
                    data: data,
                    type: "GET",
                }).done(function () {

                    const userDiv = document.getElementById("user" + userId);

                    userDiv.remove();

                    Swal.fire({
                        title: "삭제되었습니다.",
                        icon: "success"
                    });
                });
            }
        });
    }else if(option ==2 ){
        Swal.fire({

            title: '승인을 거절 하시겠습니까?',
            text: '확인을 누르면 거절됩니다.',
            icon: 'warning',


            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            confirmButtonText: '거절', // confirm 버튼 텍스트 지정

        }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

                $.ajax({
                    url: "/member/delete",
                    data: data,
                    type: "GET",
                }).done(function () {

                    const userDiv = document.getElementById("user" + userId);

                    userDiv.remove();

                    Swal.fire({
                        title: "거절되었습니다.",
                        icon: "success"
                    });
                });
            }
        });
    }




}



function approveUser(userId,projectId) {

    const data = {
        "userId": userId,
        "projectId": projectId
    }


    Swal.fire({
        title: '승인 하시겠습니까?',
        text: '확인을 누르면 승인됩니다.',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정
        confirmButtonText: '승인', // confirm 버튼 텍스트 지정

    }).then(result => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

            $.ajax({
                url: "/member/approve",
                data: data,
                type: "GET",
            }).done(function () {

                const waitDiv = document.getElementById("user" + userId);
                const plusBtn = document.getElementById("plus"+userId);

                plusBtn.style.display="none";


                const newDiv = document.createElement('div').appendChild(waitDiv);

                document.getElementById('field').appendChild(newDiv);



                // waitDiv.remove();


            });
        }
    });


}

function enter(projectId){

    if(window.event.keyCode == 13){
        searchUser(projectId);
    }
}

function searchUser(projectId){



    const keyword = document.getElementById('searchKeyword').value;
    $('#searchDivMain').empty();

    if(keyword != ""){
        const data = {
            "keyword": keyword,
            "projectId": projectId
        }



        $.ajax({
            type: 'GET',
            url : "/member/search",
            data : data,
            success : function(result){






                if(result.length>=1){
                    const searchDiv = document.getElementById("searchResult");
                    searchDiv.style.display = "";


                    result.forEach(function(item) {
                        $(document).ready(function () {



                            $('#searchDivMain').append(
                                " <div class='card mb-3' style='max-width: 540px;'>" +
                                "<div class = 'row g-0'>" +
                                "<div class='col-md-4'>" +
                                " <img src='" +item.username+"' class='member' alt='...'>"+
                                "</div>"+
                                "<div class='col-md-8'>"+
                                "<div class='card-body' style='text-align: left'>"+
                                "<h5 class='card-title'>"+item.username+"</h5>"+
                                "<p class='card-text'>"+item.name+"</p>"+
                                "<div style='text-align: end'>"+
                                "<button class='btn-blue' style='width: 50px;'> 초대 </button>"+

                                "</div>"+

                                "</div>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                            );
                        });

                    })

                }else{
                    const searchDiv = document.getElementById("searchResult");
                    searchDiv.style.display = "none";

                    Swal.fire({
                        title: "검색 결과가 없습니다.",
                        icon: "question"
                    });
                }
            }
        })
    }else{
        const searchDiv = document.getElementById("searchResult");
        searchDiv.style.display = "none";
        Swal.fire({
            title: "검색어를 입력해 주세요",
            icon: "warning"
        });
    }



}


/*]]>*/
