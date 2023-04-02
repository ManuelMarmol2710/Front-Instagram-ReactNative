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

function DMPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  let [task, setTask] = useState([]);
  const [task1, setTask1] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const postRelease = async () => {
    await axios.get(`followers/${username}`).then((response) => {
setTask(response.data )
  
});

  };
  const followingRealease = async () => {
    await axios.get(`follow/${username}`).then((response) => {
      setTask1(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    postRelease();
    followingRealease();
  }, []);

  const OnRefresh = useCallback(async () => {
    setRefreshing(true);
    await postRelease(), setRefreshing(false);
    await followingRealease(), setRefreshing(false);
  }, []);



  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
        }
>
<Text>
        DM
    </Text>
      </ScrollView>
    </SafeAreaView>
  );

}
export default DMPage;
