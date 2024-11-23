import { Text, View, TouchableOpacity, Image, FlatList, TextInput, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import { storage } from "../firebase/config";

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buscador: '',
      busqueda: "",
      resultados: []
    };
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
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuario..."
          value={this.state.busqueda}
          onChangeText={(text) => this.setState({ busqueda: text })}
        />
        
        {resultadosFiltrados.length === 0 ? (
          <Text style={styles.noResultsText}>No hay resultados para su búsqueda</Text>
        ) : (
          <FlatList
            data={resultadosFiltrados}
            keyExtractor={(user) => user.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.username}>{item.datos.username}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  searchInput: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    placeholderTextColor: '#888',
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  userItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
