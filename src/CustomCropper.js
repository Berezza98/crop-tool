import 'cropperjs/dist/cropper.css';
import Cropper from "cropperjs";

export default class CustomCropper extends Cropper{
  constructor(element, options) {
    super(element, options);
    this.squareButton = document.querySelector("#square-button");
    this.landscapeButton = document.querySelector("#landscape-button");
    this.portraitButton = document.querySelector("#portrait-button");
    this.scaleIncreaseButton = document.querySelector("#scale-increase");
    this.scaleDecreaseButton = document.querySelector("#scale-decrease");
    this.horizontalFlipButton = document.querySelector("#hor-flip");
    this.verticalFlipButton = document.querySelector("#ver-flip");
    this.rotationSlider = document.querySelector("#rotate");
    this.cropButton = document.querySelector("#crop");
    this.resetButton = document.querySelector("#reset");
    this.currentRorateValue = document.querySelector("#currentRotateValue");

    this.addHandlers();
  }

  addHandlers() {
    //CROP
    this.cropButton.addEventListener("click", () => {
      this.getCroppedCanvas().toBlob((blob) => {
        const img = new Image();
        img.src = window.URL.createObjectURL(blob);
        img.onload = function() {
          // FILTERS
          console.log(img, img.naturalWidth, img.naturalHeight);
          const resultCanvas = document.querySelector("#result-canvas");
          resultCanvas.width = img.naturalWidth;
          resultCanvas.height = img.naturalHeight;
          const context = resultCanvas.getContext('2d');
          context.drawImage(img, 0, 0);
          document.querySelector("#sepia-button").addEventListener("click", () => {
            context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
            context.filter = 'sepia(50%)';
            context.drawImage(img, 0, 0);
          });

          document.querySelector("#black-white-button").addEventListener("click", () => {
            context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
            context.filter = 'grayscale(100%)';
            context.drawImage(img, 0, 0);
          });

          document.querySelector("#vintage-button").addEventListener("click", () => {
            context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
            context.filter = 'grayscale(100%)';
            context.drawImage(img, 0, 0);
          });
        }
        console.log(blob);
        // const formData = new FormData();
        // formData.append('croppedImage', blob, 'croppedImage.png');
        // Here we can make HTTP request and send cropped image
      });
    });

    //FLIP
    this.horizontalFlipButton.addEventListener("click", () => {
      const newValue = this.imageData.scaleX === 1 ? -1 : 1;
      this.scaleX(newValue);
    });

    this.verticalFlipButton.addEventListener("click", () => {
      const newValue = this.imageData.scaleY === 1 ? -1 : 1;
      this.scaleY(newValue);
    });

    // ROTATION
    this.rotationSlider.addEventListener("input", () => {
      const value = parseInt(this.rotationSlider.value);
      this.rotateTo(value);
      currentRorateValue.innerText = value;
    });

    // ZOOM
    this.scaleIncreaseButton.addEventListener("click", () => {
      this.zoom(0.1);
    });

    this.scaleDecreaseButton.addEventListener("click", () => {
      cropper.zoom(-0.1);
    });

    // ASPECT RATIO
    this.squareButton.addEventListener("click", () => {
      this.setAspectRatio(1);
    });

    this.landscapeButton.addEventListener("click", () => {
      this.setAspectRatio(1.3333333333333);
    });

    this.portraitButton.addEventListener("click", () => {
      this.setAspectRatio(2);
    });

    //RESET

    this.resetButton.addEventListener("click", () => {
      this.reset();
    });
  }
}