import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "./Colors";
import Svg, { Path } from "react-native-svg";
import Coins from "@/assets/images/profile/coins.png";
import Transformations from "@/assets/images/profile/transformations.png";
const CONSTANT_SIZE = 50;
const COLOR = Colors.neutral;
export const transformationLinks: TransformationLinks = [
  {
    label: "Background Remove",
    type: "removeBackground",
    icon: ({SIZE = CONSTANT_SIZE}) => (
      <Svg width={SIZE} height={SIZE} viewBox="0 0 20 20" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.5337 5.197C14.567 5.25527 14.6253 5.29689 14.7003 5.29689C16.7003 5.29689 18.3337 6.92841 18.3337 8.92619V13.8707C18.3337 15.8685 16.7003 17.5 14.7003 17.5H5.30033C3.29199 17.5 1.66699 15.8685 1.66699 13.8707V8.92619C1.66699 6.92841 3.29199 5.29689 5.30033 5.29689C5.36699 5.29689 5.43366 5.2636 5.45866 5.197L5.50866 5.09711C5.53739 5.03665 5.56687 4.97455 5.5968 4.9115C5.80999 4.46246 6.04585 3.96567 6.19199 3.6737C6.57533 2.92453 7.22533 2.50832 8.03366 2.5H11.9587C12.767 2.50832 13.4253 2.92453 13.8087 3.6737C13.9399 3.93592 14.1399 4.35833 14.3326 4.76545C14.3724 4.84942 14.4119 4.93274 14.4503 5.01387L14.5337 5.197ZM13.9253 8.39345C13.9253 8.80966 14.2587 9.14262 14.6753 9.14262C15.092 9.14262 15.4337 8.80966 15.4337 8.39345C15.4337 7.97725 15.092 7.63596 14.6753 7.63596C14.2587 7.63596 13.9253 7.97725 13.9253 8.39345ZM8.55866 9.68368C8.95033 9.29245 9.45866 9.08435 10.0003 9.08435C10.542 9.08435 11.0503 9.29245 11.4337 9.67536C11.817 10.0583 12.0253 10.566 12.0253 11.1071C12.017 12.2225 11.117 13.1299 10.0003 13.1299C9.45866 13.1299 8.95033 12.9218 8.56699 12.5388C8.18366 12.1559 7.97533 11.6482 7.97533 11.1071V11.0988C7.96699 10.5744 8.17533 10.0666 8.55866 9.68368ZM12.3087 13.4212C11.717 14.0122 10.9003 14.3785 10.0003 14.3785C9.12533 14.3785 8.30866 14.0372 7.68366 13.4212C7.06699 12.7969 6.72533 11.9811 6.72533 11.1071C6.71699 10.2414 7.05866 9.42564 7.67533 8.80133C8.30033 8.17703 9.12533 7.83574 10.0003 7.83574C10.8753 7.83574 11.7003 8.17703 12.317 8.79301C12.9337 9.41731 13.2753 10.2414 13.2753 11.1071C13.267 12.0144 12.9003 12.8302 12.3087 13.4212Z"
          fill={COLOR}
        />
      </Svg>
    ),
  },
  {
    label: "Object Recolor",
    type: "recolor",
    icon: ({SIZE = CONSTANT_SIZE}) => (
      <Svg width={SIZE} height={SIZE} viewBox="0 0 24 24" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856ZM20.4933 4.89833C21.3244 4.89833 22 5.56203 22 6.37856C22 7.19618 21.3244 7.85989 20.4933 7.85989H13.9178C13.0856 7.85989 12.4101 7.19618 12.4101 6.37856C12.4101 5.56203 13.0856 4.89833 13.9178 4.89833H20.4933ZM3.50777 15.958H10.0833C10.9155 15.958 11.5911 16.6217 11.5911 17.4393C11.5911 18.2558 10.9155 18.9206 10.0833 18.9206H3.50777C2.67555 18.9206 2 18.2558 2 17.4393C2 16.6217 2.67555 15.958 3.50777 15.958ZM18.5611 20.7778C20.4611 20.7778 22 19.2648 22 17.3992C22 15.5325 20.4611 14.0196 18.5611 14.0196C16.6623 14.0196 15.1223 15.5325 15.1223 17.3992C15.1223 19.2648 16.6623 20.7778 18.5611 20.7778Z"
          fill={COLOR}
        />
      </Svg>
    ),
  },
  {
    label: "Object Remove",
    type: "remove",
    icon: ({SIZE = CONSTANT_SIZE}) => (
      <Svg width={SIZE} height={SIZE} viewBox="0 0 20 20" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.02276 2.5C7.37276 2.5 7.65692 2.77865 7.65692 3.12268C7.65692 3.46589 7.37359 3.74455 7.02276 3.74455L5.66526 3.74536C4.53859 3.747 3.62192 4.6467 3.62192 5.75233V7.30167C3.62192 7.64488 3.33692 7.92436 2.98692 7.92436C2.63692 7.92436 2.35276 7.64488 2.35276 7.30167V5.75233C2.35276 3.96109 3.83859 2.50245 5.66442 2.50082L7.02192 2.5H7.02276ZM13.0002 2.50025H14.3277C16.1585 2.50025 17.6468 3.95971 17.6468 5.75502V7.30192C17.6468 7.64513 17.3635 7.9246 17.0127 7.9246C16.6627 7.9246 16.3785 7.64513 16.3785 7.30192V5.75502C16.3785 4.64613 15.4585 3.74397 14.3277 3.74397H13.0002C12.6502 3.74397 12.366 3.46614 12.366 3.12293C12.366 2.7789 12.6502 2.50025 13.0002 2.50025ZM12.3018 5.61888H7.69842C6.64509 5.6295 5.79842 6.47364 5.80759 7.50735V8.54516C5.81009 8.6661 5.90926 8.76497 6.03259 8.76906H13.9659C14.0901 8.76579 14.1893 8.66691 14.1934 8.54516V7.50735C14.1943 7.00807 13.9976 6.52839 13.6426 6.17129C13.2901 5.81745 12.8059 5.61888 12.3018 5.61888ZM1.46801 10.0344H18.5322C18.8822 10.0344 19.1663 10.313 19.1663 10.657C19.1663 11.0003 18.8822 11.2781 18.5322 11.2781H17.6472V14.2444C17.6472 16.0405 16.158 17.5 14.328 17.5H13.0005C12.6497 17.5 12.3655 17.2213 12.3655 16.8773C12.3655 16.5341 12.6497 16.2555 13.0005 16.2555H14.328C15.4588 16.2555 16.3788 15.3541 16.3788 14.2444V11.2781H14.193V12.1042C14.2013 13.138 13.3555 13.9829 12.3013 13.9927H7.69801C6.64467 13.9829 5.79884 13.138 5.80717 12.1042V11.2781H3.62134V14.2477C3.62134 15.3533 4.53884 16.253 5.66634 16.2546L7.02301 16.2555C7.37301 16.2555 7.65717 16.5341 7.65717 16.8773C7.65634 17.2213 7.37301 17.5 7.02217 17.5L5.66467 17.4992C3.83884 17.4975 2.35217 16.0389 2.35217 14.2477V11.2781H1.46801C1.11801 11.2781 0.833008 11.0003 0.833008 10.657C0.833008 10.313 1.11801 10.0344 1.46801 10.0344Z"
          fill={COLOR}
        />
      </Svg>
    ),
  },
  {
    label: "Generative Fill",
    type: "fill",
    icon: ({SIZE = CONSTANT_SIZE}) => (
      <Svg width={SIZE} height={SIZE} viewBox="0 0 20 20" fill="none">
        <Path
          d="M12.793 3.32837C12.6172 3.39478 12.5 3.56274 12.5 3.75024C12.5 3.93774 12.6172 4.10571 12.793 4.17212L15 5.00024L15.8281 7.20728C15.8945 7.38306 16.0625 7.50024 16.25 7.50024C16.4375 7.50024 16.6055 7.38306 16.6719 7.20728L17.5 5.00024L19.707 4.17212C19.8828 4.10571 20 3.93774 20 3.75024C20 3.56274 19.8828 3.39478 19.707 3.32837L17.5 2.50024L16.6719 0.293213C16.6055 0.117432 16.4375 0.000244141 16.25 0.000244141C16.0625 0.000244141 15.8945 0.117432 15.8281 0.293213L15 2.50024L12.793 3.32837ZM8.01172 2.86353C7.91016 2.64087 7.6875 2.50024 7.44531 2.50024C7.20313 2.50024 6.98047 2.64087 6.87891 2.86353L4.81641 7.31665L0.363281 9.37524C0.140625 9.47681 0 9.69946 0 9.94556C0 10.1917 0.140625 10.4104 0.363281 10.512L4.82031 12.5706L6.875 17.0237C6.97656 17.2463 7.19922 17.387 7.44141 17.387C7.68359 17.387 7.90625 17.2463 8.00781 17.0237L10.0664 12.5667L14.5234 10.5081C14.7461 10.4065 14.8867 10.1838 14.8867 9.94165C14.8867 9.69946 14.7461 9.47681 14.5234 9.37524L10.0703 7.32056L8.01172 2.86353ZM15 15.0002L12.793 15.8284C12.6172 15.8948 12.5 16.0627 12.5 16.2502C12.5 16.4377 12.6172 16.6057 12.793 16.6721L15 17.5002L15.8281 19.7073C15.8945 19.8831 16.0625 20.0002 16.25 20.0002C16.4375 20.0002 16.6055 19.8831 16.6719 19.7073L17.5 17.5002L19.707 16.6721C19.8828 16.6057 20 16.4377 20 16.2502C20 16.0627 19.8828 15.8948 19.707 15.8284L17.5 15.0002L16.6719 12.7932C16.6055 12.6174 16.4375 12.5002 16.25 12.5002C16.0625 12.5002 15.8945 12.6174 15.8281 12.7932L15 15.0002Z"
          fill={COLOR}
        />
      </Svg>
    ),
  },
  {
    label: "Image Restore",
    type: "restore",
    icon: ({SIZE = CONSTANT_SIZE}) => (
      <Svg width={SIZE} height={SIZE} viewBox="0 0 20 20" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.38881 18.3334H13.611C16.4362 18.3334 18.3337 16.3517 18.3337 13.4028V6.59735C18.3337 3.64851 16.4362 1.66675 13.6118 1.66675H6.38881C3.56441 1.66675 1.66699 3.64851 1.66699 6.59735V13.4028C1.66699 16.3517 3.56441 18.3334 6.38881 18.3334ZM7.08271 9.16675C5.93384 9.16675 5.00033 8.23197 5.00033 7.08342C5.00033 5.93486 5.93384 5.00008 7.08271 5.00008C8.23074 5.00008 9.16509 5.93486 9.16509 7.08342C9.16509 8.23197 8.23074 9.16675 7.08271 9.16675ZM16.5177 12.445C16.7967 13.1606 16.6517 14.0205 16.3534 14.7292C15.9998 15.572 15.3227 16.2101 14.4696 16.4887C14.0909 16.6126 13.6937 16.6667 13.2973 16.6667H6.2742C5.57532 16.6667 4.95689 16.499 4.44991 16.1869C4.13232 15.9908 4.07617 15.5384 4.31165 15.2452C4.7055 14.755 5.09432 14.2631 5.48649 13.7669C6.23397 12.8174 6.7376 12.5422 7.29737 12.7839C7.52446 12.8836 7.75239 13.0333 7.98703 13.1915C8.61216 13.6164 9.48115 14.2003 10.6258 13.5665C11.4092 13.1277 11.8635 12.3752 12.2591 11.7199L12.2658 11.7089C12.2937 11.663 12.3215 11.6171 12.3491 11.5714L12.3493 11.5711L12.3493 11.5711C12.4823 11.3511 12.6134 11.134 12.7618 10.934C12.9479 10.6838 13.6375 9.90118 14.5308 10.4585C15.0998 10.8093 15.5783 11.2841 16.0903 11.7923C16.2855 11.9867 16.4247 12.2077 16.5177 12.445Z"
          fill={COLOR}
        />
      </Svg>
    ),
  },
];

