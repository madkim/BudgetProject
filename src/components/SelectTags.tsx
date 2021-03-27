import {
  IonRow,
  IonCol,
  IonGrid,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonSearchbar,
  IonItemGroup,
} from "@ionic/react";

import React from "react";
import { Tag } from "../helpers/types";
import { useState } from "react";
import { addOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { receiptsActions } from "../actions/receiptsActions";

type Props = {
  selectTag: (tag: string) => void;
  setTagOptions: (value: Tag[]) => void;
  tagOptions: Tag[];
};

const SelectTags: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [newTag, setNewTag] = useState("");

  const { tagOptions, setTagOptions } = props;

  const addTag = () => {
    if (newTag) {
      dispatch(receiptsActions.addNewTag(newTag, tagOptions));
      setTagOptions([...tagOptions, { val: newTag, isChecked: false }]);
      setNewTag("");
    }
  };

  const filterTags = () => {
    return tagOptions.filter((tag) =>
      tag.val.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <IonItemGroup className="ion-padding-horizontal">
      <IonItem>
        <IonLabel position="fixed">Tags:</IonLabel>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-no-padding">
              <IonInput
                type="text"
                value={newTag}
                placeholder="Add New Tag"
                onIonChange={(e) => setNewTag(e.detail.value!)}
              ></IonInput>
            </IonCol>
            {newTag && (
              <IonCol size="auto" className="ion-no-padding ion-margin-start">
                <IonButton color="success" onClick={addTag}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonItem>

      {/* <IonSearchbar
        value={search}
        className="ion-margin-start"
        placeholder="Search Tags"
        onIonChange={(e) => setSearch(e.detail.value!)}
      ></IonSearchbar> */}

      <IonList className="ion-padding-start">
        {filterTags().map(({ val, isChecked }, i) => (
          <IonItem key={i}>
            <IonLabel>{val}</IonLabel>
            <IonCheckbox
              slot="start"
              value={val}
              checked={isChecked}
              onIonChange={(e) => props.selectTag(e.detail.value!)}
            />
          </IonItem>
        ))}
      </IonList>

      {/* <IonGrid>
        <IonRow>
          <IonCol offset="2" className="ion-no-padding">
            <IonItem>
              <IonInput
                type="text"
                value={newTag}
                placeholder="Add New Tag"
                onIonChange={(e) => setNewTag(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          {newTag && (
            <IonCol size="auto" className="ion-no-padding ion-margin-start">
              <IonButton size="default" color="success" onClick={addTag}>
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonCol>
          )}
        </IonRow>
      </IonGrid> */}

      <br />
    </IonItemGroup>
  );
};

export default SelectTags;
