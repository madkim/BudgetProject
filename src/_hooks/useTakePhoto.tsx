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

  await fireStorage
    .child("receipts/" + fileName)
    .putString(base64Data, "data_url")
    .then(() => {
      dispatch({
        type: receiptConstants.UPLOAD_RECEIPT_PHOTO_SUCCESS,
        payload: "",
      });
      console.log("photo uploaded :)");
    })
    .catch(() => {
      dispatch({
        type: receiptConstants.UPLOAD_RECEIPT_PHOTO_FAILURE,
        payload: "",
      });
    });

  return photo;
};
