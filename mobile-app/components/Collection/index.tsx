import { View, FlatList, ActivityIndicator,  } from "react-native";
import React, { useRef } from "react";
import { Text } from "../ui/Text";
import Colors from "@/constants/Colors";

type Props<T> = {
  data: T[];
  fetchNextCursor: () => void;
  isFetchingNextCursor: boolean;
  hasMore: boolean;
  El: (props: T)=> React.JSX.Element;
  extractKey?: (item: T) => string;
};

export default function Collection<T extends object>({
  data,
  fetchNextCursor,
  isFetchingNextCursor,
  hasMore,
  El,
  extractKey,
}: Props<T>) {
  const flatListRef = useRef<FlatList<T>>(null);

  const handleEndReached = () => {
    if (hasMore && !isFetchingNextCursor) {
      fetchNextCursor();
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={({ item }) => <El {...item}/>}
      keyExtractor={(item, index) =>
        extractKey ? extractKey(item) : index.toString()
      }
      className="w-full mb-5"
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => (
        <View className="flex-row items-center mx-auto">
          {isFetchingNextCursor && (
            <ActivityIndicator size="small" color={Colors.primary} />
          )}
          {!hasMore && <Text>No more items to load</Text>}
        </View>
      )}
    />
  );
}
