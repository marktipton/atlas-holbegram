import { Text, View, StyleSheet, Pressable } from "react-native"
import { Link, useRouter } from "expo-router"
import { useAuth } from "@/components/AuthProvider"
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import AtlasLogo from "@/components/AtlasLogo";
import { Colors } from "@/assets/colors/colors"

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

  async function registerWithFacebook() {
    setLoading(true);
    try {
      await auth.loginWithFacebook();
      router.replace("/(tabs)/");
    } catch (e) {
      console.error(e);
      alert("Unable to register with Facebook");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <AtlasLogo />
      <Text style={styles.text}>Register</Text>
      {loading ? (
        <Loading />
      ) : (
        <>
          <AuthForm onSubmit={register} buttonTitle="Create Account" />
          <Pressable onPress={registerWithFacebook} style={styles.facebookButton}>
            <Text style={styles.text}>Sign Up with Facebook</Text>
          </Pressable>
        </>
      )}
      <Link style={styles.link} href="/login" replace>
        <Text style={styles.text}>Log in to existing account</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
    paddingHorizontal: 20,
    color: "white",
  },
  text: {
    color: "white",
  },
  link: {
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "#4267B2",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});