import { Subject, Observable } from "rxjs";
import { startWith, scan } from "rxjs/operators";
import {warbandStore, warbandReducer} from "./Reducer/Warband/WarbandReducer";
import {fractionStore, fractionReducer} from "./Reducer/Fraction/fractionReducer";

import { IFSA } from "./Action";

export const initialStore = {
  warbandStore,
  fractionStore
}

const action$ = new Subject<any>();

export const store$: Observable<typeof initialStore> = action$.pipe(
  startWith(initialStore),
  scan(warbandReducer),
  scan(fractionReducer),
);

export const dispatch = (action: IFSA) => {
  action$.next(action);
}
