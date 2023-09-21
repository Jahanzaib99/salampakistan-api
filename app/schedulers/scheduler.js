'use strict';
const cron = require('node-cron');
const repos = require('../repositories');
const axios = require('axios');
const constants = require('../constants');

module.exports = {
  executeScheduler
};

// var bunyan = require('bunyan');
// var log = bunyan.createLogger({ name: 'PTDC-API-SCHEDULER' });

// Call curry conversion api
// async function getCurrencyRates() {
//   repos.currency.deleteAll();
//   // add data which currency api accepts
//   let data = [
//     'JMD_PKR',
//     'LAK_PKR',
//     'XOF_PKR',
//     'NZD_PKR',
//     'PGK_PKR',
//     'RWF_PKR',
//     'RSD_PKR',
//     'SEK_PKR',
//     'AMD_PKR',
//     'CRC_PKR',
//     'KRW_PKR',
//     'LBP_PKR',
//     'MWK_PKR',
//     'ANG_PKR',
//     'SOS_PKR',
//     'SDG_PKR',
//     'SYP_PKR',
//     'BZD_PKR',
//     'DKK_PKR',
//     'IDR_PKR',
//     'KZT_PKR',
//     'MNT_PKR',
//     'NGN_PKR',
//     'PHP_PKR',
//     'RON_PKR',
//     'SGD_PKR',
//     'TWD_PKR',
//     'VEF_PKR',
//     'DZD_PKR',
//     'AZN_PKR',
//     'CAD_PKR',
//     'ISK_PKR',
//     'IQD_PKR',
//     'LVL_PKR',
//     'CHF_PKR',
//     'MAD_PKR',
//     'NPR_PKR',
//     'SCR_PKR',
//     'THB_PKR',
//     'BRL_PKR',
//     'KHR_PKR',
//     'HRK_PKR',
//     // old ones
//     'KWD_PKR',
//     'SAR_PKR',
//     'JPY_PKR',
//     'USD_PKR',
//     'EUR_PKR',
//     'AUD_PKR',
//     'CNY_PKR',
//     'INR_PKR',
//     'QAR_PKR',
//     'KPW_PKR',
//     'AED_PKR',
//     'BDT_PKR',
//     'LKR_PKR',
//     'UAH_PKR',
//     'GBP_PKR',
//     'BHD_PKR',
//     'MYR_PKR',
//     'TRY_PKR'
//   ];
//   for (let i = 0; i < data.length; i++) {
//     // add api method, base url and and remaining url
//     const config = {
//       method: 'GET',
//       baseURL: 'https://free.currconv.com',
//       url: `/api/v7/convert?q=${data[i]}&compact=ultra&apiKey=2767cc4355cd70f1194e`,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
//     // axios is a package to hit external apis in node.
//     axios(config)
//       .then((response) => {
//         // update if condition occurding to date returned form api.
//         // response = response.data;
//         if (response.data) {
//           // api data will be returned here
//           let currencyData = {
//             name: data[i],
//             rate: response.data[data[i]]
//           };
//           repos.currency.create(currencyData);
//         } else {
//           console.log('Something went wrong.');
//         }
//       })
//       .catch((error) => {
//         console.log('Something went wrong.');
//         console.log(error);
//       });

//   };
// }

async function getCurrencyRates() {
  let flag = true;
  let config = {
    method: 'GET',
    baseURL: 'https://free.currconv.com',
    url: '/api/v7/convert?q=USD_PKR&compact=ultra&apiKey=2767cc4355cd70f1194e',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // add data which currency api accepts
  let data = [
    'LAK_PKR',
    'NZD_PKR',
    'PGK_PKR',
    'RSD_PKR',
    'KRW_PKR',
    'LBP_PKR',
    'MWK_PKR',
    'ANG_PKR',
    'SOS_PKR',
    'SDG_PKR',
    'SYP_PKR',
    'BZD_PKR',
    'DKK_PKR',
    'IDR_PKR',
    'KZT_PKR',
    'MNT_PKR',
    'NGN_PKR',
    'PHP_PKR',
    'RON_PKR',
    'SGD_PKR',
    'TWD_PKR',
    'VEF_PKR',
    'DZD_PKR',
    'AZN_PKR',
    'CAD_PKR',
    'ISK_PKR',
    'IQD_PKR',
    'LVL_PKR',
    'CHF_PKR',
    'MAD_PKR',
    'NPR_PKR',
    'SCR_PKR',
    'THB_PKR',
    'BRL_PKR',
    'KHR_PKR',
    'HRK_PKR',
    // old ones
    'KWD_PKR',
    'SAR_PKR',
    'JPY_PKR',
    'USD_PKR',
    'EUR_PKR',
    'AUD_PKR',
    'CNY_PKR',
    'INR_PKR',
    'QAR_PKR',
    'KPW_PKR',
    'AED_PKR',
    'BDT_PKR',
    'LKR_PKR',
    'UAH_PKR',
    'GBP_PKR',
    'BHD_PKR',
    'MYR_PKR',
    'TRY_PKR'
  ];
  axios(config)
    .then((response) => {
      // update if condition occurding to date returned form api.
      // response = response.data;
      if (response.data) {
        repos.currency.deleteAll();
        flag = true;
      } else {
        flag = false;
      }
      if (flag) {
        for (let i = 0; i < data.length; i++) {
          // add api method, base url and and remaining url
          config.url = `/api/v7/convert?q=${data[i]}&compact=ultra&apiKey=2767cc4355cd70f1194e`;
          // axios is a package to hit external apis in node.
          axios(config)
            .then((cResponse) => {
              // update if condition occurding to date returned form api.
              // response = response.data;
              if (cResponse.data) {
                // api data will be returned here
                let currencyData = {
                  name: data[i],
                  rate: cResponse.data[data[i]]
                };
                repos.currency.create(currencyData);
              } else {
                console.log('Something went wrong.');
              }
            })
            .catch(() => {
              console.log('Something went wrong.');
            });

        };
      }
    })
    .catch(() => {
      flag = false;
    });
}

// Scheduler for reminder and review
function executeScheduler() {
  if (process.env.NODE_ENV !== 'development') {
    cron.schedule(constants.scheduler.getCurrencyRates, () => {
      console.log('scheduler running');
      // Uncomment this line to execute function.
      getCurrencyRates();
    });
  }
}

