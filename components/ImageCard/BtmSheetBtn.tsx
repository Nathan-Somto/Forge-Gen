import { TouchableOpacity } from "react-native";
import { Text } from "../ui/Text";

export function BtmSheetBtn({
  Icon,
  handlePress,
  type,
  danger,
  disable
}: BtmSheetBtnProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disable}
      className="flex-row items-center  px-5 py-2 w-full my-1.5"
    >
      <Icon color={`${danger ? "#F21E6A" : "#505050"} ${disable ? "opacity-50" : ''}`} size={30} />
      <Text
        h3
        className={`ml-3.5 capitalize text-center  ${disable ? "opacity-50" : ''}`}
        style={{ color: danger ? "#F21E6A" : "" }}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
}
