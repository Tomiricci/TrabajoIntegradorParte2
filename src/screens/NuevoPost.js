import {Text, View, TouchableOpacity, Image, FlatList , TextInput} from 'react-native'
import React, {Component} from 'react'
import {db, auth} from '../firebase/config'
import { storage } from "../firebase/config";

export default class NuevoPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descripcion : '',
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user == null) {
                console.log("no hay nadie logueado ")
                this.props.navigation.navigate('login')
    
            }
    
            })

    }
   
    OnSubmit(descripcion) {
        if(descripcion != ''){
            db.collection('posteos').add({
                descripcion : descripcion,
                owner: auth.currentUser.email,
                createdAt : Date.now(),
                likes: []
            })
            .then((resp) => this.setState({descripcion : ''}, () => this.props.navigation.navigate('Home')))
            .catch((e) => console.log(e))
        }
        
    }
    
        render() {
            return (
                <View >
                    
                        <TextInput
                        value={this.state.descripcion}
                        onChangeText={(text) => this.setState({ descripcion: text })}
                        placeholder="Descripción"
                        >
                            </TextInput>
                        <TouchableOpacity
                                    
                                    onPress={() => this.OnSubmit(this.state.descripcion)}
                                >
                                    <Text >Crear Post</Text>
                                </TouchableOpacity>
                        
                </View>
            );
        }
        

}


