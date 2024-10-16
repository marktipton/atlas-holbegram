import { Pressable, Text, View } from "react-native"
import { Link, useRouter } from "expo-router"
import { useAuth } from "@/components/AuthProvider";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import { useState } from "react";


export default function Page() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      await auth.login(email, password)
      router.replace("/(tabs)/");
    } catch (e) {
      alert("Email or password is incorrect");
    }
    setLoading(false);
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Login</Text>
      {/* check loading state and disply accordingly */}
      {loading ? (
        <Loading/>
      ) : (
        <AuthForm onSubmit={login} buttonTitle="Sign In"/>
      )}
      <Link href='/register' replace>
        <Text>Create a new account</Text>
      </Link>
      <Pressable onPress={() => {router.replace('/(tabs)/')}}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  )
}