import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
  NativeEventEmitter,
  ScrollView,
  RefreshControl,
  LogBox,
  YellowBox,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "../libs/axios";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

LogBox.ignoreAllLogs();
YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

function BuscarPage({ navigation }: { navigation: any }) {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [task, setTask] = useState([]);
  const [taskUser, setTaskUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const username = useAuthStore((state) => state.profile.username.username);

  const userFind = async () => {
    await axios.get(`/userSearch/${search}`).then((response) => {
      setTaskUser(response.data);
      console.log(response.data);
    });
  };

  const tweetsFind = async () => {
    await axios.get(`/Postsearch/${search}`).then((response) => {
      setTask(response.data);
    });
  };

  const filtrartweetsOld = async () => {
    await axios.get(`/PostFilterForOld/${search}`).then((response) => {
      setTask(response.data);
    });
  };
  const filtrartweetsImage = async () => {
    await axios.get(`/PostFilterImage/https`).then((response) => {
      setTask(response.data);
    });
  };

  const tweetsRelease = async () => {
    await axios.get(`post/${username}`).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  };

  const data = [
    { key: "1", value: "Mas antiguo" },
    { key: "2", value: "Mas recientes" },
    { key: "3", value: "Imagenes" },
  ];

  useEffect(() => {
    userFind();
    tweetsFind();

  }, [search]);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await tweetsRelease(), setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
      >
        <TextInput
          color="#066cb4"
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="magnify" {...props} />}
              {...props}
            />
          )}
          onChangeText={(text) => setSearch(text)}
          value={search}
          style={{ margin: 10, paddingTop: 45 }}
          numberOfLines={2}
          maxLength={40}
          editable
        />

        <View style={{ margin: 5, paddingTop: 5, paddingHorizontal:100, marginLeft: 150, marginRight:-85 }}>
          <SelectList
            setSelected={(selected: React.SetStateAction<string>) =>
              setSelected(selected)
            }
            data={data}
            save="value"
            onSelect={() => {
              if (selected === "Mas antiguo") {
                filtrartweetsOld();
              } else if (selected === "Mas recientes") {
                tweetsFind();
              } else if (selected === "Imagenes") {
                filtrartweetsImage();
              }
              
            }}
            searchPlaceholder="Filtrar por"
          />
        </View>

        <View style={{ margin: 20, paddingTop: 5 }}>
          <View>
            <FlatList
              data={taskUser}
              renderItem={({ item }) => {
                if (username === item["username"]) {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Profile", {})}
                      style={{
                        backgroundColor: "#afc7d8",
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 160,
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
                            paddingTop: 10,
                            paddingLeft: 30,
                            textAlign: "left",
                            fontWeight: "700",
                            fontSize: 16,
                            color: "#000000",
                          }}
                        >
                          @{item["username"]}
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
                        paddingRight: 160,
                      }}
                      onPress={() =>
                        navigation.navigate("awayprofile", {
                          username: item["username"],
                          name: item["name"],
                          last_Name: item["last_Name"],
                          biography: item["biography"],
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
                            paddingTop: 10,
                            paddingLeft: 30,
                            textAlign: "left",
                            fontWeight: "700",
                            fontSize: 16,
                            color: "#000000",
                          }}
                        >
                          @{item["username"]}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
        </View>

        <View style={{ margin: 20, paddingTop: 0 }}>
          <FlatList
            data={task}
            renderItem={({ item }) => {
              if (username === item["owner"] && !item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#afc7d8",
                      paddingTop: 10,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("OwnTweets", {
                        owner: item["owner"],
                        tweets: item["tweets"],
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
                        {item["post"]} {"\n"}
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
              } else if (username !== item["owner"] && !item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#afc7d8",
                      paddingTop: 10,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("showpost", {
                        owner: item["owner"],
                        post: item["post"],
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
                        {item["post"]} {"\n"}
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
              } else if (username === item["owner"] && item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#afc7d8",
                      paddingTop: 10,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("OwnPostWithImage", {
                        owner: item["owner"],
                        post: item["post"],
                        time: item["time"],
                        _id: item["_id"],
                        url: item["url"],
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
                        {item["tweets"]} {"\n"}
                        {"\n"}
                        {"\n"}
                      </Text>

                      <View style={{ paddingLeft: 140, paddingTop: 5 }}>
                        <Image
                          style={{
                            width: 100,
                            height: 100,
                            borderColor: "#000000",
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>

                      <Text
                        style={{
                          paddingTop: 50,
                          paddingLeft: 60,
                          paddingRight: 60,
                          textAlign: "right",
                          fontSize: 14,
                        }}
                      >
                        {"\n"}
                        || Subido el: {item["time"]}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              } else if (username !== item["owner"] && item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#afc7d8",
                      paddingTop: 10,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("PostWithImage", {
                        owner: item["owner"],
                      post: item["post"],
                        time: item["time"],
                        _id: item["_id"],
                        url: item["url"],
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
                        {item["post"]} {"\n"}
                        {"\n"}
                        {"\n"}
                      </Text>

                      <View style={{ paddingLeft: 140, paddingTop: 5 }}>
                        <Image
                          style={{
                            width: 100,
                            height: 100,
                            borderColor: "#000000",
                            borderWidth: 3,
                            borderRadius: 10,
                          }}
                          source={{ uri: `${item["url"]}` }}
                        />
                      </View>

                      <Text
                        style={{
                          paddingTop: 50,
                          paddingLeft: 60,
                          paddingRight: 60,
                          textAlign: "right",
                          fontSize: 14,
                        }}
                      >
                        {"\n"}
                        || Subido el: {item["time"]}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
});
export default BuscarPage;
