import { addFriendlyFighter, addOpponentFighter, WarbandAction } from "../../Action/Warband";
import { initialStore } from "../../index";
import { Warband } from "../../../Model/Warband/Warband";

type WarbandStore = {
  friendlyWarband?: Warband;
  opponentWarband?: Warband;
  updatedAt: number;
}

export const warbandStore: WarbandStore = {
  friendlyWarband: undefined,
  opponentWarband: undefined,
  updatedAt: 0
}

export const warbandReducer = (store: typeof initialStore, action: any ) => {
  switch (action.type) {
    case addFriendlyFighter.type: {
      store.warbandStore = { ...store.warbandStore, updatedAt: Date.now()}
      return store;
    }
    case addOpponentFighter.type: {
      store.warbandStore = { ...store.warbandStore, updatedAt: Date.now()}
      return store;
    }
    default: {
      return store;
    }
  }

}

export default warbandReducer;
