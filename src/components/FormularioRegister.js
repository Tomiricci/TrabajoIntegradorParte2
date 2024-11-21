import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormularioRegister extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            username:'',
            bio:'',
            password:'',
            error:''
        }
    }

    submit(email, username, bio, password){
        if(!email.includes('@')){
            this.setState({error: 'Ingrese un formato de email valido'})
            return
        }
        
        if(username.length < 2){
            this.setState({error: 'Ingrese un username'})
            return
        }

        if(bio.length < 2){
            this.setState({error: 'Ingrese una bio'})
            return
        }

        if(password.length < 5){
            this.setState({error: 'Ingrese una password mas larga'})
            return
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    bio: bio,
                    username: username,
                    imagenPerfil: '',
                   
                })
                .then(
                    () => this.props.navigation.navigate('anidada')
                )

                
            }
        })
        .catch(err => {
            if (err.code === "auth/email-already-in-use"){
                this.setState({error: 'el email ya esta en uso'})
            }
        })

    }


    render() {
        return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Ingrese su correo'
                keyboardType='email-address'
                onChangeText={(text) => this.setState({email: text, error: ''})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                placeholder='Ingrese su username'
                keyboardType='default'
                onChangeText={(text) => this.setState({username: text, error: ''})}
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                placeholder='Ingrese su bio'
                keyboardType='default'
                onChangeText={(text) => this.setState({bio: text, error: ''})}
                value={this.state.bio}
            />
            <TextInput
                value={this.state.password}
                style={styles.input}
                placeholder='Ingrese su password'
                keyboardType='default'
                onChangeText={(text) => this.setState({password: text, error: ''})}
                secureTextEntry={true}
            />
            {
                this.state.error !== '' 
                &&
                <Text>
                    {this.state.error}
                </Text>
            }
            <TouchableOpacity
                onPress={()=> this.submit(this.state.email, this.state.username, this.state.bio, this.state.password)}
            >
                <Text style={styles.registerButton}>Registrarse</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
   
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
   
    },
    registerButton: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20
    }
});

