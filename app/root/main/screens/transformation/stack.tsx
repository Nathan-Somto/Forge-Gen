import { createStackNavigator } from "@react-navigation/stack";
import TransformationHomeScreen from "./screens";
import TransformationScreen from "./screens/[id]";
import NewTransformationScreen from "./screens/new/[type]";
export type TransformationStackParamList = {
  TransformationHome: undefined;
  TransformationDetail: { id: string };
  NewTransformation: { type: TransformationTypeKey };
};
const Stack = createStackNavigator<TransformationStackParamList>();
export default function TransformationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TransformationHome"
        component={TransformationHomeScreen}
      />
      <Stack.Screen name="TransformationDetail" component={TransformationScreen} />
      <Stack.Screen
        name="NewTransformation"
        component={NewTransformationScreen}
      />
    </Stack.Navigator>
  );
}
