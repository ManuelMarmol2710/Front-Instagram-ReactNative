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
import styles from "./Login.styles";
import Container from "../components/Container/Container";
import Content from "../components/Content/Content";
import { RegisterRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import { IconButton } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-paper";

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
      navigation
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

  const login = async () => {
    navigation.navigate("login");
  };

  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View style={{ flex: 1, marginTop:"35%" }}>

          <View style={styles.keyboardView}>
            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Nombre"
              onChangeText={setText2}
              value={name}
              placeholderTextColor="white"
              selectionColor="white"
              style={styles.textInput}
              activeOutlineColor="white"
              activeUnderlineColor="white"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Apellido"
              onChangeText={setText3}
              value={last_Name}
              placeholderTextColor="white"
              selectionColor="white"
              style={styles.textInput}
              activeOutlineColor="white"
              activeUnderlineColor="white"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Biografia"
              onChangeText={(text) => setText4(text)}
              value={biography}
              placeholderTextColor="white"
              selectionColor="white"
              style={styles.textInput}
              activeOutlineColor="white"
              activeUnderlineColor="white"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="ejemplo@test.com"
              onChangeText={(text) => handleCheckEmail(text)}
              value={email}
              placeholderTextColor="white"
              selectionColor="white"
              style={styles.textInput}
              activeOutlineColor="white"
              activeUnderlineColor="white"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Usuario"
              onChangeText={setText5}
              value={username}
              placeholderTextColor="white"
              selectionColor="white"
              style={styles.textInput}
              activeOutlineColor="white"
              activeUnderlineColor="white"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Contraseña"
              placeholderTextColor="white"
              onChangeText={(text) => setText1(text)}
              value={password}
              style={styles.textInput}
              selectionColor="white"
              activeUnderlineColor="white"
              activeOutlineColor="white"
            />

            <TouchableOpacity onPress={SignupPress} style={styles.login}>
              <Text style={styles.loginText}>Registrarse</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", padding: 10 }}>
              <View style={styles.text}>
                <Text style={{ fontSize: 12, color: "grey" }}>
                  Ya tienes una cuenta?{" "}
                </Text>
                <TouchableOpacity onPress={login}>
                  <Text style={styles.help}> Inicia Sesion</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.seperatorStyle}>
                <View style={styles.seperator} />
                <Text style={{ color: "grey" }}> </Text>
                <View style={styles.seperator} />
              </View>
            </View>
          </View>

          <View style={styles.bottomContainer}></View>
        </View>
      </Content>
    </Container>
  );
}

export default RegisterPage;

