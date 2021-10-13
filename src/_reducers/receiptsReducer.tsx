import { receiptConstants } from "../_constants/receiptConstants";
import { Action, Receipt, Sellers } from "../_helpers/types";

export const initState: {
  upload: string;
  request: string;
  progress: number;
  loading: boolean;
  receipt: Receipt | object;
  receipts: Receipt[];
  sellerOptions: Sellers;
} = {
  upload: "",
  request: "",
  progress: 0,
  loading: false,
  receipt: {},
  receipts: [],
  sellerOptions: {},
};

export function receiptsReducer(state = initState, action: Action) {
  if (action.type === receiptConstants.GET_RECEIPT_REQUEST) {
    return (state = {
      ...state,
      request: "sent",
      loading: true,
    });
  }

  if (action.type === receiptConstants.GET_RECEIPT_REQUEST_FAILURE) {
    return (state = {
      ...state,
      request: "failed",
      loading: false,
    });
  }

  if (action.type === receiptConstants.GET_RECEIPT_BY_ID) {
    return (state = {
      ...state,
      loading: false,
      receipt: action.payload,
    });
  }

  if (action.type === receiptConstants.GET_ALL_RECEIPTS) {
    return (state = {
      ...state,
      loading: false,
      receipts: action.payload,
    });
  }

  if (action.type === receiptConstants.ADD_NEW_RECEIPT) {
    return (state = {
      ...state,
      loading: false,
      receipts: action.payload,
    });
  }

  if (action.type === receiptConstants.UPLOAD_RECEIPT_PHOTO) {
    return (state = {
      ...state,
      upload: "uploading",
      loading: false,
    });
  }

  if (action.type === receiptConstants.UPLOAD_RECEIPT_PHOTO_PROGRESS) {
    return (state = {
      ...state,
      progress: action.payload,
    });
  }

  if (action.type === receiptConstants.UPLOAD_RECEIPT_PHOTO_FAILURE) {
    return (state = {
      ...state,
      upload: "failure",
      loading: false,
      progress: 0,
    });
  }

  if (action.type === receiptConstants.UPLOAD_RECEIPT_PHOTO_SUCCESS) {
    return (state = {
      ...state,
      upload: "success",
      loading: false,
      progress: 0,
      receipt: {
        ...state.receipt,
        photo: action.payload.photo,
        hasPhoto: true,
      },
      receipts: state.receipts.map((receipt) => {
        if (receipt.id === action.payload.id) {
          receipt.photo = action.payload.photo;
          receipt.hasPhoto = true;
        }
        return receipt;
      }),
    });
  }

  if (action.type === receiptConstants.UPDATE_RECEIPT) {
    return (state = {
      ...state,
      loading: false,
      receipt: action.payload,
      receipts: state.receipts.map((receipt) => {
        return receipt.id === action.payload.id ? action.payload : receipt;
      }),
    });
  }

  if (action.type === receiptConstants.DELETE_RECEIPT) {
    const receiptId = action.payload;
    return (state = {
      ...state,
      receipts: state.receipts.filter(
        (receipt: Receipt) => receipt.id !== receiptId
      ),
    });
  }

  if (action.type === receiptConstants.REFUND_RECEIPT) {
    const receiptId = action.payload;
    let current = {}
    let receipts = []

    receipts = state.receipts.map((receipt) => {
      if (receipt.id === receiptId) {
        receipt.wasRefunded = true
        current = receipt
      }
      return receipt
    })

    return (state = {
      ...state,
      receipts: receipts,
      receipt: current
    });
  }

  if (action.type === receiptConstants.PAY_RECEIPT) {
    const receiptId = action.payload;
    let current = {}
    let receipts = []

    receipts = state.receipts.map((receipt) => {
      if (receipt.id === receiptId) {
        receipt.wasRefunded = false
        current = receipt
      }
      return receipt
    })

    return (state = {
      ...state,
      receipts: receipts,
      receipt: current
    });
  }
  return state;
}
