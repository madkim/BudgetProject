import {
  IonFab,
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonFabButton,
  IonButton,
} from "@ionic/react";

import React, { useState } from "react";
import { add, filterOutline, settingsOutline } from "ionicons/icons";

import ListView from "../components/ListView";
import moment from "moment";
import "./Home.css";

interface Item {
  id: string;
  date: string;
  price: number;
  tags: string[];
}

interface Items {
  [key: string]: { id: string; date: string; price: number; tags: string[] }[];
}

const Home: React.FC = () => {
  //  const [items, setItems] = useState<Items>({});

  const [items, setItems] = useState<Items>({
    "2021-02": [
      {
        id: "2021-02_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_3",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_3",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_3",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_3",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-02_3",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
    ],
    "2021-01": [
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_0",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_1",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
      {
        id: "2021-01_2",
        date: "2021-03-25T10:00:00-00:00",
        price: 14,
        tags: ["target"],
      },
    ],
  });

  const saveItem = (date: string, price: number, tags: string[]) => {
    let newItem = { id: "", date: date, price: price, tags: tags };
    const month = moment(newItem.date).format("YYYY-MM");
    let updatedItems = items;

    if (Object.keys(items).includes(month)) {
      newItem.id = `${month}_${updatedItems[month].length + 1}`;
      updatedItems[month].push(newItem);
    } else {
      newItem.id = `${month}_${0}`;
      updatedItems[month] = [newItem];
    }
    setItems(updatedItems);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle size="large" className="ion-text-center">
              💰 M👀LA&nbsp;
            </IonTitle>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={filterOutline} style={{ color: "white" }} />
            </IonButton>
            <IonButton slot="end" fill="clear">
              <IonIcon icon={settingsOutline} style={{ color: "white" }} />
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="success" routerLink="/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <ListView items={items} />
      </IonContent>
    </IonPage>
  );
};
export default Home;
