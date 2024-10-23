import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { Colors } from "@/assets/colors/colors";

interface CaptionInputProps {
  onSubmit: (caption: string) => void; // function to handle form submission
  buttonTitle?: string;
}

const CaptionInput: React.FC<CaptionInputProps> = ({ onSubmit, buttonTitle = "Submit" }) => {
  const [caption, setCaption] = useState<string>(''); // state for password input

  const handleSubmit = () => {
    onSubmit(caption); // call the onSubmit function with email and password
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a caption"
        value={caption}
        onChangeText={setCaption}
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: Colors.teal,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: "black",
    borderRadius: 4,
  },
  button: {
    backgroundColor: Colors.teal,
    // textAlign: "center",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
  },
});

export default CaptionInput;