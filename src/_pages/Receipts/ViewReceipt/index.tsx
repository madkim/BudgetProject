import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonGrid,
  IonText,
  IonIcon,
  IonPage,
  IonInput,
  IonLabel,
  IonButton,
  IonContent,
  IonDatetime,
  IonThumbnail,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { alertCircleOutline } from "ionicons/icons";
import { Photo, Ref } from "../../../_helpers/types";
import momentTZ from "moment-timezone";

interface Props {
  date: string;
  price: number | null;
  photo: Photo | undefined;
  noPhoto: Boolean;
}

const ViewReceipt: React.FC<Props> = (props: Props) => {
  const { date, price, photo, noPhoto } = props;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            View Receipt
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Date:</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Total spent:</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Seller:</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <br />

        <IonRow>
          <IonCol>
            <IonItem lines="none">
              <IonThumbnail style={{ height: "40vh", width: "100vw" }}>
                <>
                  <IonIcon icon={alertCircleOutline} />
                  <small> No Photo</small>
                </>
              </IonThumbnail>
              {/* <IonThumbnail style={{ height: "40vh", width: "100vw" }}>
              {noPhoto ? (
                <>
                  <IonIcon icon={alertCircleOutline} />
                  <small> No Photo</small>
                </>
              ) : (
                photo && <IonImg src={photo.webPath} />
              )}
            </IonThumbnail> */}
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              routerLink="/"
              routerDirection="back"
            >
              Back
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonContent>
    </IonPage>
  );
};

export default ViewReceipt;
