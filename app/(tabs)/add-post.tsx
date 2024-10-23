import { useImagePicker } from "@/hooks/useImagePicker"
import { Text, View, Image, StyleSheet, Dimensions } from "react-native"
import ImagePreview from "@/components/ImagePreview";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import CaptionInput from "@/components/CaptionInput";
import React, { useState } from "react";


export default function Page() {
  const [caption, setCaption] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  // const image = undefined;
  const { width } = Dimensions.get("window");
  const imageBoxSize = Math.min(width * 0.9, 300);

  const {image, openImagePicker, reset} = useImagePicker();

  const handleCaptionSubmit = (captionText: string) => {
    setCaption(captionText);
    // You can do something with the submitted caption here
    console.log("Submitted Caption:", captionText);
  };
  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image
            source={{ uri: image }}
            style={[styles.imageBox, { width: imageBoxSize, height: imageBoxSize}]}
          />
          <CaptionInput onSubmit={handleCaptionSubmit}/>

        </>
      ) : (
        <>
          <ImagePreview width={imageBoxSize} height={imageBoxSize}/>
          <TouchableOpacity style={[styles.button, {width: imageBoxSize}]} onPress={openImagePicker}>
            <Ionicons name="image-outline" size={24} color="white"/>
            <Text style={styles.buttonText}>Choose a photo</Text>
          </TouchableOpacity>
        </>
      )}
      {/* <Text>Add Post</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 50,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.teal,
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  imageBox: {
    resizeMode: "contain",
    borderRadius: 10,
  },
});