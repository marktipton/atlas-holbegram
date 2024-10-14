import { Text, View } from "react-native"
import { Link } from "expo-router"

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Login</Text>
      <Link href='/register'>
        <Text>Create a new account</Text>
      </Link>
    </View>
  )
}