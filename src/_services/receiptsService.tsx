import moment from "moment";

import { db } from "../_helpers/firebase";
import { Dispatch } from "react";
import { fireStorage } from "../_helpers/firebase";
import { uploadPhoto } from "../_hooks/useTakePhoto";
import { Receipt, Seller, Photo, Action, DynObject } from "../_helpers/types";

export const receiptsService = {
  getByID,
  getAll,
  addNew,
  update,
  remove,
  refund,
  pay
};

function getByID(id: string) {
  return db
    .collection("receipts")
    .doc(id)
    .get()
    .then(async (receipt) => {
      const seller = await receipt.data()!.seller.get();

      const photoUrl = receipt.data()!.hasPhoto
        ? await fireStorage.child("receipts/" + receipt.id).getDownloadURL()
        : "";

      return {
        id: receipt.id,
        date: receipt.data()!.date.toDate(),
        photo: photoUrl,
        price: receipt.data()!.price,
        seller: {
          id: seller.id,
          name: seller.data().name,
          favorite: seller.data().favorite,
        },
        user: receipt.data()?.user ? receipt.data()!.user : 'M',
        hasPhoto: photoUrl !== "" ? true : false,
        wasRefunded: receipt.data()?.wasRefunded
      };
    });
}

function getAll(month: string) {
  const start = moment(month).clone().startOf("month");

  return db
    .collection("receipts")
    .orderBy("date", "desc")
    .where("date", ">=", start.toDate())
    .get()
    .then(async (receipts) => {
      let sellerPromises = await receipts.docs.map(async (receipt) => {
        return await receipt.data().seller.get();
      });

      let photoPromises = await receipts.docs.map(async (receipt) => {
        if (receipt.data().hasPhoto) {
          return await fireStorage
            .child("receipts/" + receipt.id)
            .getDownloadURL();
        }
      });

      const sellers = await Promise.all(sellerPromises);
      const photos = await Promise.all(photoPromises);

      const data = receipts.docs.map((receipt, index) => {
        return {
          id: receipt.id,
          date: receipt.data().date.toDate(),
          photo: photos[index] !== undefined ? photos[index] : "",
          price: receipt.data().price,
          seller: {
            id: sellers[index].id,
            name: sellers[index].data().name,
            favorite: sellers[index].data().favorite,
          },
          user: receipt.data()?.user ? receipt.data()!.user : 'M',
          hasPhoto: photos[index] !== undefined ? true : false,
          wasRefunded: receipt.data()?.wasRefunded,
        };
      });
      return data;
    });
}

function addNew(
  userId: string, 
  currentUser: string,
  date: Date,
  photo: Photo | undefined,
  price: number | null,
  seller: Seller,
  receipts: Receipt[],
  dispatch: Dispatch<Action>
) {
  return db
    .collection("receipts")
    .add({
      user: currentUser,
      userId: userId,
      date: new Date(date),
      price: price,
      seller: db.collection("sellers").doc(seller.id),
      hasPhoto: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      wasRefunded: false,
    })
    .then(async (receiptRef) => {
      const newReceipt = {
        id: receiptRef.id,
        user: currentUser,
        date: date,
        photo: "",
        price: price,
        seller: { id: seller.id, name: seller.name, favorite: seller.favorite },
        hasPhoto: false,
        wasRefunded: false,
      };

      let photoUrl = "";

      if (photo !== undefined) {
        const url = await (await uploadPhoto(photo, receiptRef.id, dispatch))
          .webPath;
        photoUrl = url !== undefined ? url : "";
      }
      newReceipt.photo = photoUrl;

      return [...receipts, newReceipt];
    });
}

async function update(
  id: string,
  fields: DynObject,
  photo: Photo | undefined,
  dispatch: any
) {
  if (photo !== undefined) {
    await uploadPhoto(photo, id, dispatch);
    // fields.hasPhoto = true;
  }
  if ("seller" in fields) {
    const sellerRef = db.collection("sellers").doc(fields.seller.id);
    fields.seller = sellerRef;
  }
  if (Object.keys(fields).length > 0) {
    fields.updatedAt = new Date();
    return db
      .collection("receipts")
      .doc(id)
      .update(fields)
      .then(() => {
        return getByID(id);
      });
  } else {
    return getByID(id);
  }
}

function remove(receipt: Receipt) {
  const hasPhoto = receipt.hasPhoto;

  return db
    .collection("receipts")
    .doc(receipt.id)
    .delete()
    .then(async () => {
      if (hasPhoto) {
        await fireStorage.child("receipts/" + receipt.id).delete();
      }
      return receipt.id;
    });
}

function refund(receipt: Receipt) {
  return db
    .collection("receipts")
    .doc(receipt.id)
    .update({wasRefunded: true})
    .then(() => {
      return receipt.id;
    });
}

function pay(receipt: Receipt) {
  return db
    .collection("receipts")
    .doc(receipt.id)
    .update({wasRefunded: false})
    .then(() => {
      return receipt.id;
    });
}
