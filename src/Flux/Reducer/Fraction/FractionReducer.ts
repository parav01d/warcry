import { } from "../../Action/Warband";
import { initialStore } from "../../index";
import { Fraction } from "../../../Model/Fraction/Fraction";
import { fractions } from "../../../../assets/fractions";

type FractionStore = {
  updatedAt: number;
  fractions: Fraction[];
}

export const fractionStore: FractionStore = {
  updatedAt: 0,
  fractions
}

export const fractionReducer = (store: typeof initialStore, action: any) => {
  return store;
}

export default fractionReducer;
