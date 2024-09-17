import { useAuth } from "@/hooks/useAuth";
import GradientButton from "../GradientButton";
import PayWithFlutterwave from "flutterwave-react-native";
import React from "react";
import { FlutterwaveInitOptions } from "flutterwave-react-native/dist/FlutterwaveInit";
import { RedirectParams } from "flutterwave-react-native/dist/PayWithFlutterwave";
import { Alert } from "react-native";
import { createTransaction, updateUser } from "@/lib/appwrite";
import { useNavigation } from "@react-navigation/native";
type Props = {
  price: number;
  plan: Omit<Plans, "Free">;
  onPress?: () => void;
  disabled?: boolean;
  toggleLoader: () => void;
};
const generate_tx_ref = () => {
  return Math.random().toString(36).substring(7);
};
export function FlutterwaveBtn({
  price,
  plan,
  toggleLoader,
  onPress,
  disabled,
}: Props) {
  const router = useNavigation();
  const {
    auth: { user },
    updateUserInfo,
  } = useAuth();
  const options: Omit<FlutterwaveInitOptions, "redirect_url"> =
    React.useMemo(() => {
      return {
        currency: "USD",
        amount: price,
        authorization: process.env.EXPO_PUBLIC_FLUTTER_WAVE_PUBLIC_KEY ?? "",
        customer: {
          name: user?.username ?? "",
          email: user?.email ?? "",
        },
        payment_options: "card, ussd",
        tx_ref: generate_tx_ref(),
      };
    }, []);
  const handleRedirect = async (data: RedirectParams) => {
    onPress && onPress();
    try {
      if (!user) return;
      toggleLoader();
      if (data.status === "successful") {
        // show a loader to cover the screen
        let values = {
          creditBalance: user?.creditBalance ?? 0,
          downloadsLeft: user?.downloadsLeft ?? 0,
        };
        if (plan === "Premium") {
          values.creditBalance += 1000;
          values.downloadsLeft += 5000;
        } else {
          values.creditBalance += 100;
          values.downloadsLeft += 50;
        }
        // update my db with the new plan
        await updateUser(user?.$id ?? "", values);
        // update the client
        updateUserInfo({
          ...user,
          ...values,
        });
        // create a transaction record
        await createTransaction({
          amount: price,
          buyer: user.$id,
          plan,
          created_at: new Date(),
          credits: plan === "Premium" ? 1000 : 100,
          downloads: plan === "Premium" ? 5000 : 50,
          flwId: data.transaction_id ?? "no id",
          tx_ref: data.tx_ref,
        });
        // redirect to success screen
        router.navigate("Root", {
          screen: "Settings",
          params: {
            screen: "PaymentSuccess",
            params: {
              amount: price,
              plan,
              tx_ref: data.tx_ref,
            },
          },
        });
      } else {
        Alert.alert("Payment Failed", "Your payment was not successful");
      }
    } catch (err) {
      console.log("handleRedirect error: ", err);
      Alert.alert("Error", "An error occurred. Please try again");
    } finally {
      toggleLoader();
    }
  };
  return (
    <PayWithFlutterwave
      onRedirect={handleRedirect}
      options={options}
      customButton={(props) => (
        <GradientButton
          {...props}
          disabled={props.disabled || disabled}
          onPress={() => {
            props.onPress();
            onPress && onPress();
          }}
        >
         {disabled ? "Loading Flutterwave..." : "Buy"}
        </GradientButton>
      )}
    />
  );
}
