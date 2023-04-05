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
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { SimpleLineIcons } from "@expo/vector-icons";
function followingPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const [task, setTask] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const followingRealease = async () => {
    await axios.get(`follow/${username}`).then((response) => {
      setTask(response.data);
    });
  };

  useEffect(() => {
    followingRealease();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await followingRealease(), setRefreshing(false);
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
            borderRadius: 10,
            borderWidth: 3,
            paddingTop: 5,
            paddingBottom: 15,
            paddingHorizontal: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 30,
              fontWeight: "500",
              color: "#fff",
              paddingBottom: 25,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            <SimpleLineIcons name={"user-following"} size={32} color={"blue"} />{" "}
            Siguiendo:
          </Text>

          <FlatList
            data={task}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#000000",
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("awayprofile", {
                      username: item["following"],
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
                      paddingBottom: 5,
                      paddingHorizontal: 15,
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
                      @{item["following"]}
                      {"  "}
                      <SimpleLineIcons
                        name={"user-following"}
                        size={32}
                        color={"blue"}
                      />
                      {"\n"}
                      {"\n"}
                    </Text>
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default followingPage;
