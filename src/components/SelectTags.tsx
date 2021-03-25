import {
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonSearchbar,
} from "@ionic/react";

import React from "react";
import { useState } from "react";

type Tag = {
  val: string;
  isChecked: boolean;
};

type Props = {
  tagOptions: Tag[];
  addTags: (tagOptions: Tag[]) => void;
  setTagOptions: (value: Tag[]) => void;
};

const SelectTags: React.FC<Props> = (props: Props) => {
  const { tagOptions, setTagOptions } = props;
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
    <>
      <IonSearchbar
        value={search}
        className="ion-margin-start"
        placeholder="Search Tags"
        onIonChange={(e) => setSearch(e.detail.value!)}
      ></IonSearchbar>

      <IonList className="ion-padding-start">
        {filterTags().map(({ val, isChecked }, i) => (
          <IonItem key={i}>
            <IonLabel>{val}</IonLabel>
            <IonCheckbox
              slot="start"
              value={val}
              checked={isChecked}
              onIonChange={(e) => selectTag(e.detail.value!)}
            />
          </IonItem>
        ))}
      </IonList>

      <br />
    </>
  );
};

export default SelectTags;
