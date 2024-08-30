import PrimaryBackground from "@/components/PrimaryBackground";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";
import { dummyData } from "@/components/ImageCard/dummyData";
import React from "react";
import GradientHeading from "@/components/GradientHeading";
import { SearchBox } from "@/components/SearchBox";
import { transformationLinks } from "@/constants/Values";
import Collection from "@/components/Collection";
import ImageCard from "@/components/ImageCard";

export default function HomeScreen() {
  const TabsRef = React.useRef<FlatList | null>(null);
  const [generations, setGenerations] = React.useState(dummyData);
  const pageSize = 5;
  const totalPages = Math.ceil(generations.length / pageSize);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [transformationType, setTransformationTpe] = React.useState("All");
  const handleFilter = (text: string) => {
    setSearchValue(text);
    if (text === "") {
      setGenerations(dummyData);
      return;
    }
    const filteredData = dummyData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setGenerations(filteredData);
  };
  const handleTransformFilter = (text: string, index: number) => {
    if (text === "All") {
      setGenerations(dummyData);
      setTransformationTpe(text);
      return;
    }
    const filteredData = dummyData.filter(
      (item) => item.transformationType === text
    );
    setGenerations(filteredData);
    setTransformationTpe(text);
    TabsRef.current?.scrollToIndex({ index, animated: true });
  };
  const fetchNextPage = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <PrimaryBackground>
      <TouchableWithoutFeedback
        className="flex-1"
        onPress={() => Keyboard.dismiss()}
      >
        <>
          <View className="px-3 my-5">
            <GradientHeading size={28}>Recent Transformations</GradientHeading>
            <View className="mb-1.5" />
            <GradientHeading size={28}>by people</GradientHeading>
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
            {generations.length === 0 ? (
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
                data={generations}
                page={page}
                totalPages={totalPages}
                pageSize={pageSize}
                fetchNextPage={fetchNextPage}
                getPrevPage={() => setPage((prev) => prev - 1)}
              />
            )}
          </View>
        </>
      </TouchableWithoutFeedback>
    </PrimaryBackground>
  );
}
