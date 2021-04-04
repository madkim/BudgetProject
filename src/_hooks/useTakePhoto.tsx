import { CameraSource, CameraResultType } from "@capacitor/core";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { fireStorage } from "../_helpers/firebase";
import { useCamera } from "@ionic/react-hooks/camera";
import { useState } from "react";
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
  const base64Data = await base64FromPath(photo.webPath!);

  fireStorage
    .child("receipts/" + fileName)
    .putString(base64Data, "data_url")
    .then(() => {
      console.log("photo uploaded :)");
    });

  return photo;
};
