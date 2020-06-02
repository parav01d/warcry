import { } from "../../Action/Warband";
import { initialStore } from "../../index";

type FractionStore = {
  updatedAt: number;
}

export const fractionStore: FractionStore = {
  updatedAt: 0
}

export const fractionReducer = (store: typeof initialStore) => {
  return store;
}

export default fractionReducer;
