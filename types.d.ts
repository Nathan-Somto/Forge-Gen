declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";
declare type TransformationLinks = {
    label: string;
    type:  TransformationTypeKey;
    icon: (props:{SIZE?:number} ) => React.JSX.Element;
}[]
declare type TransformationProps = {
    type: TransformationTypeKey;
    action: "Add" | "Update";
}
declare  type TransformationFormInfo = {
  [i in TransformationTypeKey] : {
    heading: string;
    subText: string;
  }
}
declare type IconProps = {
  color: string;
  size: number;
}
declare type DialogProps = {
  visible: boolean;
  onOpenChange: (val: boolean) => void;
  children: React.ReactNode;
}
declare type PricingValues =  {
  id: string;
  plan: string;
  price: number;
  credits: number;
  perks: {
      text: string;
      isIncluded: boolean;
  }[];
}
declare type IconBtnProps = {
  Icon: (props: IconProps) => React.ReactNode;
  handlePress: () => void;
  LikedIcon?: (props: IconProps) => React.ReactNode;
  isLiked?: boolean;
}
declare type IconBtns =Pick<IconBtnProps , 'Icon' | "LikedIcon"> & {
  type: "delete" | "download" | "like"
}