declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";
declare type TransformationLinks = {
  label: string;
  type: TransformationTypeKey;
  icon: (props: { SIZE?: number }) => React.JSX.Element;
}[];
declare type TransformationFormProps = {
  type: TransformationTypeKey;
  userId: string;
};
declare type TransformationFormInfo = {
  [i in TransformationTypeKey]: {
    heading: string;
    subText: string;
  };
};
declare type IconProps = {
  color: string;
  size: number;
};
declare type DialogProps = {
  visible: boolean;
  onOpenChange: (val: boolean) => void;
  children: React.ReactNode;
};
declare type PricingValues = {
  id: string;
  plan: string;
  price: number;
  credits: number;
  perks: {
    text: string;
    isIncluded: boolean;
  }[];
};
declare type IconBtnProps = {
  Icon: (props: IconProps) => React.ReactNode;
  handlePress: () => void;
  LikedIcon?: (props: IconProps) => React.ReactNode;
  isLiked?: boolean;
};
declare type IconBtns = Pick<IconBtnProps, "Icon" | "LikedIcon"> & {
  type: "delete" | "download" | "like";
};
declare type AspectRatios = "1:1" | "4:3" | "16:9";
declare type TransformationData = {
  title: string;
  prompt: string;
  color: string;
  aspectRatio: AspectRatios;
};
declare type DropdownData<T> = {
  label: string;
  value: T;
}[];

// Database Interfaces
declare interface IUser {
  accountId: string;
  email: string;
  username: string;
  avatarUrl: string;
  creditBalance: number;
  downloads: number;
}
declare interface ITransformations {
  id: string;
  title: string;
  objectToRecolor?: string;
  objectToRemove?: string;
  color?: string;
  aspectRatio?: AspectRatios;
  ogImgUrl: string;
  trnsImgUrl: string;
  transformationType: TransformationTypeKey;
  ownerId: string;
  userIds: string[]; // use this to determine the likes
  downloads: number;
}
declare interface ITransaction {
  id: string;
  buyer: string;
  stripeId: string;
  plan: "free" | "pro" | "premium";
  amount: number;
  credits: number;
  createdAt: string | Date;
}