export  const aspectRatios = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Standard Potrait (16:9)', value: '16:9' },
  { label: 'Phone Potrait (9:16)', value: '19: 16' },
];
export const transformationFormInfo: TransformationFormInfo = {
  fill: {
    heading: "Generative Fill",
    subText: "Enhance an image using generative ai."
  },
  recolor: {
    heading: "Object Recolor",
    subText: "Identify and recolor objects from image."
  },
  restore: {
    heading: "Image Restore",
    subText: "Improve Image by removing imperfections."
  },
  remove: {
    heading: "Object Remove",
    subText: "Identify and remove objects from image."
  },
  removeBackground: {
    heading: "Background Remove",
    subText: "Removes the background of an image using ai.",
  }
}
export const SettingsLinks = [{
  text: "Rate Us",
  Icon: (props: IconProps) => <Feather name="star"  {...props}/>,
  id: 1
},
{
  text: "About Us",
  Icon: (props: IconProps) => <Feather name="info"  {...props}/>,
  id: 2
},
{
  text: "Buy Credits",
  Icon: (props: IconProps) => <Feather name="shopping-bag"  {...props}/>,
  id: 3
},
{
  text: "Log out",
  Icon: (props: IconProps) => <Feather name="log-out"  {...props}/>,
  id: 4
}
];
export const pricingValues: PricingValues[] = [{
  id: "1234",
  plan: "Free",
  price: 0,
  credits: 10,
  perks: [
    {
      text: '10 Free Credits',
      isIncluded: true
    },
    {
      text: '5 Free Downloads',
      isIncluded: true
    },
    {
      text: 'Priority Updates',
      isIncluded: false
    }
  ]
}, {
  id: "5678",
  plan: "Pro",
  price: 19.99,
  credits: 100,
  perks: [
    {
      text: '100 Credits',
      isIncluded: true
    },
    {
      text: '500 Downloads',
      isIncluded: true
    },
    {
      text: 'Priority Updates',
      isIncluded: false
    }
  ]
},
{
  id: "9101",
  plan: "Premium",
  price: 199.99,
  credits: 10,
  perks: [
    {
      text: '10 Credits',
      isIncluded: true
    },
    {
      text: 'Unlimited Downloads',
      isIncluded: true
    },
    {
      text: 'Priority Updates',
      isIncluded: true
    }
  ]
}
]
export const iconBtns: IconBtns[] = [
  {
    type: "delete",
    Icon: (props: IconProps) => <Feather name="trash" {...props} color="#eb344c" />,
  },
  {
    type: "download",
    Icon: (props: IconProps) => <Feather name="download" {...props} />,
  },
  {
    type: "like",
    Icon: (props: IconProps) => <Feather name="heart" {...props} />,
    LikedIcon: (props: IconProps) => <Entypo name="heart" {...props} />,
  },
];
export const profileCards = (balance: number, transformations: number) =>  (
  [
    {
      title: "Credits Available",
      value: balance,
      image: Coins,
      id: "1234"
    },
    {
      title: "Transformations",
      value: transformations,
      image: Transformations,
      id: "5678"
    }
  ]
)