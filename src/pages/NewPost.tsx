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

function NewPostPage({ navigation }: { navigation: any }) {
  const username = useAuthStore((state) => state.profile.username.username);
  const [uploading, setUploading] = React.useState(false);
  const [post, setText] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [Url, setUrl] = React.useState([]);
  const[isloading, setIsloading] = React.useState(false);;

  const postPress = async () => {
    setText("");
    setImages([]);
    setUploading(true);
    
      let URL = image
      let primero = URL[0]
      let segundo = URL[1]
      let tercero = URL[2]
      let cuarto  = URL[3]
      let quinto  = URL[4]
      let sexto   = URL[5]
      let septimo = URL[6]
      let octavo  = URL[7]
      let noveno  = URL[8]
      let diez    = URL[9]
  
     if (URL.length == 1){
      const response = await fetch(primero);
        const blob = await response.blob();
        const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
        const app = firebase.initializeApp(firebaseConfig);
        const storage = getStorage(app);
        const storageref = ref(storage, filename);
        const upload = await uploadBytes(storageref, blob);
        const url = await getDownloadURL(storageref);
   
        axios.post(`post/${username}`, {
          post,
          url,
      })
  }   if (URL.length == 2){
    const response = await fetch(primero);
      const blob = await response.blob();
      const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
      const app = firebase.initializeApp(firebaseConfig);
      const storage = getStorage(app);
      const storageref = ref(storage, filename);
      const upload = await uploadBytes(storageref, blob);
      const url = await getDownloadURL(storageref);
      //-----------------------------------------------------------------------------------
      const response2 = await fetch(segundo);
      const blob2 = await response2.blob();
      const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
      const app2 = firebase.initializeApp(firebaseConfig);
      const storage2 = getStorage(app2);
      const storageref2 = ref(storage2, filename2);
      const upload2 = await uploadBytes(storageref2, blob2);
      const url2 = await getDownloadURL(storageref2);
      //-----------------------------------------------------------------------------------
   
      axios.post(`post/${username}`, {
        post,
        url,
        url2
    })
}  if (URL.length == 3){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------
  
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
  })
}
if (URL.length == 4){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
  
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
  })
}

if (URL.length == 5){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
    const response5 = await fetch(quinto);
    const blob5 = await response5.blob();
    const filename5 = quinto!.substring(quinto!.lastIndexOf("/") + 1);
    const app5 = firebase.initializeApp(firebaseConfig);
    const storage5 = getStorage(app5);
    const storageref5 = ref(storage5, filename5);
    const upload5 = await uploadBytes(storageref5, blob5);
    const url5 = await getDownloadURL(storageref5);
    //-----------------------------------------------------------------------------------
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
      url5,
  })
}

