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
  trashBin,
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
            <h4>Manage April Budget</h4>
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
                    <IonItem>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="5">
                            <h2>Income</h2>
                          </IonCol>
                          <IonCol size="5">
                            <IonNote color="success">
                              <h2>$3500.00</h2>
                            </IonNote>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="5">
                            <h2>Expenses</h2>
                          </IonCol>
                          <IonCol size="5" className="ion-padding-start">
                            <IonNote color="danger">
                              <h2>$79.00</h2>
                            </IonNote>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>

                    <div className="ion-padding-start">
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h3>
                                <IonLabel>HBO</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol size="4" className="ion-text-start">
                              <h3>
                                <IonLabel>$12.55</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol
                              size="3"
                              className="ion-text-end ion-no-padding"
                            >
                              <IonButton size="default" color="danger">
                                <IonIcon icon={trashBin} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h3>
                                <IonLabel>Netflix</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol size="4" className="ion-text-start">
                              <h3>
                                <IonLabel>$15.00</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol
                              size="3"
                              className="ion-text-end ion-no-padding"
                            >
                              <IonButton size="default" color="danger">
                                <IonIcon icon={trashBin} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h3>
                                <IonLabel>Spotify</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol size="4" className="ion-text-start">
                              <h3>
                                <IonLabel>$9.00</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol
                              size="3"
                              className="ion-text-end ion-no-padding"
                            >
                              <IonButton size="default" color="danger">
                                <IonIcon icon={trashBin} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h3>
                                <IonLabel>AAA</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol size="4" className="ion-text-start">
                              <h3>
                                <IonLabel>$35.55</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol
                              size="3"
                              className="ion-text-end ion-no-padding"
                            >
                              <IonButton size="default" color="danger">
                                <IonIcon icon={trashBin} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                      <IonItem>
                        <IonGrid>
                          <IonRow>
                            <IonCol size="5">
                              <h3>
                                <IonLabel>Insurance</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol size="4" className="ion-text-start">
                              <h3>
                                <IonLabel>$15.00</IonLabel>
                              </h3>
                            </IonCol>
                            <IonCol
                              size="3"
                              className="ion-text-end ion-no-padding"
                            >
                              <IonButton size="default" color="danger">
                                <IonIcon icon={trashBin} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonItem>
                      <IonItem lines="inset">
                        <IonGrid>
                          <IonRow>
                            <IonCol size="9">
                              <IonInput placeholder="Add New Expense"></IonInput>
                            </IonCol>

                            <IonCol
                              size="3"
                              className="ion-text-end ion-no-padding"
                            >
                              <IonButton size="default" color="success">
                                <IonIcon icon={addOutline} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
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
