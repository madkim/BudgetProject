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
import { Receipt, Ref } from "../../_helpers/types";
import { connect } from "react-redux";

import moment from "moment";
import momentTZ from "moment-timezone";
import ReceiptSwiss from "../../_assets/ReceiptSwiss.jpeg";

interface Props {
  receipts: Receipt[];
}

const AddReceipt: React.FC<Props> = (props: Props) => {
  const timezone = momentTZ.tz.guess();
  const priceInput: Ref = useRef(null);

  const [date, setDate] = useState(moment(new Date()).format());
  const [time, setTime] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);
  const [priceInputFocus, setPriceInputFocus] = useState(false);

  const blurIonInput = () => {
    priceInput.current?.getInputElement().then((element) => {
      setPriceInputFocus(false);
      element.blur();
    });
    setPriceInputFocus(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            Add Receipt
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end ion-padding-top">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem lines="none">
                <IonThumbnail style={{ height: "25vh", width: "50vw" }}>
                  <IonImg src={ReceiptSwiss} />
                </IonThumbnail>
              </IonItem>
            </IonCol>
          </IonRow>

          <br />

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Date:</IonLabel>
                <IonDatetime
                  value={date}
                  onIonChange={(e) => setDate(e.detail.value!)}
                  display-timezone={timezone}
                ></IonDatetime>
              </IonItem>
            </IonCol>
          </IonRow>

          <br />

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Time:</IonLabel>
                <IonDatetime
                  value={time}
                  displayFormat="h:mm A"
                  onIonChange={(e) => setTime(e.detail.value!)}
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
                        setPrice(+e.detail.value!);
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

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              routerLink="/sellers"
              routerDirection="forward"
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

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipt[] };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
  };
};

export default connect(mapStateToProps)(AddReceipt);
