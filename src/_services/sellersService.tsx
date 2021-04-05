import { alphaSortValue, alphaSortKey } from "../_helpers/alphasort";
import { Sellers } from "../_helpers/types";
import { db } from "../_helpers/firebase";

export const sellersService = {
  getAll,
  addNew,
};

function getAll() {
  const data: Sellers = {};
  return db
    .collection("sellers")
    .orderBy("name", "asc")
    .get()
    .then((sellers) => {
      sellers.docs.map((seller) => {
        const name = seller.data().name;
        const letter = name.charAt(0).toUpperCase();
        const curSeller = { id: seller.id, name: name };

        if (data[letter]) {
          data[letter].push(curSeller);
          data[letter].sort(alphaSortValue);
        } else {
          data[letter] = [curSeller];
        }
      });
      const unsorted = Object.assign({}, data);
      return alphaSortKey(unsorted);
    });
}

function addNew(newSellerName: string, sellerOptions: Sellers) {
  return db
    .collection("sellers")
    .add({ name: newSellerName.toLowerCase() })
    .then((sellerRef) => {
      let sellers = { ...sellerOptions };
      const letter = newSellerName.charAt(0).toUpperCase();
      const newSeller = { id: sellerRef.id, name: newSellerName };

      if (sellers[letter]) {
        sellers[letter].push(newSeller);
        sellers[letter].sort(alphaSortValue);
      } else {
        sellers[letter] = [newSeller];
        sellers = alphaSortKey(sellers);
      }
      return sellers;
    });
}
