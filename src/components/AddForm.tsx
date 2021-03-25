import {
  IonRow,
  IonCol,
  IonItem,
  IonCard,
  IonPage,
  IonIcon,
  IonGrid,
  IonInput,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonDatetime,
  IonItemGroup,
  IonCardContent,
} from "@ionic/react";

import React, { useState } from "react";
import SelectTags from "./SelectTags";
import moment from "moment";

import { addOutline } from "ionicons/icons";

interface Props {
  showModal: boolean;
  saveItem: (date: string, price: number | null) => void;
}

const AddForm: React.FC<Props> = (props: Props) => {
  const initTagOptions = [
    { val: "Target", isChecked: false },
    { val: "Walmart", isChecked: false },
    { val: "Stater Bros", isChecked: false },
  ];

  const setInitState = () => {
    setPrice(0);
    setDate(moment(new Date()).format());
    setTags([""]);
    setTagOptions(initTagOptions);
  };

  const [date, setDate] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);

  const [tags, setTags] = useState([""]);
  const [newTag, setNewTag] = useState("");
  const [tagOptions, setTagOptions] = useState(initTagOptions);

  const addTags = (tags: Array<{ val: string; isChecked: boolean }>) => {
    const selectedTags = tags.filter((tag) => tag.isChecked === true);
    setTags(selectedTags.map((a) => a.val));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle size="large" className="ion-text-center">
            Add Item
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end ion-padding-top">
        <IonItem>
          <IonLabel position="floating">Date</IonLabel>
          <IonDatetime
            value={date}
            onIonChange={(e) => setDate(e.detail.value!)}
            display-timezone="utc"
          ></IonDatetime>
        </IonItem>

        <br />

        <IonItem>
          <IonLabel position="stacked">Price</IonLabel>
          <IonRow>
            <IonCol size="auto" style={{ marginTop: "7px" }}>
              $
            </IonCol>
            <IonCol>
              <IonInput
                autofocus
                type="number"
                value={price}
                placeholder="Enter Price"
                onIonChange={(e) => setPrice(+e.detail.value!)}
              ></IonInput>
            </IonCol>
          </IonRow>
        </IonItem>

        <IonItemGroup>
          <IonItem>
            <IonLabel position="floating">Tags:</IonLabel>
          </IonItem>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonInput
                    type="text"
                    value={newTag}
                    placeholder="Add New Tag"
                    onIonChange={(e) => setNewTag(e.detail.value!)}
                  ></IonInput>
                </IonCol>

                <IonCol size="auto">
                  {newTag && (
                    <IonButton size="default" color="success">
                      <IonIcon icon={addOutline} />
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonItemGroup>

        <SelectTags
          addTags={(tags) => addTags(tags)}
          tagOptions={tagOptions}
          setTagOptions={setTagOptions}
        />

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              onClick={() => {
                props.saveItem(date, price);
              }}
            >
              Save
            </IonButton>
          </IonCol>
          <IonCol size="12">
            <IonButton
              fill="outline"
              color="success"
              expand="block"
              routerLink="/"
              routerDirection="back"
            >
              Cancel
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default AddForm;
