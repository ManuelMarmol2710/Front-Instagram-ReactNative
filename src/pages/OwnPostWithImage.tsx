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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth.store";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
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
            onPress={alertaEliminar}
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
        <View style={{ paddingHorizontal: 25, paddingTop: 0 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              color: "#333",
              paddingTop: 15,
              paddingBottom: 5,
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 1,
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
              @{owner}
            </Text>
          </Text>
        </View>

        <View style={{ paddingHorizontal: 12, paddingTop: 0 }}>
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
                            width: "95%",
                            height: "95%",
                            borderWidth: 5,
                            borderRadius: 10,
                            paddingTop: 20,
                            marginTop:"45%",
                            marginLeft: "5%",
                            marginBottom:"-25%"
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
        <View
          style={{
            paddingHorizontal: 0,
            paddingTop: 0,

            backgroundColor: "#fff",
            borderRadius: 30,
            borderWidth: 3,
            margin: 35,
            marginTop: 10,
            marginBottom: 1,
          }}
        >
          <Text
            style={{
              paddingTop: -60,
              paddingLeft: 2,
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#000000",
            }}
          >
            {post}
          </Text>
          <Text
            style={{
              paddingTop: 0,
              paddingLeft: 20,
              paddingRight: 20,
              textAlign: "left",
              fontSize: 14,
            }}
          >
            {" "}
            || Subido el: {time}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 0,
            paddingTop: 0,
            backgroundColor: "#fff",
            borderRadius: 70,
            borderWidth: 3,
            margin: 100,
            marginTop: 10,
            marginBottom: 35,
          }}
        >
          <View style={{ paddingLeft: 20 }}>
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
                  paddingVertical: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 10,
                  marginLeft: -10,
                  marginBottom: 10,
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: "700",
                }}
                onPress={() =>
                  navigation.navigate("showLikes", {
                    id_tweet: _id,
                    owner: owner,
                  })
                }
              >
                {" "}
                Likes: {"" + (isLike ? like : countLike)}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ borderRadius: 10, borderWidth: 3, paddingTop: 5 }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 30,
              fontWeight: "500",
              color: "#333",
              paddingBottom: 25,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            <Icon
              style={{ padding: 12, textAlign: "left" }}
              name="reply"
              color="#000000"
              size={35}
            />
            Comentarios:
          </Text>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 50,
              margin: 10,
              borderWidth: 4,
            }}
          >
            <View style={{ paddingHorizontal: 25, paddingTop: 0 }}>
              <TextInput
                color="#066cb4"
                placeholder="Agregar comentario al Tweet"
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
                    marginRight: -70,
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

            <View>
              <FlatList
                data={task}
                renderItem={({ item }) => {
                  if (username === item["owner"]) {
                    return (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#afc7d8",
                          paddingTop: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingBottom: 10,
                        }}
                        onPress={() =>
                          navigation.navigate("owncomment", {
                            comment: item["comment"],
                            owner: item["owner"],
                            time: item["time"],
                            _id: item["_id"],
                          })
                        }
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontSize: 16,
                            fontWeight: "500",
                            color: "#333",
                            paddingTop: 25,
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
                            @{item["owner"]}:{" "}
                            <Icon
                              style={{ padding: 10, textAlign: "left" }}
                              name="brush"
                              color="#000000"
                              size={25}
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
                            }}
                          >
                            {" "}
                            {item["comment"]} {"\n"}
                            {"\n"}
                            {"\n"}
                          </Text>

                          <Text
                            style={{
                              paddingTop: 50,
                              paddingLeft: 60,
                              paddingRight: 60,
                              textAlign: "right",
                              fontSize: 14,
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
                        style={{
                          backgroundColor: "#afc7d8",
                          paddingTop: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingBottom: 10,
                        }}
                        onPress={() =>
                          navigation.navigate("awaycomment", {
                            comment: item["comment"],
                            owner: item["owner"],
                            time: item["time"],
                            _id: item["_id"],
                          })
                        }
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontSize: 16,
                            fontWeight: "500",
                            color: "#333",
                            paddingTop: 25,
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
                            @{item["owner"]}: {"\n"}
                            {"\n"}
                          </Text>

                          <Text
                            style={{
                              paddingTop: 20,
                              paddingLeft: 60,
                              paddingRight: 60,
                              textAlign: "left",
                              fontSize: 14,
                            }}
                          >
                            {" "}
                            {item["comment"]} {"\n"}
                            {"\n"}
                            {"\n"}
                          </Text>

                          <Text
                            style={{
                              paddingTop: 50,
                              paddingLeft: 60,
                              paddingRight: 60,
                              textAlign: "right",
                              fontSize: 14,
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
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OwnPostWithImage;
