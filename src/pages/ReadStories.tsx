import { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Container from "../components/Container/Container";
import Content from "../components/Content/Content";

function ReadStories({ route, navigation }: { route: any; navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const [refreshing, setRefreshing] = useState(false);
  const [task1, setTask1] = useState([]);

  const Stories = async () => {
    await axios.get(`mystorie/${username}`).then((response) => {
      setTask1(response.data);
    });
  };
  useEffect(() => {
    const foo = async () => {
      await axios.get(`mystorie/${username}`).then((response) => {
        if (response.data === "no") {
          Alert.alert(
            `No has subido historias`,
            "Sera dirigido hacia el perfil Porfavor suba una historia",
            [{ text: "OK", onPress: () => navigation.navigate("Profile") }]
          );
        } else {
          Stories();
        }
      });
    };
    foo();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await Stories(), setRefreshing(false);
  }, []);

  const alertaEliminar = async () => {};

  return (
    <Container>
      <Content>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
          }
        >
          <View
            style={{
              paddingHorizontal: 210,
              paddingVertical: 1,
              paddingTop: 15,
            }}
          ></View>

          <ScrollView horizontal={true}>
            <View style={{ paddingHorizontal: 25, paddingTop: 0 }}>
              <FlatList
                data={task1}
                numColumns={40}
                renderItem={({ item }) => {
                  return (
                    
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#000000",
                        paddingTop: 1,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 15
                      }}
                    >
                      
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#333",
                          paddingTop: 15,
                          paddingBottom: 5,
                          paddingHorizontal: 15,
                          borderColor: "black",
                          borderWidth: 2,
                          borderRadius: 15,
                          backgroundColor: "#fff",
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          style={{
                            paddingTop: 20,
                            paddingLeft: 30,
                            textAlign: "left",
                            fontWeight: "700",
                            fontSize: 16,
                            color: "#000000",
                          }}
                        >
                          @{item["owner"]}
                        </Text>
                        <Text
                          style={{
                            paddingTop: 0,
                            paddingLeft: 80,
                            paddingRight: 60,
                            textAlign: "center",
                            fontSize: 14,
                          }}
                        >
                          {" "}
                          {"\n"}
                          || Subido el: {item["time"]}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#333",
                          paddingTop: 3,
                          paddingBottom: 0,
                          paddingHorizontal: 15,

                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 15,
                          backgroundColor: "#fff",
                          overflow: "hidden",
                          marginBottom: 1,
                        }}
                      >
                        <View  style={{ paddingLeft: 10, marginRight:-25, paddingTop: 15, marginBottom:-2 }}>
                          <Image
                            style={{
                              width: 300,
                              height: 700,
                              borderWidth: 3,
                              borderRadius: 10,
                            }}
                            source={{ uri: `${item["url"]}` }}
                          />
                        </View>
                      </Text>

                      <Text>
                      <Text>
     <TouchableOpacity
            onPress={  () =>{  Alert.alert("Desea eliminar la Storie?", "Su Storie sera eliminado", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancelado"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: async () =>
                  await axios.delete(`deleteStorie/${item['_id']}`).then((response) => {
                    navigation.navigate("Profile");
                  }),
              },
            ]);
          }}

            style={{
              backgroundColor: "#d30000",
              padding: 10,
              borderRadius: 10,
              marginBottom: 15,
              marginLeft: 90,
              marginRight: -190,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 16,
                color: "#fff",
                paddingTop:10,
              }}
            >
              <Icon
                style={{ padding: 12, textAlign: "right" }}
                name="delete"
                color="#fff"
                size={25}
              />
            </Text>
          </TouchableOpacity> 

     </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </ScrollView>
      </Content>
    </Container>
  );
}

export default ReadStories;
