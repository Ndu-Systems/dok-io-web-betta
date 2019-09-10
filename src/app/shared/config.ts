export const IS_LOCAL = false;
let api = 'http://beta.dok-io.net/api';
let web = 'http://beta.dok-io.net';
if (IS_LOCAL) {
    api = 'http://localhost:8200/dok-io-api-beta';
    web = 'http://localhost:4200';
}

export const   API_URL = api;
export const   APP_VERSION = '1.0';
export const WEB_HOST = web;
export const LAST_INSERT_ID = "LAST_INSERT_ID";
export const CURRENT_USER = "CURRENT_USER";

//USER STATUS
export const STATUS_USER_NEW = 4;
export const STATUS_USER_TRIAL = 3;

//USER ROLES
export const USER_ROLES_STAFF = 3;
export const USER_ROLES_DOC = 3;

export const SELECT_PATIENT = "SELECT_PATIENT";
export const VERIFICATIONLINK = "has70554f35uyt6767-user87542447";

export const SEND_ACC_VERIFICATION_EMAIL= 'http://dok.ndu-systems.net/api/email/email-acc-verify.php';

export function getCurrentUser(){
    return localStorage.getItem(CURRENT_USER);
}
