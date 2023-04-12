import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Content from "../components/Content/Content";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import Container from "../components/Container/Container";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
import styles from "./Post.styles";
function HomePage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  let [task, setTask] = useState([]);
  const [task1, setTask1] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [like, setLike] = useState(0);
  const [countLike, setCount] = useState([]);
  const [isLike, setisLike] = useState(false);
  const postRelease = async () => {
    await axios.get(`followers/${username}`).then((response) => {
      setTask(response.data);
    });
  };
  const followingRealease = async () => {
    await axios.get(`follow/${username}`).then((response) => {
      setTask1(response.data);
 
    });
  };
  const onClick = async () => {
    if (like + (!isLike ? -1 : 1)) {
      await axios.post(`/like/${_id}/${owner}`).then((response) => {
        setLike(like + (isLike ? -1 : 1));
        getCountLike();
      });
    } else if (like + (isLike ? -1 : 1)) {
      await axios.delete(`/notlike/${owner}/${_id}`).then((response) => {
        setLike(like + (!isLike ? -1 : 1));
        getCountLike();
      });
    }
  };

  const obtenerLike = async () => {
    await axios.get(`/like/${owner}/${_id}`).then((response) => {
      if (response.data.like === true) {
        setLike(like + (isLike ? -1 : 1));
      }
      if (response.data.like === false) {
        setisLike(!isLike);
      }
    });
  };

  const getCountLike = async () => {
    await axios.get(`/countLike/${_id}`).then((response) => {
      setCount(response.data);
    });
  };
  useEffect(() => {
    const foo = async () => {
     await axios.get(`followers/${username}`).then((response) => {
    //  setTask(response.data);
      console.log(response.data)
       if (response.data === "no") {
        Alert.alert(
          `No has subido historias`,
          "Sera dirigido hacia el perfil Porfavor suba una historia",
          [{ text: "OK", onPress: () => navigation.navigate("Profile") }]
        );
        } else {
         
          postRelease();
          followingRealease();
          obtenerLike();
          getCountLike();
        }
      });
    };
    foo();
   
   
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await postRelease(), setRefreshing(false);
    await followingRealease(), setRefreshing(false);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
      }
    >
      <View style={{ paddingHorizontal: "1.5%", paddingTop: "15%" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
            paddingTop: "0.5%",
            paddingLeft: 13,
            paddingRight: 10,
            paddingBottom: "4%",
            paddingHorizontal: 10,
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 15,
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                paddingTop: 20,
                paddingLeft: "16%",
                textAlign: "left",
                fontWeight: "700",
                fontSize: 16,
                color: "#000000",
              }}
              onPress={() => {
                OnRefresh();
                navigation.navigate("Home", {});
              }}
            >
              <AntDesign name="home" size={24} color="black" />
              {"   "}Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={{
                paddingTop: 20,
                textAlign: "right",
                paddingLeft: "70%",
                fontWeight: "700",
                fontSize: 16,
                color: "#000000",
              }}
              onPress={() => {
                OnRefresh();
                navigation.navigate("MenuDM", {});
              }}
            >
              {"                                                     "}DM{" "}
              <AntDesign name="message1" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={{ paddingHorizontal: 25, paddingTop: "0.2%" }}>
          <FlatList
            data={task1}
            numColumns={40}
            renderItem={({ item }) => {
              if (item["disable"] === false) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000000",
                      paddingTop: 10,
                      paddingLeft: 0,
                      paddingRight: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("AwayReadstories", {
                        url: item["url"],
                        owner: item["following"],
                        time: item["time"],
                      })
                    }
                  >
                    <LinearGradient
                      colors={[
                        "#00FFFF",
                        "#17C8FF",
                        "#329BFF",
                        "#4C64FF",
                        "#6536FF",
                        "#8000FF",
                      ]}
                      start={{ x: 0.0, y: 1.0 }}
                      end={{ x: 1.0, y: 1.0 }}
                      style={{
                        borderRadius: 35,
                        paddingBottom: 4,
                        paddingTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "700",
                          paddingTop: 25,
                          paddingBottom: 15,
                          paddingHorizontal: 15,
                          borderWidth: 3,
                          margin: 1,
                          width: 200,
                          height: 75,
                          borderRadius: 30,
                          paddingVertical: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "white",
                          overflow: "hidden",
                        }}
                      >
                        <Text
                          style={{
                            paddingTop: 20,
                            paddingLeft: 30,
                            textAlign: "center",
                            fontWeight: "700",
                            fontSize: 16,
                            color: "#000000",
                          }}
                        >
                          {item["following"]}
                        </Text>
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              } else {
              }
            }}
          />
        </View>
      </ScrollView>
      <ScrollView horizontal={true}>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <FlatList
            data={task}
            renderItem={({ item }) => {
              if (item["disable"] === false) {
                return (
                  <SafeAreaView>
                    <ScrollView>
                      <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <View style={{ height: 400, width: 400 }}>
                          <View style={styles.top}>
                            <View style={styles.topleft}>
                              <Image
                                source={{
                                  uri: "data:image/jpeg;base64,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",
                                }}
                                style={styles.profilImage}
                              />
                              <Text style={styles.title}>{item["owner"]}</Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("PostWithImage", {
                                owner: item["owner"],
                                post: item["post"],
                                time: item["time"],
                                _id: item["_id"],
                              })
                            }
                          >
                            <Image
                              style={{
                                width: "100%",
                                height: 350,
                                borderWidth: 90,
                                borderRadius: 10,
                              }}
                              source={{ uri: `${item["url"]}` }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.ıconContainer}>
                        <View style={styles.leftIcon}>
                          <TouchableOpacity onPress={onClick}>
                            <MaterialCommunityIcons
                              name={like ? "heart" : "heart-outline"}
                              size={32}
                              color={like ? "red" : "white"}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <Feather
                              name="message-circle"
                              size={24}
                              color="white"
                              onPress={() =>
                                navigation.navigate("Comment", {
                                  _id: item["_id"],
                                })
                              }
                            />
                          </TouchableOpacity>
                          <Feather name="send" size={24} color="white" />
                        </View>

                        <View style={{ marginRight: 20 }}>
                          <FontAwesome
                            name="bookmark-o"
                            size={24}
                            color="white"
                          />
                        </View>
                      </View>

                      <Text
                        style={styles.likeText}
                        onPress={() =>
                          navigation.navigate("showLikes", {
                            id_tweet: item["_id"],
                            owner: item["owner"],
                          })
                        }
                      >
                        {"" + (isLike ? like : countLike)} likes
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.postName}>{item["owner"]}</Text>
                        <Text style={{ color: "white", marginTop: 2 }}>
                          {" "}
                          {item["post"]}
                        </Text>
                      </View>

                      <Text style={styles.time}>{item["time"]}</Text>
                    </ScrollView>
                  </SafeAreaView>
                );
              }
              if (item["disable"] === true) {
              }
            }}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
}
export default HomePage;
