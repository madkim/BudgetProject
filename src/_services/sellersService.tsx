import { alphaSortValue, alphaSortKey } from "../_helpers/alphasort";
import { Sellers, Seller } from "../_helpers/types";
import { db } from "../_helpers/firebase";

export const sellersService = {
  getByID,
  getAll,
  addNew,
  remove,
  rename,
};
function getByID(id: string) {
  return db
    .collection("sellers")
    .doc(id)
    .get()
    .then((seller) => {
      return { id: seller.id, name: seller.data()!.name };
    });
}

function getAll() {
  const data: Sellers = {};
  const numbers: Seller[] = [];
  return db
    .collection("sellers")
    .orderBy("name", "asc")
    .get()
    .then((sellers) => {
      sellers.docs.map((seller) => {
        const name = seller.data().name;
        const letter = name.charAt(0).toUpperCase();
        const curSeller = { id: seller.id, name: name };

        if (isNaN(letter)) {
          if (data[letter]) {
            data[letter].push(curSeller);
            data[letter].sort(alphaSortValue);
          } else {
            data[letter] = [curSeller];
          }
        } else {
          numbers.push(curSeller);
        }
      });
      const unsorted = Object.assign({}, data);
      const sorted = alphaSortKey(unsorted);

      if (numbers.length > 0) {
        sorted["#"] = numbers;
      }
      return sorted;
    });
}

function addNew(newSellerName: any, sellerOptions: Sellers) {
  return db
    .collection("sellers")
    .add({ name: newSellerName.toLowerCase() })
    .then((sellerRef) => {
      let sellers = { ...sellerOptions };
      let letter = newSellerName.charAt(0).toUpperCase();
      const newSeller = { id: sellerRef.id, name: newSellerName };

      if (isNaN(letter)) {
        if (sellers[letter]) {
          sellers[letter].push(newSeller);
          sellers[letter].sort(alphaSortValue);
        } else {
          sellers[letter] = [newSeller];
          sellers = alphaSortKey(sellers);
        }
      } else {
        sellers["#"].push(newSeller);
      }

      return sellers;
    });
}

async function remove(id: string) {
  const sellerRef = db.collection("sellers").doc(id);

  const receiptsWithSeller = await db
    .collection("receipts")
    .where("seller", "==", sellerRef)
    .get();

  if (receiptsWithSeller.docs.length > 0) {
    throw new Error("receiptsWithSeller");
  } else {
    db.collection("sellers").doc(id).delete();
  }
}

function rename(id: string, newName: string) {
  return db.collection("sellers").doc(id).update({ name: newName });
}
