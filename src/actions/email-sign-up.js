import {getEmailSignUpUrl, getConfirmationSuccessUrl}  from "../utils/session-storage";
import {parseResponse} from "../utils/handle-fetch-response";
import extend from "extend";
import fetch from "../utils/fetch";

export const EMAIL_SIGN_UP_START       = "EMAIL_SIGN_UP_START";
export const EMAIL_SIGN_UP_COMPLETE    = "EMAIL_SIGN_UP_COMPLETE";
export const EMAIL_SIGN_UP_ERROR       = "EMAIL_SIGN_UP_ERROR";
export const EMAIL_SIGN_UP_FORM_UPDATE = "EMAIL_SIGN_UP_FORM_UPDATE";

export function emailSignUpFormUpdate(endpoint, key, value) {
  return { type: EMAIL_SIGN_UP_FORM_UPDATE, endpoint, key, value };
}
export function emailSignUpStart(endpoint) {
  return { type: EMAIL_SIGN_UP_START, endpoint };
}
export function emailSignUpComplete(user, endpoint) {
  return { type: EMAIL_SIGN_UP_COMPLETE, user, endpoint };
}
export function emailSignUpError(errors, endpoint) {
  return { type: EMAIL_SIGN_UP_ERROR, errors, endpoint };
}
export function emailSignUp(body, endpointKey) {
  return dispatch => {
    if (Object.keys(body).length === 0 && body.constructor === Object) {
      return Promise.resolve(dispatch(updateAccountError({}, endpointKey)));
    }
    dispatch(emailSignUpStart(endpointKey));

    let data = new FormData();
    for (let key in body) {
      if (body[key]) {
        data.append(key, body[key]);
      }
    }
    data.append('confirm_success_url', getConfirmationSuccessUrl());

    return fetch(getEmailSignUpUrl(endpointKey), {
      //headers: {
        //"Accept": "application/json",
        //'Content-Type': 'multipart/form-data',
      //},
      method: "post",
      body: data,
    })
      .then(parseResponse)
      .then(({data}) => dispatch(emailSignUpComplete(data, endpointKey)))
      .catch(({errors}) => {
        dispatch(emailSignUpError(errors, endpointKey))
        throw errors;
      });
  };
}
