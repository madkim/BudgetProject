import {
  IonTabs,
  IonIcon,
  IonTabBar,
  IonContent,
  IonTabButton,
  IonRouterOutlet,
  IonLabel,
} from "@ionic/react";
import { Redirect } from "react-router-dom";

import { call, person, settings } from "ionicons/icons";

import React from "react";

const TabBar: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path="/" to="/tabs/schedule" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="schedule" href="/tabs/schedule">
          <IonLabel>Schedule</IonLabel>
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonLabel>Speakers</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabBar;
