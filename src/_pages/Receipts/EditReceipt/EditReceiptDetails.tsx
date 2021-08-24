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
  IonLoading,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { alertCircleOutline, cameraReverseOutline } from "ionicons/icons";
import { Seller, Photo, Ref } from "../../../_helpers/types";
import momentTZ from "moment-timezone";
import moment from "moment";

interface Props {
  id: string;
  date: Date;
  price: number | null;
  photo: Photo | undefined;
  seller: Seller | undefined;
  upload: string;
  loading: boolean;
  hasPhoto: boolean;
  receiptPhoto: string;

  setDate: (date: Date) => void;
  setPrice: (price: number) => void;
  showSellers: (value: boolean) => void;
  retakePhoto: () => void;
  updateReceipt: () => void;
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

    if (!props.price) {
      setError("price");
    } else {
      props.updateReceipt();
    }
  };

  return (
    <IonContent className="ion-padding-end">
      <IonLoading
        isOpen={props.loading || props.upload === "uploading"}
        message={"Please wait..."}
      />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Date:</IonLabel>
              <IonDatetime
                value={moment(props.date).format()}
                onIonChange={(e) =>
                  props.setDate(moment(e.detail.value!).toDate())
                }
                display-timezone={timezone}
              ></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonItem
              button
              detail={false}
              onClick={() => props.showSellers(true)}
            >
              <IonLabel position="stacked">Seller:</IonLabel>
              <IonLabel position="stacked" className="ion-text-capitalize">
                {props.seller && props.seller.name}
              </IonLabel>
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
                    value={props.price}
                    inputmode="decimal"
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
      </IonGrid>

      {(props.hasPhoto || props.photo) && (
        <IonRow>
          <IonCol size="12">
            <IonItem lines="none" style={{ float: "right" }}>
              <IonButton
                expand="block"
                size="default"
                onClick={props.retakePhoto}
              >
                <IonIcon icon={cameraReverseOutline} />
                &nbsp; Retake Photo
              </IonButton>
            </IonItem>
          </IonCol>
        </IonRow>
      )}

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonThumbnail
              style={{
                height: props.hasPhoto || props.photo ? "28vh" : "32vh",
                width: "100vw",
              }}
            >
              {props.hasPhoto || props.photo ? (
                <IonImg
                  onClick={props.retakePhoto}
                  src={props.photo ? props.photo.webPath : props.receiptPhoto}
                />
              ) : (
                <>
                  <IonRow>
                    <IonCol>
                      <IonIcon icon={alertCircleOutline} />
                      <small> No Photo</small>
                    </IonCol>
                    <IonCol className="ion-no-padding">
                      <IonButton
                        expand="block"
                        size="default"
                        onClick={props.retakePhoto}
                      >
                        <IonIcon icon={cameraReverseOutline} />
                        &nbsp; Take Photo
                      </IonButton>
                    </IonCol>
                  </IonRow>

                  <br />
                </>
              )}
            </IonThumbnail>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="ion-padding-start ">
        <IonCol size="12">
          <IonButton color="success" expand="block" onClick={validate}>
            Update
          </IonButton>
        </IonCol>
        <IonCol size="12">
          <IonButton
            fill="outline"
            color="success"
            expand="block"
            routerLink={`/view/${props.id}`}
            routerDirection="back"
          >
            Cancel
          </IonButton>
        </IonCol>
      </IonRow>
      <br />
    </IonContent>
  );
};

export default EditReceiptDetails;
