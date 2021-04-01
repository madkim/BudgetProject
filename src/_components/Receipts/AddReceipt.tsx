import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonPage,
  IonGrid,
  IonInput,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonDatetime,
  IonThumbnail,
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
  const [priceInputFocus, setPriceInputFocus] = useState(false);

  const blurIonInput = () => {
    priceInput.current?.getInputElement().then((element) => {
      element.blur();
    });
    setPriceInputFocus(false);
  };

  const { date, time, price, setParentState } = props;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            Add Receipt
          </IonTitle>
        </IonToolbar>
      </IonHeader>

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

          <br />

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Total Spent:</IonLabel>
                <IonRow>
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
                  {priceInputFocus && (
                    <IonCol size="2">
                      <IonButton
                        size="small"
                        color="success"
                        onClick={() => blurIonInput()}
                      >
                        Done
                      </IonButton>
                    </IonCol>
                  )}
                </IonRow>
              </IonItem>
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
            <IonButton
              color="success"
              expand="block"
              onClick={() => setParentState({ step: "SELECT_SELLER" })}
            >
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
    </IonPage>
  );
};

export default AddReceipt;
