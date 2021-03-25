import {
  IonRow,
  IonCol,
  IonIcon,
  IonPage,
  IonCard,
  IonList,
  IonItem,
  IonTitle,
  IonLabel,
  IonModal,
  IonInput,
  IonHeader,
  IonButton,
  IonToolbar,
  IonCheckbox,
  IonSearchbar,
  IonCardContent,
} from "@ionic/react";

import React from "react";
import { useState } from "react";
import { addOutline } from "ionicons/icons";

type Tag = {
  val: string;
  isChecked: boolean;
};

type Props = {
  show: boolean;
  tagOptions: Tag[];

  hide: () => void;
  addTags: (tagOptions: Tag[]) => void;
  setTagOptions: (value: Tag[]) => void;
};

const SelectTags: React.FC<Props> = (props: Props) => {
  const { show, hide, tagOptions, setTagOptions } = props;
  const [search, setSearch] = useState("");
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag) {
      setTagOptions([...tagOptions, { val: newTag, isChecked: false }]);
      setNewTag("");
    }
  };

  const filterTags = () => {
    return tagOptions.filter((tag) =>
      tag.val.toLowerCase().includes(search.toLowerCase())
    );
  };

  const selectTag = (value: string) => {
    const updatedTags = [];
    for (let tag of tagOptions) {
      if (tag.val.toLowerCase() === value.toLowerCase()) {
        updatedTags.push({ val: value, isChecked: !tag.isChecked });
      } else {
        updatedTags.push(tag);
      }
    }
    setTagOptions(updatedTags);
  };

  return (
    <IonModal isOpen={show}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large" className="ion-text-center">
              Tags
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardContent>
            <IonSearchbar
              animated
              value={search}
              placeholder="Search Tags"
              onIonChange={(e) => setSearch(e.detail.value!)}
            ></IonSearchbar>
            <IonList>
              {filterTags().map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="end"
                    value={val}
                    checked={isChecked}
                    onIonChange={(e) => selectTag(e.detail.value!)}
                  />
                </IonItem>
              ))}
            </IonList>
            <br />

            <IonItem>
              <IonInput
                value={newTag}
                placeholder="Tag Name"
                onIonChange={(e) => setNewTag(e.detail.value!)}
              ></IonInput>
              <IonButton onClick={addTag} size="default" fill="outline">
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol size="6">
            <IonButton fill="outline" expand="block" onClick={hide}>
              Close
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton
              expand="block"
              onClick={() => {
                props.addTags(tagOptions);
                hide();
              }}
            >
              Add
            </IonButton>
          </IonCol>
        </IonRow>
      </IonPage>
    </IonModal>
  );
};

export default SelectTags;
