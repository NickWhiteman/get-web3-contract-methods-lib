import { fork } from "redux-saga/effects";
import { watcherSagaApp } from "./app-saga/saga-watcher";

export function* contractSaga() {
    yield fork(watcherSagaApp);
}
