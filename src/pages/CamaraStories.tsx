import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { firebase } from "../ImagenFirebase/firebase";
import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";
import { firebaseConfig } from "../ImagenFirebase/firebase";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth.store";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function CameraStories() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const username = useAuthStore((state) => state.profile.username.username);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    let storiesPress = async () => {
      const response = await fetch(photo.uri!);
      const blob = await response.blob();
      const filename = photo.uri!.substring(photo.uri!.lastIndexOf("/") + 1);
      const app = firebase.initializeApp(firebaseConfig);
      const storage = getStorage(app);
      const storageref = ref(storage, filename);
      const upload = await uploadBytes(storageref, blob);
      const url = await getDownloadURL(storageref);

      axios.post(`storie/${username}`, {
        url,
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Subir a Stories" onPress={storiesPress} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={takePic}
          style={{ borderRadius: 25, borderWidth: 3, overflow: "hidden"}}
        >
          <Ionicons name="radio-button-off-sharp" size={64} color="black" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    overflow: "hidden"
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
