import {
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonGrid,
  IonIcon,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
} from "@ionic/react";
import "./SelectTags.css";

import React, { useState, useRef } from "react";

import { Tags, Ref } from "../../helpers/types";
import { addOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { receiptsActions } from "../../actions/receiptsActions";

type Props = {
  selectTag: (tag: string) => void;
  setTagOptions: (value: Tags) => void;
  tagOptions: Tags;
};

const SelectTags: React.FC<Props> = (props: Props) => {
  const alpha: any = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    E: useRef(null),
    F: useRef(null),
    G: useRef(null),
    H: useRef(null),
    I: useRef(null),
    J: useRef(null),
    K: useRef(null),
    L: useRef(null),
    M: useRef(null),
    N: useRef(null),
    O: useRef(null),
    P: useRef(null),
    Q: useRef(null),
    R: useRef(null),
    S: useRef(null),
    T: useRef(null),
    U: useRef(null),
    V: useRef(null),
    W: useRef(null),
    X: useRef(null),
    Y: useRef(null),
    Z: useRef(null),
  };

  const dispatch = useDispatch();
  const { tagOptions } = props;

  const [newTag, setNewTag] = useState("");
  const [addTagFocus, setAddTagFocus] = useState(false);

  const addNewTag = () => {
    if (newTag) {
      dispatch(receiptsActions.addNewTag(newTag, tagOptions));
      blurIonInput(addNewTagInput);
      setNewTag("");
    }
  };

  const handlePan = (e: any) => {
    const X = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    const Y = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    const realTarget = document.elementFromPoint(X, Y);
    if (realTarget !== null) {
      const letter = realTarget.innerHTML;
      if (alpha[letter] !== undefined && alpha[letter].current !== null) {
        alpha[letter].current.scrollIntoView();
      }
    }
  };

  const blurIonInput = (input: Ref) => {
    input.current?.getInputElement().then((element) => {
      element.blur();
    });
    setAddTagFocus(false);
  };

  const alphaList = document.getElementById("alphaList");
  const listHeight = alphaList ? alphaList.offsetHeight : "";
  const minListHeight = window.screen.height / 4;
  const addNewTagInput: Ref = useRef(null);

  return (
    <div className="wrapper">
      <IonItem>
        <IonGrid className="ion-margin-end">
          <IonRow>
            <IonCol size="3">
              <IonLabel position="fixed">Tags:</IonLabel>
            </IonCol>
            <IonCol className="ion-no-padding">
              <IonInput
                ref={addNewTagInput}
                type="text"
                value={newTag}
                placeholder="Add New Tag"
                // onIonBlur={() => setAddTagFocus(false)}
                onIonFocus={() => setAddTagFocus(true)}
                onIonChange={(e) => setNewTag(e.detail.value!)}
                onKeyPress={(e) =>
                  e.key === "Enter" ? blurIonInput(addNewTagInput) : ""
                }
              ></IonInput>
            </IonCol>
            {addTagFocus && (
              <IonCol size="auto" className="ion-no-padding">
                <IonButton color="success" onClick={addNewTag}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonItem>
      <div className="container js-abc ion-padding-start">
        <div style={{ touchAction: "none" }}>
          <ul
            id="alphaList"
            onTouchMove={handlePan}
            className="abc js-abc-nav"
            style={{ minHeight: minListHeight }}
          >
            {Object.keys(alpha).map((letter) => {
              if (Object.keys(tagOptions).includes(letter)) {
                return (
                  <small key={letter}>
                    <li>{letter}</li>
                  </small>
                );
              }
            })}
          </ul>
        </div>

        <IonList
          style={{
            maxHeight: listHeight,
            minHeight: minListHeight,
            overflowY: "scroll",
          }}
        >
          {Object.keys(tagOptions).length > 0 &&
            Object.keys(tagOptions).map((letter, i) => {
              return (
                <div key={i} className="ion-padding-start">
                  <div className="text" ref={alpha[letter]}>
                    {letter}
                  </div>
                  {tagOptions[letter].map(({ val, isChecked }, i) => {
                    return (
                      <IonItem lines="none" key={i}>
                        <IonLabel className="ion-text-capitalize">
                          {val}
                        </IonLabel>
                        <IonCheckbox
                          slot="start"
                          value={val}
                          checked={isChecked}
                          onIonChange={(e) => props.selectTag(e.detail.value!)}
                        />
                      </IonItem>
                    );
                  })}
                </div>
              );
            })}
        </IonList>
      </div>
    </div>
  );
};

export default SelectTags;
