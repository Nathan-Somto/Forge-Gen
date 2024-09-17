import { Button } from "../ui/Button";
import Svg, { Path } from "react-native-svg";
import { Text} from "../ui/Text"; // Import View from your UI components
import { Alert, View } from "react-native";

export function GoogleButton() {
  const handleGoogleLogin = () => {
    Alert.alert("Google Oauth is not supported")
  };

  return (
    <Button
      variant="outline"
      onPress={handleGoogleLogin}
      containerClassName="flex-row justify-center items-center"
      containerStyles={{ height: 65 }}
    >
      <View className="flex-row items-center justify-center space-x-2">
        <Svg
          width="25"
          height="25"
          viewBox="0 0 41 41"
          fill="none"
        >
          <Path
            d="M36.7154 17.1543H35.3907V17.0834H20.5899V23.9167H29.884C28.5281 27.8946 24.8846 30.7501 20.5899 30.7501C15.1407 30.7501 10.7227 26.1606 10.7227 20.5001C10.7227 14.8395 15.1407 10.2501 20.5899 10.2501C23.1052 10.2501 25.3936 11.2358 27.136 12.8459L31.7876 8.01387C28.8504 5.17035 24.9216 3.41675 20.5899 3.41675C11.5079 3.41675 4.14453 11.0658 4.14453 20.5001C4.14453 29.9344 11.5079 37.5834 20.5899 37.5834C29.6719 37.5834 37.0353 29.9344 37.0353 20.5001C37.0353 19.3546 36.9218 18.2365 36.7154 17.1543Z"
            fill="#FFC107"
          />
          <Path
            d="M6.04077 12.5486L11.4439 16.6649C12.9059 12.9048 16.4466 10.2501 20.59 10.2501C23.1053 10.2501 25.3937 11.2358 27.1361 12.8459L31.7877 8.01387C28.8505 5.17035 24.9217 3.41675 20.59 3.41675C14.2733 3.41675 8.79537 7.12127 6.04077 12.5486Z"
            fill="#FF3D00"
          />
          <Path
            d="M20.59 37.5834C24.8378 37.5834 28.6975 35.8947 31.6158 33.1486L26.5259 28.6745C24.8748 29.9737 22.8224 30.7501 20.59 30.7501C16.3125 30.7501 12.6806 27.9168 11.3123 23.9629L5.94946 28.2551C8.67117 33.7875 14.1985 37.5834 20.59 37.5834Z"
            fill="#4CAF50"
          />
          <Path
            d="M36.7154 17.1541H35.3907V17.0833H20.5898V23.9166H29.8839C29.2327 25.8274 28.0495 27.475 26.5233 28.6751L26.5258 28.6734L31.6156 33.1476C31.2555 33.4875 37.0352 29.0416 37.0352 20.4999C37.0352 19.3545 36.9217 18.2364 36.7154 17.1541Z"
            fill="#1976D2"
          />
        </Svg>
        <Text className="text-lg">Continue with Google</Text>
      </View>
    </Button>
  );
}
