import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user == null) {
        console.log('no hay nadie logueado ');
        this.props.navigation.navigate('login');
      }
    });
  }

  OnSubmit(descripcion) {
    if (descripcion !== '') {
      db.collection('posteos')
        .add({
          descripcion: descripcion,
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          likes: [],
        })
        .then((resp) => this.setState({ descripcion: '' }, () => this.props.navigation.navigate('Home')))
        .catch((e) => console.log(e));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear Nuevo Post</Text>

        <TextInput
          value={this.state.descripcion}
          onChangeText={(text) => this.setState({ descripcion: text })}
          placeholder="Descripción"
          multiline
          numberOfLines={4}
          style={styles.textInput}
        />

        <TouchableOpacity style={styles.submitButton} onPress={() => this.OnSubmit(this.state.descripcion)}>
          <Text style={styles.submitButtonText}>Crear Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
