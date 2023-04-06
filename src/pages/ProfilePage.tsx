import React, { useState, useEffect, useCallback } from "react";
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
  RefreshControl,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthStore } from "../store/auth.store";
import axios from "../libs/axios";
import moment from "moment";
import Content from "../components/Content/Content";
import Bio from '../components/AccountComponents/Bio';
import Highlighs from '../components/AccountComponents/Highlighs';
import ProfilBar from '../components/AccountComponents/ProfilBar';
import ProfileHeader from '../components/AccountComponents/ProfilHeader';
import Container from '../components/Container/Container';
import TopTabNavigator from '../navigation/TopTabNavigator';

const ProfilePage = ({route}:{route:any}) => {
  return (
    <Container insets={{top: true, right: true, bottom: true}}>
      <ProfilBar />
      <ProfileHeader route={route.params} />
      <Bio route={route.params} />
      <Highlighs />
      <TopTabNavigator />
    </Container>
  );
};
export default ProfilePage;