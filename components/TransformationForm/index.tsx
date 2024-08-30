import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import FormField from "../FormField";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Data as DropdownData, Dropdown } from "../ui/Dropdown";
import { aspectRatios, transformationFormInfo } from "@/constants/Values";
import GradientHeading from "../GradientHeading";
import GradientButton from "../GradientButton";
export default function TransformationForm({ type }: TransformationProps) {
  const [formInfo] = React.useState(transformationFormInfo[type]);
  const [data, setData] = React.useState({
    title: "",
    prompt: "",
    color: "",
    aspectRatio: ""
  });
  const handleChange = (key: string, value: string) => {
    const keyes: Record<string, string> = {
      "Image Title": "title",
      "Object to Recolor": "prompt",
      "Object to Remove": "prompt",
      "Replacement Color": "color",
    };
    setData({
      ...data,
      [keyes[key]]: value,
    });
  };
  const handleDropdownChange = (item: DropdownData) => {
    setData(prev => ({
      ...prev,
      aspectRatio: item.value
    }))
  }
  return (
    <View className="flex-1 py-8">
      <View className="my-4">
        <GradientHeading>{formInfo.heading}</GradientHeading>
        <View className="mt-1.5"/>
        <Text style={{color: Colors.neutral}} className="w-[90%]">{formInfo.subText}</Text>
      </View>
      <FormField
        label="Image Title"
        handleChangeText={handleChange}
        placeholder="Enter Image Title"
        value={data.title}
      />
      {(type === "recolor" || type === "remove") && (
        <FormField
          label={type === 'recolor' ? "Object to Recolor" : "Object to Remove"}
          placeholder="Enter prompt"
          handleChangeText={handleChange}
          value={data.prompt}
        />
      )}
      {type === "recolor" && (
        <FormField
          label="Replacement Color"
          placeholder="Enter Color"
          handleChangeText={handleChange}
          value={data.color}
        />
      )}
      {type === 'fill' && (
      <View className="mb-5">
      <Text style={{ color: Colors.labelText }} className="mb-3">Aspect Ratio</Text>
      <Dropdown data={aspectRatios} label={'Select Size'} onSelect={handleDropdownChange}/>
      </View>
      )}
      <View className="mt-4">
        <TouchableOpacity
          className="h-[300px]  border-dotted border justify-center items-center border-white"
          style={{ backgroundColor: Colors.secondary }}
        >
          <View
            style={{ backgroundColor: Colors.primary }}
            className="h-[60px] mb-1.5 w-[60px] p-2 flex rounded-full items-center justify-center"
          >
            <Feather name="plus" size={26} color="white" />
          </View>
          <Text style={{ color: Colors.neutral }} className="text-center">Click to upload Image</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5"/>
      <GradientButton>Transform</GradientButton>
    </View>
  );
}
