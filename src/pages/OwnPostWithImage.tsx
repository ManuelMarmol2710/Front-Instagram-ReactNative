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

import styles from "./Post.styles";

function OwnPostWithImage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
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
  const UrlId = async () => {
    return axios.get(`idPost/${_id}`).then((response) => {
      setIdUrl([response.data]);
    });
  };
  const commentsPress = async () => {
    setText("");
    return axios.post(`comment/${_id}/${username}`, {
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
    UrlId();
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
      <View>
        <View style={{ marginBottom: 10, marginTop: -40 }}>
          <View style={styles.top}>
            <View style={styles.topleft}>
              <Image
                source={{
                  uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SDw8PEA8PDxAPFRAVFg8VFRAPEBUVFRUWFhUSFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAAAQIFBgQD/8QAORABAQABAQQGBggGAwEAAAAAAAECAwQFETEhQVFhcZEGEjKhssEiMzRScoGC4RMjQrHR8GKSoiT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7MFAAAQUEUAEVAAUAEBUUBFABAABQAAQABQAEUAABAAUAEAFEUAEAAAUABAFRQAEAABQABABQARUAUAEAAFAABAAFejZ9h1c/Y08rO3lPOvZhuDXvXpzxt+UBq0bXPcGtOvTv55fOPJr7u1sPa08uHbOGU9wPKCgAAgACgAgAKAAAIoACAKigAIAD6bPoZZ5Y4Yzjcuj9/AGWy7NnqZTHCcb7pO210uwbm09PhcpNTPtvszwj1bBseOlhMcefXl129r0gCcVBLFAHg27dWlqcbw9TP78+c63M7dsWellwynReWU5X/ex2r47VoY6mNwynGXznfO8HDq++27LlpZ3C+MvbO18AAAEUBFAAQBRj5qCoAAKAACAAR0no3snDC6t559E7sZz87/ZzknHonOu50NKY4Y4TljJPKA+iWlqAMiAAJaBakhIyBrN/bH6+lcpPpafGzw658/ycq72xw+1aXqameH3csp+XHo9wPkgAKACKgAKAACCgAICiAKAD7bDOOrpT/nh8UdtXD7Ln6uphl93LG+VldyDFlAABLQUSKAAA5Dfk/8Ao1P03/zHXuN3xnx2jVvfw8pJ8geNQABABQAAAAAEAAAUAEAB2m7No/iaWGXXw4XxnRXFtv6P7d6md08r9HPl3Zfv/gHTgloFqSEZAAAJxS0kBjr6swwyzvLGWuHzyttyvPK23xvTW99I9u5aON7Ll8sfn5NCAIAAoAIAACgAIKCKACKgAKACA6Pc295lJp6l4Zcpnf6u69/9254OEbPYN9amnwxy/mYzt9qeF/yDqh4Nn3xoZ/1+pezL6Pv5PbjqY3lZfCygyY2meUnOye549femhhz1Jb2Y/Svu5A9kjW723rNOXDDhdS/nMe+9/c1u3b9zy446c/hz739f7NRaBllbbbeNvTb1gAgKACAAAKAAAIoAIAKIoAIAE7Gy2Xcutn02TTnbl0Xy5g1w6XQ9H9Ke3llnf+s93T73u0t3aGPLSw/OetfeDi2WOF6pfKu4mMnKSeHCM4Dhbp5deOXlWLvUyxl5yX3g4JXaauwaOXPSw8pL5x4dfcOjfZuWH5+tPKg5gbTadxa2PTjw1J3dGXlWtyxstlllnOXooICAoigigAgAce+B/vUAqAACgAAj17v3fnq3hj0YznneU7u+ruzYLrZ8OWM9rLu7J311+jpY4YzHGSYzlAebYd26elPozjl9+9OX7PYADG0tJAJGQAAUGNqyEigPPtmxaerOGePHsy5ZTwr0AOR3nuvPS6faw+92d2U6mvd3lOMss4y9V6Z4OW3zu3+Fl62P1eXLuv3Qa1QARUABQAAQfHV2mY5Y42ZW5dcnHGdXTX3ABAAerdel62tp49XrS+XT8gdRuvZP4Wljj/VenLxv+OX5PYAAnFQTgoAAxtBeKpIoAACWKAkj5bXs81MMsLyynPsvVX2AcJqYXHK43ouNsvjGDZekGn6uvl/ymOXyv9mtBRFAAAABqt44y7Rs/wB6cvZ5cenjxvHq6PC+F2rWbxv8/ZvpcJbeM45Tjw6Z0ScLOPf1+WyAAAbDcP2jT/X8NeB79w/aNP8AX8NB1zG0tJAJGQAAxoFqyEigAAMeIsgEUAEtLWIOb9JvrsfwT4smobf0m+ux/BPiyakAEAABQAa7bs8JraPG4ev0+rLc5l09F6J0WePZWxazeOr/AD9nw7+N8LcZOPbOOPhx9Xu47MAAB7txfaNP9fw14Xv3D9o0/wBfw0HWSMgABjaDIIAAAMWScAJFAAS0lBakigOZ9J/rsfwT4smobf0n+ux/BPiyagEAAUABFBrt4a2U1tnxnrTG28bLjMbynCzn1zz4dfRsXh2zZc8tbRzknq4XpvGzLy5cOXTz6a9wCAA2G4ftGn+v4a8D37h+0af6/hoOuBjaBashIoAAFSVFkBQAEpagIykWAAJaDmvSf67H8E+LJqG29JfrsfwT4smoBQAEADgqKAABOSKAPfuH7Rp/r+GqA6yscf8AfeAMwAEoAmLIAAAY1YAKAAxvWAOa9JfrcPwT4smpABKoBOXmigAAP//Z",
                }}
                style={styles.profilImage}
              />
              <Text style={styles.title}>{owner}</Text>
            </View>

            <TouchableOpacity style={{ alignSelf: "center", marginRight: 10 }} onPress={alertaEliminar}>
              <Feather name="more-vertical" size={20} color="#F5F5F5" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 400 }}>
          <FlatList
            data={idUrl}
            numColumns={40}
            renderItem={({ item }) => {
              if (item["url2"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: "1%",
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url3"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url4"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url5"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url6"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url5"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url7"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url5"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url6"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url8"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url5"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url6"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url7"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
              if (item["url9"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url5"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url6"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url7"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url8"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }

              if (item["url10"] === undefined) {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url5"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url6"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url7"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url8"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url9"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              } else {
                return (
                  <ScrollView horizontal={true}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "500",
                        color: "#333",
                        paddingTop: 15,
                        paddingBottom: 5,
                        paddingHorizontal: 20,
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 1,
                        backgroundColor: "#fff",
                      }}
                    >
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 90,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url2"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url3"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url4"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url5"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url6"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url7"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url8"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url9"]}` }}
                        />
                      </View>
                      <View
                        style={{
                          width: width * 0.9,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: "85%",
                            height: 400,

                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url10"]}` }}
                        />
                      </View>
                    </Text>
                  </ScrollView>
                );
              }
            }}
          />
          </View>

          <View style={styles.ıconContainer}>
            <View style={styles.leftIcon}>
              <TouchableOpacity 
                onPress={onClick}>
              <MaterialCommunityIcons
                name={like ? "heart" : "heart-outline"}
                size={32}
                color={like ? "red" : "white"}
              />
              </TouchableOpacity>

              <TouchableOpacity>
                <Feather name="message-circle" size={24} color="white"  onPress={() =>
                          navigation.navigate("Comment", {
                            _id:_id,
                          })
                        }/>
              </TouchableOpacity>
              <Feather name="send" size={24} color="white" />
            </View>

            <View style={{ marginRight: 20 }}>
              <FontAwesome name="bookmark-o" size={24} color="white" />
            </View>
          </View>

          <Text style={styles.likeText} onPress={() =>
                  navigation.navigate("showLikes", {
                    id_tweet: _id,
                    owner: owner,
                  })
                }
              >
            {"" + (isLike ? like : countLike)} likes
          </Text>

          <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.postName}>{owner}</Text>
            <Text style={{ color: "white", marginTop: 2 }}> {post}</Text>
          </View>

          <Text style={styles.time}>{time}</Text>
          
        </View>
      
       
      </View>
    </Container>
  );
}
export default OwnPostWithImage;
