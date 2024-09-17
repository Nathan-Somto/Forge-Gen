import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Text } from "@/components/ui/Text";
import PrimaryBackground from "@/components/PrimaryBackground";
import { useImagePicker } from "@/hooks/useImagePicker";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { profileCards } from "@/constants/Values";
import { useAuth } from "@/hooks/useAuth";
import {
  getAvatarUrl,
  getUserTransformations,
  getUserTransformationsQuery,
  updateUser,
  uploadAvatar,
} from "@/lib/appwrite";
import ImageCard from "@/components/ImageCard";
import { Button } from "@/components/ui/Button";
type TabsType = "transformations" | "liked" | "downloaded";
const tabsOptions: ReadonlyArray<TabsType> = [
  "transformations",
  "liked",
  "downloaded",
];
export default function Profile() {
  const {
    auth: { user },
    updateUserInfo,
  } = useAuth();
  const userId = user?.$id ?? "";
  const { url, Options, handlePress, appwriteFile } = useImagePicker({
    optionTitle: "Profile Photo",
  });
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [loading, setLoading] = useState<Record<TabsType, boolean>>({
    transformations: false,
    downloaded: false,
    liked: false,
  });
  const [selectedTab, setSelectedTab] = useState<TabsType>("transformations");
  const [userTransformations, setUserTransformations] = useState<
    ITransformation[] | null
  >(null);
  const [likedTransformations, setLikedTransformations] = useState<
    ITransformation[] | null
  >(null);
  const [downloadedTransformations, setDownloadedTransformations] = useState<
    ITransformation[] | null
  >(null);
  const credits = user?.creditBalance || 0;
  React.useEffect(() => {
    if (url && url !== user?.avatarUrl) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [url, user?.avatarUrl]);
  React.useEffect(() => {
    async function fetchUserTransformations() {
      if (!userId) return;
      if (userTransformations) return;
      setLoading({ ...loading, transformations: true });
      try {
        // Fetch user transformations
        const data = await getUserTransformations(userId);
        setUserTransformations(data);
      } catch (e) {
        console.log(e);
        Alert.alert(
          "Error",
          "An error occurred while fetching user transformations"
        );
      } finally {
        setLoading({ ...loading, transformations: false });
      }
    }
    fetchUserTransformations();
  }, [userId]);

  const transformations =
    userTransformations !== null ? userTransformations.length : 0;
  const handleTabPress = async (tab: keyof typeof loading) => {
    try {
      setSelectedTab(tab);
      if (userId === "") return;
      // based on the seleceted tab if the data is not fetched then fetch it
      // if data is already being fetched then do nothing
      if (loading.downloaded || loading.liked || loading.transformations)
        return;
      if (tab === "transformations" && userTransformations === null) {
        setLoading({ ...loading, transformations: true });
        const data = await getUserTransformations(userId);
        setUserTransformations(data);
      }
      if (tab === "liked" && likedTransformations === null) {
        setLoading({ ...loading, liked: true });
        const data = await getUserTransformationsQuery(userId, "liked");
        setLikedTransformations(data);
      }
      if (tab === "downloaded" && downloadedTransformations === null) {
        setLoading({ ...loading, downloaded: true });
        const data = await getUserTransformationsQuery(userId, "downloaded");
        setDownloadedTransformations(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (loading[tab]) return;
      setLoading({ ...loading, [tab]: false });
    }
  };
  const handleAvatarUpload = async () => {
    try {
      if (user === null || userId === "") return;
      if (appwriteFile) {
        const result = await uploadAvatar(appwriteFile);
        if (result) {
          const resultUrl = getAvatarUrl(result.$id);
          updateUserInfo({ ...user, avatarUrl: resultUrl });
          await updateUser(userId, { avatarUrl: resultUrl });
        }
      }
    } catch (e) {
      Alert.alert("Error", "An error occurred while uploading avatar");
      console.log(e);
    }
  };
  const renderTransformations = () => {
    let dataToRender: ITransformation[] | null = null;

    if (selectedTab === "transformations") {
      dataToRender = userTransformations;
    } else if (selectedTab === "liked") {
      dataToRender = likedTransformations;
    } else if (selectedTab === "downloaded") {
      dataToRender = downloadedTransformations;
    }

    if (loading[selectedTab]) {
      return <ActivityIndicator size="large" color={Colors.btnPrimary} />;
    }

    if (!dataToRender || dataToRender.length === 0) {
      return (
        <Text className="text-center mt-5">
          No {selectedTab === "transformations" ? null : selectedTab}{" "}
          transformations found.
        </Text>
      );
    }

    return (
      <FlatList
        data={dataToRender}
        keyExtractor={(item) => item.public_id}
        renderItem={({ item }) => <ImageCard {...item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    );
  };
  return (
    <PrimaryBackground>
      <View className="flex-1">
        <View
          className="h-[360px] w-full px-4 border-b"
          style={{ borderBottomColor: Colors.neutral }}
        >
          <View className="flex-row mt-5 h-[110px] items-center">
            <TouchableOpacity
              className="mr-4 relative h-[100px] w-[100px]"
              onPress={handlePress}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.5 }}
                colors={Colors.multiColorGradient}
                className="h-full w-full items-center justify-center rounded-full"
              >
                <View
                  className="w-[95%] h-[95%] rounded-full relative items-center justify-center"
                  style={{ backgroundColor: Colors.primary }}
                >
                  {url || user?.avatarUrl ? (
                    <Image
                      source={{ uri: user?.avatarUrl ?? url ?? "" }}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Feather name="user" size={75} color={Colors.neutral} />
                  )}
                  <TouchableOpacity
                    onPress={handlePress}
                    className="w-[40px] h-[40px] -bottom-2 -right-2 absolute rounded-full p-2 justify-center items-center"
                    style={{ backgroundColor: Colors.primary }}
                  >
                    <Entypo
                      name="camera"
                      size={20}
                      color="white"
                      onPress={handlePress}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <View className="ml-2 flex-row">
              <View>
                <Text h2>{user?.username}</Text>
                <Text className="mt-0.5" style={{ color: Colors.neutral }}>
                  {user?.email}
                </Text>
              </View>
              {showSaveButton && (
                <Button
                  variant="white"
                  onPress={handleAvatarUpload}
                  disabled={loadingAvatar}
                  containerStyles={{ height: 35 }}
                >
                  {loadingAvatar ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Text>Save Avatar</Text>
                  )}
                </Button>
              )}
            </View>
          </View>
          <View className="w-full mt-5 mb-3 flex-row gap-x-3">
            {profileCards(credits, transformations).map((item, index) => (
              <View
                key={item.id}
                className="h-[120px] my-3 justify-center w-[48%] rounded-lg p-4"
                style={{ backgroundColor: Colors.secondary }}
              >
                <Text
                  h3
                  className="mb-2"
                  style={{ color: Colors.neutral, fontSize: 16 }}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-center">
                  <Image
                    source={item.image}
                    className="object-center w-[40px] h-[30px] object-cover mr-4"
                  />
                  <Text h3 style={{ color: Colors.btnPrimary }}>
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <FlatList
            data={tabsOptions}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTabPress(item)}
                className="px-5 py-2"
                style={{
                  borderBottomWidth: selectedTab === item ? 2 : 0,
                  borderBottomColor:
                    selectedTab === item ? Colors.btnPrimary : "transparent",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      selectedTab === item ? Colors.btnPrimary : Colors.neutral,
                    textTransform: "capitalize",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="mt-3"/>
        {renderTransformations()}
        <Options />
      </View>
    </PrimaryBackground>
  );
}
