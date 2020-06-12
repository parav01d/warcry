import { genericAction } from "../../index";

export interface ChangePage { page: string }
export const changePage
  = genericAction<ChangePage>("CHANGE_PAGE");
