import { CameraSource, CameraResultType } from "@capacitor/core";
import { Dispatch, useState } from "react";
import { receiptConstants } from "../_constants/receiptConstants";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { Photo, Action } from "../_helpers/types";
import { fireStorage } from "../_helpers/firebase";
import { useCamera } from "@ionic/react-hooks/camera";

export function useTakePhoto() {
  const [photo, setPhoto] = useState<Photo>();
  const { getPhoto } = useCamera();

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100,
    });
    setPhoto(cameraPhoto);
    return cameraPhoto;
  };

  return {
    photo,
    takePhoto,
  };
}

export const uploadPhoto = async (
  photo: Photo,
  fileName: string,
  dispatch: Dispatch<Action>
): Promise<Photo> => {
  dispatch({ type: receiptConstants.UPLOAD_RECEIPT_PHOTO, payload: "" });
  const base64Data = await base64FromPath(photo.webPath!);

  let upload = fireStorage
    .child("receipts/" + fileName)
    .putString(base64Data, "data_url");

  upload.on(
    "state_changed",
    (snapshot) => {
      let progress = snapshot.bytesTransferred / snapshot.totalBytes;
      dispatch({
        type: receiptConstants.UPLOAD_RECEIPT_PHOTO_PROGRESS,
        payload: progress,
      });
    },
    (error) => {
      dispatch({
        type: receiptConstants.UPLOAD_RECEIPT_PHOTO_FAILURE,
        payload: "",
      });
    },
    () => {
      dispatch({
        type: receiptConstants.UPLOAD_RECEIPT_PHOTO_SUCCESS,
        payload: "",
      });
      console.log("photo uploaded :)");
    }
  );

  return photo;
};
