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
  IonFabButton,
  IonFab,
  IonActionSheet,
} from "@ionic/react";

import { Accordion, Collapse, Button } from "react-bootstrap";

import {
  add,
  addOutline,
  settingsOutline,
  swapHorizontalOutline,
  trash,
  share,
  caretForwardCircle,
  heart,
  close,
} from "ionicons/icons";

import React, { useEffect, useState } from "react";
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
            <h3>April 2021 Budget</h3>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="font-weight-light">
        <FadeIn>
          <div className="ion-padding-bottom ion-padding-end">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Income</IonLabel>
                      <IonNote color="success">
                        <h2 className="ion-padding-end ">$3500.00</h2>
                      </IonNote>
                    </IonListHeader>

                    {/* <div className="ion-padding-start">
                      <IonItem>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <h1>Work</h1>
                            </IonCol>
                            <IonCol className="ion-text-end">
                              <h1>$3500.00</h1>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                    </div> */}
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Expenses</IonLabel>
                      <IonNote color="danger">
                        <h2 className="ion-padding-end ">-$79.00</h2>
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
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Difference</IonLabel>
                      <IonNote color="dark">
                        <h2 className="ion-padding-end ">$3421.00</h2>
                      </IonNote>
                    </IonListHeader>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="inset">
                      <IonLabel>Savings</IonLabel>
                      <IonNote color="primary">
                        <h2 className="ion-padding-end ">-$1200.00</h2>
                      </IonNote>
                    </IonListHeader>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonListHeader lines="none">
                      <IonLabel>Budget</IonLabel>
                      <IonNote color="dark">
                        <h2 className="ion-padding-end ">$2221.00</h2>
                      </IonNote>
                    </IonListHeader>
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
