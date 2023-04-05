import React from "react";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pagesListas/ProfilePage";
import BuscarPage from "../pages/BuscarPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {

    return (

        <Tab.Navigator>
            <Tab.Screen name = 'Home' component = {HomePage}></Tab.Screen>
            <Tab.Screen name = 'Profile' component = {ProfilePage}></Tab.Screen>
            <Tab.Screen name = 'Buscar' component = {BuscarPage}></Tab.Screen>
        </Tab.Navigator>



    );

}
