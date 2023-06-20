$(document).ready(function () {
    $('.writeBox').click(function () {
        $('.writeBoxTab').each(function () {
            if ($(this).hasClass('active')) {
                $(this).trigger('click')
            }
        })
    })
})

$(function () {
    $('.optionAddBtn').click(function () {
        let ulTag = $(this).parent().find('.option-group')

        ulTag.find('li').each(function () {
            if ($(this).css('display') === 'none') {
                $(this).css('display', 'flex')
                $(this).parent().parent().find('.optionAddBtn').css('display', 'none')
            }

        })
    })
    //시작일 부분
    $('.writeBox-addStartDate').attr('min', new Date().toISOString().split("T")[0])
    $('.writeBox-addEndDate').attr('min', new Date().toISOString().split("T")[0])

    $('.writeBox-addStartDate').change(function () {
        $('.start-date-exist').css('display', 'block')
        $('.startDate-value').text($(this).val() + addWeek($(this).val()) + ' 부터')

        //마감일 최소값 지정
        $('.writeBox-addEndDate').attr('min', $(this).val())
        $(this).css('display', 'none')
    })

    $('#writeBox-startDate-removeBtn').click(function () {
        $('.start-date-exist').css('display', 'none')
        $('.writeBox-addStartDate').css('display', 'block').val('')
    })

    //마감일 부분

    $('.writeBox-addEndDate').change(function () {
        $('.end-date-exist').css('display', 'block')
        $('.endDate-value').text($(this).val() + addWeek($(this).val()) + ' 까지')
        $(this).css('display', 'none')
    })

    $('#writeBox-endDate-removeBtn').click(function () {
        $('.end-date-exist').css('display', 'none')
        $('.writeBox-addEndDate').css('display', 'block').val('')
    })

    // 우선순위 추가 부분
    $('.addPriority-writeBox').click(function () {
        let priority_ul = $('.addPriority_ul-writeBox')
        if (priority_ul.css('display') === 'none') {
            priority_ul.css('display', 'block')
            priority_ul.find('.priorityBtn').click(function (e) {
                console.log('click')
                const element = document.getElementsByClassName('writeBox-priority-value')[0];
                element.innerHTML = ($(this)[0].innerHTML)

                $('.addPriority-writeBox').css('display', 'none')
                $('.prioritySpan-writeBox').css('display', 'block')
                priority_ul.css('display', 'none')
            })
        } else {
            priority_ul.css('display', 'none')

        }

    })

    $('#writeBox-priority-removeBtn').click(function () {
        $('.addPriority-writeBox').css('display', 'block')
        $('.prioritySpan-writeBox').css('display', 'none')
        $(this).closest('svg').remove()
        $(this).closest('.priorityText').remove()
    })

    //진척도 값
    document.querySelector('.writeBox-rangeInput').addEventListener('input', function (event) {
        let gradient_value = 100 / event.target.attributes.max.value;
        console.log(event.target.value)
        event.target.style.background = 'linear-gradient(to right, #FFE283 0%, #FFE283 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
        $('.writeBox-progress-txt').text($(this).val() + '%')
    });


    $('.board_li').click(() => {
        $('#taskWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#taskWrite-tab-pane').removeClass('show active')
        $('#scheduleWrite-tab-pane').removeClass('show active')

        $('#boardWrite-tab').addClass('active')
        $('#boardWrite-tab-pane').addClass('show active')

    })

    $('.task_li').click(() => {
        $('#boardWrite-tab').removeClass('active')
        $('#scheduleWrite-tab').removeClass('active')
        $('#scheduleWrite-tab-pane').removeClass('show active')
        $('#boardWrite-tab-pane').removeClass('show active')

        $('#taskWrite-tab').addClass('active')
        $('#taskWrite-tab-pane').addClass('show active')

    })


    $('.schedule_li').click(() => {
        $('#boardWrite-tab').removeClass('active')
        $('#boardWrite-tab-pane').removeClass('show active')
        $('#taskWrite-tab').removeClass('show active')
        $('#taskWrite-tab-pane').removeClass('show active')

        $('#scheduleWrite-tab').addClass('active')
        $('#scheduleWrite-tab-pane').addClass('show active')

    })

    let previewsContainer

    $('.writeBoxTab').click(function (event) {
        var activeTab = $(this);

        if (activeTab.hasClass('active')) {
            activeTab.addClass('active');
            activeTab.find('a').trigger('click');

            if (activeTab.attr('id') === 'boardWrite-tab') {
                console.log("board");
                $('.submitWriteBtn').attr('id', 'boardWriteBtn');
                $('#file').attr('class', 'boardFile');
                previewsContainer = document.querySelector('.previews');
                handleFileSelection(previewsContainer);
                $('#file-label').css('display', 'block')
                $('#writeBox-modal-footer').css('justify-content', 'space-between')
            } else if (activeTab.attr('id') === 'taskWrite-tab') {
                console.log("task");
                $('.submitWriteBtn').attr('id', 'taskWriteBtn');
                $('#file').attr('class', 'taskFile');
                previewsContainer = document.querySelector('.task-previews');
                handleFileSelection(previewsContainer);
                $('.writeBox-requestBtn').trigger("click").addClass('active');
                $('#file-label').css('display', 'block')
                $('#writeBox-modal-footer').css('justify-content', 'space-between')
            } else if (activeTab.attr('id') === 'scheduleWrite-tab') {
                console.log("schedule");
                $('.submitWriteBtn').attr('id', 'scheduleWriteBtn');
                $('#file-label').css('display', 'none')
                $('#writeBox-modal-footer').css('justify-content', 'end')
            }
        }

        let targetElement = event.target;
        let boardWriteTabPane = document.getElementById('boardWrite-tab-pane');
        let taskWriteTabPane = document.getElementById('taskWrite-tab-pane');
        let scheWriteTabPane = document.getElementById('scheduleWrite-tab-pane');

        // boardWrite-tab-pane 영역 이외의 클릭이 발생한 경우 값을 제거합니다.
        if (targetElement !== boardWriteTabPane && !boardWriteTabPane.contains(targetElement)) {
            document.getElementById('boardTitle').value = '';
            let writeBoardContentElements = document.getElementsByClassName('writeBoardContent');
            for (let i = 0; i < writeBoardContentElements.length; i++) {
                writeBoardContentElements[i].value = '';
            }
        }

        // taskWrite-tab-pane 영역 이외의 클릭이 발생한 경우 값을 제거합니다.
        if (targetElement !== taskWriteTabPane && !taskWriteTabPane.contains(targetElement)) {
            document.getElementById('taskTitle').value = '';
            $('.writeBox-requestBtn').trigger("click").addClass('active');

            $('.writeBox-addStartDate').val(null).css('display', 'block')
            $('.writeBox-startDate-exist').css('display', 'none')

            $('.writeBox-addEndDate').val(null).css('display', 'block')
            $('.writeBox-endDate-exist').css('display', 'none')

            $('.addPriority-writeBox').css('display', 'block')
            $('.prioritySpan-writeBox').css('display', 'none')


            $('.writeBox-rangeInput').val(0).css('background', 'linear-gradient(to right, rgb(255, 226, 131) 0%, rgb(255, 226, 131) 0%, rgb(236, 236, 236) 0%, rgb(236, 236, 236) 100%)')
            $('.writeBox-progress-txt').text('')

            $('.writeContent').val('')
        }

        // taskWrite-tab-pane 영역 이외의 클릭이 발생한 경우 값을 제거합니다.
        if (targetElement !== scheWriteTabPane && !scheWriteTabPane.contains(targetElement)) {
            document.getElementById('writeBox-scheduleTitle').value = '';
            document.getElementById('writeBox-schedulePlace').value = '';
            flatpickr(".writeBox-scheduleStartDate", {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                time_24hr: true,
                defaultDate : new Date(),
                minDate: new Date()
            });

            flatpickr(".writeBox-scheduleEndDate", {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                time_24hr: true,
                defaultDate : writeBox_date
            });
            $('#writeBox-imgDiv').html('')
            $('.writeBox-scheduleContent').val('')
        }
    });

    $('.processBtn').click(function (e) {
        let btn = document.querySelectorAll(".processBtn");
        btn.forEach(function (btn, i) {
            if (e.currentTarget === btn) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

    })

    $('.submitWriteBtn').click(function () {
        if ($(this).attr('id') === 'boardWriteBtn') {
            let formData = new FormData();

            formData.append('bTitle', $('#boardTitle').val());
            formData.append('bContent', $('.writeBoardContent').val());
            formData.append('projectId', Number($('.projectIdInput').val()));

            let files = document.querySelector('.boardFile').files;

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            $.ajax({
                url: '/board/write',
                data: formData,
                type: 'post',
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response);
                    if (response === "success") {
                        location.reload(); // 성공적인 응답을 받은 경우 페이지 리로드
                    } else {
                        Swal.fire({
                            "icon": "warning",
                            "title": "글 제목을 입력하세요"
                        });
                    }
                },
            });

        } else if ($(this).attr('id') === 'taskWriteBtn') {

            let formData = new FormData();

            formData.append('taskTitle', $('#taskTitle').val());
            formData.append('taskContent', $('.writeContent').val());
            formData.append('projectId', Number($('.writeProjectId').val()));
            formData.append('process', writeCurrentBtn());
            formData.append('startDate', $('.writeBox-addStartDate').val() ? to_date2($('.writeBox-addStartDate').val()) : new Date(0));
            formData.append('closingDate', $('.writeBox-addEndDate').val() ? to_date2($('.writeBox-addEndDate').val()) : new Date(0));
            formData.append('progress', Number($('.writeBox-rangeInput').val()));
            formData.append('priority', $('.prioritySpan-writeBox .priorityText').text());

            let files = document.querySelector('.taskFile').files;

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            console.log(formData)

            $.ajax({
                url: '/task/mainWrite',
                data: formData,
                type: 'post',
                processData: false,
                contentType: false,
                success: ((message) => {
                    console.log(message)
                    if (message === "success") {
                        location.reload()
                    } else {
                        Swal.fire({
                            "icon": "warning",
                            "title": "업무 제목을 입력하세요"
                        })
                    }
                })
            })

        } else if ($(this).attr('id') === 'scheduleWriteBtn') {

            let formData = new FormData();

            formData.append('calTitle', $('#writeBox-scheduleTitle').val());
            formData.append('calContent', $('.writeBox-scheduleContent').val());
            formData.append('projectId', parseInt($('.writeProjectId').val()));
            formData.append('calAddress', $('.writeBox-schedulePlace').val());
            formData.append('calStart', $('.writeBox-scheduleStartDate').val() ? new Date($('.writeBox-scheduleStartDate').val()) : new Date(0));
            formData.append('calEnd', $('.writeBox-scheduleEndDate').val() ? new Date($('.writeBox-scheduleEndDate').val()) : new Date(0));
            formData.append('calImgSrc', $('#writeBox-imgDiv #mapImage').attr('src'));


            $.ajax({
                url: '/calendar/write',
                data: formData,
                type: 'post',
                processData: false,
                contentType: false,
                success: ((message) => {
                    console.log(message)
                    if (message === "success") {
                        location.reload()
                    } else {
                        Swal.fire({
                            "icon": "warning",
                            "title": "일정 제목을 입력하세요"
                        })
                    }
                })
            })

        }

    })

    $('#writeBox-schedulePlace').on("input", function () {
        let val = $('#writeBox-schedulePlace').val().trim();
        if (val == "") {
            console.log("Empty String");
            // document.getElementById("mapImage").style.visibility='hidden';
            document.getElementById("mapImage").remove();
        } else {
            getWriteBoxPlace();
        }

        function getWriteBoxPlace() {
            const input = document.getElementById("writeBox-schedulePlace");
            const options = {
                //add options here if you want more customizations
            };
            const autocomplete = new google.maps.places.Autocomplete(input, options);

        }

    });

    window.addEventListener('load', function(event){
        const input = document.getElementById("writeBox-schedulePlace");
        const options = {
            //add options here if you want more customizations
        };
        const autocomplete = new google.maps.places.Autocomplete(input, options);

    });

    let fpStart = flatpickr(".writeBox-scheduleStartDate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        defaultDate : new Date(),
        minDate: new Date()
    });

    let writeBox_date = new Date()
    writeBox_date.setHours(writeBox_date.getHours()+1)

    let fpEnd = flatpickr(".writeBox-scheduleEndDate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        defaultDate : writeBox_date
    });

    $('.writeBox-scheduleStartDate').change(function (){
        let min = $(this).val()

        fpEnd.setDate(min)
        fpEnd.set('minDate', min)

    })



})


