import { genericAction } from "../../index";

export interface AddOpponentFighter { id: number }
export const addOpponentFighter
  = genericAction<AddOpponentFighter>("ADD_OPPONENT_FIGHTER");
