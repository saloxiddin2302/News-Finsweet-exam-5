import {IMG_URL} from "../const";

export const getImage = (photo) => {
  return IMG_URL + photo._id + "." + photo.name.split(".")[1];
};
