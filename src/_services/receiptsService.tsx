import { Action, Receipt, Seller, Photo } from "../_helpers/types";
import { fireStorage } from "../_helpers/firebase";
import { db } from "../_helpers/firebase";

export const receiptsService = {
  getAll,
};

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
        };
      });
      return data;
    });
}
