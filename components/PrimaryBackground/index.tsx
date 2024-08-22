import React, { PropsWithChildren } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '@/constants/Colors'

export default function PrimaryBackground({children}: PropsWithChildren) {
  return (
    <LinearGradient
    colors={Colors.backgroundGradient}
    locations={[0, 0.5]}
    className='flex-1 '
    >
        {children}
    </LinearGradient>
    
  )
}