import {  changePage } from "../../Action/System";
import { initialStore } from "../../index";

type SystemStore = {
  updatedAt: number;
  page: string;
}

export const systemStore: SystemStore = {
  updatedAt: 0,
  page: "home"
}

export const systemReducer = (store: typeof initialStore, action: any) => {
  switch (action.type) {
    case changePage.type: {
      store.systemStore = { ...store.systemStore, updatedAt: Date.now(), page: action.payload.page}
      return store;
    }
    default: {
      return store;
    }
  }
}

export default systemReducer;
