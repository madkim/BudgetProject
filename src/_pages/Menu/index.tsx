import React from "react";
import { withRouter } from "react-router";

import {
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonLabel,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonContent,
  IonMenuToggle,
} from "@ionic/react";

import {
  personOutline,
  telescopeOutline,
  bagHandleOutline,
  statsChartOutline,
} from "ionicons/icons";

const Menu: React.FC = () => {
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
            <IonItem button routerLink="/overview" routerDirection="root">
              <IonIcon slot="start" icon={telescopeOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>My Overview</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle>
          {/* <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/sellers" routerDirection="root">
              <IonIcon slot="start" icon={personOutline}></IonIcon>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>User Profile</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle> */}
          {/* <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/sellers" routerDirection="root">
              <IonBadge slot="start" color="danger">
                2
              </IonBadge>
              <h3 style={{ padding: "10px" }}>
                <IonLabel>Notifications</IonLabel>
              </h3>
            </IonItem>
          </IonMenuToggle> */}
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

export default withRouter(Menu);
