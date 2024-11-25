import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posteos: []
    };
  }

  componentDidMount() {
    db.collection('posteos').where('owner', '==', auth.currentUser.email).onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({ posteos: posts });
      }
    );
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
        <View style={styles.profileCard}>
          {this.state.userInfo.length > 0 && (
            <>
              <Text style={styles.welcomeText}>
                Hola, {this.state.userInfo[0].data.username} 👋
              </Text>
              <Text style={styles.emailText}>
                {this.state.userInfo[0].data.owner}
              </Text>
              <Text style={styles.postCountText}>
                Posteos: {this.state.posteos.length}
              </Text>
            </>
          )}
        </View>

        {this.state.posteos.length > 0 && (
          <>
            <Text style={styles.postListTitle}>Tus Posteos</Text>
            <FlatList
              data={this.state.posteos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.postContainer}>
                  <Post navigation={this.props.navigation} posteo={item} />
                </View>
              )}
            />
          </>
        )}


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
    backgroundColor: '#f7f8fa',
    padding: 20,
    alignItems: 'center',
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  postCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  postListTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  postText: {
    fontSize: 16,
    color: '#444',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
