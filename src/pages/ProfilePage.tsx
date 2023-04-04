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
  Pressable
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import moment from "moment";

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
  const [_id, setId] = useState('')
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

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
      >
        <View style={{ paddingLeft: 5, paddingRight: 5 }}>
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
            onPress={() => navigation.navigate("Readstories",{
              

            })}
          > 
              <Image
                style={styles.avatar}
                source={{
                  uri: "data:image/jpeg;base64,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",
                }}
              />
              <TouchableOpacity onPress={() => navigation.navigate("stories")}>
              <Text style={{ fontSize: 11, textAlign:'center', paddingTop:12, fontWeight: "bold" }}>
                  {'Subir Storie'}
                </Text>  
              </TouchableOpacity>
              
              </TouchableOpacity>
              <View style={styles.info}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {username}
                </Text>
                <Text style={styles.username}>{email}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProfileUpdateNamelast")}
                >
                  <Text style={styles.username}>
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
                <Text style={styles.statLabel}>Post</Text>
                <Text style={styles.statValue}>{count}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  onPress={() => navigation.navigate("followers")}
                  style={styles.statLabel}
                >
                  Followers
                </Text>
                <Text style={styles.statValue}>{countFollowers}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={styles.statLabel}
                  onPress={() => navigation.navigate("following")}
                >
                  Following
                </Text>
                <Text style={styles.statValue}>{countFollowing}</Text>
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

          <View>
            <FlatList
              data={task}
              renderItem={({ item }) => {
                if (item["url"]) {
        



                  return (

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("OwnPostWithImage", {
                          owner: item["owner"],
                          post: item["post"],
                          time: item["time"],
                          _id: item["_id"],
                          url: item["url"],
                          url2: item["url2"],
                          url3: item["url3"],
                          url4: item["url4"],
                          url5: item["url5"],
                          url6: item["url6"],
                          url7: item["url7"],
                          url8: item["url8"],
                          url9: item["url9"],
                          url10: item["url10"],
                        })
                      }
                      style={{
                        backgroundColor: "#afc7d8",
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
                          @{item["owner"]}:{" "}
                          <Icon
                            style={{ padding: 12, textAlign: "left" }}
                            name="brush"
                            color="#000000"
                            size={25}
                          />
                          {"\n"}
                          {"\n"}
                        </Text>
                        <View style={{ paddingLeft: 140, paddingTop: 15 }}>
                          <Image
                            style={{
                              width: 100,
                              height: 100,
                              borderColor: "#000000",
                              borderWidth: 3,
                              borderRadius: 10,
                              marginBottom: 20,
                            }}
                            source={{ uri: `${item["url"]}` }}
                          />
                        </View>
                        <Text
                          style={{
                            paddingTop: 20,
                            paddingLeft: 90,
                            paddingRight: 60,
                            textAlign: "left",
                            fontSize: 14,
                          }}

                        >
                          {" "}
                          {item["post"]}
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
                          

                          {"\n"} || Subido el: {item["time"]}

                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                } else if (!item["url"]) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("OwnTweets", {
                          owner: item["owner"],
                          tweets: item["tweets"],
                          time: item["time"],
                          _id: item["_id"],
                        })
                      }
                      style={{
                        backgroundColor: "#afc7d8",
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
                          @{item["owner"]}:{" "}
                          <Icon
                            style={{ padding: 12, textAlign: "left" }}
                            name="brush"
                            color="#000000"
                            size={25}
                          />
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
                          {item["post"]}
                          {"\n"}
                          {"\n"}
                        </Text>

                        <Text
                          style={{
                            paddingTop: 0,
                            paddingLeft: 60,
                            paddingRight: 60,
                            textAlign: "right",
                            fontSize: 14,
                          }}
                        >
                          {"\n"} || Subido el: {item["time"]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
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
