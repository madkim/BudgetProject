import React from "react";
import { withRouter } from "react-router";

import {
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonContent,
  IonMenuToggle,
  IonBadge,
  IonChip,
} from "@ionic/react";

import {
  personOutline,
  bagHandleOutline,
  statsChartOutline,
  notificationsOutline,
} from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonMenu type="overlay" content-id="main">
      <IonHeader>
        <IonToolbar
          color="success"
          className="ion-padding-horizontal"
          style={{ paddingBottom: ".2em" }}
        >
          <h1>
            <IonLabel>Menu</IonLabel>
          </h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/sellers" routerDirection="root">
              <IonIcon slot="start" icon={personOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>User Profile</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/sellers" routerDirection="root">
              <IonIcon slot="start" icon={notificationsOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>
                  Notifications
                  <IonChip className="ion-margin-start" color="danger" outline>
                    <IonLabel>0</IonLabel>
                  </IonChip>
                </IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/sellers" routerDirection="root">
              <IonIcon slot="start" icon={bagHandleOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>Manage Sellers</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/budget" routerDirection="root">
              <IonIcon slot="start" icon={statsChartOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>Manage Budget</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Settings);
