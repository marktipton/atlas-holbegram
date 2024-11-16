import { Pressable, Text, View, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"
import { useAuth } from "@/components/AuthProvider";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import { useState } from "react";
import AtlasLogo from "@/components/AtlasLogo";
import { Colors } from "@/assets/colors/colors"


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

  async function loginWithFacebook() {
    setLoading(true);
    try {
      await auth.loginWithFacebook();
      router.replace("/(tabs)/");
    } catch (e: unknown) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        alert("An account already exists with the same email address but different sign-in credentials.");
      } else {
        alert(`Facebook Login Error: ${e.message}`);
      }
    }
    setLoading(false);
  }


  return (
    <View style={styles.container}>
      <AtlasLogo />
      <Text style={styles.text}>Login</Text>
      {loading ? (
        <Loading />
      ) : (
        <>
          <AuthForm onSubmit={login} buttonTitle="Sign In" />
          <Pressable onPress={loginWithFacebook} style={styles.facebookButton}>
            <Text style={styles.text}>Sign In with Facebook</Text>
          </Pressable>
        </>
      )}
      <Link style={styles.link} href="/register" replace>
        <Text style={styles.text}>Create a new account</Text>
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