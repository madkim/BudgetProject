import { Receipt, Seller, Photo } from "../_helpers/types";
import { uploadPhoto } from "../_hooks/useTakePhoto";
import { fireStorage } from "../_helpers/firebase";
import { db } from "../_helpers/firebase";

export const receiptsService = {
  getByID,
  getAll,
  addNew,
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
        seller: { id: seller.data().id, name: seller.data().name },
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
          seller: { id: sellers[index].id, name: sellers[index].data().name },
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
  receipts: Receipt[]
) {
  return db
    .collection("receipts")
    .add({
      date: new Date(date),
      price: price,
      seller: db.collection("sellers").doc(seller.id),
      hasPhoto: photo !== undefined ? true : false,
    })
    .then(async (receiptRef) => {
      const newReceipt = {
        id: receiptRef.id,
        date: date,
        photo: "",
        price: price,
        seller: { id: seller.id, name: seller.name },
        hasPhoto: photo !== undefined ? true : false,
      };

      let photoUrl = "";

      if (photo !== undefined) {
        const url = await (await uploadPhoto(photo, receiptRef.id)).webPath;
        photoUrl = url !== undefined ? url : "";
      }
      newReceipt.photo = photoUrl;

      return [...receipts, newReceipt];
    });
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
