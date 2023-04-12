import React, { useState } from "react";
import { useEffect, useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
  Pressable,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
import Container from "../components/Container/Container";

import styles from "./Comment.styles";

function Comments({ route, navigation }: { route: any; navigation: any }) {
  const {
    owner,
    post,
    time,
    _id,
    url,
    url2,
    url3,
    url4,
    url5,
    url6,
    url7,
    url8,
    url9,
    url10,
  } = route.params;
  const username = useAuthStore((state) => state.profile.username.username);
  const [like, setLike] = useState(0);
  const [countLike, setCount] = useState([]);
  const [isLike, setisLike] = useState(false);
  const [comment, setText] = useState("");
  const [task, setTask] = useState([]);
  const [idUrl, setIdUrl] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const commentsPress = async () => {
    setText("");
    OnRefresh();
    axios.post(`comment/${_id}/${username}`, {
      comment,
    });
  };
  const getComments = async () => {
    await axios.get(`comment/${_id}`).then((response) => {
      setTask(response.data);
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
    obtenerLike();
    getComments();
    getCountLike();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await getComments(), setRefreshing(false);
    await getCountLike(), setRefreshing(false);
  }, []);

  const alertaEliminar = async () => {
    Alert.alert("Desea eliminar el Post?", "Su Post sera eliminado", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>
          await axios.delete(`deletePost/${_id}`).then((response) => {
            navigation.navigate("Profile");
          }),
      },
    ]);
  };
  return (
    <Container insets={{ top: true, bottom: true }}>
      <ScrollView>
        <View>
          <View style={{ marginBottom: 10, marginTop: 0 }}>
            <FlatList
              data={task}
              renderItem={({ item }) => {
                if (username === item["owner"]) {
                  return (
                    <TouchableOpacity
                      style={styles.topleft}
                      onPress={() =>
                        navigation.navigate("owncomment", {
                          comment: item["comment"],
                          owner: item["owner"],
                          time: item["time"],
                          _id: item["_id"],
                        })
                      }
                    >
                      <View style={styles.top}>
                        <View style={styles.topleft2}>
                          <Image
                            source={{
                              uri: "data:image/jpeg;base64,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",
                            }}
                            style={styles.profilImage}
                          />
                        </View>
                      </View>
                      <Text style={styles.topleft}>
                        <Text style={styles.top}>
                          <Icon
                            style={{ padding: 12, textAlign: "left" }}
                            name="reply"
                            color="#fff"
                            size={20}
                          />
                          @{item["owner"]}:{" "}
                          <Icon
                            style={{ padding: 10, textAlign: "left" }}
                            name="brush"
                            color="#fff"
                            size={16}
                          />{" "}
                          {"\n"}
                          {"\n"}
                        </Text>

                        <Text
                          style={{
                            paddingTop: 20,
                            paddingLeft: 60,
                            paddingRight: 60,
                            textAlign: "left",
                            fontSize: 14,
                            color: "#fff"
                          }}
                        >
                          {" "}
                          {item["comment"]} {"\n"}
                          {"\n"}
                          {"\n"}
                          {"\n"}
                        </Text>

                        <Text
                          style={{
                            paddingTop: 50,
                            paddingLeft: 60,
                            paddingRight: 60,
                            textAlign: "center",
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          || Subido el: {item["time"]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={styles.topleft}
                      onPress={() =>
                        navigation.navigate("awaycomment", {
                          comment: item["comment"],
                          owner: item["owner"],
                          time: item["time"],
                          _id: item["_id"],
                        })
                      }
                    >
                      <View style={styles.top}>
                        <View style={styles.topleft2}>
                          <Image
                            source={{
                              uri: "data:image/jpeg;base64,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",
                            }}
                            style={styles.profilImage}
                          />
                        </View>
                      </View>
                      <Text style={styles.topleft}>
                        <Text style={styles.top}>
                          <Icon
                            style={{ padding: 12, textAlign: "left" }}
                            name="reply"
                            color="#fff"
                            size={20}
                          />
                          @{item["owner"]}:{" "}{" "}
                          {"\n"}
                          {"\n"}
                        </Text>

                        <Text
                          style={{
                            paddingTop: 20,
                            paddingLeft: 60,
                            paddingRight: 60,
                            textAlign: "left",
                            fontSize: 14,
                            color: "#fff"
                          }}
                        >
                          {" "}
                          {item["comment"]} {"\n"}
                          {"\n"}
                          {"\n"}
                          {"\n"}
                        </Text>

                        <Text
                          style={{
                            paddingTop: 50,
                            paddingLeft: 60,
                            paddingRight: 60,
                            textAlign: "center",
                            fontSize: 12,
                          }}
                        >
                          {" "}
                          || Subido el: {item["time"]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />

            <View
              style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}
            >
              <Text style={styles.postName}>{owner}</Text>
              <Text style={{ color: "white", marginTop: 2 }}> {post}</Text>
            </View>

            <Text
              style={styles.comment}
              onPress={() => navigation.navigate("Comment", {})}
            >
              Comentar
            </Text>

            <Text style={styles.time}>{time}</Text>

            <View style={{ paddingHorizontal: 25, paddingTop: 0 }}>
              <TextInput
                color="#066cb4"
                placeholder="Agregar comentario al Post"
                onChangeText={(text) => setText(text)}
                style={{ paddingHorizontal: 30, paddingVertical: 20 }}
                value={comment}
                numberOfLines={4}
                maxLength={120}
                editable
              />

              <View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
                <TouchableOpacity
                  onPress={commentsPress}
                  style={{
                    backgroundColor: "#000000",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 30,
                    marginLeft: -30,
                    marginRight: -130,
                    borderWidth:1,
                    borderColor: "#fff"
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
                    Comentar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
export default Comments;
