import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice.js";
import conrtibutorReducer from "./contributorSlice.js";
import projectsReducer from "./projectsSlice.js";
import gitAndCollabProjectReducer from "./gitAndCollabProject.js";

const userPersistConfig = {
  key: "user",
  storage,
};

const gitAndCollabProjectPersistConfig = {
  key: "gitAndCollabProject",
  storage,
};
const contributorConfig = {
  key: "contributor",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const contributorReducer = persistReducer(
  contributorConfig,
  conrtibutorReducer
);
const persistedGitAndCollabProjectReducer = persistReducer(
  gitAndCollabProjectPersistConfig,
  gitAndCollabProjectReducer
);

const rootReducer = (state, action) => {
  return {
    user: persistedUserReducer(state?.user, action),
    contributor: contributorReducer(state?.contributor, action),
    gitAndCollabProject: persistedGitAndCollabProjectReducer(
      state?.gitAndCollabProject,
      action
    ),
    projects: projectsReducer(state?.projects, action),
  };
};

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
