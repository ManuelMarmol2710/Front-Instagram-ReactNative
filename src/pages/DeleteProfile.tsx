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
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Container from "../components/Container/Container";
import Content from "../components/Content/Content";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";

function DeletePage({ navigation }: { navigation: any }) {
    const username = useAuthStore((state) => state.profile.username.username);
    let [task, setTask] = useState([])
    const postRelease = async () => {
        Alert.alert(
            "Desea ELIMINAR su CUENTA?",
            "Su CUENTA.",
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
                    .put(`/disable/${username}/${username}/${username}`, {
                 
                    })
                    .then((response) => {
                      navigation.navigate("login");
                    }),
                   
                  },
            ]
          );
        };
      
    return (
    <Container>
      <Content>
        <View
          style={{
            paddingHorizontal: 25,
            paddingTop: 300,
            backgroundColor: "#000000",
            borderRadius: 50,
            borderWidth: 3,
            margin: 10,
            marginTop: 5,
          }}
        >
          <TouchableOpacity
              onPress={() => {
              postRelease();
              
              }}
              style={{
                backgroundColor: "#d30000",
                padding: 20,
                borderRadius: 10,
                marginBottom: 10,
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
                Eliminar Cuenta{"          "}
                <Icon
                  style={{ textAlign: "center" }}
                  name="account-cancel"
                  color="#fff"
                  size={30}
                />
              </Text>
            </TouchableOpacity>
          </View>
      
      </Content>
    </Container>
  );
}

export default DeletePage;
