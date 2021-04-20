import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

import { cardOutline, receiptOutline, barChartOutline } from "ionicons/icons";

import Receipts from "./_pages/Receipts";
import AddReceipt from "./_pages/Receipts/AddReceipt";
import EditReceipt from "./_pages/Receipts/EditReceipt";
import ViewReceipt from "./_pages/Receipts/ViewReceipt";

import Settings from "./_pages/Settings";

import Budget from "./_pages/Budget";
import ManageBudget from "./_pages/Budget/ManageBudget";

import EditSeller from "./_pages/Sellers/EditSeller";
import ManageSellers from "./_pages/Sellers/ManageSellers";

import Spending from "./_pages/Spending";
import SpentDetails from "./_pages/Spending/SpentDetails";

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
      <IonSplitPane contentId="main">
        <Settings />

        <IonTabs>
          <IonRouterOutlet id="main">
            <Route path="/add" component={AddReceipt} />
            <Route path="/view/:id" component={ViewReceipt} />
            <Route path="/edit/:id" component={EditReceipt} />
            <Route path="/receipts" component={Receipts} />

            <Route path="/spending" component={Spending} />
            <Route path="/spent/:date/:days" component={SpentDetails} />

            <Route path="/settings" component={Settings} />

            <Route path="/manage/sellers" component={ManageSellers} />
            <Route path="/manage/seller/:id" component={EditSeller} />

            <Route path="/budget" component={Budget} />
            <Route path="/manage/budget" component={ManageBudget} />

            <Route exact path="/">
              <Redirect to="/spending" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="spending" href="/spending">
              <IonIcon icon={cardOutline} />
              <IonLabel>Spending</IonLabel>
            </IonTabButton>

            <IonTabButton tab="budget" href="/budget">
              <IonIcon icon={barChartOutline} />
              <IonLabel>Budget</IonLabel>
            </IonTabButton>

            <IonTabButton tab="receipts" href="/receipts">
              <IonIcon icon={receiptOutline} />
              <IonLabel>Receipts</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