function previewFile(files, previewsContainer, fileDOM) {
    const previews = [];

    // 이미지 미리보기를 담을 컨테이너 초기화
    previewsContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.onload = () => {
            const fileContainer = document.createElement('div');
            fileContainer.classList.add('file-container');

            const fileInfo = document.createElement('div');
            fileInfo.classList.add('file-info');

            const fileNameContainer = document.createElement('div');
            fileNameContainer.classList.add('file-name-container');

            const fileName = document.createElement('div');
            fileName.classList.add('preview-file-name');
            fileName.style.display = 'inline-block'
            fileName.textContent = file.name;

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`;
            removeButton.style.border = 'none';
            removeButton.style.backgroundColor = 'transparent';

            removeButton.addEventListener('click', () => {
                Swal.fire({
                    title: '해당 이미지를 삭제하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const previewContainer = removeButton.closest('.file-container');
                        const index = Array.from(previewsContainer.children).indexOf(previewContainer);
                        const files = Array.from(previewsContainer.children).map((container) => container.file);

                        const dataTransfer = new DataTransfer();
                        for (let j = 0; j < fileDOM.files.length; j++) {
                            const inputFile = fileDOM.files[j];
                            if (inputFile.name !== file.name) {
                                dataTransfer.items.add(inputFile);
                            }
                        }
                        fileDOM.files = dataTransfer.files;

                        removePreview(previewContainer, index, files, previewsContainer, fileDOM);
                    }
                    Swal.fire({
                        title: '삭제완료!',
                        icon: 'success',
                    });
                });
            });

            fileNameContainer.appendChild(fileName);
            fileNameContainer.appendChild(removeButton);

            fileInfo.appendChild(fileNameContainer);

            fileContainer.appendChild(fileInfo);
            previewsContainer.appendChild(fileContainer);

            previews.push(fileContainer); // 미리보기 요소를 배열에 추가
        };

        reader.readAsDataURL(file);
    }
}



function handleFileSelection(previewsContainer) {
    const fileDOM = document.querySelector('#file');

    fileDOM.addEventListener('change', () => {
        const files = fileDOM.files;
        handleImageFiles(files, previewsContainer, fileDOM);
    });
}

function handleImageFiles(files, previewsContainer, fileDOM) {
    const imageFiles = [];
    const otherFiles = [];

    Array.from(files).forEach(file => {
        if (isImageFile(file)) {
            imageFiles.push(file);
        } else {
            otherFiles.push(file);
        }
    });

    if (imageFiles.length > 0) {
        previewImg(imageFiles, previewsContainer, fileDOM);
    }

    previewsContainer.innerHTML = '';
    if (previewsContainer.classList.contains('previews')) {
        previewsContainer = document.querySelector('.file-previews');
    } else if (previewsContainer.classList.contains('task-previews')) {
        previewsContainer = document.querySelector('.file-task-previews');
    }
    previewFile(otherFiles, previewsContainer, fileDOM);


}


function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

function isImageFile(file) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext));
}

function removePreview(previewContainer, index, files, previewsContainer, fileDOM) {
    previewsContainer.removeChild(previewContainer); // 미리보기 컨테이너에서 해당 요소 제거
    files.splice(index, 1); // 파일 배열에서 해당 파일 삭제

    // FileList를 새로운 DataTransfer 객체로 업데이트
    const updatedFiles = new DataTransfer();
    files.forEach(file => updatedFiles.items.add(file));
    fileDOM.files = updatedFiles.files;
}


function previewImg(files, previewsContainer, fileDOM) {
    const previews = [];

    // 이미지 미리보기를 담을 컨테이너 초기화
    previewsContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.onload = () => {
            const previewContainer = document.createElement('div');
            const previewImage = document.createElement('img');
            const overlayImage = document.createElement('img');
            overlayImage.classList.add('overlay-image');

            if (previewsContainer.classList.contains('previews')) {
                previewContainer.classList.add('image-board-box');
            } else if (previewsContainer.classList.contains('task-previews')) {
                previewContainer.classList.add('image-task-box');
            }

            previewContainer.classList.add('preview-container');
            previewContainer.style.position = 'relative';
            previewContainer.style.display = 'inline-block';

            previewImage.style.width = '100px';
            previewImage.style.height = '100px';
            previewImage.style.borderRadius = '10%';
            previewImage.style.marginRight = '10px';
            previewImage.src = reader.result;

            overlayImage.style.position = 'absolute';
            overlayImage.style.top = '0';
            overlayImage.style.left = '0';
            overlayImage.style.opacity = '0';
            overlayImage.style.transition = 'opacity 0.3s ease-in-out';
            overlayImage.style.width = '100px';
            overlayImage.style.height = '100px';
            overlayImage.src = '/img/pngwing.com.png';

            previewContainer.appendChild(previewImage);
            previewContainer.appendChild(overlayImage);
            previewsContainer.appendChild(previewContainer);

            previewContainer.addEventListener('mouseover', () => {
                overlayImage.style.opacity = '80%';
            });

            previewContainer.addEventListener('mouseleave', () => {
                overlayImage.style.opacity = '0';
            });

            previewContainer.addEventListener('click', () => {
                Swal.fire({
                    title: '해당 이미지를 삭제하시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 클릭한 미리보기 요소의 인덱스 찾기
                        const index = previews.indexOf(previewContainer);
                        if (index !== -1) {
                            removePreview(previewContainer, index, files, previewsContainer, fileDOM);
                        }

                        Swal.fire({
                            title: '삭제완료!',
                            icon: 'success',
                        });
                    }
                });
            });

            previews.push(previewContainer); // 미리보기 요소를 배열에 추가
        };

        reader.readAsDataURL(file);
    }
}

function writeCurrentBtn() {
    let btn = document.querySelectorAll(".processBtn");
    let currentBtn;
    btn.forEach(function (btn, i) {
        if (btn.classList.contains('active')) {
            currentBtn = btn.textContent;
        }
    });
    return currentBtn;
}

function addWeek(date) {
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[(new Date(date)).getDay()];

    return ' (' + dayOfWeek + ')';
}


function to_date2(date_str) {
    let yyyyMMdd = String(date_str);
    let sYear = yyyyMMdd.substring(0, 4);
    let sMonth = yyyyMMdd.substring(5, 7);
    let sDate = yyyyMMdd.substring(8, 10);

    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
}


function codeWriteBoxAddress() {
    var imgTag = document.createElement('img');
    imgTag.id = "mapImage";
    imgTag.name = "mapImage"
    imgTag.src = "";
    imgTag.alt = "static img";
    imgTag.style = "visibility: hidden";

    document.getElementById("writeBox-imgDiv").append(imgTag);

    var geocoder;
    var map;
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById('writeBox-schedulePlace').value;
    console.log("주소 : " + address);
    geocoder.geocode({'address': address}, function (results, status) {


        if (status == 'OK') {
            console.log('this is OK');
            // var tmp = (results[0].geometry.location).toString();

            console.log("위도 : " + results[0].geometry.location.lat());
            console.log("경도 : " + results[0].geometry.location.lng());

            const apiKey = 'AIzaSyABN0ndYhxNu4zHlvEfKi_r42aSUMeVUaI';

            const latitude = results[0].geometry.location.lat()
            const longitude = results[0].geometry.location.lng()

            // Set the map center and other parameters
            const mapCenter = `center=${latitude},${longitude}`;
            const mapZoom = 'zoom=14'; // Optional: Specify the zoom level

            const mapMarkers = `markers=color:red%7Clabel:%7C${latitude}, ${longitude}`;

            const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?${mapCenter}&${mapZoom}&size=646x220&${mapMarkers}&key=${apiKey}`;

            // Set the image source to the constructed URL
            const mapImage = document.getElementById('mapImage');
            mapImage.src = imageUrl;
            document.getElementById("mapImage").style.visibility = 'visible';

            var ads = addressLogic(latitude, longitude);
            console.log(addressLogic(latitude, longitude))
            console.log("ads : " + ads);


        } else {
            console.log("this is an !ERROR!" + status);
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function addressLogic(latitude, longitude) {//return Address from latitude and longitude method
    const geocoder = new google.maps.Geocoder();
    const latlng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    };

    var address;

    geocoder
        .geocode({location: latlng})
        .then((response) => {
            console.log("헬로우 : " + response.results[0].formatted_address);
            tmp = response.results[0].formatted_address
            console.log("tmp : " + tmp)

            if (response.results[0]) {
                address = response.results[0].formatted_address;
                getAddress(address);
            } else {
                return "ERROR";
            }
        })
}

function getAddress(address) { // (4) should log the address
    console.log("Finally : " + address);
    document.getElementById("addressInputId").value = address
}
