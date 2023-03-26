import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RegisterRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";

function RegisterPage({ navigation }: { navigation: any }) {
  const [email, setText] = useState("");
  const [password, setText1] = useState("");
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");
  const [biography, setText4] = useState("");
  const [username, setText5] = useState("");
  const [seePassword, setseePassword] = useState(true);
  const [checkValidEmail, setcheckValidEmail] = useState(true);
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const SignupPress = async () => {
    const respuesta = await RegisterRequest(
      email,
      password,
      name,
      last_Name,
      username,
      biography,
      navigation,
    );
    setToken(respuesta.data.token);
  };

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setText(text);

    if (re.test(text) || reg.test(text)) {
      setcheckValidEmail(false);
    } else {
      setcheckValidEmail(true);
    }
  };

  return (
    <SafeAreaView>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 90,
            borderWidth: 4,
            margin: 10,
          }}
        >
          <View style={{ paddingHorizontal: 25, paddingTop: 40 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "500",
                color: "#333",
                paddingBottom: 25,
              }}
            >
              Registro de usuario
            </Text>

            <TextInput
              color="#066cb4"
              label="Nombre"
              placeholder="Nombre"
              onChangeText={setText2}
              value={name}
            />

            <TextInput
              color="#066cb4"
              label="Apellido"
              placeholder="Apellido"
              onChangeText={setText3}
              value={last_Name}
            />

            <TextInput
              color="#066cb4"
              label="Biografia"
              placeholder="Hola mi usuario es..."
              onChangeText={(text) => setText4(text)}
              value={biography}
              maxLength={100}
            />

            <TextInput
              color="#066cb4"
              label="Email"
              placeholder="ejemplo@test.com"
              onChangeText={(text) => handleCheckEmail(text)}
              value={email}
            />
            <TextInput
              color="#066cb4"
              label="Usuario"
              placeholder="Nombre de Usuario"
              onChangeText={setText5}
              value={username}
            />

            <TextInput
              color="#066cb4"
              label="Contraseña"
              placeholder="Contraseña"
              onChangeText={(text) => setText1(text)}
              value={password}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 70,
              paddingVertical: 5,
              paddingTop: 25,
            }}
          >
            <TouchableOpacity
              disabled={checkValidEmail}
              onPress={SignupPress}
              style={{
                backgroundColor: "#000000",
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

export default RegisterPage;
