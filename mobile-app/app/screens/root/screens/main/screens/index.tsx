import PrimaryBackground from "@/components/PrimaryBackground";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import GradientHeading from "@/components/GradientHeading";
import { SearchBox } from "@/components/SearchBox";
import { transformationLinks } from "@/constants/Values";
import Collection from "@/components/Collection";
import ImageCard from "@/components/ImageCard";
import { getTransformations } from "@/lib/appwrite/transformations";
import { useCursor } from "@/hooks/useCursor";
import { Text } from "@/components/ui/Text";

export default function HomeScreen() {
  const TabsRef = useRef<FlatList | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [transformationType, setTransformationType] = useState("All");
  const originalTransData = React.useRef<ITransformation[]>([]);
  const [transData, setTransData] = useState<ITransformation[]>([]);
  const {
    data: transformations,
    fetchNextCursor,
    isFetching,
    hasMore,
  } = useCursor<ITransformation>(getTransformations, 10, 'transformations');
  React.useEffect(() => {
    originalTransData.current = transformations;
    setTransData(transformations);
  }, [transformations]);
  const handleFilter = (text: string) => {
    setSearchValue(text);
    if (text === "") {
      setTransData(originalTransData.current);
      return;
    }
    const filteredData = transData?.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    // Handle filtered data
    setTransData(filteredData);
  };
  const handleTransformFilter = (text: string, index: number) => {
    if (text === "All") {
      // Handle resetting to all data
      setTransformationType(text);
      setTransData(originalTransData.current);
      return;
    }
    const filteredData = transformations?.filter(
      (item) => item.transformationType === text
    );
    // Handle filtered data
    setTransformationType(text);
    TabsRef.current?.scrollToIndex({ index, animated: true });
    setTransData(filteredData);
  };
  return (
    <PrimaryBackground>
      <TouchableWithoutFeedback
        className="flex-1 "
        onPress={() => Keyboard.dismiss()}
      >
        <>
          <View className="px-3 my-5">
            <GradientHeading size={25}>Recent Transformations</GradientHeading>
            <View className="mb-1.5" />
            <GradientHeading size={25}>by people</GradientHeading>
          </View>
          <View className="my-3.5 px-3">
            <SearchBox value={searchValue} handleFilter={handleFilter} />
          </View>
          <View className="my-5 px-3">
            <FlatList
              ref={TabsRef}
              data={[
                { label: "All", type: "All" },
                ...transformationLinks.map((item) => ({
                  label: item.label,
                  type: item.type,
                })),
              ]}
              keyExtractor={(item) => item.label}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="mx-2 rounded-3xl transition-all ease-in py-2 px-4"
                  style={{
                    backgroundColor:
                      item.type === transformationType
                        ? Colors.btnPrimary
                        : "transparent",
                  }}
                  onPress={() =>
                    handleTransformFilter(item.type ?? "All", index)
                  }
                >
                  <Text
                    style={{
                      color:
                        item.type === transformationType
                          ? Colors.text
                          : Colors.neutral,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View className="px-3 flex-1">
            {transData?.length === 0 ? (
              <View className="h-[70%] justify-center items-center opacity-50">
                <MaterialCommunityIcons
                  name="image-off"
                  size={100}
                  color={Colors.neutral}
                  className="opacity-50"
                />
                <Text
                  className="text-lg mt-3 text-center"
                  style={{ color: Colors.neutral }}
                >
                  No Transformations Yet
                </Text>
              </View>
            ) : (
              <Collection
                El={ImageCard}
                data={transData}
                fetchNextCursor={fetchNextCursor}
                extractKey={(item) => item.public_id}
                hasMore={hasMore}
                isFetchingNextCursor={isFetching}
              />
            )}
          </View>
        </>
      </TouchableWithoutFeedback>
    </PrimaryBackground>
  );
}