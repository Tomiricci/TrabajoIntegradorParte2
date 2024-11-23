import React, { Component } from 'react'
import {Text, View, TouchableOpacity, Image, FlatList , TextInput} from 'react-native'
import firebase from 'firebase'
import {db, auth} from '../firebase/config'
export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
        posteos:'',
        likeado: this.props.posteo.data.likes.includes(auth.currentUser.email),
        likes: this.props.posteo.data.likes.length
    }
}
Likear() {
    db.collection('posteos').doc(this.props.posteo.id).update({likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)})
    .then(()=> {this.setState({likes:this.props.posteo.data.likes.length , likeado : true})})
} 
Deslikear() {
    db.collection('posteos').doc(this.props.posteo.id).update({likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)})
    .then(()=> {this.setState({likes:this.props.posteo.data.likes.length , likeado: false})})
}
  componentDidMount() {
    
  }
  render() {
    return (
      <View>
        <View>
        <Text>{this.props.posteo.data.owner}</Text>
        <Text>{this.props.posteo.data.descripcion}</Text>
        <Text>{this.props.posteo.data.likes.length}</Text>
        </View>
        
        {this.state.likeado == true ? 
            
        <TouchableOpacity onPress={() => this.Deslikear()}>
            <Text>Deslikear</Text>
        </TouchableOpacity>
        
        
        :
        
        <TouchableOpacity onPress={() => this.Likear()}>
            <Text>likear</Text>
        </TouchableOpacity>  
  }
      </View>
    )
  }
}