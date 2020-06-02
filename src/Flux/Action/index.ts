export interface IFSA<T = {}, S = {}> {
  readonly type: string;
  readonly payload: T;
  readonly meta?: IMeta<S>;
  readonly error?: boolean;
}

export interface IMeta<S> {
  pagination?: {
    page: number,
    take: number
  };
  enhanceState?: boolean;
  forceOverride?: boolean;
  request?: IFSA<S>;
}

export interface IFSACreator<T, S> {
  readonly type: string;
  (payload: T, meta: IMeta<S>): IFSA<T>;
  test(action: IFSA): action is IFSA<T>;
}

export const requestAction = <T, S= any>(type: string): IFSACreator<T, S> =>
  Object.assign((payload: T, meta: IMeta<S>): any => ({ type: `${type}_REQUEST`, payload, meta }), {
    type: `${type}_REQUEST`,
    test(action: IFSA): action is IFSA<T, S> {
      return action.type === `${type}_REQUEST`;
    }
  });

export const successAction = <T, S= any>(type: string): IFSACreator<T, S> =>
  Object.assign((payload: T, meta: IMeta<S>): any => ({ type: `${type}_SUCCESS`, payload, meta }), {
    type: `${type}_SUCCESS`,
    test(action: IFSA): action is IFSA<T, S> {
      return action.type === `${type}_SUCCESS`;
    }
  });

export const failureAction = <T, S= any>(type: string): IFSACreator<T, S> =>
  Object.assign((payload: T, meta: IMeta<S>): any => ({ type: `${type}_FAILURE`, payload, meta }), {
    type: `${type}_FAILURE`,
    test(action: IFSA): action is IFSA<T, S> {
      return action.type === `${type}_FAILURE`;
    }
  });

export const genericAction = <T, S= any>(type: string): IFSACreator<T, S> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
    test(action: IFSA): action is IFSA<T, S> {
      return action.type === type;
    }
  });
