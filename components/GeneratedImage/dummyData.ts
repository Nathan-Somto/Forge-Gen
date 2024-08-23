import image1 from "@/assets/images/dummy/image1.png";
import image2 from "@/assets/images/dummy/image2.png";
import image3 from "@/assets/images/dummy/image3.png";
export const dummyData = [
    {
      imageUrl: image1,
      prompt: "A serene landscape with mountains and a river.",
      isOwner: true,
      userIds: ["user123", "user456"],
      id: "1a2b3",
      ownerId: "owner789",
      imageStyle: "realistic",
    },
    {
      imageUrl: image2,
      prompt: "A bustling city street at night with neon lights.",
      isOwner: false,
      userIds: ["user234", "user567"],
      id: "2b3c4d",
      ownerId: "owner890",
      imageStyle: "vibrant",
    }, 
    {
      imageUrl: "https://picsum.photos/200",
      prompt: "An abstract painting with geometric shapes.",
      isOwner: true,
      userIds: ["user345", "user678"],
      id: "3c4d5e",
      ownerId: "owner901",
      imageStyle: "abstract",
    },
    {
      imageUrl: image3,
      prompt: "A portrait of a woman in traditional attire.",
      isOwner: false,
      userIds: ["user456", "user789"],
      id: "4d5e6f",
      ownerId: "owner012",
      imageStyle: "classic",
    },  
    {
      imageUrl: "https://picsum.photos/200",
      prompt: "An abstract painting with geometric shapes.",
      isOwner: true,
      userIds: ["user345", "user678"],
      id: "3c4d5f",
      ownerId: "owner901",
      imageStyle: "abstract",
    },
    {
      imageUrl: image3,
      prompt: "A portrait of a woman in traditional attire.",
      isOwner: false,
      userIds: ["user456", "user789"],
      id: "4d5e6g",
      ownerId: "owner012",
      imageStyle: "classic",
    },
    {
      imageUrl: image2,
      prompt: "A futuristic cityscape with flying cars.",
      isOwner: true,
      userIds: ["user567", "user890"],
      id: "5e6f7g",
      ownerId: "owner123",
      imageStyle: "sci-fi",
    }
];
