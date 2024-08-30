import { TouchableOpacity } from "react-native";

export function IconBtn({ Icon, handlePress, isLiked, LikedIcon }: IconBtnProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="h-[40px] mx-1.5 w-[40px] rounded-full p-2 bg-[#D8D8D8] border border-white justify-center items-center"
    >
      {isLiked === undefined || isLiked ? (
        <Icon color="#505050" size={20} />
      ) : LikedIcon ? (
        <LikedIcon color="#F21E6A" size={20} />
      ) : null}
    </TouchableOpacity>
  );
}
