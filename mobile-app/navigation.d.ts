import { AppStackParamList } from "./app/stack";
declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppStackParamList {}
      }
}