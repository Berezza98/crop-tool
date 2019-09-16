import 'cropperjs/dist/cropper.css';
import Cropper from "cropperjs";
import Caman from "caman";

const image = document.getElementById('image');
const cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
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

Caman("#image-id", function () {
  this.brightness(10);
  this.contrast(20);
  this.render(function () {
    alert("Done!");
  });
});