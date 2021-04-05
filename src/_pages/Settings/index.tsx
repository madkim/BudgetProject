import {
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

import React from "react";
import { chevronForwardOutline } from "ionicons/icons";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle size="large" className="ion-text-center">
              Settings
            </IonTitle>

            <IonButton
              slot="end"
              fill="clear"
              routerLink="/"
              routerDirection="forward"
            >
              <IonIcon
                icon={chevronForwardOutline}
                style={{ color: "white" }}
              />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonLabel>Pokémon Yellow</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Mega Man X</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>The Legend of Zelda</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pac-Man</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Super Mario World</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
