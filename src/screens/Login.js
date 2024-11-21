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
                <Text style={styles.title}>Estamos en el login</Text>

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

                <TouchableOpacity  onPress={() => this.handleLogin()}>
                    <Text style={styles.loginButton}>Iniciar sesión</Text>
                </TouchableOpacity>

                {this.state.errorMessage
                    ?
                    (
                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                    )
                    : null}

                <TouchableOpacity style={styles.loginButton} onPress={() => this.irARegister()}>
                    <Text >No tengo cuenta, necesito registrarme</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
    },
    loginButton: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

