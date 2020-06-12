import { Subject, Observable } from "rxjs";
import { startWith, scan } from "rxjs/operators";
import {warbandStore, warbandReducer} from "./Reducer/Warband/WarbandReducer";
import {fractionStore, fractionReducer} from "./Reducer/Fraction/FractionReducer";
import {systemStore, systemReducer} from "./Reducer/System/SystemReducer";

import { IFSA } from "./Action";

export const initialStore = {
  warbandStore,
  fractionStore,
  systemStore
}

const action$ = new Subject<any>();

export const store$: Observable<typeof initialStore> = action$.pipe(
  startWith(initialStore),
  scan(systemReducer),
  scan(warbandReducer),
  scan(fractionReducer),
);

export const dispatch = (action: IFSA) => {
  action$.next(action);
}
