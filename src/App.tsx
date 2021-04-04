import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

import { receiptOutline, statsChartOutline } from "ionicons/icons";

import Receipts from "./_pages/Receipts";
import AddReceipt from "./_pages/Receipts/AddReceipt";
import ViewReceipt from "./_pages/Receipts/ViewReceipt";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/add" component={AddReceipt} />
          <Route path="/view/:id" component={ViewReceipt} />
          <Route path="/receipts" component={Receipts} />
          <Route exact path="/">
            <Redirect to="/receipts" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="receipts" href="/receipts">
            <IonIcon icon={receiptOutline} />
            <IonLabel>Receipts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="stats" href="/stats">
            <IonIcon icon={statsChartOutline} />
            <IonLabel>Budget Stats</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
