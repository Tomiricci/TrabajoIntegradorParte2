import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gmail: "",
            password: "",
            errorMessage: ""  // Estado para almacenar el mensaje de error
        };
    }

    componentDidMount() {
        console.log('props de la screen', this.props);
        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                console.log("Este es el email logueado ", auth.currentUser.email)
                this.props.navigation.navigate('anidada')
            }
        })
    }

    irARegister() {
        this.props.navigation.navigate('register');
    }

    handleLogin() {
        if (this.state.gmail.length >= 4 && this.state.password.length !== "") {
            auth.signInWithEmailAndPassword(this.state.gmail, this.state.password)
                .then((user) => {
                    console.log("Has iniciado sesión correctamente");
                    this.setState({ errorMessage: "" });
                    this.props.navigation.navigate('anidada', { screen: 'home' });
                })
                .catch(err => {
                    console.log("Error en tu mail o contraseña", err);
                    this.setState({ errorMessage: "Error en tu mail o contraseña" });
                });
        } else {
            this.setState({ errorMessage: "Por favor completa todos los campos" });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>

                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Ingrese su email'
                    onChangeText={(texto) => this.setState({ gmail: texto })}
                    value={this.state.gmail}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Ingresa tu contraseña'
                    secureTextEntry={true}
                    onChangeText={(texto) => this.setState({ password: texto })}
                    value={this.state.password}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                {this.state.errorMessage ?
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                    : null
                }

                <TouchableOpacity style={styles.registerLink} onPress={() => this.irARegister()}>
                    <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    registerLink: {
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 16,
        color: '#007BFF',
    },
});
