import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  View,
  FlatList,
} from "react-native";

function SearchUser({ taskUser}: {taskUser:any},{navigation}: {navigation: any} ) {
  
  return (
    <View>
    <FlatList
        data={taskUser}
        renderItem={({ item }) => {
          return (
            <Button
            title={item.email}
            onPress={() => navigation.navigate("EditProfile",{
              email: item.email

            })}
          />
              
          );
        }}
      />
    </View>
  );
}

export default SearchUser;
