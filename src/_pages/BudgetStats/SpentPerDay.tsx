import {
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonLabel,
  IonContent,
  IonBadge,
} from "@ionic/react";

import React, { useEffect } from "react";
import moment from "moment";

import { budgetActions } from "../../_actions/budgetActions";
import { useDispatch, connect } from "react-redux";
import { Days } from "../../_helpers/types";

interface Props {
  days: Days;
  loading: boolean;
}

const SpentPerDay: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(budgetActions.getDaysSpent());
  }, []);

  const getBadgeColor = (price: number | null) => {
    if (price !== null) {
      if (price < 30) {
        return "success";
      }
      if (price > 30 && price < 80) {
        return "warning";
      }
      if (price > 80) {
        return "danger";
      }
    }
  };

  const { days } = props;

  return (
    <>
      <IonContent className="">
        <IonList className="ion-padding-end">
          {Object.keys(days).length > 0 &&
            Object.keys(days).map((day) => {
              return (
                <IonRow key={day}>
                  <IonCol>
                    <IonItem button>
                      <IonLabel className="ion-text-capitalize">
                        {moment(day).format("dddd, Do")}
                      </IonLabel>
                      <IonLabel className="ion-text-center">
                        <IonBadge color={getBadgeColor(days[day])}>
                          ${days[day].toFixed(2)}
                        </IonBadge>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              );
            })}
        </IonList>
      </IonContent>
    </>
  );
};

const mapStateToProps = (state: {
  budgetReducer: {
    loading: boolean;
    days: Days;
  };
}) => {
  console.log(state.budgetReducer);
  return {
    loading: state.budgetReducer.loading,
    days: state.budgetReducer.days,
  };
};

export default connect(mapStateToProps)(SpentPerDay);
