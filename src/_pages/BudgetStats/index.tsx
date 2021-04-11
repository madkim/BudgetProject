import {
  IonPage,
  IonCard,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonLoading,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import React from "react";
import FadeIn from "react-fade-in";

import { connect } from "react-redux";
import { Receipt } from "../../_helpers/types";

interface Props {
  receipts: Receipt[];
  loading: boolean;
  request: string;
  upload: string;
}

const BudgetStats: React.FC<Props> = (props: Props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success" className="ion-padding">
          <IonTitle className="ion-text-center">
            <h2>Budget Stats&nbsp;</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={props.loading} message={"Please wait..."} />

        <FadeIn>
          <IonCard>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Allowance</IonCardSubtitle>
                  <IonCardTitle>$95.50</IonCardTitle>
                </IonCardHeader>
              </IonCol>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Saved</IonCardSubtitle>
                  <IonCardTitle>$1,044</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Days Left</IonCardSubtitle>
                  <IonCardTitle>20</IonCardTitle>
                </IonCardHeader>
              </IonCol>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Spent</IonCardSubtitle>
                  <IonCardTitle>$333</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonCard>
        </FadeIn>
        {/* <FadeIn>
          <IonCard>
            <IonRow>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Monthly Allowance</IonCardSubtitle>
                  <IonCardTitle>$95.50</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard>
            <IonRow>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Saved This Month</IonCardSubtitle>
                  <IonCardTitle>$1,044</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard>
            <IonRow>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Spent This Month</IonCardSubtitle>
                  <IonCardTitle>$333</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard>
            <IonRow>
              <IonCol>
                <IonCardHeader>
                  <IonCardSubtitle>Days Left This Month</IonCardSubtitle>
                  <IonCardTitle>20</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonCard>
        </FadeIn> */}
      </IonContent>
    </IonPage>
  );
};

export default connect()(BudgetStats);
