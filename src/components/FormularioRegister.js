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
            this.setState({error: 'Ingrese una password más larga'})
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
                this.setState({error: 'El email ya está en uso'})
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
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            }
            <TouchableOpacity
                onPress={() => this.submit(this.state.email, this.state.username, this.state.bio, this.state.password)}
                style={styles.registerButton}
            >
                <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9', // Fondo gris claro
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: '#007BFF', // Borde azul para resaltar
        borderRadius: 20, // Bordes más redondeados
        marginBottom: 15,
        paddingLeft: 20, // Más espacio al texto
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        shadowColor: '#007BFF', // Sombra con un toque azul
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Sombra para Android
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    registerButton: {
        marginTop: 20,
        paddingVertical: 15,
        width: '100%',
        backgroundColor: '#007BFF', // Botón azul
        borderRadius: 25, // Bordes redondeados para el botón
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
