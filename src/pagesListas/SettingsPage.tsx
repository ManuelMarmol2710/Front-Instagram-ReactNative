import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function SettingsPage({ navigation }: { navigation: any }) {
  
  const Bye = async () => {
    Alert.alert("Cerrar sesión?", "Su sesión será cerrada", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("login") },
    ]);
    useAuthStore((state) => state.logout);
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
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "500",
            color: "#333",
            paddingBottom: 25,
          }}
        >
          Settings{"  "}<Icon
              style={{ padding: 12, textAlign: "center" }}
              name="wrench"
              color="#000000"
              size={40}
            />
        </Text>

        <View
          style={{
            paddingHorizontal: 40,
            paddingVertical: 5,
            paddingTop: 30,
            paddingBottom: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={{
              backgroundColor: "#9b9b9b",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
              borderColor: "black",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontWeight: "700",
                fontSize: 16,
                color: "#fff",
              }}
            >
              Opciones de perfil{"           "}<Icon
              style={{  }}
              name="account-box"
              color="#000000"
              size={30}
            />
            </Text>
            
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 40,
            paddingVertical: 5,
            paddingTop: 120,
            paddingBottom: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Bye();
            }}
            style={{
              backgroundColor: "#ff0000",
              padding: 20,
              borderRadius: 10,
              marginBottom: 80,
              borderColor: "black",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
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
              Logout{"                                  "}<Icon
              style={{ }}
              name="logout"
              color="#000000"
              size={30}
            />
            </Text>
            
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SettingsPage;
