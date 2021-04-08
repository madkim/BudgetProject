import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonGrid,
  IonText,
  IonIcon,
  IonInput,
  IonLabel,
  IonButton,
  IonContent,
  IonDatetime,
  IonThumbnail,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { Receipt, Photo, Ref } from "../../../_helpers/types";
import { alertCircleOutline } from "ionicons/icons";
import momentTZ from "moment-timezone";

interface Props {
  date: string;
  photo: Photo | undefined;
  receipt: Receipt;
  setDate: (date: string) => void;
  setStep: (step: string) => void;
  setPrice: (price: number) => void;
}

const EditReceiptDetails: React.FC<Props> = (props: Props) => {
  const timezone = momentTZ.tz.guess();
  const priceInput: Ref = useRef(null);

  const [error, setError] = useState("");
  const [priceInputFocus, setPriceInputFocus] = useState(false);

  const blurIonInput = () => {
    priceInput.current?.getInputElement().then((element) => {
      element.blur();
    });
    setPriceInputFocus(false);
  };

  const validate = () => {
    setError("");
    !props.receipt.price
      ? setError("price")
      : props.setStep("ADD_RECEIPT_SELLER");
  };

  const { date, photo, receipt } = props;

  return (
    <IonContent className="ion-padding-end">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Date:</IonLabel>
              <IonDatetime
                value={date}
                onIonChange={(e) => props.setDate(e.detail.value!)}
                display-timezone={timezone}
              ></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Total spent:</IonLabel>
              <IonRow style={{ width: "100%" }}>
                <IonCol size="auto" style={{ marginTop: "8px" }}>
                  $
                </IonCol>

                <IonCol>
                  <IonInput
                    ref={priceInput}
                    type="number"
                    value={receipt.price}
                    onIonBlur={() => setPriceInputFocus(false)}
                    onIonFocus={() => setPriceInputFocus(true)}
                    placeholder="Enter Total"
                    onKeyPress={(e) =>
                      e.key === "Enter" ? blurIonInput() : ""
                    }
                    onIonChange={(e) => {
                      props.setPrice(+e.detail.value!);
                    }}
                  ></IonInput>
                </IonCol>
              </IonRow>
            </IonItem>
            {error === "price" && (
              <IonText color="danger">
                <span className="ion-margin">Please enter total spent.</span>
              </IonText>
            )}
          </IonCol>
          <IonCol size="auto" className="ion-text-right ion-margin-top">
            {priceInputFocus && (
              <IonButton
                size="default"
                color="success"
                onClick={() => blurIonInput()}
              >
                Done
              </IonButton>
            )}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Seller:</IonLabel>
              <IonLabel position="stacked" className="ion-text-capitalize">
                {receipt.seller && receipt.seller.name}
              </IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>

      <br />

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonThumbnail
              style={{ height: "35vh", width: "100vw" }}
              onClick={() =>
                receipt.hasPhoto ? "veiwReceiptPhoto(receipt.photo)" : ""
              }
            >
              {receipt.hasPhoto ? (
                receipt.photo && <IonImg src={receipt.photo} />
              ) : (
                <>
                  <IonIcon icon={alertCircleOutline} />
                  <small> No Photo</small>
                </>
              )}
            </IonThumbnail>
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow className="ion-padding-start ">
        <IonCol size="12">
          <IonButton
            color="success"
            expand="block"
            // onClick={validate}
            // disabled={props.uploadingPhoto === "uploading"}
          >
            Save
          </IonButton>
        </IonCol>
        <IonCol size="12">
          <IonButton
            fill="outline"
            color="success"
            expand="block"
            routerLink={`/view/${receipt.id}`}
            routerDirection="back"
          >
            Back
          </IonButton>
        </IonCol>
      </IonRow>

      <br />
    </IonContent>
  );
};

export default EditReceiptDetails;
