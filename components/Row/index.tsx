import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
type ChildrenOnly = {
  Component?: undefined;
  data?: undefined;
  keyExtractor?: undefined;
};

type CustomData<T> = {
  Component: (props: T) => React.JSX.Element;
  data: T[];
  keyExtractor: (value: T) => string;
};

export type RowProps<T> = (T extends undefined ? ChildrenOnly : CustomData<T>) &
  PropsWithChildren;

export default function Row<T = undefined>({
  children,
  data,
  Component,
  keyExtractor,
}: RowProps<T>) {
  const useCustomData =
    data !== undefined && Component !== undefined && keyExtractor !== undefined;

  return (
    <View className="w-full flex-row">
      {useCustomData
        ? data.map((item) => <Component key={keyExtractor(item)} {...item} />)
        : children}
    </View>
  );
}

const styles = StyleSheet.create({ container: {} });
