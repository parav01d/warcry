import { addFriendlyFighter } from "./AddFriendlyFighter/AddFriendlyFighterAction";
import { addOpponentFighter } from "./AddOpponentFighter/AddOpponentFighterAction";

export * from "./AddFriendlyFighter/AddFriendlyFighterAction";
export * from "./AddOpponentFighter/AddOpponentFighterAction";

export type WarbandAction = typeof addFriendlyFighter | typeof addOpponentFighter;
