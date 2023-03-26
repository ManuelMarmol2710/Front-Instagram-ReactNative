import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  useWindowDimensions,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { firebaseConfig } from "../ImagenFirebase/firebase";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/auth.store";
import { ActivityIndicator, IconButton } from "@react-native-material/core";
import axios from "../libs/axios";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../ImagenFirebase/firebase";
import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";

function NewTweetPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const [uploading, setUploading] = React.useState(false);
  const [post, setText] = React.useState("");
  const [image, setImage] = React.useState([]);
  const[isloading, setIsloading] = React.useState(false);;
const {width} = useWindowDimensions();
  const postPress = async () => {
    setText("");
    setImage([]);

      setUploading(true);
      console.log(image!+ 'dios mio')
      const response = await fetch(image!);
      const blob = await response.blob();
      const filename = image!.substring(image!.lastIndexOf("/") + 1);
      const app = firebase.initializeApp(firebaseConfig);
      const storage = getStorage(app);
      const storageref = ref(storage, filename);
      const upload = await uploadBytes(storageref, blob);
      const url = await getDownloadURL(storageref);

      axios.post(`post/${username}`, {
        post,
        url,
      });
    
  };

  const Upload = async (e: Event) => {
    setIsloading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit:10,
      aspect: [4, 3],
      quality: 1,
    });
  setIsloading(false)
    if (!result.canceled) {
 
   setImage(result.assets ? result.assets : result);
   console.log(image!+ 'dios mio')
  };
}

  useEffect(() => {
    console.log(image!+ 'dios mio')
    const foo = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    foo();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 25,
              paddingTop: 40,
              backgroundColor: "#fff",
              borderRadius: 50,
              borderWidth: 3,
              margin: 10,
              marginTop: 80,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "500",
                color: "#333",
                paddingBottom: 25,
              }}
            >
              Nuevo Post
            </Text>

            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#000000",
                overflow: "hidden",
                height: 120,
                width: 340,
              }}
              color="#000000"
              label="Tweet"
              placeholder="Dile al mundo lo que piensas..."
              onChangeText={(text) => setText(text)}
              value={post}
              disableFullscreenUI
              multiline
              maxLength={120}
              editable
            />

            <View
              style={{
                paddingHorizontal: 4,
                paddingVertical: 1,
                marginBottom: 15,
                marginTop: 10,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <FlatList
              data={image}
                renderItem={({item})=> {
                return( 
                  
                  < Image
                  source={{ uri: item['uri'] }}
                  style={{ width: 300, height: 200, marginLeft: 12 }}
                />
                
                )
                
                

              }}
           
   
             
           />
              <StatusBar style="auto" />
              <View style={{ paddingHorizontal: 200, paddingVertical: 1 }}>
              <TouchableOpacity
                onPress={Upload}
                style={{
                  backgroundColor: "#3364FF",
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 30,
                  marginLeft: -183,
                  marginRight: -120,
                  marginTop: -15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  <Icon
                    style={{ textAlign: "center" }}
                    name="image"
                    color="#fff"
                    size={25}
                  />
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 200,
                paddingVertical: 1,
                paddingTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={postPress}
                style={{
                  backgroundColor: "#000000",
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 30,
                  marginLeft: -5,
                  marginRight: -115,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Tweetear
                </Text>
              </TouchableOpacity>
            </View>
            </View>

         
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default NewTweetPage;