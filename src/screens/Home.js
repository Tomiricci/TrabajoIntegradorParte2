import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import {db, auth} from '../firebase/config'
import Post from '../components/Post'
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
        posteos:'',
    }
}

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user == null) {
          console.log("no hay nadie logueado ")
          this.props.navigation.navigate('login')

      }


      
      })
  db.collection('posteos').orderBy('createdAt','desc').onSnapshot((docs) => {
      let postObtenidos = []
      docs.forEach(doc => {
          postObtenidos.push({
              id : doc.id,
              data: doc.data()
          })
      })
      this.setState({ posteos: postObtenidos})
  })
  }
  render() {
    return (
      <View>
        <Text> Este es el home </Text>
        <FlatList
                data={this.state.posteos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <View><Post navigation = {this.props.navigation} posteo={item}/></View>} 
                />
      </View>
    )
  }
}
