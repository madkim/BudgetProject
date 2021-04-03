import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  Capacitor,
  FilesystemDirectory,
} from "@capacitor/core";

import firebase from "firebase/app";

import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useState, useEffect } from "react";
import { useStorage } from "@ionic/react-hooks/storage";
import { isPlatform } from "@ionic/react";
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
    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await uploadPicture(cameraPhoto, fileName);
    const newPhoto = savedFileImage;
    setPhoto(newPhoto);
  };

  return {
    photo,
    takePhoto,
  };
}

const uploadPicture = async (
  photo: CameraPhoto,
  fileName: string
): Promise<Photo> => {
  let firebaseStore = firebase.storage().ref();

  const base64Data = await base64FromPath(photo.webPath!);

  firebaseStore
    .child(fileName)
    .putString(base64Data, "data_url")
    .then(() => {
      console.log("photo uploaded :)");
    });

  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
};
