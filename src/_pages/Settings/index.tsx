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
} from "@ionic/react";

import { bagHandleOutline } from "ionicons/icons";

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
            <IonLabel>Settings</IonLabel>
          </h1>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink="/manage/sellers" routerDirection="root">
              <IonIcon slot="start" icon={bagHandleOutline}></IonIcon>
              <h5>
                <IonLabel>Manage Sellers</IonLabel>
              </h5>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
