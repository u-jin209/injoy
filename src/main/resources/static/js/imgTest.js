// import 'cropperjs/dist/cropper.css';

import Cropper from 'cropperjs';

const image = document.getElementById('image');
const cropper = new Cropper(image, {
    aspectRatio: 0,
    viewMode: 0,

    crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
    },
});

document.getElementById("cropImageBtn").addEventListener('click', function (){
    var cropImg = cropper.getCroppedCanvas().toDataURL("image/png");
    alert(cropImg);
})
