import { View, FlatList } from "react-native";
import React, { useRef } from "react";
import { Button } from "../ui/Button";
import { Feather } from "@expo/vector-icons";
import { Text } from "../ui/Text";

type Props<T> = {
  page: number;
  pageSize: number;
  totalPages: number;
  data: (T & { id: string })[];
  getPrevPage: () => void;
  fetchNextPage: () => void;
  El: (props: T & { id: string }) => React.JSX.Element;
};

export default function Collection<T>({
  page,
  totalPages,
  data,
  fetchNextPage,
  getPrevPage,
  El,
  pageSize,
}: Props<T>) {
  const flatListRef = useRef<FlatList<T & { id: string }>>(null);

  const handleNextPage = () => {
    fetchNextPage();
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };
  return (
   
      <FlatList
        ref={flatListRef}
        data={data.slice(pageSize * (page - 1), pageSize * page)}
        renderItem={({ item }) => <El {...item} />}
        keyExtractor={(item) => item.id}
        className="w-full my-5"
        ListFooterComponent={() => (
          <View className="flex-row items-center mx-auto">
            <Button disabled={page === 1} onPress={getPrevPage} containerClassName={`${page === 1 && 'opacity-50'} w-[40px] px-2`}>
              <Feather name="chevron-left" color="#fff" size={24} />
            </Button>
            <Text className="mx-3">
              {page} / {totalPages}
            </Text>
            <Button disabled={page === totalPages} containerClassName={`${page === totalPages && 'opacity-50'} w-[40px] px-2`} onPress={handleNextPage}>
              <Feather name="chevron-right" color="#fff" size={24} />
            </Button>
          </View>
        )}
      />
  );
}
