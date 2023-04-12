import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking
} from "react-native";
import styles from './Login.styles';
import Container from '../components/Container/Container';
import Content from '../components/Content/Content';
import { IconButton } from "@react-native-material/core";
import { loginRequest, PerfilRequest } from "../api/auth";
import { useAuthStore } from "../store/auth.store";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {TextInput} from 'react-native-paper';

function LoginPage({ navigation }: { navigation: any }) {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [name, setName] = useState("");

  const loginPress = async () => {
    try {
      const respuesta = await loginRequest(name, password);
      setToken(respuesta.data.token);
      const resProfile = await PerfilRequest();
      setProfile(resProfile.data.profile);
      navigation.navigate("homepage");
      setName("");
      setPassword("");
    } catch (error) {
      Alert.alert("Login Invalido", "Usuario o contraseña", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      console.log(error);
    }
  };

  const register = async () => {
    navigation.navigate("register");
  };


  const recoverEmail = async () => {
    navigation.navigate("sendEmail");
  };
  return (
    <Container insets={{top: true, bottom: true}}>
      <Content>
        <View style={{flex: 1}}>
          <View style={styles.topContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'white', opacity: 0.6, fontSize: 14}}>
              </Text>
            </View>
            <Image
              style={styles.logo}
              source={require('../assets/images/omapp_logo.png')}
            />
          </View>

          <View style={styles.keyboardView}>
            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="Username"
              onChangeText={setName}
              value={name}
              textColor="white"
              placeholderTextColor="white"
              selectionColor="white"
              style={styles.textInput}
              activeOutlineColor="white"
              activeUnderlineColor="white"
            />

            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={setPassword}
              value={password}
              textColor="white"
              style={styles.textInput}
              selectionColor="white"
              secureTextEntry={passwordVisible}
              activeUnderlineColor="white"
              activeOutlineColor="white"
              right={
                <TextInput.Icon
                  color={'white'}
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            <TouchableOpacity
              onPress={loginPress}
              style={styles.login}>
              <Text style={styles.loginText}>Iniciar Sesion</Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center', padding: 10}}>
              <View style={styles.text}>
                <Text style={{fontSize: 12, color: 'grey'}}>
                  No tienes una cuenta?{' '}
                </Text>
                <TouchableOpacity onPress={register}>
                <Text style={styles.help}> Registrate</Text>
                </TouchableOpacity>
                
              </View>

              <View style={styles.seperatorStyle}>
                <View style={styles.seperator} />
                <Text style={{color: 'grey'}}> </Text>
                <View style={styles.seperator} />
              </View>

            </View>
          </View>

          <View style={styles.bottomContainer}>
          </View>
        </View>
      </Content>
    </Container>
  );
}

export default LoginPage;
