import {
  IonRow,
  IonCol,
  IonItem,
  IonCard,
  IonPage,
  IonInput,
  IonModal,
  IonLabel,
  IonTitle,
  IonBadge,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonDatetime,
  IonCardContent,
} from "@ionic/react";

import React, { useState } from "react";
import SelectTags from "./SelectTags";
import moment from "moment";

interface Props {
  showModal: boolean;
  saveItem: (date: string, price: number, tags: string[]) => void;
  toggleModal: (value: boolean) => void;
}

const AddForm: React.FC<Props> = (props: Props) => {
  const [showSelectTags, setShowSelectTags] = useState(false);

  const initTagOptions = [
    { val: "Target", isChecked: false },
    { val: "Walmart", isChecked: false },
    { val: "Stater Bros", isChecked: false },
  ];

  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(moment(new Date()).format());
  const [tags, setTags] = useState([""]);
  const [tagOptions, setTagOptions] = useState(initTagOptions);

  const setInitState = () => {
    setPrice(0);
    setDate(moment(new Date()).format());
    setTags([""]);
    setTagOptions(initTagOptions);
  };

  const addTags = (tags: Array<{ val: string; isChecked: boolean }>) => {
    const selectedTags = tags.filter((tag) => tag.isChecked === true);
    setTags(selectedTags.map((a) => a.val));
  };

  return (
    <>
      <SelectTags
        show={showSelectTags}
        hide={() => setShowSelectTags(false)}
        addTags={(tags) => addTags(tags)}
        tagOptions={tagOptions}
        setTagOptions={setTagOptions}
      />
      <IonPage>
        <IonContent>
          <IonModal isOpen={props.showModal} onWillPresent={setInitState}>
            <IonHeader>
              <IonToolbar>
                <IonTitle size="large" className="ion-text-center">
                  Add Item
                </IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="floating">Date</IonLabel>
                  <IonDatetime
                    value={date}
                    onIonChange={(e) => setDate(e.detail.value!)}
                    display-timezone="utc"
                  ></IonDatetime>
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Price</IonLabel>
                  <IonInput
                    value={price}
                    type="number"
                    placeholder="Enter Price"
                    onIonChange={(e) => setPrice(+e.detail.value!)}
                  ></IonInput>
                </IonItem>

                <br />

                <div onClick={() => setShowSelectTags(true)}>
                  <IonItem lines="none">
                    <IonLabel>Tags:</IonLabel>
                  </IonItem>
                  <div className="ion-padding-start">
                    {tags.map((tag, index) => {
                      return (
                        <IonRow key={index}>
                          <IonCol>
                            <IonBadge color="primary">{tag}</IonBadge>
                          </IonCol>
                        </IonRow>
                      );
                    })}
                  </div>
                </div>

                <br />
              </IonCardContent>
            </IonCard>

            <IonRow>
              <IonCol size="6">
                <IonButton
                  fill="outline"
                  expand="block"
                  onClick={() => props.toggleModal(false)}
                >
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton
                  expand="block"
                  onClick={() => {
                    props.saveItem(date, price, tags);
                    props.toggleModal(false);
                  }}
                >
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AddForm;
