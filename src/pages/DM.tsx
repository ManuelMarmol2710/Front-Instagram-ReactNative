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
  StyleSheet,
} from "react-native";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import io from "socket.io-client";
const socket = io(
  "https://back-instagram-reactnative-production.up.railway.app/"
);
function DMPage({ navigation, route }: { navigation: any; route: any }) {
  const { userName } = route.params;
  const [messages, setMessages] = useState([]);

  const username = useAuthStore((state) => state.profile.username.username);
  useEffect(() => {
    const receiveMessage = (message: any) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      );
    };
    socket.on("messages", receiveMessage);
    return () => {
      socket.off("messages", receiveMessage);
    };
  }, [messages]);

  const onSend = useCallback((messages = []) => {
    socket.emit("messages", messages);
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={36}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <>
      <View
        style={{
          marginTop: "0.1%",
          borderColor: "#fff",
          borderRadius: "5%",
          borderBottomWidth:"2.5%",
          backgroundColor: "#000000",
          height:"10%"
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "left", marginTop:"5%", marginLeft:"5%" }}>
          @{userName}
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: username,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DMPage;
