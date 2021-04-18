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
  IonList,
  IonListHeader,
  IonBadge,
  IonNote,
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

      <IonContent class="font-weight-light">
        <FadeIn>
          <div className="ion-padding-bottom ion-padding-end">
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-center">
                  <h1>April Budget</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Income</IonLabel>
                      <IonNote color="success">
                        <h2 className="ion-padding-end ">$3500</h2>
                      </IonNote>
                    </IonListHeader>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Monthly</IonLabel>
                      <IonNote color="danger">
                        <h2 className="ion-padding-end ">$28.45</h2>
                      </IonNote>
                    </IonListHeader>
                    <div className="ion-padding-start">
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <h1>HBO</h1>
                            </IonCol>
                            <IonCol className="ion-text-end">
                              <h1>$12.55</h1>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <h1>Netflix</h1>
                            </IonCol>
                            <IonCol className="ion-text-end">
                              <h1>$15.00</h1>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <h1>Spotify</h1>
                            </IonCol>
                            <IonCol className="ion-text-end">
                              <h1>$9.00</h1>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                    </div>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Yearly</IonLabel>
                      <IonNote color="danger">
                        <h2 className="ion-padding-end ">$50.55</h2>
                      </IonNote>
                    </IonListHeader>
                    <div className="ion-padding-start">
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <h1>AAA</h1>
                            </IonCol>
                            <IonCol className="ion-text-end">
                              <h1>$35.55</h1>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <h1>Insurance</h1>
                            </IonCol>
                            <IonCol className="ion-text-end">
                              <h1>$15.00</h1>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                    </div>
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </FadeIn>
      </IonContent>
    </IonPage>
  );
};

export default connect()(Budget);
