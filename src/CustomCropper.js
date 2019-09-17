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
          let caman = Caman('#result-canvas', img.src, function () {
            // FILTERS
            document.querySelector("#sepia-button").addEventListener("click", () => {
              if (caman) {
                const rgbColor = {r: 100, g: 110, b: 70};
                const colorTemperature = 3500; // e.g. some temperature between 0 and 40,000 K
                caman.revert(true); // update the canvas' context
                caman.whiteBalanceRgb(rgbColor); // in case of RGB input
                caman.whiteBalance(colorTemperature); // in case of color temperature input
                caman.render(); // render back to canvas with ID #lut-preview
              }
            });

            document.querySelector("#vintage-button").addEventListener("click", () => {
              if (caman) {
                console.log(caman);
                caman.vintage().render()
              }
            });
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