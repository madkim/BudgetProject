import {
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonLabel,
  IonContent,
  IonBadge,
  IonGrid,
} from "@ionic/react";

import React, { useEffect } from "react";
import { spendingActions } from "../../_actions/spendingActions";
import { useDispatch, connect } from "react-redux";
import { Days } from "../../_helpers/types";
import moment from "moment";

interface Props {
  days: Days;
  loading: boolean;
}

const SpentPerDay: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(spendingActions.getDaysSpent());
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
      <IonContent>
        <IonList
          slot="fixed"
          style={{ width: "100%", padding: "0em 1em 0 1em" }}
        >
          {Object.keys(days).length > 0 &&
            Object.keys(days).map((day) => {
              return (
                <IonItem
                  button
                  key={day}
                  lines="full"
                  routerLink={`spent/${moment(day).format("YYYY-MM-DD")}`}
                >
                  <IonGrid>
                    <IonRow style={{ width: "100%", padding: "1vh" }}>
                      <IonCol size="8">
                        <IonLabel className="ion-text-capitalize">
                          {moment(day).format("dddd, Do")}
                        </IonLabel>
                      </IonCol>
                      <IonCol size="4">
                        <IonLabel className="ion-text-left">
                          <IonBadge color={getBadgeColor(days[day])}>
                            ${days[day].toFixed(2)}
                          </IonBadge>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </>
  );
};

const mapStateToProps = (state: {
  spendingReducer: {
    loading: boolean;
    days: Days;
  };
}) => {
  return {
    loading: state.spendingReducer.loading,
    days: state.spendingReducer.days,
  };
};

export default connect(mapStateToProps)(SpentPerDay);
