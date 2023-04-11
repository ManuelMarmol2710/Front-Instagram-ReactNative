import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import axios from "../libs/axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function OwnComments({ route, navigation }: { route: any; navigation: any }) {
  const { owner, comment, time, _id } = route.params;
  const [like, setLike] = useState(0);
  const [isLike, setisLike] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setcomments] = useState("");
  const [countLike, setCount] = useState([]);

  const onClick = async () => {
    if (like + (!isLike ? -1 : 1)) {
      await axios.post(`/likeComment/${_id}/${owner}`).then((response) => {
        getCountLike();
        setLike(like + (isLike ? -1 : 1));
      });
    } else if (like + (isLike ? -1 : 1)) {
      await axios.delete(`/notlikeComment/${owner}/${_id}`).then((response) => {
        getCountLike();
        setLike(like + (!isLike ? -1 : 1));
      });
    }
  };

  const obtenerLikeComments = async () => {
    await axios.get(`/likeComment/${owner}/${_id}`).then((response) => {
      if (response.data.like === true) {
        setLike(like + (isLike ? -1 : 1));
      }
      if (response.data.like === false) {
        setisLike(!isLike);
      }
    });
  };

  const getCountLike = async () => {
    await axios.get(`/countLikeCo/${_id}`).then((response) => {
      setCount(response.data);
    });
  };

  const deleteComment = async () => {
    Alert.alert(
      "Desea eliminar el comentario?",
      "Su comentario sera eliminado",
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
              .delete(`deleteComment/${_id}`)
              .then(async (response) => {
                navigation.navigate("Buscar");
              }),
        },
      ]
    );
  };

  const actuComment = async () => {
    Alert.alert("Desea editar el comentario?", "Su comentario sera editado", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancelado"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>
          await axios
            .put(`/updateComment/${_id}`, {
              comment: comments,
            })
            .then((response) => {
              navigation.navigate("Profile");
            }),
      },
    ]);
  };

  useEffect(() => {
    obtenerLikeComments();
    getCountLike();
  }, []);
  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await actuComment(), setRefreshing(false);
    await getCountLike(), setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
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
        >
          <TouchableOpacity
            onPress={deleteComment}
            style={{
              backgroundColor: "#d30000",
              padding: 10,
              borderRadius: 10,
              marginBottom: 15,
              marginLeft: 145,
              marginRight: -190,
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
              <Icon
                style={{ padding: 12, textAlign: "right" }}
                name="delete"
                color="#fff"
                size={25}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#000000",
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 16,
              fontWeight: "500",
              color: "#333",
              paddingTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 5,
              paddingHorizontal: 10,
              borderColor: "black",
              borderWidth: 3,
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
              <Icon
                style={{ padding: 12, textAlign: "left" }}
                name="reply"
                color="#000000"
                size={25}
              />
              @{owner}:{" "}
              <Icon
                style={{ padding: 12, textAlign: "left" }}
                name="brush"
                color="#000000"
                size={25}
              />
              {"\n"}
              {"\n"}
            </Text>
            <View style={{ paddingHorizontal: 50, paddingTop: 25 }}>
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#000000",
                  overflow: "hidden",
                  height: 200,
                  width: 295,
                }}
                onChangeText={setcomments}
                value={comments}
                disableFullscreenUI
                multiline
                placeholder={comment}
                maxLength={100}
              ></TextInput>

              <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity
                  onPress={actuComment}
                  style={{
                    backgroundColor: "#000000",
                    padding: 10,
                    borderRadius: 15,
                    marginBottom: 5,
                    marginLeft: 100,
                    marginRight: -30,
                    marginTop: 20,
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
                    Editar{"   "}
                    <Icon
                      style={{ padding: 12, textAlign: "right" }}
                      name="update"
                      color="#fff"
                      size={25}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 80,
                paddingRight: 60,
                textAlign: "right",
                fontSize: 14,
              }}
            >
              {"\n"}
              || Subido el: {time}
            </Text>
          </Text>

          <View
            style={{
              paddingHorizontal: 0,
              paddingTop: 0,
              backgroundColor: "#fff",
              borderRadius: 70,
              borderWidth: 3,
              margin: 120,
              marginTop: 10,
              marginBottom: 35,
            }}
          >
            <Pressable
              style={{ paddingLeft: 55, paddingTop: 20, paddingBottom: 0 }}
              onPress={onClick}
            >
              <MaterialCommunityIcons
                name={like ? "heart" : "heart-outline"}
                size={32}
                color={like ? "red" : "black"}
              />
              <Text
                style={{
                  paddingVertical: 10,
                  paddingLeft: -8,
                  marginLeft: -10,
                  paddingRight: 0,
                  paddingTop: 10,
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: "700",
                }}
                onPress={() =>
                  navigation.navigate("showLikesComments", {
                    id_tweet: _id,
                    owner: owner,
                  })
                }
              >
                {" "}
                Likes: {"" + (isLike ? like : countLike)}{" "}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OwnComments;
