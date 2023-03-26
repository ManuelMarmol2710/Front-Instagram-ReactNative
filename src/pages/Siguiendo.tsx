import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
 function SiguiendoPage({navigation}: {navigation: any}) { 
    const email = useAuthStore((state) => state.profile.username.email);
    const [task, setTask] = useState([]);
    const showFollows = async () => {
        await axios.get(`followers/${email}`).then((response) => {
          setTask(response.data);
          console.log(response.data);
        });
      };
    
      useEffect(() => {
        showFollows();
      }, []);
    
      return (
        <View>
          <FlatList
            data={task}
            renderItem={({ item }) => {
              return (
                <Text>
                  {item['following']}
                </Text>
              );
            }}
          />
        </View>
      );
}
export default SiguiendoPage;