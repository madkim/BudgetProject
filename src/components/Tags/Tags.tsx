import {
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
// import "./Tags.css";

import React, { useEffect, useState, useRef } from "react";

import { Tag } from "../../helpers/types";
import { addOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { receiptsActions } from "../../actions/receiptsActions";

type Props = {
  selectTag: (tag: string) => void;
  setTagOptions: (value: Tag[]) => void;
  tagOptions: Tag[];
};

export const Tags: React.FC<Props> = (props: Props) => {
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
  const [search, setSearch] = useState("");
  const [newTag, setNewTag] = useState("");
  const { tagOptions, setTagOptions } = props;

  useEffect(() => {
    tagOptions.sort(alphaSort);
  }, []);

  const alphaSort = (a: Tag, b: Tag) => {
    if (a.val < b.val) {
      return -1;
    }
    if (a.val > b.val) {
      return 1;
    }
    return 0;
  };

  const addTag = () => {
    if (newTag) {
      dispatch(receiptsActions.addNewTag(newTag, tagOptions));
      setTagOptions([...tagOptions, { val: newTag, isChecked: false }]);
      setNewTag("");
    }
  };

  const getLetters = () => {
    const letters: Array<string> = [];
    tagOptions.filter((tag) => {
      const letter = tag.val.charAt(0).toUpperCase();
      if (letters.includes(letter) === false) {
        letters.push(letter);
      }
    });
    return letters;
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

  const alphaList = document.getElementById("alphaList");
  const listHeight = alphaList ? alphaList.offsetHeight : "inherit";
  const minListHeight = window.innerHeight / 3;

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
                type="text"
                value={newTag}
                placeholder="Add New Tag"
                onIonChange={(e) => setNewTag(e.detail.value!)}
              ></IonInput>
            </IonCol>
            {newTag && (
              <IonCol size="auto" className="ion-no-padding">
                <IonButton color="success" onClick={addTag}>
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
              if (getLetters().includes(letter)) {
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
          {tagOptions.map(({ val, isChecked }, i) => {
            let letter = val.charAt(0).toUpperCase();
            let prevLetter = tagOptions[i - 1]
              ? tagOptions[i - 1].val.charAt(0).toUpperCase()
              : "";
            return (
              <div key={i} className="ion-padding-start">
                {letter !== prevLetter && (
                  <div className="text" ref={alpha[letter]}>
                    {letter}
                  </div>
                )}
                <IonItem lines="none" key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="start"
                    value={val}
                    checked={isChecked}
                    onIonChange={(e) => props.selectTag(e.detail.value!)}
                  />
                </IonItem>
              </div>
            );
          })}
        </IonList>
      </div>
    </div>
  );
};
