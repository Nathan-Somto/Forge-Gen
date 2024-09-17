import { View, Modal, TouchableOpacity, Image } from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons"; 

export function Dialog({
  visible,
  onOpenChange,
  children,
}: DialogProps) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onOpenChange(false)}
        className="flex-1 justify-center items-center bg-black/50 w-full"
      >
        <View
          className="flex-1 w-full"
        >
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
function DialogCancel({onOpenChange}: Pick<DialogProps, 'onOpenChange'>){
    return (
        <TouchableOpacity
        onPress={() => onOpenChange(false)}
        className="absolute top-2 right-2 p-4"
      >
        <Ionicons name="close" size={24} color={Colors.btnPrimary} />
      </TouchableOpacity>
    )
}
Dialog.cancel = DialogCancel