if (URL.length == 6){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
    const response5 = await fetch(quinto);
    const blob5 = await response5.blob();
    const filename5 = quinto!.substring(quinto!.lastIndexOf("/") + 1);
    const app5 = firebase.initializeApp(firebaseConfig);
    const storage5 = getStorage(app5);
    const storageref5 = ref(storage5, filename5);
    const upload5 = await uploadBytes(storageref5, blob5);
    const url5 = await getDownloadURL(storageref5);
    //-----------------------------------------------------------------------------------
    const response6 = await fetch(sexto);
    const blob6 = await response6.blob();
    const filename6 = sexto!.substring(sexto!.lastIndexOf("/") + 1);
    const app6 = firebase.initializeApp(firebaseConfig);
    const storage6 = getStorage(app6);
    const storageref6 = ref(storage6, filename6);
    const upload6 = await uploadBytes(storageref6, blob6);
    const url6 = await getDownloadURL(storageref6);
    //-----------------------------------------------------------------------------------
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
      url5,
      url6,
  })
}
if (URL.length == 7){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
    const response5 = await fetch(quinto);
    const blob5 = await response5.blob();
    const filename5 = quinto!.substring(quinto!.lastIndexOf("/") + 1);
    const app5 = firebase.initializeApp(firebaseConfig);
    const storage5 = getStorage(app5);
    const storageref5 = ref(storage5, filename5);
    const upload5 = await uploadBytes(storageref5, blob5);
    const url5 = await getDownloadURL(storageref5);
    //-----------------------------------------------------------------------------------
    const response6 = await fetch(sexto);
    const blob6 = await response6.blob();
    const filename6 = sexto!.substring(sexto!.lastIndexOf("/") + 1);
    const app6 = firebase.initializeApp(firebaseConfig);
    const storage6 = getStorage(app6);
    const storageref6 = ref(storage6, filename6);
    const upload6 = await uploadBytes(storageref6, blob6);
    const url6 = await getDownloadURL(storageref6);
    //-----------------------------------------------------------------------------------
    const response7 = await fetch(septimo);
    const blob7 = await response7.blob();
    const filename7 = septimo!.substring(septimo!.lastIndexOf("/") + 1);
    const app7 = firebase.initializeApp(firebaseConfig);
    const storage7 = getStorage(app7);
    const storageref7 = ref(storage7, filename7);
    const upload7 = await uploadBytes(storageref7, blob7);
    const url7 = await getDownloadURL(storageref7);
    //-----------------------------------------------------------------------------------
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
      url5,
      url6,
      url7,
  })
}
if (URL.length == 8){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
    const response5 = await fetch(quinto);
    const blob5 = await response5.blob();
    const filename5 = quinto!.substring(quinto!.lastIndexOf("/") + 1);
    const app5 = firebase.initializeApp(firebaseConfig);
    const storage5 = getStorage(app5);
    const storageref5 = ref(storage5, filename5);
    const upload5 = await uploadBytes(storageref5, blob5);
    const url5 = await getDownloadURL(storageref5);
    //-----------------------------------------------------------------------------------
    const response6 = await fetch(sexto);
    const blob6 = await response6.blob();
    const filename6 = sexto!.substring(sexto!.lastIndexOf("/") + 1);
    const app6 = firebase.initializeApp(firebaseConfig);
    const storage6 = getStorage(app6);
    const storageref6 = ref(storage6, filename6);
    const upload6 = await uploadBytes(storageref6, blob6);
    const url6 = await getDownloadURL(storageref6);
    //-----------------------------------------------------------------------------------
    const response7 = await fetch(septimo);
    const blob7 = await response7.blob();
    const filename7 = septimo!.substring(septimo!.lastIndexOf("/") + 1);
    const app7 = firebase.initializeApp(firebaseConfig);
    const storage7 = getStorage(app7);
    const storageref7 = ref(storage7, filename7);
    const upload7 = await uploadBytes(storageref7, blob7);
    const url7 = await getDownloadURL(storageref7);
    //-----------------------------------------------------------------------------------
    const response8 = await fetch(octavo);
    const blob8 = await response8.blob();
    const filename8 = octavo!.substring(octavo!.lastIndexOf("/") + 1);
    const app8 = firebase.initializeApp(firebaseConfig);
    const storage8 = getStorage(app8);
    const storageref8 = ref(storage8, filename8);
    const upload8 = await uploadBytes(storageref8, blob8);
    const url8 = await getDownloadURL(storageref8);
    //-----------------------------------------------------------------------------------
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
      url5,
      url6,
      url7,
      url8,
  })
}
if (URL.length == 9){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
    const response5 = await fetch(quinto);
    const blob5 = await response5.blob();
    const filename5 = quinto!.substring(quinto!.lastIndexOf("/") + 1);
    const app5 = firebase.initializeApp(firebaseConfig);
    const storage5 = getStorage(app5);
    const storageref5 = ref(storage5, filename5);
    const upload5 = await uploadBytes(storageref5, blob5);
    const url5 = await getDownloadURL(storageref5);
    //-----------------------------------------------------------------------------------
    const response6 = await fetch(sexto);
    const blob6 = await response6.blob();
    const filename6 = sexto!.substring(sexto!.lastIndexOf("/") + 1);
    const app6 = firebase.initializeApp(firebaseConfig);
    const storage6 = getStorage(app6);
    const storageref6 = ref(storage6, filename6);
    const upload6 = await uploadBytes(storageref6, blob6);
    const url6 = await getDownloadURL(storageref6);
    //-----------------------------------------------------------------------------------
    const response7 = await fetch(septimo);
    const blob7 = await response7.blob();
    const filename7 = septimo!.substring(septimo!.lastIndexOf("/") + 1);
    const app7 = firebase.initializeApp(firebaseConfig);
    const storage7 = getStorage(app7);
    const storageref7 = ref(storage7, filename7);
    const upload7 = await uploadBytes(storageref7, blob7);
    const url7 = await getDownloadURL(storageref7);
    //-----------------------------------------------------------------------------------
    const response8 = await fetch(octavo);
    const blob8 = await response8.blob();
    const filename8 = octavo!.substring(octavo!.lastIndexOf("/") + 1);
    const app8 = firebase.initializeApp(firebaseConfig);
    const storage8 = getStorage(app8);
    const storageref8 = ref(storage8, filename8);
    const upload8 = await uploadBytes(storageref8, blob8);
    const url8 = await getDownloadURL(storageref8);
    //-----------------------------------------------------------------------------------
    const response9 = await fetch(noveno);
    const blob9 = await response9.blob();
    const filename9 = noveno!.substring(noveno!.lastIndexOf("/") + 1);
    const app9 = firebase.initializeApp(firebaseConfig);
    const storage9 = getStorage(app9);
    const storageref9 = ref(storage9, filename9);
    const upload9 = await uploadBytes(storageref9, blob9);
    const url9 = await getDownloadURL(storageref9);
    //-----------------------------------------------------------------------------------
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
      url5,
      url6,
      url7,
      url8,
      url9,
  })
}
if (URL.length == 10){
  const response = await fetch(primero);
    const blob = await response.blob();
    const filename = primero!.substring(primero!.lastIndexOf("/") + 1);
    const app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageref = ref(storage, filename);
    const upload = await uploadBytes(storageref, blob);
    const url = await getDownloadURL(storageref);
    //-----------------------------------------------------------------------------------
    const response2 = await fetch(segundo);
    const blob2 = await response2.blob();
    const filename2 = segundo!.substring(segundo!.lastIndexOf("/") + 1);
    const app2 = firebase.initializeApp(firebaseConfig);
    const storage2 = getStorage(app2);
    const storageref2 = ref(storage2, filename2);
    const upload2 = await uploadBytes(storageref2, blob2);
    const url2 = await getDownloadURL(storageref2);
    //-----------------------------------------------------------------------------------
    const response3 = await fetch(tercero);
    const blob3 = await response3.blob();
    const filename3 = tercero!.substring(tercero!.lastIndexOf("/") + 1);
    const app3 = firebase.initializeApp(firebaseConfig);
    const storage3 = getStorage(app3);
    const storageref3 = ref(storage3, filename3);
    const upload3 = await uploadBytes(storageref3, blob3);
    const url3 = await getDownloadURL(storageref3);
    //-----------------------------------------------------------------------------------}    const response3 = await fetch(tercero);
    const response4 = await fetch(cuarto);
    const blob4 = await response4.blob();
    const filename4 = cuarto!.substring(cuarto!.lastIndexOf("/") + 1);
    const app4 = firebase.initializeApp(firebaseConfig);
    const storage4 = getStorage(app4);
    const storageref4 = ref(storage4, filename4);
    const upload4 = await uploadBytes(storageref4, blob4);
    const url4 = await getDownloadURL(storageref4);
    //-----------------------------------------------------------------------------------
    const response5 = await fetch(quinto);
    const blob5 = await response5.blob();
    const filename5 = quinto!.substring(quinto!.lastIndexOf("/") + 1);
    const app5 = firebase.initializeApp(firebaseConfig);
    const storage5 = getStorage(app5);
    const storageref5 = ref(storage5, filename5);
    const upload5 = await uploadBytes(storageref5, blob5);
    const url5 = await getDownloadURL(storageref5);
    //-----------------------------------------------------------------------------------
    const response6 = await fetch(sexto);
    const blob6 = await response6.blob();
    const filename6 = sexto!.substring(sexto!.lastIndexOf("/") + 1);
    const app6 = firebase.initializeApp(firebaseConfig);
    const storage6 = getStorage(app6);
    const storageref6 = ref(storage6, filename6);
    const upload6 = await uploadBytes(storageref6, blob6);
    const url6 = await getDownloadURL(storageref6);
    //-----------------------------------------------------------------------------------
    const response7 = await fetch(septimo);
    const blob7 = await response7.blob();
    const filename7 = septimo!.substring(septimo!.lastIndexOf("/") + 1);
    const app7 = firebase.initializeApp(firebaseConfig);
    const storage7 = getStorage(app7);
    const storageref7 = ref(storage7, filename7);
    const upload7 = await uploadBytes(storageref7, blob7);
    const url7 = await getDownloadURL(storageref7);
    //-----------------------------------------------------------------------------------
    const response8 = await fetch(octavo);
    const blob8 = await response8.blob();
    const filename8 = octavo!.substring(octavo!.lastIndexOf("/") + 1);
    const app8 = firebase.initializeApp(firebaseConfig);
    const storage8 = getStorage(app8);
    const storageref8 = ref(storage8, filename8);
    const upload8 = await uploadBytes(storageref8, blob8);
    const url8 = await getDownloadURL(storageref8);
    //-----------------------------------------------------------------------------------
    const response9 = await fetch(noveno);
    const blob9 = await response9.blob();
    const filename9 = noveno!.substring(noveno!.lastIndexOf("/") + 1);
    const app9 = firebase.initializeApp(firebaseConfig);
    const storage9 = getStorage(app9);
    const storageref9 = ref(storage9, filename9);
    const upload9 = await uploadBytes(storageref9, blob9);
    const url9 = await getDownloadURL(storageref9);
    //-----------------------------------------------------------------------------------
    const response10 = await fetch(diez);
    const blob10 = await response10.blob();
    const filename10 =diez!.substring(diez!.lastIndexOf("/") + 1);
    const app10 = firebase.initializeApp(firebaseConfig);
    const storage10 = getStorage(app10);
    const storageref10 = ref(storage10, filename10);
    const upload10 = await uploadBytes(storageref10, blob10);
    const url10 = await getDownloadURL(storageref10);
    //-----------------------------------------------------------------------------------
    axios.post(`post/${username}`, {
      post,
      url,
      url2,
      url3,
      url4,
      url5,
      url6,
      url7,
      url8,
      url9,
      url10
  })
}
        console.log(URL.length)
        console.log('----------------------------------------------------------------')
        console.log('Primero:  ' + primero)
        console.log('----------------------------------------------------------------')
        console.log('SEGUNDO:  ' + segundo)
        console.log('----------------------------------------------------------------')
        console.log( 'TERCERO:   ' + tercero)
        console.log('----------------------------------------------------------------')
        console.log('Cuarto:  ' + cuarto)
        console.log('----------------------------------------------------------------')
        console.log('quinto:  ' + quinto)
        console.log('----------------------------------------------------------------')
        console.log( 'sexto:   ' + sexto)
        console.log('----------------------------------------------------------------')
        console.log('septimo:  ' + septimo)
        console.log('----------------------------------------------------------------')
        console.log('octavo  ' + octavo)
        console.log('----------------------------------------------------------------')
        console.log('noveno:  ' + noveno)
        console.log('----------------------------------------------------------------')
        console.log( 'decimo:   ' + diez)
        console.log('----------------------------------------------------------------')
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
 setImages(result.assets)
      let images = []
      let sendImages: string[] = []
  images.push(result.assets);
  images.forEach((contenido) => contenido.forEach((dentro) => sendImages.push(dentro.uri)))
  setImage(sendImages)
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
              data={images}
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
                  Post
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

export default NewPostPage;