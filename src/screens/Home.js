import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user == null) {
        console.log('No hay nadie logueado');
        this.props.navigation.navigate('login');
      }
    });

    db.collection('posteos')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let postObtenidos = [];
        docs.forEach((doc) => {
          postObtenidos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({ posteos: postObtenidos });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Post navigation={this.props.navigation} posteo={item} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10
  },
});
