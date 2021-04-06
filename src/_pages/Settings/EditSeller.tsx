import {
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";

import React, { useState, useEffect, useRef } from "react";
import { chevronBackOutline } from "ionicons/icons";
import { Ref } from "../../_helpers/types";

const EditSeller: React.FC = () => {
  const [seller, setSeller] = useState("Forever 21");
  const renameInput: Ref = useRef(null);

  useEffect(() => {
    // get seller by id
  }, []);

  const renameSeller = () => {
    // rename the seller name.
    // check that seller doesn't already exist
  };

  const deleteSeller = () => {
    let answer = window.confirm("Are you sure you want to delete this seller?");

    if (answer) {
      console.log("delete");
    }
  };

  const blurIonInput = () => {
    renameInput.current!.getInputElement().then((element) => {
      element.blur();
    });
  };
  const buttonsMarginTop = window.screen.height / 2;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonButton
              slot="start"
              fill="clear"
              routerLink="/manage/sellers"
              routerDirection="root"
            >
              <IonIcon icon={chevronBackOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle size="large" className="ion-text-center">
            Edit Seller
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <br />
                <IonRow style={{ width: "100%" }}>
                  <IonCol className="ion-no-padding">
                    <br />
                    <IonInput
                      ref={renameInput}
                      type="text"
                      value={seller}
                      placeholder="Enter Seller Name"
                      onIonChange={(e) => setSeller(e.detail.value!)}
                      onKeyPress={(e) =>
                        e.key === "Enter" ? blurIonInput() : ""
                      }
                    ></IonInput>
                  </IonCol>
                </IonRow>
              </IonItem>
            </IonCol>
            <IonCol size="auto" className="ion-text-right ion-margin-top">
              <IonCol size="auto">
                <IonButton
                  size="default"
                  color="success"
                  onClick={renameSeller}
                >
                  Rename
                </IonButton>
              </IonCol>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid style={{ marginTop: buttonsMarginTop }}>
          <IonRow className="ion-padding-horizontal">
            <IonCol size="12">
              <IonButton
                fill="outline"
                color="danger"
                expand="block"
                onClick={deleteSeller}
              >
                Delete Seller
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal ion-padding-top">
            <IonCol size="12">
              <IonButton
                fill="solid"
                color="success"
                expand="block"
                routerLink="/manage/sellers"
                routerDirection="root"
              >
                Back
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <br />
      </IonContent>
    </IonPage>
  );
};

export default EditSeller;
