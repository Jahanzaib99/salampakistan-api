'use strict';

const repos = require('../repositories');
// const validations = require('../validations');
const _ = require('lodash');

module.exports = {
  create,
  getAll
};

let currencyList = {
  'ALL_PKR': {
    'currencyName': 'Albanian Lek',
    'currencySymbol': 'Lek',
    'id': 'ALL'
  },
  'XCD_PKR': {
    'currencyName': 'East Caribbean Dollar',
    'currencySymbol': '$',
    'id': 'XCD'
  },
  'EUR_PKR': {
    'currencyName': 'Euro',
    'currencySymbol': '€',
    'id': 'EUR'
  },
  'BBD_PKR': {
    'currencyName': 'Barbadian Dollar',
    'currencySymbol': '$',
    'id': 'BBD'
  },
  'BTN_PKR': {
    'currencyName': 'Bhutanese Ngultrum',
    'id': 'BTN'
  },
  'BND_PKR': {
    'currencyName': 'Brunei Dollar',
    'currencySymbol': '$',
    'id': 'BND'
  },
  'XAF_PKR': {
    'currencyName': 'Central African CFA Franc',
    'id': 'XAF'
  },
  'CUP_PKR': {
    'currencyName': 'Cuban Peso',
    'currencySymbol': '$',
    'id': 'CUP'
  },
  'USD_PKR': {
    'currencyName': 'United States Dollar',
    'currencySymbol': '$',
    'id': 'USD'
  },
  'FKP_PKR': {
    'currencyName': 'Falkland Islands Pound',
    'currencySymbol': '£',
    'id': 'FKP'
  },
  'GIP_PKR': {
    'currencyName': 'Gibraltar Pound',
    'currencySymbol': '£',
    'id': 'GIP'
  },
  'HUF_PKR': {
    'currencyName': 'Hungarian Forint',
    'currencySymbol': 'Ft',
    'id': 'HUF'
  },
  'IRR_PKR': {
    'currencyName': 'Iranian Rial',
    'currencySymbol': '﷼',
    'id': 'IRR'
  },
  'JMD_PKR': {
    'currencyName': 'Jamaican Dollar',
    'currencySymbol': 'J$',
    'id': 'JMD'
  },
  'AUD_PKR': {
    'currencyName': 'Australian Dollar',
    'currencySymbol': '$',
    'id': 'AUD'
  },
  'LAK_PKR': {
    'currencyName': 'Lao Kip',
    'currencySymbol': '₭',
    'id': 'LAK'
  },
  'LYD_PKR': {
    'currencyName': 'Libyan Dinar',
    'id': 'LYD'
  },
  'MKD_PKR': {
    'currencyName': 'Macedonian Denar',
    'currencySymbol': 'ден',
    'id': 'MKD'
  },
  'XOF_PKR': {
    'currencyName': 'West African CFA Franc',
    'id': 'XOF'
  },
  'NZD_PKR': {
    'currencyName': 'New Zealand Dollar',
    'currencySymbol': '$',
    'id': 'NZD'
  },
  'OMR_PKR': {
    'currencyName': 'Omani Rial',
    'currencySymbol': '﷼',
    'id': 'OMR'
  },
  'PGK_PKR': {
    'currencyName': 'Papua New Guinean Kina',
    'id': 'PGK'
  },
  'RWF_PKR': {
    'currencyName': 'Rwandan Franc',
    'id': 'RWF'
  },
  'WST_PKR': {
    'currencyName': 'Samoan Tala',
    'id': 'WST'
  },
  'RSD_PKR': {
    'currencyName': 'Serbian Dinar',
    'currencySymbol': 'Дин.',
    'id': 'RSD'
  },
  'SEK_PKR': {
    'currencyName': 'Swedish Krona',
    'currencySymbol': 'kr',
    'id': 'SEK'
  },
  'TZS_PKR': {
    'currencyName': 'Tanzanian Shilling',
    'currencySymbol': 'TSh',
    'id': 'TZS'
  },
  'AMD_PKR': {
    'currencyName': 'Armenian Dram',
    'id': 'AMD'
  },
  'BSD_PKR': {
    'currencyName': 'Bahamian Dollar',
    'currencySymbol': '$',
    'id': 'BSD'
  },
  'BAM_PKR': {
    'currencyName': 'Bosnia And Herzegovina Konvertibilna Marka',
    'currencySymbol': 'KM',
    'id': 'BAM'
  },
  'CVE_PKR': {
    'currencyName': 'Cape Verdean Escudo',
    'id': 'CVE'
  },
  'CNY_PKR': {
    'currencyName': 'Chinese Yuan',
    'currencySymbol': '¥',
    'id': 'CNY'
  },
  'CRC_PKR': {
    'currencyName': 'Costa Rican Colon',
    'currencySymbol': '₡',
    'id': 'CRC'
  },
  'CZK_PKR': {
    'currencyName': 'Czech Koruna',
    'currencySymbol': 'Kč',
    'id': 'CZK'
  },
  'ERN_PKR': {
    'currencyName': 'Eritrean Nakfa',
    'id': 'ERN'
  },
  'GEL_PKR': {
    'currencyName': 'Georgian Lari',
    'id': 'GEL'
  },
  'HTG_PKR': {
    'currencyName': 'Haitian Gourde',
    'id': 'HTG'
  },
  'INR_PKR': {
    'currencyName': 'Indian Rupee',
    'currencySymbol': '₹',
    'id': 'INR'
  },
  'JOD_PKR': {
    'currencyName': 'Jordanian Dinar',
    'id': 'JOD'
  },
  'KRW_PKR': {
    'currencyName': 'South Korean Won',
    'currencySymbol': '₩',
    'id': 'KRW'
  },
  'LBP_PKR': {
    'currencyName': 'Lebanese Lira',
    'currencySymbol': '£',
    'id': 'LBP'
  },
  'MWK_PKR': {
    'currencyName': 'Malawian Kwacha',
    'id': 'MWK'
  },
  'MRO_PKR': {
    'currencyName': 'Mauritanian Ouguiya',
    'id': 'MRO'
  },
  'MZN_PKR': {
    'currencyName': 'Mozambican Metical',
    'id': 'MZN'
  },
  'ANG_PKR': {
    'currencyName': 'Netherlands Antillean Gulden',
    'currencySymbol': 'ƒ',
    'id': 'ANG'
  },
  'PEN_PKR': {
    'currencyName': 'Peruvian Nuevo Sol',
    'currencySymbol': 'S/.',
    'id': 'PEN'
  },
  'QAR_PKR': {
    'currencyName': 'Qatari Riyal',
    'currencySymbol': '﷼',
    'id': 'QAR'
  },
  'STD_PKR': {
    'currencyName': 'Sao Tome And Principe Dobra',
    'id': 'STD'
  },
  'SLL_PKR': {
    'currencyName': 'Sierra Leonean Leone',
    'id': 'SLL'
  },
  'SOS_PKR': {
    'currencyName': 'Somali Shilling',
    'currencySymbol': 'S',
    'id': 'SOS'
  },
  'SDG_PKR': {
    'currencyName': 'Sudanese Pound',
    'id': 'SDG'
  },
  'SYP_PKR': {
    'currencyName': 'Syrian Pound',
    'currencySymbol': '£',
    'id': 'SYP'
  },
  'AOA_PKR': {
    'currencyName': 'Angolan Kwanza',
    'id': 'AOA'
  },
  'AWG_PKR': {
    'currencyName': 'Aruban Florin',
    'currencySymbol': 'ƒ',
    'id': 'AWG'
  },
  'BHD_PKR': {
    'currencyName': 'Bahraini Dinar',
    'id': 'BHD'
  },
  'BZD_PKR': {
    'currencyName': 'Belize Dollar',
    'currencySymbol': 'BZ$',
    'id': 'BZD'
  },
  'BWP_PKR': {
    'currencyName': 'Botswana Pula',
    'currencySymbol': 'P',
    'id': 'BWP'
  },
  'BIF_PKR': {
    'currencyName': 'Burundi Franc',
    'id': 'BIF'
  },
  'KYD_PKR': {
    'currencyName': 'Cayman Islands Dollar',
    'currencySymbol': '$',
    'id': 'KYD'
  },
  'COP_PKR': {
    'currencyName': 'Colombian Peso',
    'currencySymbol': '$',
    'id': 'COP'
  },
  'DKK_PKR': {
    'currencyName': 'Danish Krone',
    'currencySymbol': 'kr',
    'id': 'DKK'
  },
  'GTQ_PKR': {
    'currencyName': 'Guatemalan Quetzal',
    'currencySymbol': 'Q',
    'id': 'GTQ'
  },
  'HNL_PKR': {
    'currencyName': 'Honduran Lempira',
    'currencySymbol': 'L',
    'id': 'HNL'
  },
  'IDR_PKR': {
    'currencyName': 'Indonesian Rupiah',
    'currencySymbol': 'Rp',
    'id': 'IDR'
  },
  'ILS_PKR': {
    'currencyName': 'Israeli New Sheqel',
    'currencySymbol': '₪',
    'id': 'ILS'
  },
  'KZT_PKR': {
    'currencyName': 'Kazakhstani Tenge',
    'currencySymbol': 'лв',
    'id': 'KZT'
  },
  'KWD_PKR': {
    'currencyName': 'Kuwaiti Dinar',
    'id': 'KWD'
  },
  'LSL_PKR': {
    'currencyName': 'Lesotho Loti',
    'id': 'LSL'
  },
  'MYR_PKR': {
    'currencyName': 'Malaysian Ringgit',
    'currencySymbol': 'RM',
    'id': 'MYR'
  },
  'MUR_PKR': {
    'currencyName': 'Mauritian Rupee',
    'currencySymbol': '₨',
    'id': 'MUR'
  },
  'MNT_PKR': {
    'currencyName': 'Mongolian Tugrik',
    'currencySymbol': '₮',
    'id': 'MNT'
  },
  'MMK_PKR': {
    'currencyName': 'Myanma Kyat',
    'id': 'MMK'
  },
  'NGN_PKR': {
    'currencyName': 'Nigerian Naira',
    'currencySymbol': '₦',
    'id': 'NGN'
  },
  'PAB_PKR': {
    'currencyName': 'Panamanian Balboa',
    'currencySymbol': 'B/.',
    'id': 'PAB'
  },
  'PHP_PKR': {
    'currencyName': 'Philippine Peso',
    'currencySymbol': '₱',
    'id': 'PHP'
  },
  'RON_PKR': {
    'currencyName': 'Romanian Leu',
    'currencySymbol': 'lei',
    'id': 'RON'
  },
  'SAR_PKR': {
    'currencyName': 'Saudi Riyal',
    'currencySymbol': '﷼',
    'id': 'SAR'
  },
  'SGD_PKR': {
    'currencyName': 'Singapore Dollar',
    'currencySymbol': '$',
    'id': 'SGD'
  },
  'ZAR_PKR': {
    'currencyName': 'South African Rand',
    'currencySymbol': 'R',
    'id': 'ZAR'
  },
  'SRD_PKR': {
    'currencyName': 'Surinamese Dollar',
    'currencySymbol': '$',
    'id': 'SRD'
  },
  'TWD_PKR': {
    'currencyName': 'New Taiwan Dollar',
    'currencySymbol': 'NT$',
    'id': 'TWD'
  },
  'TOP_PKR': {
    'currencyName': 'Paanga',
    'id': 'TOP'
  },
  'VEF_PKR': {
    'currencyName': 'Venezuelan Bolivar',
    'id': 'VEF'
  },
  'DZD_PKR': {
    'currencyName': 'Algerian Dinar',
    'id': 'DZD'
  },
  'ARS_PKR': {
    'currencyName': 'Argentine Peso',
    'currencySymbol': '$',
    'id': 'ARS'
  },
  'AZN_PKR': {
    'currencyName': 'Azerbaijani Manat',
    'currencySymbol': 'ман',
    'id': 'AZN'
  },
  'BYR_PKR': {
    'currencyName': 'Belarusian Ruble',
    'currencySymbol': 'p.',
    'id': 'BYR'
  },
  'BOB_PKR': {
    'currencyName': 'Bolivian Boliviano',
    'currencySymbol': '$b',
    'id': 'BOB'
  },
  'BGN_PKR': {
    'currencyName': 'Bulgarian Lev',
    'currencySymbol': 'лв',
    'id': 'BGN'
  },
  'CAD_PKR': {
    'currencyName': 'Canadian Dollar',
    'currencySymbol': '$',
    'id': 'CAD'
  },
  'CLP_PKR': {
    'currencyName': 'Chilean Peso',
    'currencySymbol': '$',
    'id': 'CLP'
  },
  'CDF_PKR': {
    'currencyName': 'Congolese Franc',
    'id': 'CDF'
  },
  'DOP_PKR': {
    'currencyName': 'Dominican Peso',
    'currencySymbol': 'RD$',
    'id': 'DOP'
  },
  'FJD_PKR': {
    'currencyName': 'Fijian Dollar',
    'currencySymbol': '$',
    'id': 'FJD'
  },
  'GMD_PKR': {
    'currencyName': 'Gambian Dalasi',
    'id': 'GMD'
  },
  'GYD_PKR': {
    'currencyName': 'Guyanese Dollar',
    'currencySymbol': '$',
    'id': 'GYD'
  },
  'ISK_PKR': {
    'currencyName': 'Icelandic Króna',
    'currencySymbol': 'kr',
    'id': 'ISK'
  },
  'IQD_PKR': {
    'currencyName': 'Iraqi Dinar',
    'id': 'IQD'
  },
  'JPY_PKR': {
    'currencyName': 'Japanese Yen',
    'currencySymbol': '¥',
    'id': 'JPY'
  },
  'KPW_PKR': {
    'currencyName': 'North Korean Won',
    'currencySymbol': '₩',
    'id': 'KPW'
  },
  'LVL_PKR': {
    'currencyName': 'Latvian Lats',
    'currencySymbol': 'Ls',
    'id': 'LVL'
  },
  'CHF_PKR': {
    'currencyName': 'Swiss Franc',
    'currencySymbol': 'Fr.',
    'id': 'CHF'
  },
  'MGA_PKR': {
    'currencyName': 'Malagasy Ariary',
    'id': 'MGA'
  },
  'MDL_PKR': {
    'currencyName': 'Moldovan Leu',
    'id': 'MDL'
  },
  'MAD_PKR': {
    'currencyName': 'Moroccan Dirham',
    'id': 'MAD'
  },
  'NPR_PKR': {
    'currencyName': 'Nepalese Rupee',
    'currencySymbol': '₨',
    'id': 'NPR'
  },
  'NIO_PKR': {
    'currencyName': 'Nicaraguan Cordoba',
    'currencySymbol': 'C$',
    'id': 'NIO'
  },
  'PKR_PKR': {
    'currencyName': 'Pakistani Rupee',
    'currencySymbol': '₨',
    'id': 'PKR'
  },
  'PYG_PKR': {
    'currencyName': 'Paraguayan Guarani',
    'currencySymbol': 'Gs',
    'id': 'PYG'
  },
  'SHP_PKR': {
    'currencyName': 'Saint Helena Pound',
    'currencySymbol': '£',
    'id': 'SHP'
  },
  'SCR_PKR': {
    'currencyName': 'Seychellois Rupee',
    'currencySymbol': '₨',
    'id': 'SCR'
  },
  'SBD_PKR': {
    'currencyName': 'Solomon Islands Dollar',
    'currencySymbol': '$',
    'id': 'SBD'
  },
  'LKR_PKR': {
    'currencyName': 'Sri Lankan Rupee',
    'currencySymbol': '₨',
    'id': 'LKR'
  },
  'THB_PKR': {
    'currencyName': 'Thai Baht',
    'currencySymbol': '฿',
    'id': 'THB'
  },
  'TRY_PKR': {
    'currencyName': 'Turkish New Lira',
    'id': 'TRY'
  },
  'AED_PKR': {
    'currencyName': 'UAE Dirham',
    'id': 'AED'
  },
  'VUV_PKR': {
    'currencyName': 'Vanuatu Vatu',
    'id': 'VUV'
  },
  'YER_PKR': {
    'currencyName': 'Yemeni Rial',
    'currencySymbol': '﷼',
    'id': 'YER'
  },
  'AFN_PKR': {
    'currencyName': 'Afghan Afghani',
    'currencySymbol': '؋',
    'id': 'AFN'
  },
  'BDT_PKR': {
    'currencyName': 'Bangladeshi Taka',
    'id': 'BDT'
  },
  'BRL_PKR': {
    'currencyName': 'Brazilian Real',
    'currencySymbol': 'R$',
    'id': 'BRL'
  },
  'KHR_PKR': {
    'currencyName': 'Cambodian Riel',
    'currencySymbol': '៛',
    'id': 'KHR'
  },
  'KMF_PKR': {
    'currencyName': 'Comorian Franc',
    'id': 'KMF'
  },
  'HRK_PKR': {
    'currencyName': 'Croatian Kuna',
    'currencySymbol': 'kn',
    'id': 'HRK'
  },
  'DJF_PKR': {
    'currencyName': 'Djiboutian Franc',
    'id': 'DJF'
  },
  'EGP_PKR': {
    'currencyName': 'Egyptian Pound',
    'currencySymbol': '£',
    'id': 'EGP'
  },
  'ETB_PKR': {
    'currencyName': 'Ethiopian Birr',
    'id': 'ETB'
  },
  'XPF_PKR': {
    'currencyName': 'CFP Franc',
    'id': 'XPF'
  },
  'GHS_PKR': {
    'currencyName': 'Ghanaian Cedi',
    'id': 'GHS'
  },
  'GNF_PKR': {
    'currencyName': 'Guinean Franc',
    'id': 'GNF'
  },
  'HKD_PKR': {
    'currencyName': 'Hong Kong Dollar',
    'currencySymbol': '$',
    'id': 'HKD'
  },
  'XDR_PKR': {
    'currencyName': 'Special Drawing Rights',
    'id': 'XDR'
  },
  'KES_PKR': {
    'currencyName': 'Kenyan Shilling',
    'currencySymbol': 'KSh',
    'id': 'KES'
  },
  'KGS_PKR': {
    'currencyName': 'Kyrgyzstani Som',
    'currencySymbol': 'лв',
    'id': 'KGS'
  },
  'LRD_PKR': {
    'currencyName': 'Liberian Dollar',
    'currencySymbol': '$',
    'id': 'LRD'
  },
  'MOP_PKR': {
    'currencyName': 'Macanese Pataca',
    'id': 'MOP'
  },
  'MVR_PKR': {
    'currencyName': 'Maldivian Rufiyaa',
    'id': 'MVR'
  },
  'MXN_PKR': {
    'currencyName': 'Mexican Peso',
    'currencySymbol': '$',
    'id': 'MXN'
  },
  'NAD_PKR': {
    'currencyName': 'Namibian Dollar',
    'currencySymbol': '$',
    'id': 'NAD'
  },
  'NOK_PKR': {
    'currencyName': 'Norwegian Krone',
    'currencySymbol': 'kr',
    'id': 'NOK'
  },
  'PLN_PKR': {
    'currencyName': 'Polish Zloty',
    'currencySymbol': 'zł',
    'id': 'PLN'
  },
  'RUB_PKR': {
    'currencyName': 'Russian Ruble',
    'currencySymbol': 'руб',
    'id': 'RUB'
  },
  'SZL_PKR': {
    'currencyName': 'Swazi Lilangeni',
    'id': 'SZL'
  },
  'TJS_PKR': {
    'currencyName': 'Tajikistani Somoni',
    'id': 'TJS'
  },
  'TTD_PKR': {
    'currencyName': 'Trinidad and Tobago Dollar',
    'currencySymbol': 'TT$',
    'id': 'TTD'
  },
  'UGX_PKR': {
    'currencyName': 'Ugandan Shilling',
    'currencySymbol': 'USh',
    'id': 'UGX'
  },
  'UYU_PKR': {
    'currencyName': 'Uruguayan Peso',
    'currencySymbol': '$U',
    'id': 'UYU'
  },
  'VND_PKR': {
    'currencyName': 'Vietnamese Dong',
    'currencySymbol': '₫',
    'id': 'VND'
  },
  'TND_PKR': {
    'currencyName': 'Tunisian Dinar',
    'id': 'TND'
  },
  'UAH_PKR': {
    'currencyName': 'Ukrainian Hryvnia',
    'currencySymbol': '₴',
    'id': 'UAH'
  },
  'UZS_PKR': {
    'currencyName': 'Uzbekistani Som',
    'currencySymbol': 'лв',
    'id': 'UZS'
  },
  'TMT_PKR': {
    'currencyName': 'Turkmenistan Manat',
    'id': 'TMT'
  },
  'GBP_PKR': {
    'currencyName': 'British Pound',
    'currencySymbol': '£',
    'id': 'GBP'
  },
  'ZMW_PKR': {
    'currencyName': 'Zambian Kwacha',
    'id': 'ZMW'
  },
  'BTC_PKR': {
    'currencyName': 'Bitcoin',
    'currencySymbol': 'BTC',
    'id': 'BTC'
  },
  'BYN_PKR': {
    'currencyName': 'New Belarusian Ruble',
    'currencySymbol': 'p.',
    'id': 'BYN'
  },
  'BMD_PKR': {
    'currencyName': 'Bermudan Dollar',
    'id': 'BMD'
  },
  'GGP_PKR': {
    'currencyName': 'Guernsey Pound',
    'id': 'GGP'
  },
  'CLF_PKR': {
    'currencyName': 'Chilean Unit Of Account',
    'id': 'CLF'
  },
  'CUC_PKR': {
    'currencyName': 'Cuban Convertible Peso',
    'id': 'CUC'
  },
  'IMP_PKR': {
    'currencyName': 'Manx pound',
    'id': 'IMP'
  },
  'JEP_PKR': {
    'currencyName': 'Jersey Pound',
    'id': 'JEP'
  },
  'SVC_PKR': {
    'currencyName': 'Salvadoran Colón',
    'id': 'SVC'
  },
  'ZMK_PKR': {
    'currencyName': 'Old Zambian Kwacha',
    'id': 'ZMK'
  },
  'XAG_PKR': {
    'currencyName': 'Silver (troy ounce)',
    'id': 'XAG'
  },
  'ZWL_PKR': {
    'currencyName': 'Zimbabwean Dollar',
    'id': 'ZWL'
  }
};

function create(payload) {
  return repos.currency.create(payload)
    .then((response) => {
      return Promise.resolve({
        // message: messages.location.locationSuccess,
        data: response
      });
    });
}

function getAll() {
  return repos.currency.getAll()
    .then((currencies) => {
      if (!currencies) {
      } else {
        let currencyUpdatedList = [];
        _.forEach(currencies, function(item) {
          if(currencyList[item.name.split()]) {
            item.name = currencyList[item.name];
            currencyUpdatedList.push(item);
          }
        });
        return Promise.resolve(currencyUpdatedList);
      }
    })
    .catch(() => {
    });
}
