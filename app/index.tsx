import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View>
      <Text>First Screen</Text>
      <Link href='/(auth)/welcome'>Welcome Screen</Link>
      <Link href='/(root)/(tabs)/'> Home Screen</Link>
    </View>
  )
}