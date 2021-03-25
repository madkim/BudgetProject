import {
  IonFab,
  IonIcon,
  IonPage,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonFabButton,
} from "@ionic/react";

import React, { useState } from "react";
import AddForm from "../components/AddForm";
import ListView from "../components/ListView";
import moment from "moment";

import { add } from "ionicons/icons";
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
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Items>({});

  // const [items, setItems] = useState<Items>({
  //   "2021-02": [
  //     {
  //       id: "2021-02_0",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-02_1",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-02_2",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-02_3",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //   ],
  //   "2021-01": [
  //     {
  //       id: "2021-01_0",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-01_1",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //     {
  //       id: "2021-01_2",
  //       date: "2021-03-25T10:00:00-00:00",
  //       price: 14,
  //       tags: ["target"],
  //     },
  //   ],
  // });

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

  const toggleModal = (value: boolean) => {
    setShowModal(value);
  };

  return (
    <>
      <AddForm
        saveItem={saveItem}
        showModal={showModal}
        toggleModal={toggleModal}
      />
      <IonPage>
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <IonTitle size="large" className="ion-text-center">
                Month
              </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => setShowModal(true)}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>

          <ListView items={items} />
        </IonContent>
      </IonPage>
    </>
  );
};
export default Home;
