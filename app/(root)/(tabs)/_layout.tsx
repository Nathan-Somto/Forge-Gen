import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
       tabBarStyle: {
        backgroundColor: Colors.tabBackground,
        borderWidth: 0
       },
       tabBarActiveTintColor: Colors.tabIconSelected,
       tabBarInactiveTintColor: Colors.tabIconDefault,
       headerStyle: {
        backgroundColor: Colors.primary,
       },
       headerTitleStyle: {
        color: Colors.text,
        fontSize: 22
       },
       headerTitleAlign : 'center',
       headerRight : () => <Link href='/(root)/settings' className='mr-3'><FontAwesome name="gear" size={25} color={Colors.text}/></Link>,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />

        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: 'Generate',
          tabBarIcon: ({ color }) => <TabBarIcon name="magic" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inspiration"
        options={{
          title: 'Inspiration',
          tabBarIcon: ({ color }) => <TabBarIcon name="lightbulb-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bgRemove"
        options={{
          title: 'Bg Remove',
          tabBarIcon: ({ color }) => <TabBarIcon name="eraser" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
