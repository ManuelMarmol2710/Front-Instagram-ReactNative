import React, { useState, useEffect, useCallback } from "react";
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
  Image,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import moment from "moment";
import Container from "../components/Container/Container";
import Content from "../components/Content/Content";
import styles from "./Post.styles";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
function ProfilePage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const email = useAuthStore((state) => state.profile.username.email);
  const name = useAuthStore((state) => state.profile.username.name);
  const lastName = useAuthStore((state) => state.profile.username.last_Name);
  const biography = useAuthStore((state) => state.profile.username.biography);
  const url = useAuthStore((state) => state.profile.username.url);
  const [count, setCount] = useState([]);
  const [task, setTask] = useState([]);
  const [like, setLike] = useState(0);
  const [isLike, setisLike] = useState(false);
  const [countFollowing, setCountFollowing] = useState([]);
  const [countFollowers, setCountFollowers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [_id, setId] = useState("");
  const [countLike, setCount1] = useState([]);
  const myTime = moment(["time"]).format("hh:mm:ss");

  const tweetsRelease = async () => {
    await axios.get(`post/${username}`).then((response) => {
      setTask(response.data);
    });
  };
  const tweetsCount = async () => {
    await axios.get(`countPost/${username}`).then((response) => {
      setCount(response.data);
    });
  };
  const followingCount = async () => {
    await axios.get(`countFollowing/${username}`).then((response) => {
      setCountFollowing(response.data);
    });
  };
  const followersCount = async () => {
    await axios.get(`countFollowers/${username}`).then((response) => {
      setCountFollowers(response.data);
    });
  };
  const getCountLike = async () => {
    await axios.get(`/countLike/${_id}`).then((response) => {
      setCount1(response.data);
    });
  };

  const obtenerLike = async () => {
    await axios.get(`/like/${username}/${_id}`).then((response) => {
      if (response.data.like === true) {
        setLike(like + (isLike ? -1 : 1));
      }
      if (response.data.like === false) {
        setisLike(!isLike);
      }
    });
  };
  useEffect(() => {
    OnRefresh();
    obtenerLike();
    tweetsCount();
    followingCount();
    tweetsRelease();
    followersCount();
    getCountLike();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await tweetsRelease(), setRefreshing(false);
    await tweetsCount(), setRefreshing(false);
    await followingCount(), setRefreshing(false);
    await followersCount(), setRefreshing(false);
  }, []);

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

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
      >
        <Container>
          <Content>
            <View style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 35 }}>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  paddingTop: 10,
                  borderColor: "#00000",
                  borderBottomWidth: 4,
                  borderTopWidth: 4,
                  borderLeftWidth: 4,
                  borderRightWidth: 4,
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Readstories", {})}
                  >
                    <Image
                      style={styles2.avatar}
                      source={{
                        uri: "data:image/jpeg;base64,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",
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate("stories")}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          textAlign: "center",
                          paddingTop: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {"Subir Story"}{" "}
                        <Icon name="plus" color="#000000" size={16} />
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <View style={styles2.info}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                      {username}
                    </Text>
                    <Text style={styles2.username}>{email}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ProfileUpdateNamelast")
                      }
                    >
                      <Text style={styles2.username}>
                        {name} {lastName} {""}
                        <Icon name="brush" color="#000000" size={16} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,
                  }}
                >
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles2.statLabel}>Post</Text>
                    <Text style={styles2.statValue}>{count}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                      onPress={() => navigation.navigate("followers")}
                      style={styles2.statLabel}
                    >
                      Followers
                    </Text>
                    <Text style={styles2.statValue}>{countFollowers}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                      style={styles2.statLabel}
                      onPress={() => navigation.navigate("following")}
                    >
                      Following
                    </Text>
                    <Text style={styles2.statValue}>{countFollowing}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProfileUpdateBio")}
                >
                  <Text
                    style={{
                      padding: 20,
                      fontSize: 16,
                      color: "#000000",
                      backgroundColor: "#CECECE",
                      overflow: "hidden",
                      borderRadius: 15,
                      borderColor: "#000000",
                      borderTopWidth: 3,
                    }}
                  >
                    {biography}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView>
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
                                        uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SDw8PEA8PDxAPFRAVFg8VFRAPEBUVFRUWFhUSFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAAAQIFBgQD/8QAORABAQABAQQGBggGAwEAAAAAAAECAwQFETEhQVFhcZEGEjKhssEiMzRScoGC4RMjQrHR8GKSoiT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7MFAAAQUEUAEVAAUAEBUUBFABAABQAAQABQAEUAABAAUAEAFEUAEAAAUABAFRQAEAABQABABQARUAUAEAAFAABAAFejZ9h1c/Y08rO3lPOvZhuDXvXpzxt+UBq0bXPcGtOvTv55fOPJr7u1sPa08uHbOGU9wPKCgAAgACgAgAKAAAIoACAKigAIAD6bPoZZ5Y4Yzjcuj9/AGWy7NnqZTHCcb7pO210uwbm09PhcpNTPtvszwj1bBseOlhMcefXl129r0gCcVBLFAHg27dWlqcbw9TP78+c63M7dsWellwynReWU5X/ex2r47VoY6mNwynGXznfO8HDq++27LlpZ3C+MvbO18AAAEUBFAAQBRj5qCoAAKAACAAR0no3snDC6t559E7sZz87/ZzknHonOu50NKY4Y4TljJPKA+iWlqAMiAAJaBakhIyBrN/bH6+lcpPpafGzw658/ycq72xw+1aXqameH3csp+XHo9wPkgAKACKgAKAACCgAICiAKAD7bDOOrpT/nh8UdtXD7Ln6uphl93LG+VldyDFlAABLQUSKAAA5Dfk/8Ao1P03/zHXuN3xnx2jVvfw8pJ8geNQABABQAAAAAEAAAUAEAB2m7No/iaWGXXw4XxnRXFtv6P7d6md08r9HPl3Zfv/gHTgloFqSEZAAAJxS0kBjr6swwyzvLGWuHzyttyvPK23xvTW99I9u5aON7Ll8sfn5NCAIAAoAIAACgAIKCKACKgAKACA6Pc295lJp6l4Zcpnf6u69/9254OEbPYN9amnwxy/mYzt9qeF/yDqh4Nn3xoZ/1+pezL6Pv5PbjqY3lZfCygyY2meUnOye549femhhz1Jb2Y/Svu5A9kjW723rNOXDDhdS/nMe+9/c1u3b9zy446c/hz739f7NRaBllbbbeNvTb1gAgKACAAAKAAAIoAIAKIoAIAE7Gy2Xcutn02TTnbl0Xy5g1w6XQ9H9Ke3llnf+s93T73u0t3aGPLSw/OetfeDi2WOF6pfKu4mMnKSeHCM4Dhbp5deOXlWLvUyxl5yX3g4JXaauwaOXPSw8pL5x4dfcOjfZuWH5+tPKg5gbTadxa2PTjw1J3dGXlWtyxstlllnOXooICAoigigAgAce+B/vUAqAACgAAj17v3fnq3hj0YznneU7u+ruzYLrZ8OWM9rLu7J311+jpY4YzHGSYzlAebYd26elPozjl9+9OX7PYADG0tJAJGQAAUGNqyEigPPtmxaerOGePHsy5ZTwr0AOR3nuvPS6faw+92d2U6mvd3lOMss4y9V6Z4OW3zu3+Fl62P1eXLuv3Qa1QARUABQAAQfHV2mY5Y42ZW5dcnHGdXTX3ABAAerdel62tp49XrS+XT8gdRuvZP4Wljj/VenLxv+OX5PYAAnFQTgoAAxtBeKpIoAACWKAkj5bXs81MMsLyynPsvVX2AcJqYXHK43ouNsvjGDZekGn6uvl/ymOXyv9mtBRFAAAABqt44y7Rs/wB6cvZ5cenjxvHq6PC+F2rWbxv8/ZvpcJbeM45Tjw6Z0ScLOPf1+WyAAAbDcP2jT/X8NeB79w/aNP8AX8NB1zG0tJAJGQAAxoFqyEigAAMeIsgEUAEtLWIOb9JvrsfwT4smobf0m+ux/BPiyakAEAABQAa7bs8JraPG4ev0+rLc5l09F6J0WePZWxazeOr/AD9nw7+N8LcZOPbOOPhx9Xu47MAAB7txfaNP9fw14Xv3D9o0/wBfw0HWSMgABjaDIIAAAMWScAJFAAS0lBakigOZ9J/rsfwT4smobf0n+ux/BPiyagEAAUABFBrt4a2U1tnxnrTG28bLjMbynCzn1zz4dfRsXh2zZc8tbRzknq4XpvGzLy5cOXTz6a9wCAA2G4ftGn+v4a8D37h+0af6/hoOuBjaBashIoAAFSVFkBQAEpagIykWAAJaDmvSf67H8E+LJqG29JfrsfwT4smoBQAEADgqKAABOSKAPfuH7Rp/r+GqA6yscf8AfeAMwAEoAmLIAAAY1YAKAAxvWAOa9JfrcPwT4smpABKoBOXmigAAP//Z",
                                      }}
                                      style={styles.profilImage}
                                    />
                                    <Text style={styles.title}>
                                      {item["owner"]}
                                    </Text>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("OwnPostWithImage", {
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
                              <Text style={styles.postName}>
                                {item["owner"]}
                              </Text>
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
          </Content>
        </Container>
      </ScrollView>
    </Container>
  );
}

const styles2 = {
  container: {
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    borderColor: "#00000",
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderRadius: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 55,
  },
  info: {
    marginLeft: 25,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  username: {
    color: "#999",
    fontSize: 16,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#CECECE",
    overflow: "hidden",
    borderRadius: 15,
    borderColor: "#000000",
    borderTopWidth: 3,
  },
};

export default ProfilePage;
