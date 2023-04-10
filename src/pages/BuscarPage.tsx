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
  Image, Pressable,
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
  const [taskSelect, setTaskSelect] = useState([]);
  const [taskUser, setTaskUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const username = useAuthStore((state) => state.profile.username.username);

  const userFind = async () => {
    await axios.get(`/userSearch/${search}`).then((response) => {
      setTaskUser(response.data);
      console.log(response.data);
    });
  };

  const postFind = async () => {
    await axios.get(`/Postsearch/${search}`).then((response) => {
      setTask(response.data);
    });
  };

  const selectPostFind = async () => {
    await axios.get(`PostFilterImage/http`).then((response) => {
      setTaskSelect(response.data);
    });
  };
 const data = [
    { key: "1", value: "Usuario" },
    { key: "2", value: "Post" },
  
  ];

  useEffect(() => {
    selectPostFind();
    
  });

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
 selectPostFind(), setRefreshing(false);
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
         style={{ margin: 10, paddingTop: 90 }}
          numberOfLines={2}
          maxLength={40}
          onFocus={()=> navigation.navigate('buscarPost&User')
          }
        />


        <View style={{ margin: 20, paddingTop: 0, marginLeft:15}}>
          <FlatList
            data={taskSelect}
                     numColumns={2}
            renderItem={({ item }) => {
             if (username === item["owner"] && item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000000",
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
                        paddingLeft: 30,
                        paddingRight: 30,
                        paddingBottom: 5,
                        paddingHorizontal: 10,
                        borderColor: "black",
                        borderWidth: 3,
                        borderRadius: 15,
                        backgroundColor: "#fff",
                        overflow: "hidden",
                      }}
                    >
                      

                      

                      <View style={{ paddingLeft: 1, paddingTop: 5 }}>
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

                   
                    </Text>
                  </TouchableOpacity>
                );
              } else if (username !== item["owner"] && item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000000",
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
                      paddingLeft: 30,
                        paddingRight: 30,
                        paddingBottom: 5,
                        paddingHorizontal: 10,
                        borderColor: "black",
                        borderWidth: 3,
                        borderRadius: 15,
                        backgroundColor: "#fff",
                        overflow: "hidden",
                      }}
                    >
                     

                    

                      <View style={{  }}>
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

                      
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
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
                        backgroundColor: "000000",
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
                        backgroundColor: "#000000",
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
                      backgroundColor: "#000000",
                      paddingTop: 10,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("Ownpost", {
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
                      backgroundColor: "#000000",
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
                      backgroundColor: "#000000",
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
              } else if (username !== item["owner"] && item["url"]) {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000000",
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
