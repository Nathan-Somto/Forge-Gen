import { View, Text, Image, Pressable, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WelcomeImg from '@/assets/images/welcome-img.png'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '@/constants/Colors'
import Button from '@/components/Button'
import GradientButton from '@/components/GradientButton'
export default function welcome() {
  return (
    <SafeAreaView className='flex-1'>
      <StatusBar hidden/>
      <LinearGradient
      colors={colors.backgroundGradient}
      locations={[0, 0.5]}
      style={{flex: 1}}
      >
     <View className='flex-1 justify-between pt-[50px] pb-[30px]'>
      <View>

      <Text className='text-4xl text-center w-[80%] mx-auto text-white mb-2'>Welcome</Text>
      <Text className='text-4xl text-center w-[80%] mx-auto text-white'>To Forge Gen</Text>
      </View>
      <View  className="relative justify-center">
        <Image source={WelcomeImg} className='h-[70%] w-[400px] object-[center_left] object-contain mx-auto' />
      </View>
     <View className='flex-row  h-[100px] items-center justify-around px-2 w-full'>
      <Link href={'/(auth)/sign-up'} asChild className='w-[45%] mr-5' >
      <View className='w-full'>
      <Button variant='outline' containerClassName='h-[65px] border-2 w-full rounded-[16px]'>
        Login
      </Button>
      </View>
      </Link>
      <Link href="/(root)/(tabs)/" asChild className='w-[45%]'>
     {/*  <TouchableOpacity>
      <LinearGradient colors={colors.purpleGradient} start={{x: 0, y:1}} end={{x: 1, y: 1}} className='h-[65px] rounded-[16px]   px-8 justify-center items-center'>
        <Text className='text-white text-xl font-medium' >
         Sign Up
        </Text>
      </LinearGradient>
      </TouchableOpacity> */}
      <GradientButton>
        Sign Up
      </GradientButton>
      </Link>
     </View>
     </View>
    </LinearGradient>
    </SafeAreaView>
  )
}