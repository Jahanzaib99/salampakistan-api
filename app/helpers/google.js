'use strict';

const config = require('../config');
const promisify = require('es6-promisify');
// const google = require('googleapis');
var { google } = require('googleapis');
const oauth2 = google.oauth2('v2');
const sheets = google.sheets('v4');

module.exports = {
  getUserInfo,
  appendSheetRow
};

const oauthGetUserInfo = promisify(oauth2.userinfo.get);
const spreadsheetAppend = promisify(sheets.spreadsheets.values.append);

function getUserInfo(token) {
  if (!token) {
    return Promise.reject('Token not provided');
  }

  return oauthGetUserInfo({ access_token: token })
    .then((res) => {
      return {
        id: res.id,
        email: res.email,
        name: res.name,
        gender: res.gender,
        token: token
      };
    });
}

function authorize(scopes) {
  const clientEmail = config.get('google.clientEmail') | 'info@eikon7.com';
  const privateKey = config.get('google.privateKey') | '9CO_Ne0oNhqtQBTaDDqjmvlk';

  return new Promise((resolve, reject) => {
    let jwtClient = new google.auth.JWT(clientEmail, null, privateKey, scopes, null);
    jwtClient.authorize((err) => {
      if (err) {
        return reject(err);
      }

      return resolve(jwtClient);
    });
  });
}

function appendSheetRow(spreadsheetId, sheetName, row) {
  return authorize(['https://www.googleapis.com/auth/spreadsheets'])
    .then((auth) => {
      return spreadsheetAppend({
        auth: auth,
        spreadsheetId: spreadsheetId,
        valueInputOption: 'USER_ENTERED',
        range: sheetName,
        resource: {
          majorDimension: 'ROWS',
          values: [row]
        }
      });
    });
}
