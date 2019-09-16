import 'cropperjs/dist/cropper.css';
import Cropper from "cropperjs";
import Dropzone from "dropzone";

const image = document.getElementById('image');
const squareButton = document.querySelector("#square-button");
const landscapeButton = document.querySelector("#landscape-button");
const portraitButton = document.querySelector("#portrait-button");
const scaleIncreaseButton = document.querySelector("#scale-increase");
const scaleDecreaseButton = document.querySelector("#scale-decrease");
const horizontalFlipButton = document.querySelector("#hor-flip");
const verticalFlipButton = document.querySelector("#ver-flip");
const rotationSlider = document.querySelector("#rotate");
const cropButton = document.querySelector("#crop");
const resetButton = document.querySelector("#reset");
const currentRorateValue = document.querySelector("#currentRotateValue");

const cropper = new Cropper(image, {
  crop(event) {
  },
  preview: document.querySelector(".preview")
});

//CROP
cropButton.addEventListener("click", function() {
  cropper.getCroppedCanvas().toBlob((blob) => {
    console.log(blob);
    // const formData = new FormData();
    // formData.append('croppedImage', blob, 'croppedImage.png');
    // Here we can make HTTP request and send cropped image
  });
});

//FLIP
horizontalFlipButton.addEventListener("click", function() {
  const newValue = cropper.imageData.scaleX === 1 ? -1 : 1;
  cropper.scaleX(newValue);
});

verticalFlipButton.addEventListener("click", function() {
  const newValue = cropper.imageData.scaleY === 1 ? -1 : 1;
  cropper.scaleY(newValue);
});

// ROTATION
rotationSlider.addEventListener("input", function() {
  const value = parseInt(this.value);
  cropper.rotateTo(value);
  currentRorateValue.innerText = value;
});

// ZOOM
scaleIncreaseButton.addEventListener("click", function() {
  cropper.zoom(0.1);
});

scaleDecreaseButton.addEventListener("click", function() {
  cropper.zoom(-0.1);
});

// ASPECT RATIO
squareButton.addEventListener("click", function() {
  cropper.setAspectRatio(1);
});

landscapeButton.addEventListener("click", function() {
  cropper.setAspectRatio(1.3333333333333);
});

portraitButton.addEventListener("click", function() {
  cropper.setAspectRatio(2);
});

//RESET

resetButton.addEventListener("click", function() {
  cropper.reset();
});