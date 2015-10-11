import Immutable from "immutable";
import { createReducer } from "redux-immutablejs";
import * as uiActions from "../actions/ui";
import * as emailSignInActions from "../actions/email-sign-in";
import * as emailSignUpActions from "../actions/email-sign-up";
import * as signOutActions from "../actions/sign-out";
import * as requestPasswordResetActions from "../actions/request-password-reset";

const initialState = Immutable.fromJS({
  emailSignInSuccessModalVisible:          false,
  emailSignInErrorModalVisible:            false,
  signOutSuccessModalVisible:              false,
  signOutErrorModalVisible:                false,
  emailSignUpSuccessModalVisible:          false,
  emailSignUpAddress:                      null,
  firstTimeLoginModalSuccessVisible:       false,
  passwordResetModalSuccessVisible:        false,
  firstTimeLoginModalErrorVisible:         false,
  passwordResetModalErrorVisible:          false,
  requestPasswordResetSuccessModalVisible: false,
  requestPasswordResetErrorModalVisible:   false,
  requestPasswordResetSuccessMessage:      null
});

export default createReducer(initialState, {
  [emailSignInActions.EMAIL_SIGN_IN_COMPLETE]: state => state.set(
    "emailSignInSuccessModalVisible", true
  ),

  [emailSignInActions.EMAIL_SIGN_IN_ERROR]: state => state.set(
    "emailSignInErrorModalVisible", true
  ),

  [uiActions.HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL]: state => state.set(
    "emailSignInSuccessModalVisible", false
  ),

  [uiActions.HIDE_EMAIL_SIGN_IN_ERROR_MODAL]: state => state.set(
    "emailSignInErrorModalVisible", false
  ),

  [signOutActions.SIGN_OUT_COMPLETE]: state => state.set(
    "signOutSuccessModalVisible", true
  ),

  [signOutActions.SIGN_OUT_ERROR]: state => state.set(
    "signOutErrorModalVisible", true
  ),

  [uiActions.HIDE_SIGN_OUT_SUCCESS_MODAL]: state => state.set(
    "signOutSuccessModalVisible", false
  ),

  [uiActions.HIDE_SIGN_OUT_ERROR_MODAL]: state => state.set(
    "signOutErrorModalVisible", false
  ),

  [emailSignUpActions.EMAIL_SIGN_UP_COMPLETE]: (state, {user}) => state.merge({
    emailSignUpSuccessModalVisible: true,
    emailSignUpAddress: user.email
  }),

  [emailSignUpActions.EMAIL_SIGN_UP_ERROR]: state => state.set(
    "emailSignUpErrorModalVisible", true
  ),

  [uiActions.HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL]: state => state.merge({
    emailSignUpSuccessModalVisible: false,
    emailSignUpAddress: null
  }),

  [uiActions.HIDE_EMAIL_SIGN_UP_ERROR_MODAL]: state => state.set(
    "emailSignUpErrorModalVisible", false
  ),

  [uiActions.SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL]: state => state.set(
    "firstTimeLoginSuccessModalVisible", true
  ),

  [uiActions.HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL]: state => state.set(
    "firstTimeLoginSuccessModalVisible", false
  ),

  [uiActions.HIDE_PASSWORD_RESET_SUCCESS_MODAL]: state => state.set(
    "passwordResetSuccessModalVisible", false
  ),

  [uiActions.SHOW_PASSWORD_RESET_SUCCESS_MODAL]: state => state.set(
    "passwordResetSuccessModalVisible", true
  ),

  [uiActions.SHOW_FIRST_TIME_LOGIN_ERROR_MODAL]: state => state.set(
    "firstTimeLoginErrorModalVisible", true
  ),

  [uiActions.HIDE_FIRST_TIME_LOGIN_ERROR_MODAL]: state => state.set(
    "firstTimeLoginErrorModalVisible", false
  ),

  [uiActions.HIDE_PASSWORD_RESET_ERROR_MODAL]: state => state.set(
    "passwordResetErrorModalVisible", false
  ),

  [uiActions.SHOW_PASSWORD_RESET_ERROR_MODAL]: state => state.set(
    "passwordResetErrorModalVisible", true
  ),

  [requestPasswordResetActions.REQUEST_PASSWORD_RESET_COMPLETE]: (state, {message}) => {
    return state.merge({
      requestPasswordResetSuccessModalVisible: true,
      requestPasswordResetSuccessMessage: message
    });
  },

  [requestPasswordResetActions.REQUEST_PASSWORD_RESET_ERROR]: state => state.set(
    "requestPasswordResetErrorModalVisible", true
  ),

  [uiActions.HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL]: state => state.merge({
    requestPasswordResetSuccessModalVisible: false,
    requestPasswordResetSuccessMessage: null
  }),

  [uiActions.HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL]: state => state.set(
    "requestPasswordResetErrorModalVisible", false
  )
});