import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormularioRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            error: ''
        }
    }

    submit(email, username, password) {
        if (!email.includes('@')) {
            this.setState({ error: 'Ingrese un formato de email valido' })
            return
        }

        if (username.length < 2) {
            this.setState({ error: 'Ingrese un username' })
            return
        }

        if (password.length < 5) {
            this.setState({ error: 'Ingrese una password más larga' })
            return
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                if (user) {
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
                if (err.code === "auth/email-already-in-use") {
                    this.setState({ error: 'El email ya está en uso' })
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
                    onChangeText={(text) => this.setState({ email: text, error: '' })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Ingrese su username'
                    keyboardType='default'
                    onChangeText={(text) => this.setState({ username: text, error: '' })}
                    value={this.state.username}
                />
                <TextInput
                    value={this.state.password}
                    style={styles.input}
                    placeholder='Ingrese su password'
                    keyboardType='default'
                    onChangeText={(text) => this.setState({ password: text, error: '' })}
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
        backgroundColor: '#f9f9f9',
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: '#007BFF',
        borderRadius: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    registerButton: {
        marginTop: 20,
        padding: 10,
        width: '100%',
        backgroundColor: '#007BFF',
        borderRadius: 25,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
