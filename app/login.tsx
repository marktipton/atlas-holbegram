import { Pressable, Text, View, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"
import { useAuth } from "@/components/AuthProvider";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import { useState } from "react";
import AtlasLogo from "@/components/AtlasLogo";


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
    <View style={styles.container}>
      <AtlasLogo/>
      <Text style={styles.text}>Login</Text>
      {/* check loading state and disply accordingly */}
      {loading ? (
        <Loading/>
      ) : (
        <AuthForm onSubmit={login} buttonTitle="Sign In"/>
      )}
      <Link href='/register' replace>
        <Text style={styles.text}>Create a new account</Text>
      </Link>
      <Pressable onPress={() => {router.replace('/(tabs)/')}}>
        <Text style={styles.text}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c1959",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: "white",
  }
});