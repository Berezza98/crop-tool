import Dropzone from "dropzone";
import CustomCropper from "./CustomCropper";

const image = document.querySelector('#image');
const uploadInput = document.querySelector("#upload");

const cropper = new CustomCropper(image, {
  preview: document.querySelector(".preview")
});

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
})


function verifyFileUpload(file) {
  if (file){
    const fileSizeInMB = file.size / 1000 / 1000;
    if (fileSizeInMB >= 0.2 && fileSizeInMB <= 40) { // CHECK IMAGE SIZE (now from 0.2MB to 40MB)
      console.log("File size(in MB): ", fileSizeInMB);
      var img = new Image();
      img.src = window.URL.createObjectURL(file);
  
      img.onload = function() {
        const width = this.naturalWidth;
        const height = this.naturalHeight;
        if (width > 500 && height > 500) { // CHECK IMAGE RESOLUTION
          cropper.replace(img.src);
          console.log("Correct resolution");
        } else {
          throw new Error("Image resolution is not correct");
        }
      };
    } else {
      throw new Error("Image size is not correct");
    }
  }
}

// uploadInput.addEventListener("input", function() {
//   verifyFileUpload(this.files[0]);
// });
