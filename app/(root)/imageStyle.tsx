import { View, Text } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import PrimaryBackground from '@/components/PrimaryBackground'

export default function ImageStyle() {
  return (
    <PrimaryBackground>
      <Text style={{color: Colors.text}} className='font-semibold text-2xl mb-3'>Select An Image Style</Text>
    </PrimaryBackground>
  )
}