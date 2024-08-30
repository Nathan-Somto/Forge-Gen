import { View, Text, TextInput } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
type Props = {
    handleFilter: (text: string) => void;
    value: string;
}
export function SearchBox({handleFilter, value}: Props) {
  return (
    <View className="h-[65px] relative w-full flex flex-row justify-start items-center px-4 border-2 rounded-[20px]"
    style={{ borderColor: Colors.btnPrimary }}>
      <Feather name="search" size={25} color={Colors.neutral}/>
      <TextInput
        value={value}
        onChangeText={handleFilter}
        placeholder="Search"
        maxLength={100}
        placeholderTextColor={Colors.neutral}
        className="ml-3 flex-1 font-medium text-[18px] text-left"
        style={{color: Colors.neutral}}
      />
    </View>
  );
}
