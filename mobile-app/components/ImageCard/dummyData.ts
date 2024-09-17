import image1 from "@/assets/images/dummy/image1.png";
import image2 from "@/assets/images/dummy/image2.png";
import image3 from "@/assets/images/dummy/image3.png";
import { ImageCardProps } from ".";
export const dummyData:ImageCardProps[] = [
    {
     id: "1",
      ownerId: "1234",
      title: "Image 1",
      transformationType: "remove",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image1,
      },
      originalImage: image1,   
    },
    {
      id: "2",
      ownerId: "1235",
      title: "Image 2",
      transformationType: "fill",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image2,
      },
      originalImage: image2,   
    },
    {
      id: "3",
      ownerId: "1236",
      title: "Image 3",
      transformationType: "removeBackground",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image3,
      },
      originalImage: image3,   
    },
    {
      id: "4",
      ownerId: "1237",
      title: "Image 4",
      transformationType: "recolor",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image1,
      },
      originalImage: image1,   
    },
    {
      id: "5",
      ownerId: "1238",
      title: "Image 5",
      transformationType: "remove",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image2,
      },
      originalImage: image2,   
    },
    {
      id: "6",
      ownerId: "1239",
      title: "Image 6",
      transformationType: "fill",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image3,
      },
      originalImage: image3,   
    },
    {
      id: "7",
      ownerId: "1230",
      title: "Image 7",
      transformationType: "removeBackground",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image1,
      },
      originalImage: image1,   
    },
    {
      id: "8",
      ownerId: "1231",
      title: "Image 8",
      transformationType: "recolor",
      userIds: ["1234","1235"],
      image: {
        transformationURL: image2,
      },
      originalImage: image2,   
    },
    {
      id: "9",
      ownerId: "1232",
      title: "Image 9",
      transformationType: "remove",
      userIds: ["1234","1235"],
      image: {
        transformationURL:image3

    }, 
    originalImage: image3,
  }
];
