import {Text, View, TouchableOpacity, Image, FlatList , TextInput, StyleSheet} from 'react-native'
import React, {Component} from 'react'


import {db, auth} from '../firebase/config'
import { storage } from "../firebase/config";

export default class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buscador : '',
            busqueda: "",
            resultados: []
        }
    }
    componentDidMount() {
        db.collection("users").onSnapshot((snapshot) => {
            let info = [];
            snapshot.forEach((doc) => {
              info.push({
                id: doc.id,
                datos: doc.data(),
              });
            });
      
            this.setState({
              resultados: info,
            });
          });

    }
    filtrarUsuarios() {
        const { busqueda, resultados } = this.state;
        return resultados.filter((usuario) => {
            return usuario.datos.username.toLowerCase().includes(busqueda.toLowerCase());
          
        });
      }
    
        render() {
            const resultadosFiltrados = this.filtrarUsuarios();
            return (
                <View >
                    
                    <TextInput
          placeholder="Search..."
          keyboardType="default"
          value={this.state.busqueda}
          onChangeText={(text) => this.setState({ busqueda: text })}
        />
         {resultadosFiltrados.length === 0 ? (
          <Text>No hay resultados para su búsqueda</Text>
        ) :
         (
            <FlatList
            data={resultadosFiltrados}
            keyExtractor={(user) => user.id}
            renderItem={({ item }) => ( <Text>{item.datos.username}</Text>) }
            />
          )
                    
    }             
                </View>
            );
        }
        

}