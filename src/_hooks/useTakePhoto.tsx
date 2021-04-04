import { CameraSource, CameraResultType } from "@capacitor/core";

import firebase from "firebase/app";

import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { useState } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { Photo } from "../_helpers/types";

export function useTakePhoto() {
  const [photo, setPhoto] = useState<Photo>();
  const { getPhoto } = useCamera();

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    setPhoto(cameraPhoto);
  };

  return {
    photo,
    takePhoto,
  };
}

export const uploadPhoto = async (
  photo: Photo,
  fileName: string
): Promise<Photo> => {
  let firebaseStore = firebase.storage().ref();

  const base64Data = await base64FromPath(photo.webPath!);

  firebaseStore
    .child("receipts/" + fileName)
    .putString(base64Data, "data_url")
    .then(() => {
      console.log("photo uploaded :)");
    });

  return photo;
};
