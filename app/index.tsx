import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View>
      <Text>first screen</Text>
      <Link href='/(auth)/welcome'>Welcome Screen</Link>
    </View>
  )
}