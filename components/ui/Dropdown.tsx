import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  FlatList,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "./Text";
import Colors from "@/constants/Colors";
import Typo from "@/constants/Typo";
export interface Data {
  label: string;
  value: string;
}
interface Props {
  label: string;
  data: Data[];
  onSelect: (item: Data) => void;
}
interface RenderItemProps {
  item: Data;
}
export const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
  const DropdownButtonRef =
    React.useRef<TouchableOpacity | null>(null);
  const [dropdownTop, setDropdownTop] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState<Data | undefined>();
  const onItemPress = (item: Data) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };
  const renderItem = ({ item }: RenderItemProps) => (
    <TouchableOpacity
      className="p-2.5 border-b border-b-black/50"
      onPress={() => onItemPress(item)}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  const openDropdown = () => {
    if (!DropdownButtonRef.current) return;
    /*  DropdownButtonRef.current */
    DropdownButtonRef.current.measure((_fx, _fy, w, h, px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <Modal visible={visible} transparent animationType="none">
          <StatusBar hidden/>
          <TouchableOpacity onPress={() => setVisible(false)} className="flex-1 px-5 items-center">
            <View
              className="absolute w-full  bg-[#cfcfcf] rounded-lg"
              style={{ top: dropdownTop}}
            >
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      );
    }
  };
  return (
    <TouchableOpacity
      ref={DropdownButtonRef}
      onPress={toggleDropdown}
      className="flex-row items-center px-10 bg-transparent border-2 h-[65px] z-[1] w-full rounded-[20px]"
      style={{borderColor: Colors.purpleGradient[0]}}
    >
      {renderDropdown()}
      <Text className="text-center flex-1" style={{color: Colors.neutral, fontFamily: Typo.medium}}>
        {(selected && selected.label) || label}
      </Text>
      <Feather name="chevron-down" size={24} color={Colors.neutral} />
    </TouchableOpacity>
  );
};
