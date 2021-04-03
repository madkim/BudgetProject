import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  Capacitor,
  FilesystemDirectory,
} from "@capacitor/core";

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
    const newPhoto = {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
    };

    setPhoto(newPhoto);
  };

  return {
    photo,
    takePhoto,
  };
}
