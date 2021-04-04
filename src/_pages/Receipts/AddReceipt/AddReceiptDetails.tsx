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
import { alertCircleOutline, calendarNumberSharp } from "ionicons/icons";
import { Photo, Ref } from "../../../_helpers/types";
import momentTZ from "moment-timezone";

interface Props {
  date: string;
  price: number | null;
  photo: Photo | undefined;
  noPhoto: Boolean;
  setDate: (date: string) => void;
  setStep: (step: string) => void;
  setPrice: (price: number) => void;
}

const AddReceiptDetails: React.FC<Props> = (props: Props) => {
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
    !props.price ? setError("price") : props.setStep("ADD_RECEIPT_SELLER");
  };

  const { date, price, photo, noPhoto } = props;

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

        <IonRow className="ion-margin-top">
          <IonCol>
            <IonItem>
              <IonRow style={{ width: "100%" }}>
                <IonCol size="auto" style={{ marginTop: "8px" }}>
                  $
                </IonCol>

                <IonCol>
                  <IonInput
                    ref={priceInput}
                    type="number"
                    value={price}
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
          <IonCol size="auto" className="ion-text-right ">
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
      </IonGrid>

      <br />

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonThumbnail style={{ height: "40vh", width: "100vw" }}>
              {noPhoto ? (
                <>
                  <IonIcon icon={alertCircleOutline} />
                  <small> No Photo</small>
                </>
              ) : (
                photo && <IonImg src={photo.webPath} />
              )}
            </IonThumbnail>
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow className="ion-padding-start ion-padding-top">
        <IonCol size="12">
          <IonButton color="success" expand="block" onClick={validate}>
            Next
          </IonButton>
        </IonCol>
        <IonCol size="12">
          <IonButton
            fill="outline"
            color="success"
            expand="block"
            routerLink="/"
            routerDirection="back"
          >
            Delete
          </IonButton>
        </IonCol>
      </IonRow>
      <br />
    </IonContent>
  );
};

export default AddReceiptDetails;
