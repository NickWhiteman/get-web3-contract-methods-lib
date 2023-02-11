import { takeLatest } from 'redux-saga/effects';
import {
    getAddress,
    getAppData,
    getUserById,
    notificationVisible,
    register,
    testMethod,
    exampleCabinet,
} from './app-saga';
import { AppSagaAction } from './saga-actions';

export function* watcherSagaApp() {
    yield takeLatest(AppSagaAction.register, register);
    yield takeLatest(AppSagaAction.getUserData, getAppData);
    yield takeLatest(AppSagaAction.getUserById, getUserById);
    yield takeLatest(AppSagaAction.getAddress, getAddress);
    yield takeLatest(AppSagaAction.getTestMethod, testMethod);
    yield takeLatest(AppSagaAction.notification, notificationVisible);
    yield takeLatest(AppSagaAction.exampleCabinet, exampleCabinet);
}
