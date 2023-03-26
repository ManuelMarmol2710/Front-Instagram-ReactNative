import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "@react-native-material/core";
import axios from "../libs/axios";

function SendEmailPage({ navigation }: { navigation: any }) {
  const [email, setText] = useState("");

  const sendemail = async () => {
    return (
      axios.post(`sendEmail/${email}`, {
        message: "Enviado al correo",
      }),
      navigation.navigate("login")
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 90,
          borderWidth: 4,
          margin: 10,
          marginTop: 50
        }}
      >
        <Text
          style={{
            textAlign: "center",
                fontSize: 30,
                fontWeight: "500",
                color: "#333",
                paddingBottom: 15,
                paddingTop: 50
          }}
        >
          Escriba su correo para recuperar su contraseña
        </Text>

        <View>
          <TextInput
            color="#066cb4"
            label="Email"
            placeholder="Ejemplo@test.com"
            onChangeText={setText}
            value={email}
            style={{ margin: 16 }}
          />
        </View>

        <View style={{ paddingHorizontal: 70, paddingVertical: 5 }}>
        <TouchableOpacity
          onPress={sendemail}
          style={{
            backgroundColor: "#000000",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
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
            Recuperar Contraseña
          </Text>
        </TouchableOpacity>
      </View>
          
      </View>

      
    </SafeAreaView>
  );
}
export default SendEmailPage;
