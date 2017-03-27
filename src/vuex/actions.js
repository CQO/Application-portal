"use strict";
import * as types from './mutation-types';

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER);
};

export const userMenuClick = ({ commit }) => {
  commit(types.USER_MENU_CLICK);
};

export const userMenuHide = ({ commit }) => {
  commit(types.USER_MENU_HIDE);
};
//增加聊天记录
export const addDialogue = ({ commit }) => {
  commit(types.ADD_DIALOGUE);
};
