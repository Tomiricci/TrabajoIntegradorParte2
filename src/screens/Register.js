import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import FormularioRegister from '../components/FormularioRegister'

export default class Register extends Component {
    constructor(props){
        super(props)
    }

    irAlLogin(){
        this.props.navigation.navigate('login')
    }
componentDidMount() {
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
        console.log("Este es el email logueado ", auth.currentUser.email)
        this.props.navigation.navigate('anidada')

    }
    })
}
  render() {
    return (
      <View>
        <Text style={styles.title}>Estamos en el register</Text>
        <FormularioRegister navigation={this.props.navigation} />
        <TouchableOpacity
        onPress={()=> this.irAlLogin()}
        >
            <Text style={styles.registerButton}>Ya tengo cuenta, necesito iniciar sesion</Text>
        </TouchableOpacity>

        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  registerButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
    
}
});
