import { createContext, useReducer } from "react";

const initialState = {
  keyword: "",
  offers: {
    totalOffers: 0,
    offersList: [],
  },
  newOfferPage: false,
  myOffersPage: false,
  myOfferIds: [],
  daemonOnline: false,
  message: {
    isLoading: false,
    type: null,
    text: null,
  },
  pagination: {
    limit: 10,
    offset: 0,
    currentPage: 1,
  }
};

export const Store = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "OFFERS_UPDATED":
      return { ...state, offers: action.payload };
    case "SET_PAGINATION":
      return { ...state, pagination: action.payload };
    case "SEARCH_KEYWORD":
      return { ...state, keyword: action.payload };
    case "NEW_OFFER_PAGE":
      return { ...state, newOfferPage: action.payload, myOffersPage: false };
    case "MY_OFFERS_PAGE":
      return { ...state, myOffersPage: action.payload, newOfferPage: false };
    case "MY_OFFER_IDS":
      return { ...state, myOfferIds: action.payload };
    case "ADD_ID_IN_MY_OFFER_IDS":
      return { ...state, myOfferIds: [...state?.myOfferIds, action.id] };
    default:
      return state;
  }
};

// This is used to inject the Store at the top level in the index.js file
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={ { state, dispatch } }>
      { props.children }
    </Store.Provider>
  );
};
