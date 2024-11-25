import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config';
import FormularioRegister from '../components/FormularioRegister'

export default class Register extends Component {
    constructor(props) {
        super(props)
    }

    irAlLogin() {
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
            <View style={styles.container}>
                <Text style={styles.title}>Registrarse</Text>
                <FormularioRegister navigation={this.props.navigation} />

                <TouchableOpacity
                    onPress={() => this.irAlLogin()}
                    style={styles.loginLink}
                >
                    <Text style={styles.loginLinkText}>Ya tengo cuenta, iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',

    },
    loginLink: {
        marginTop: 20,
        paddingVertical: 12,
        width: '100%',
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    loginLinkText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
