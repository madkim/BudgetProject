import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonGrid,
  IonInput,
  IonLabel,
  IonButton,
  IonContent,
  IonDatetime,
  IonThumbnail,
  IonText,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { Ref } from "../../_helpers/types";
import ReceiptSwiss from "../../_assets/ReceiptSwiss.jpeg";
import momentTZ from "moment-timezone";

interface Props {
  date: string;
  time: string;
  price: number | null;
  setParentState: (value: object) => void;
}

const AddReceipt: React.FC<Props> = (props: Props) => {
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

    if (!props.price) {
      setError("price");
    } else {
      setParentState({ step: "SELECT_SELLER" });
    }
  };

  const { date, time, price, setParentState } = props;

  return (
    <IonContent className="ion-padding-end ">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Date:</IonLabel>
              <IonDatetime
                value={date}
                onIonChange={(e) => setParentState({ date: e.detail.value! })}
                display-timezone={timezone}
              ></IonDatetime>
            </IonItem>
          </IonCol>

          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Time:</IonLabel>
              <IonDatetime
                value={time}
                displayFormat="h:mm A"
                onIonChange={(e) => setParentState({ time: e.detail.value! })}
                display-timezone={timezone}
              ></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Total Spent:</IonLabel>
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
                      setParentState({ price: e.detail.value });
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
      </IonGrid>

      <br />

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonThumbnail style={{ height: "40vh", width: "100vw" }}>
              <IonImg src={ReceiptSwiss} />
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

export default AddReceipt;
