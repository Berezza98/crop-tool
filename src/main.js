import Dropzone from "dropzone";
import CustomCropper from "./CustomCropper";

const canvas = document.querySelector('#main-canvas');
const sepiaButton = document.querySelector("#sepia-button");
const vintageButton = document.querySelector("#vintage-button");

const cropper = new CustomCropper(canvas);

// UPLOAD FILE

const myDropzone = new Dropzone(
  "#dropzone",
  {
    autoProcessQueue: false,
    url: "/",
    maxFiles: 1,
  }
);

myDropzone.on("addedfile", function(file) {
  console.log(file);
  verifyFileUpload(file);
})


function verifyFileUpload(file) {
  if (file){
    const fileSizeInMB = file.size / 1000 / 1000;
    if (fileSizeInMB >= 0.2 && fileSizeInMB <= 40) { // CHECK IMAGE SIZE (now from 0.2MB to 40MB)
      console.log("File size(in MB): ", fileSizeInMB);
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
  
      img.onload = function() {
        const width = this.naturalWidth;
        const height = this.naturalHeight;
        if (width > 500 && height > 500) { // CHECK IMAGE RESOLUTION
          console.log("Correct resolution");
          cropper.replace(img.src);
        } else {
          throw new Error("Image resolution is not correct");
        }
      };
    } else {
      throw new Error("Image size is not correct");
    }
  }
}
