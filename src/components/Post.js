import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa la librería de íconos
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: '',
      likeado: this.props.posteo.data.likes.includes(auth.currentUser.email),
      likes: this.props.posteo.data.likes.length,
    };
  }

  Likear() {
    db.collection('posteos')
      .doc(this.props.posteo.id)
      .update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) })
      .then(() => {
        this.setState({ likes: this.state.likes + 1, likeado: true });
      });
  }

  Deslikear() {
    db.collection('posteos')
      .doc(this.props.posteo.id)
      .update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) })
      .then(() => {
        this.setState({ likes: this.state.likes - 1, likeado: false });
      });
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.username}>{this.props.posteo.data.owner}</Text>
        <Text style={styles.description}>
          {this.props.posteo.data.descripcion ? this.props.posteo.data.descripcion : 'Sin descripción disponible...'}
        </Text>
        <Text style={styles.likes}>Likes: {this.state.likes}</Text>

        <View style={styles.likeButtonContainer}>
          <TouchableOpacity
            onPress={() => (this.state.likeado ? this.Deslikear() : this.Likear())}
            style={styles.likeButton}
          >
            <Icon
              name={this.state.likeado ? 'heart' : 'heart-o'} // Ícono relleno o vacío. Lo buscamos para que nos quede mas estetica la pagina
              size={24}
              color={this.state.likeado ? '#FF6B6B' : '#888'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  likes: {
    fontSize: 14,
    color: '#888',
  },
  likeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  likeButton: {
    padding: 8,
  },
});
