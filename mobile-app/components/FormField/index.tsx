import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "../ui/Text";
type props<T extends string> = Omit<
  TextInputProps,
  "style" | "placeholder" | "onChangeText" | "value"
> & {
  label: T;
  placeholder: string;
  handleChangeText: (label: T, text: string) => void;
  value: string;
  containerClassName?: string;
  isPassword?: boolean;
};
export default function FormField<T extends string>({
  handleChangeText,
  label,
  placeholder,
  value,
  isPassword,
  containerClassName='',
  ...props
}: props<T>) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={`space-y-3 mb-4 ${containerClassName}`}>
      <Text
        style={{ color: Colors.labelText }}
      >
        {label}
      </Text>
      <View
        className="h-[65px] relative w-full flex flex-row justify-start items-center px-4 border-2 rounded-[20px]"
        style={{ borderColor: Colors.btnPrimary }}
      >
        <TextInput
          className="flex-1 text-[18px] text-left"
          onChangeText={(text) => handleChangeText(label, text)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral}
          secureTextEntry={isPassword && !showPassword}
          style={{ color: Colors.neutral }}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity className="" onPress={() => setShowPassword((p) => !p)}>
            {showPassword ? (
              <FontAwesome name="eye-slash" size={25} color="rgba(255 ,255 ,255, 0.5)" />
            ) : (
              <FontAwesome name="eye" size={25} color="rgba(255 ,255 ,255, 0.5)" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ container: {} });
