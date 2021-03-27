import { firestore } from "./../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../config";
import Router from "next/router";
import OneClickApp from "../../types/oneClickApp";
import OneClick from "../../types/oneClick";

interface AppState {
  readonly loading: boolean;
  readonly selectedAppID?: string;
  readonly userApplications: Array<OneClickApp>;
}

const initialState: AppState = {
  loading: false,
  userApplications: [],
};

export const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setApplicationID: (state, action: PayloadAction<string>) => {
      state.selectedAppID = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserApps: (state, action: PayloadAction<Array<OneClickApp>>) => {
      state.userApplications = action.payload;
    },
    updateAppClicks: (state, action: PayloadAction<Array<OneClick>>) => {
      if (state.userApplications.length > 0) {
        const index = state.userApplications.findIndex(
          (app) => app.id === state.selectedAppID
        );
        state.userApplications[index].oneClicks = action.payload;
      }
    },
  },
});

export const {
  setApplicationID,
  setLoading,
  setUserApps,
  updateAppClicks,
} = appSlice.actions;

export const createApplication = (
  name: string,
  owner: string
): AppThunk => async (dispatch, _getState) => {
  dispatch(setLoading(true));
  const appSnapshot = firestore.collection("apps").doc();
  const oneClickApp: OneClickApp = {
    id: appSnapshot.id,
    createdAt: Date.now(),
    owner: owner,
    name: name,
  };
  appSnapshot.set(oneClickApp);
  dispatch(setApplicationID(oneClickApp.id));
  dispatch(setLoading(false));
  Router.push(`/app/${oneClickApp.id}`);
};

export const getCurrentUserApps = (uid: string): AppThunk => async (
  dispatch,
  getState
) => {
  firestore
    .collection("apps")
    .where("owner", "==", uid)
    .onSnapshot((querySnapshot) => {
      var apps: Array<OneClickApp> = [];
      querySnapshot.forEach((doc) => {
        apps.push(doc.data() as OneClickApp);
      });
      dispatch(setUserApps(apps));
      if (getState().app.selectedAppID !== undefined) {
        dispatch(listenToPairs());
      }
    });
};

export const listenToPairs = (): AppThunk => async (dispatch, getState) => {
  const id = getState().app.selectedAppID;

  firestore.collection(`apps/${id}/pairs`).onSnapshot((querySnapshot) => {
    var clicks: Array<OneClick> = [];
    querySnapshot.forEach((doc) => {
      clicks.push(doc.data() as OneClick);
    });
    dispatch(updateAppClicks(clicks));
  });
};

export const updatePair = (oneClick: OneClick): AppThunk => async (
  _dispatch,
  getState
) => {
  const id = getState().app.selectedAppID;
  await firestore.doc(`apps/${id}/pairs/${oneClick.id}`).set(oneClick);
};

export const deleteOneClick = (oneClickId: string): AppThunk => async (
  _dispatch,
  getState
) => {
  const id = getState().app.selectedAppID;
  await firestore.doc(`apps/${id}/pairs/${oneClickId}`).delete();
};

export const createNewPair = (key: string, value: string): AppThunk => async (
  _dispatch,
  getState
) => {
  const id = getState().app.selectedAppID;

  const appSnapshot = firestore.collection(`apps/${id}/pairs`).doc();
  const oneClick: OneClick = {
    id: appSnapshot.id,
    key: key,
    value: value,
  };
  await appSnapshot.set(oneClick);
};

export const selectedAppID = (state: RootState) => state.app.selectedAppID;
export const isAppLoading = (state: RootState) => state.app.loading;
export const userApps = (state: RootState) => state.app.userApplications;
export const currentApp = (state: RootState) => {
  const app = state.app.userApplications.find(
    (app) => app.id === state.app.selectedAppID
  );
  return app;
};

export default appSlice.reducer;
