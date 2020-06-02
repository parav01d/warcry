import { genericAction } from "../../index";

export interface AddFriendlyFighter { id: number }
export const addFriendlyFighter
  = genericAction<AddFriendlyFighter>("ADD_FRIENDLY_FIGHTER");
