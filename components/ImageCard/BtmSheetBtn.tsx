import { TouchableOpacity } from "react-native";
import { Text } from "../ui/Text";

export function BtmSheetBtn({
  Icon,
  handlePress,
  type,
  danger,
}: BtmSheetBtnProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center w-full my-2.5"
    >
      <Icon color={` ${danger ? "#F21E6A" : "#505050"}`} size={20} />
      <Text
        className={`mr-1.5`}
        style={{ color: danger ? "text-[#F21E6A]" : "" }}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
}
