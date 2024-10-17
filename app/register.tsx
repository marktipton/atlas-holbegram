import { Text, View, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"
import { useAuth } from "@/components/AuthProvider"
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import AtlasLogo from "@/components/AtlasLogo";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  async function register(email: string, password: string) {
    // alert(`Creating account with ${email} and ${password}`);
    setLoading(true);
    try {
      await auth.register(email, password);
      router.replace("/(tabs)/");
    } catch (e) {
      console.error(e);
      alert("Unable to create account");
    }
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <AtlasLogo/>
      <Text style={styles.text}>Register</Text>
      {/* check if loading and display authform if not */}
      {loading ? (
        <Loading />
      ) : (
        <AuthForm onSubmit={register} buttonTitle="Create Account"/>
      )}
      <Link href='/login' replace>
        <Text style={styles.text}>Log in to existing account</Text>
      </Link>
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
    color: "white",
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