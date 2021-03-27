import {
  IonRow,
  IonCol,
  IonItem,
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
  IonItemDivider,
} from "@ionic/react";

import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { receiptsActions } from "../actions/receiptsActions";
import { Receipts, Tag } from "../helpers/types";

import SelectTags from "./SelectTags";
import moment from "moment";

interface Props {
  receipts: Receipts;
  tagOptions: Tag[];
}

const AddForm: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(moment(new Date()).format());
  const [price, setPrice] = useState<number | null>(null);
  const [tags, setTags] = useState([""]);
  const [tagOptions, setTagOptions] = useState(props.tagOptions);

  const addTags = (tags: Array<{ val: string; isChecked: boolean }>) => {
    const selectedTags = tags.filter((tag) => tag.isChecked === true);
    setTags(selectedTags.map((a) => a.val));
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
    addTags(updatedTags);
    setTagOptions(updatedTags);
  };

  const addReceipt = () => {
    dispatch(receiptsActions.addNewReceipt(date, price, tags, props.receipts));
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
        <IonGrid>
          <IonRow>
            <IonCol style={{ marginTop: "5px" }}>
              <IonItem>
                <IonLabel position="stacked">Date</IonLabel>
                <IonDatetime
                  value={date}
                  onIonChange={(e) => setDate(e.detail.value!)}
                  display-timezone="utc"
                ></IonDatetime>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Price</IonLabel>
                <IonRow>
                  <IonCol size="auto" style={{ marginTop: "8px" }}>
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
            </IonCol>
          </IonRow>
        </IonGrid>

        <br />

        <SelectTags
          selectTag={(tag) => selectTag(tag)}
          setTagOptions={setTagOptions}
          tagOptions={tagOptions}
        />

        <br />

        <IonRow className="ion-padding-start ion-padding-top">
          <IonCol size="12">
            <IonButton
              color="success"
              expand="block"
              onClick={addReceipt}
              routerLink="/"
              routerDirection="back"
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
              Delete
            </IonButton>
          </IonCol>
        </IonRow>
        <br />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: {
  receiptsReducer: { receipts: Receipts; tagOptions: Tag[] };
}) => {
  return {
    receipts: state.receiptsReducer.receipts,
    tagOptions: state.receiptsReducer.tagOptions,
  };
};

export default connect(mapStateToProps)(AddForm);
