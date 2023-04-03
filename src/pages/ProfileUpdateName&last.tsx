import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { TextInput, IconButton} from "@react-native-material/core";

function ProfileUpdateNamelastPage({navigation}: {navigation: any}) {
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const nameShow = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);
  const [name, setText2] = useState("");
  const [last_Name, setText3] = useState("");


  const changeNameandLast = async () => {
    return axios.put(`/update/${emailShow}`, {
      name: name,
      last_Name: last_Name,
   
    });
  };

  const alertaNameLast = async () => {
    Alert.alert("Desea editar sus datos?", "Sus datos seran actualizados.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>
        await axios.put(`/update/${emailShow}`, {
          name: name,
          last_Name: last_Name,
       
        }).then((response) => {
          navigation.navigate("Profile");
        }),
      },
    ]);
  };

  return (
    <SafeAreaView>
      <View
          style={{
            paddingHorizontal: 25,
            paddingTop: 80,
            backgroundColor: "#fff",
            borderRadius: 50,
            borderWidth: 3,
            margin: 10,
            marginTop: 50
          }}
        >
      <View style={{paddingHorizontal:25, paddingTop:20}}>
      <Text style={{
            textAlign:'center',
            fontSize: 30,
            fontWeight: '500',
            color: '#333',
            paddingBottom: 25
          }}>
        Editar datos 
      </Text>

      <TextInput
        color='#066cb4'
        label="Nombre"
        placeholder={nameShow}
        onChangeText={setText2}
        value={name}
      />

      <TextInput
        color='#066cb4'
        label="Apellido"
        placeholder={lastName}
        onChangeText={setText3}
        value={last_Name}
      />
     </View>

  
      <View
        style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 25 }}
      >
        <TouchableOpacity
          onPress={alertaNameLast}
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
            Editar
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
}
export default ProfileUpdateNamelastPage;
