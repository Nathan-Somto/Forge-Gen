declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";
declare type Plans = "Free" | "Pro" | "Premium";
declare type TransformationLinks = {
  label: string;
  type: TransformationTypeKey;
  icon: (props: { SIZE?: number }) => React.JSX.Element;
}[];
declare type TransformationFormProps = {
  type: TransformationTypeKey;
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
  plan: Plans;
  price: number;
  credits: number;
  perks: {
    text: string;
    isIncluded: boolean;
  }[];
};

declare type BtmSheetBtns = {
  type: "delete" | "download"  | "share";
  Icon: (props: IconProps) => React.ReactNode;
  danger?: boolean;
};
declare type BtmSheetBtnProps = BtmSheetBtns & {
  handlePress: () => void;
  disable:boolean;
} 
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
  downloadsLeft: number;
}

declare interface ITransformation {
  $id: string;
  public_id: string;
  title: string;
  width: number;
  height: number;
  transData: {
    prompt?: string;
    color?: string;
    aspectRatio?: AspectRatios;
  };
  ogImgUrl: string;
  transImgUrl: string;
  transformationType: TransformationTypeKey;
  ownerId: string;
  userIds: string[]; // use this to determine the likes
  // property for determing the users that have downloaded the image
  downloads: number;
  // perform a count on the times 
  usersWhoDownloaded: string[];
}
declare interface ITransformationData  extends Omit<ITransformation, 'transData' | "$id">{
  prompt?: string;
    color?: string;
  aspectRatio?: AspectRatios;
  created_at: string | Date;
}
declare interface ITransaction {
  tx_ref: string;
  buyer: string;
  flwId: string;
  plan: Omit<Plans, "Free">;
  amount: number;
  credits: 1000 | 100;
  downloads: 5000 | 50;
  created_at: string | Date;
}
