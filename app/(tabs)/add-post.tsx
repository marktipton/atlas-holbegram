import { useImagePicker } from "@/hooks/useImagePicker"
import { Text, View, Button } from "react-native"


export default function Page() {
  // const [caption, setCaption] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  // const image = undefined;
  const {image, openImagePicker, reset} = useImagePicker();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Add Post</Text>
      <Button
        title="Choose a photo"
        // text="Choose a photo"
        onPress={openImagePicker}
      />
    </View>
  )
}