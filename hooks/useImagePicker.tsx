import { useState } from "react";

export function useImagePicker(){
  const [image, setImage] = useState(undefined);

  function openImagePicker(){
    alert("Open Image Picker");
  }

  function reset() {
    alert("reset");
  }

  return { image, openImagePicker, reset};
}