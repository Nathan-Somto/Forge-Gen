type ChildrenOnly = {
    children: React.ReactNode;
    Component?: undefined;
    data?: undefined;
    keyExtractor?: undefined;
  };
  
  type CustomData<T> = {
    Component: (props: T) => React.JSX.Element;
    data: T[];
    keyExtractor: (value: T) => string;
  };
  
export type RowProps<T> = T extends undefined ? ChildrenOnly : CustomData<T>;