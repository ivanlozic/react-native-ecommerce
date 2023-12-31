import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import amazonLogo from '../assets/amazon-logo.png'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigation = useNavigation()

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }

    axios
      .post('http://localhost:5000/register', user)
      .then((response) => {
        console.log(response)
        Alert.alert('Registration Succesfull')
        setName('')
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        Alert.alert('Registration failed', error.message)
      })
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}
    >
      <View>
        <Image style={{ width: 150, height: 100 }} source={amazonLogo} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42'
            }}
          >
            Register your account
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#D0D0D0',
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30
              }}
            >
              <Ionicons
                name='ios-person'
                size={24}
                color='black'
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16
                }}
                placeholder='Enter Your Name'
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name='email'
              size={24}
              color='black'
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16
              }}
              placeholder='Enter Your Email'
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name='lock'
              size={24}
              color='black'
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16
              }}
              placeholder='Enter Your Password'
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        ></View>

        <View style={{ marginTop: 30 }}>
          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: 25 }}
          >
            <Text>Already have an account? Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
