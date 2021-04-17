import {
  IonRow,
  IonCol,
  IonPage,
  IonCard,
  IonGrid,
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonToolbar,
  IonLoading,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";

import { settingsOutline, swapHorizontalOutline } from "ionicons/icons";

import React, { useEffect } from "react";
import FadeIn from "react-fade-in";
import moment from "moment";

import { connect } from "react-redux";
import { menuController } from "@ionic/core";

const Budget: React.FC<{}> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start" className="ion-padding">
            <IonButton fill="clear" onClick={() => menuController.open()}>
              <IonIcon icon={settingsOutline} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center">
            <h2>💰 M👀LA&nbsp;</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <FadeIn>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem className="ion-padding-horizontal">
                  <IonLabel position="floating">
                    <h1>Income:</h1>
                  </IonLabel>
                  <IonInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h1>Monthly:</h1>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <h1>Yearly:</h1>
              </IonCol>
            </IonRow>
          </IonGrid>
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default connect()(Budget);
