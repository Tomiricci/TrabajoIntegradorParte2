import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let arrDocs = [];
        
        docs.forEach((doc) => {
          arrDocs.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState(
          {
            userInfo: arrDocs,
          },
          () => console.log('este es el estado', this.state)
        );
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log("Error al cerrar sesión:", error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.state.userInfo.length > 0 && (
            <>
              <Text style={styles.welcomeText}>Hola {this.state.userInfo[0].data.username}, bienvenido a tu perfil.</Text>
              <Text>Este es tu mail: {this.state.userInfo[0].data.owner}</Text>
              <Text>Tu cantidad de productos es </Text>
              <Text>Estos son tus productos</Text>
            </>
          )}
        </View>

        {/* Botón de Cerrar Sesión en la parte inferior */}
        <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', // Distribuye el contenido en la parte superior e inferior
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
