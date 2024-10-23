import { useImagePicker } from "@/hooks/useImagePicker"
import { Text, View, Image, StyleSheet, Dimensions } from "react-native"
import ImagePreview from "@/components/ImagePreview";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";


export default function Page() {
  // const [caption, setCaption] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  // const image = undefined;
  const { width } = Dimensions.get("window");
  const imageBoxSize = Math.min(width * 0.9, 300);

  const {image, openImagePicker, reset} = useImagePicker();
  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={[styles.imageBox, { width: imageBoxSize, height: imageBoxSize}]}
        />
      ) : <ImagePreview width={imageBoxSize} height={imageBoxSize}/>
      }
      {/* <Text>Add Post</Text> */}
      <TouchableOpacity style={[styles.button, {width: imageBoxSize}]} onPress={openImagePicker}>
        <Ionicons name="image-outline" size={24} color="white"/>
        <Text style={styles.buttonText}>Choose a photo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
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