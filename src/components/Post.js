import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
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
        this.setState({ likes: this.props.posteo.data.likes.length, likeado: true });
      });
  }

  Deslikear() {
    db.collection('posteos')
      .doc(this.props.posteo.id)
      .update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) })
      .then(() => {
        this.setState({ likes: this.props.posteo.data.likes.length, likeado: false });
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
          {this.state.likeado ? (
            <TouchableOpacity style={styles.button} onPress={() => this.Deslikear()}>
              <Text style={styles.buttonText}>Deslikear</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => this.Likear()}>
              <Text style={styles.buttonText}>Likear</Text>
            </TouchableOpacity>
          )}
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
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
