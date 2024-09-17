import {
  View,
  PanResponder,
  TouchableOpacity,
  Modal,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Text } from "./Text";

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  open?: boolean;
  height?: number;
  sheetContentStyles?: StyleProp<ViewStyle>;
  disable?:boolean;
};
export default function Sheet({
  title,
  onClose,
  open,
  height = 0.3,
  children,
  sheetContentStyles,
  disable
}: Props) {
  const deviceHeight = Dimensions.get("window").height;
  const sheetRef = React.useRef<View | null>(null);
  const [currentHeight, setCurrentHeight] = React.useState(
    height * deviceHeight
  );
  const minHeight = 100;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if(disable) return;
        const newHeight = height * deviceHeight - gestureState.dy;
        // it should be when the sheet is like 100 pixels from the bottom
        if (newHeight <= minHeight || gestureState.vy > 1) {
          onClose();
        } else {
          // i want to reduce the height of the sheet
          sheetRef.current?.setNativeProps({
            style: {
              height: Math.min(newHeight, deviceHeight * height),
            },
          });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if(disable) return;
        const finalHeight = currentHeight - gestureState.dy;
        setCurrentHeight(finalHeight);

        if (gestureState.dy > minHeight && gestureState.vy > 0.5) {
          onClose();
        } else {
          sheetRef.current?.setNativeProps({
            style: {
              height: finalHeight,
            },
          });
        }
      },
    })
  ).current;
  return (
    <Modal transparent visible={open} animationType="fade">
      <TouchableOpacity
        onPress={onClose}
        disabled={disable}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1,
          position: "relative",
        }}
      >
        <View
          {...panResponder.panHandlers}
          ref={sheetRef}
          style={{
            backgroundColor: Colors.text,
            bottom: 0,
            position: "absolute",
            zIndex: 5,
            width: "95%",
            height: currentHeight,
            paddingHorizontal: 12,
            borderTopEndRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            marginHorizontal: "1%",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={onClose}
            disabled={disable}
          >
            <Feather name="x" size={20} color={Colors.secondary} />
          </TouchableOpacity>
          {title && (
            <Text h1 style={{ color: "#000", marginTop: 10 }}>
              {title}
            </Text>
          )}
          <View
            style={[
              {
                width: "100%",
                paddingHorizontal: 4,
              },
              sheetContentStyles,
            ]}
          >
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
