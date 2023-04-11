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

function BuscarPostAndUser({ navigation }: { navigation: any }) {
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

        <View style={{ margin: 20, paddingTop: 5 }}>
          <View>
            <FlatList
              data={taskUser}
              renderItem={({ item }) => {
                if(item['disable'] === true){
               
                }  else {
                
                    if (username === item["username"]) {
                       return (
                         <TouchableOpacity
                           onPress={() => navigation.navigate("Profile", {})}
                           style={{
                             backgroundColor: "#000000",
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
                }
              }}
            />
          </View>
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
export default BuscarPostAndUser;
