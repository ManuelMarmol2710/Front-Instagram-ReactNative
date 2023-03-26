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

import { MaterialCommunityIcons } from "@expo/vector-icons";
function ShowLikeCommentsPage({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) {
  const { id_tweet } = route.params;
  const [task, setTask] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const likesRelease = async () => {
    await axios.get(`likeOwnerComments/${id_tweet}`).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    likesRelease();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await likesRelease(), setRefreshing(false);
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
            paddingBottom: 10,
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
              color: "#000000",
              paddingBottom: 25,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            <MaterialCommunityIcons name={"heart"} size={32} color={"red"} />
            {""} Likes:
          </Text>

          <FlatList
            data={task}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
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
                      @{item["owner"]}
                      <MaterialCommunityIcons
                        name={"heart"}
                        size={32}
                        color={"red"}
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
export default ShowLikeCommentsPage;
