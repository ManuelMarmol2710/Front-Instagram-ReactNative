import axios from "../libs/axios";
import axis from 'axios'
import { Alert } from "react-native";

export const loginRequest = async (username: string, password: string) => {
  return axis.post("https://back-instagram-reactnative-production.up.railway.app/login", {
    username,
    password,
  });
};

export const PerfilRequest = async () => {
  return axios.get("/profile");
};
export const RegisterRequest = async (
  email: string,
  password: string,
  name: string,
  last_Name: string,
  username: string,
  biography: string,
  navigation:any,
) => {

  var whiteSpaceExp = /^\s+$/; 
  var whiteSpaceBetween = /\s/;

  if ( username.length < 3||  whiteSpaceExp.test(username)||  whiteSpaceBetween.test(username)) {
    Alert.alert("Usuario Invalido", "El usuario debe tener por lo menos 3 caracteres y no presentar espacios en blanco.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if (password.length < 7 || whiteSpaceExp.test(password)|| whiteSpaceBetween.test(password)) {
    Alert.alert("Contraseña Invalida", "La contraseña debe tener por lo menos 7 caracteres y no presentar espacios en blanco.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if (name.length < 2 || whiteSpaceExp.test(name)|| whiteSpaceBetween.test(name)) {
    Alert.alert("Nombre Invalido", "El nombre debe presentar al menos 2 caracteres y no tener espacios en blanco.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if (last_Name.length < 2 || whiteSpaceExp.test(last_Name)|| whiteSpaceBetween.test(last_Name)) {
    Alert.alert("Apellido Invalido", "El apellido debe presentar al menos 2 caracteres y no tener espacios en blanco.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else if (whiteSpaceExp.test(email)|| whiteSpaceBetween.test(email)) {
    Alert.alert("Correo Invalido", "El correo no puede tener espacios en blanco.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  } else {
    Alert.alert("Registro exitoso.", "Bienvenido", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
    navigation.navigate("login")
    return axis.post("https://back-instagram-reactnative-production.up.railway.app/register", {
      email,
      username,
      biography,
      password,
      name,
      last_Name
    });
  }
};

export const sendTweet = async (tweets: string, email: string) => {
  return axios.post(`tweet/${email}`, {
    tweets,
  });
};

export const getTweet = async (email: string) => {
  await axios.get(`tweet/${email}`);
};
