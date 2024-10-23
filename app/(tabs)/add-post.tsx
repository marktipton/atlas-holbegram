import { useImagePicker } from "@/hooks/useImagePicker"
import { Text, View, Image, StyleSheet } from "react-native"
import ImagePreview from "@/components/ImagePreview";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";


export default function Page() {
  // const [caption, setCaption] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  // const image = undefined;
  const {image, openImagePicker, reset} = useImagePicker();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      {image
        ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        : <ImagePreview/>
      }
      <Text>Add Post</Text>
      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Ionicons name="image-outline" size={24} color="white"/>
        <Text style={styles.buttonText}>Choose a photo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.teal,
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
});