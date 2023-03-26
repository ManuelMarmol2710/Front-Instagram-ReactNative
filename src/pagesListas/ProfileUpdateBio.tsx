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
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { IconButton } from "@react-native-material/core";
import { Icon } from "@react-native-material/core";

function ProfileUpdateBiografia({ navigation }: { navigation: any }) {
  const emailShow = useAuthStore((state) => state.profile.username.email);
  const nameShow = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);
  const bioShow = useAuthStore((state) => state.profile.username.biography);
  const [biography, setText4] = useState("");

  const alertaBio = async () => {
    Alert.alert(
      "Desea editar su biografia?",
      "Su biografia sera actualizada.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () =>
            await axios
              .put(`/updatebiography/${emailShow}`, {
                biography: biography,
              })
              .then((response) => {
                navigation.navigate("Profile");
              }),
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 25,
            paddingTop: 80,
            backgroundColor: "#fff",
            borderRadius: 50,
            borderWidth: 3,
            margin: 10,
            marginTop: 50,
          }}
        >
          <View style={{ paddingHorizontal: 25, paddingTop: 25 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "500",
                color: "#333",
                paddingBottom: 25,
              }}
            >
              Editar Biografia
            </Text>

            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#000000",
                overflow: "hidden",
                height: 120,
                width: 290,
              }}
              color="#000000"
              label="Biografia"
              placeholder={bioShow}
              onChangeText={setText4}
              value={biography}
              disableFullscreenUI
              multiline
              maxLength={100}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 70,
              paddingVertical: 5,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={alertaBio}
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
          <View
            style={{ paddingHorizontal: 70, paddingVertical: 5, paddingTop: 5 }}
          ></View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
export default ProfileUpdateBiografia;
