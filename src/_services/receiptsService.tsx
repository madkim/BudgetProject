import { Receipt, Seller, Photo, Action, DynObject } from "../_helpers/types";
import { uploadPhoto } from "../_hooks/useTakePhoto";
import { fireStorage } from "../_helpers/firebase";
import { Dispatch } from "react";
import { db } from "../_helpers/firebase";

export const receiptsService = {
  getByID,
  getAll,
  addNew,
  update,
  remove,
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
        hasPhoto: photoUrl !== "" ? true : false,
      };
    });
}

function getAll() {
  return db
    .collection("receipts")
    .orderBy("date", "desc")
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

      let data: Receipt[] = [];

      receipts.docs.map((receipt, index) => {
        data[index] = {
          id: receipt.id,
          date: receipt.data().date.toDate(),
          photo: photos[index] !== undefined ? photos[index] : "",
          price: receipt.data().price,
          seller: {
            id: sellers[index].id,
            name: sellers[index].data().name,
            favorite: sellers[index].data().favorite,
          },
          hasPhoto: photos[index] !== undefined ? true : false,
        };
      });
      return data;
    });
}

function addNew(
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
      date: new Date(date),
      price: price,
      seller: db.collection("sellers").doc(seller.id),
      // hasPhoto: photo !== undefined ? true : false,
      hasPhoto: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(async (receiptRef) => {
      const newReceipt = {
        id: receiptRef.id,
        date: date,
        photo: "",
        price: price,
        seller: { id: seller.id, name: seller.name, favorite: seller.favorite },
        // hasPhoto: photo !== undefined ? true : false,
        hasPhoto: false,
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
