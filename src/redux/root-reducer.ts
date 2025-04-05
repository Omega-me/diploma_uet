import { combineReducers } from '@reduxjs/toolkit';
import automationSclice from './automation-sclice';

export const rootReducer = combineReducers({
  automation: automationSclice,
});
