import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import NuevoPost from '../screens/NuevoPost';
import Buscador from '../screens/Buscador';


const Tab = createBottomTabNavigator()


export default class NavegacionAnidada extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Home' component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
                    }} />
                <Tab.Screen name='Perfil' component={Profile}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
                    }} />
                    <Tab.Screen name='NuevoPost' component={NuevoPost}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
                    }} />
                    <Tab.Screen name='Buscador' component={Buscador}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
                    }} />




            </Tab.Navigator>
        )
    }
}