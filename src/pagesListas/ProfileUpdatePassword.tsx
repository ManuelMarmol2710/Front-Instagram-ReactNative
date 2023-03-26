import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { TextInput, IconButton } from "@react-native-material/core";

function ProfileUpdatePasswordPage({ navigation }: { navigation: any }) {
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const [password, setText1] = useState("");
  var whiteSpaceExp = /^\s+$/; 
  var whiteSpaceBetween = /\s/;

  const changePassword = async () => {
   
    return axios.put(`/updatepassword/${emailShow}`, {
      password: password,
    });
  };

  const alertaCambiarPassword = async () => {
    Alert.alert("Desea cambiar su contraseña?", "Su contrasena sera cambiada.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>{
        if (password.length < 7 || whiteSpaceExp.test(password)|| whiteSpaceBetween.test(password)) {
          Alert.alert("Contraseña Invalida", "La contraseña debe tener por lo menos 7 caracteres y no presentar espacios en blanco.", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]); 
          } else{
            await axios.put(`/updatepassword/${emailShow}`, {
                      password: password,
                    }).then((response) => {
                      navigation.navigate("login");
                    }) }
                  }
                  },
    ]);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 25,
          paddingTop: 40,
          backgroundColor: "#fff",
          borderRadius: 50,
          borderWidth: 3,
          margin: 10,
          marginTop: 50,
        }}
      >
        <View style={{ paddingHorizontal: 25, paddingTop: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: "#333",
              paddingBottom: 25,
            }}
          >
            Editar Contraseña
          </Text>

          <View style={{ paddingTop: 50 }}>
            <TextInput
              color="#066cb4"
              label="Contraseña"
              placeholder="******"
              value={password}
              onChangeText={(text) => setText1(text)}
            />
          </View>
        </View>
        <View
          style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 95 }}
        >
          <TouchableOpacity
            onPress={alertaCambiarPassword}
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
              Editar Contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ProfileUpdatePasswordPage;
