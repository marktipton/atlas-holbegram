import { Text, View, TextInput, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"
import { useAuth } from "@/components/AuthProvider"
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  async function register(email: string, password: string) {
    // alert(`Creating account with ${email} and ${password}`);
    try {
      await auth.register(email, password);
      router.replace("/(tabs)/");
    } catch (e) {
      console.error(e);
      alert("Unable to create account");
    }
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Register</Text>
      <AuthForm onSubmit={register} buttonTitle="Create Account"/>
      <Link href='/login' replace>
        <Text>Log in to existing account</Text>
      </Link>
    </View>

  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});