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

function HomePage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  let [task, setTask] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const tweetsRelease = async () => {
    await axios.get(`followers/${username}`).then((response) => {
setTask(response.data )
  
});

  };


  useEffect(() => {
    tweetsRelease();
  }, []);

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
          <View style={{ paddingHorizontal: 25, paddingTop: 45 }}></View>
          
           <Text
           
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#333",
                          paddingTop: 14,
                          paddingLeft: 13,
                          paddingRight: 10,
                          paddingBottom: 6,
                          paddingHorizontal: 10,
                          borderColor: "black",
                          borderWidth: 3,
                          borderRadius: 15,
                          backgroundColor: "#fff",
                          overflow: "hidden",
                        }}
                        
                        onPress={() =>
                          navigation.navigate("Home", {
                          
                          })
                        }
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
                           Home
                        </Text>
                        </Text>
          <View style={{ paddingTop: 0 }}>
            <FlatList
              data={task}
              renderItem={({ item }) => {
                if (!item["url"]) {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#afc7d8",
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("showTweets", {
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
                          {item["tweets"]} {"\n"}
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
                } else if (item["url"]){
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#afc7d8",
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("TweetsWithImage", {
                          owner: item["owner"],
                          tweets: item["tweets"],
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
                  )
                }
              }}
            />
       
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}
export default HomePage;
