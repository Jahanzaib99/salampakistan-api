'use strict';

module.exports = {
  booking: require('./booking'),
  photo: require('./photo'),
  tag: require('./tag'),
  scheduler: require('./scheduler'),
  userPermissions: require('./userPermissions'),
  // list of countries for visa on arrival (Tourist)
  onArrival: [
    {
      'name': 'Angola',
      'status': true
    },
    {
      'name': 'Argentina',
      'status': true
    },
    {
      'name': 'Austria',
      'status': true
    },
    {
      'name': 'Azerbaijan',
      'status': true
    },
    {
      'name': 'Bahamas',
      'status': true
    },
    {
      'name': 'Bahrain',
      'status': true
    },
    {
      'name': 'Barbados',
      'status': true
    },
    {
      'name': 'Botswana',
      'status': true
    },
    {
      'name': 'Brunei',
      'status': true
    },
    {
      'name': 'Costa Rica',
      'status': true
    },
    {
      'name': 'Finland',
      'status': true
    },
    {
      'name': 'Germany',
      'status': true
    },
    {
      'name': 'Ghana',
      'status': true
    },
    {
      'name': 'Iceland',
      'status': true
    },
    {
      'name': 'Indonesia',
      'status': true
    },
    {
      'name': 'Italy',
      'status': true
    },
    {
      'name': 'Japan',
      'status': true
    },
    {
      'name': 'Jordan',
      'status': true
    },
    {
      'name': 'Korea (South)',
      'status': true
    },
    {
      'name': 'Kuwait',
      'status': true
    },
    {
      'name': 'Lithuania',
      'status': true
    },
    {
      'name': 'Luxembourg',
      'status': true
    },
    {
      'name': 'Malaysia',
      'status': true
    },
    {
      'name': 'Maldives',
      'status': true
    },
    {
      'name': 'Malta',
      'status': true
    },
    {
      'name': 'Monaco',
      'status': true
    },
    {
      'name': 'Mozambique',
      'status': true
    },
    {
      'name': 'Nepal',
      'status': true
    },
    {
      'name': 'New Zealand',
      'status': true
    },
    {
      'name': 'Oman',
      'status': true
    },
    {
      'name': 'Paraguay',
      'status': true
    },
    {
      'name': 'Qatar',
      'status': true
    },
    {
      'name': 'Rwanda',
      'status': true
    },
    {
      'name': 'Saint Kitts and Nevis',
      'status': true
    },
    {
      'name': 'Saint Lucia',
      'status': true
    },
    {
      'name': 'Saudi Arabia',
      'status': true
    },
    {
      'name': 'Singapore',
      'status': true
    },
    {
      'name': 'Spain',
      'status': true
    },
    {
      'name': 'Sri Lanka',
      'status': true
    },
    {
      'name': 'Switzerland',
      'status': true
    },
    {
      'name': 'Tajikistan',
      'status': true
    },
    {
      'name': 'Tanzania',
      'status': true
    },
    {
      'name': 'Thailand',
      'status': true
    },
    {
      'name': 'Tonga',
      'status': true
    },
    {
      'name': 'Trinidad & Tobago',
      'status': true
    },
    {
      'name': 'Tunisia',
      'status': true
    },
    {
      'name': 'Turkey',
      'status': true
    },
    {
      'name': 'UAE',
      'status': true
    },
    {
      'name': 'Western Samoa',
      'status': true
    },
    {
      'name': 'Zambia',
      'status': true
    }
  ],
  // countries elgible for pakistan online visa
  online: [
    {
      'status': true,
      'name': 'Albania'
    },
    {
      'status': true,
      'name': 'Andorra'
    },
    {
      'status': true,
      'name': 'Angola'
    },
    {
      'status': true,
      'name': 'Antigua and Barbuda'
    },
    {
      'status': true,
      'name': 'Argentina'
    },
    {
      'status': true,
      'name': 'Australia'
    },
    {
      'status': true,
      'name': 'Austria'
    },
    {
      'status': true,
      'name': 'Azerbaijan'
    },
    {
      'status': true,
      'name': 'Bahamas'
    },
    {
      'status': true,
      'name': 'Bahrain'
    },
    {
      'status': true,
      'name': 'Bangladesh'
    },
    {
      'status': true,
      'name': 'Barbados'
    },
    {
      'status': true,
      'name': 'Belarus'
    },
    {
      'status': true,
      'name': 'Belgium'
    },
    {
      'status': true,
      'name': 'Belize'
    },
    {
      'status': true,
      'name': 'Benin'
    },
    {
      'status': true,
      'name': 'Bolivia'
    },
    {
      'status': true,
      'name': 'Bosnia & Herzegovina'
    },
    {
      'status': true,
      'name': 'Botswana'
    },
    {
      'status': true,
      'name': 'Brazil'
    },
    {
      'status': true,
      'name': 'Brunei'
    },
    {
      'status': true,
      'name': 'Bulgaria'
    },
    {
      'status': true,
      'name': 'Burkina Faso'
    },
    {
      'status': true,
      'name': 'Burundi'
    },
    {
      'status': true,
      'name': 'Cambodia'
    },
    {
      'status': true,
      'name': 'Cameroon'
    },
    {
      'status': true,
      'name': 'Canada'
    },
    {
      'status': true,
      'name': 'Capbo Verde'
    },
    {
      'status': true,
      'name': 'Central African Republic'
    },
    {
      'status': true,
      'name': 'Chile'
    },
    {
      'status': true,
      'name': 'China'
    },
    {
      'status': true,
      'name': 'Colombia'
    },
    {
      'status': true,
      'name': 'Comoros'
    },
    {
      'status': true,
      'name': 'Congo (Republic)'
    },
    {
      'status': true,
      'name': 'Costa Rica'
    },
    {
      'status': true,
      'name': "Cote d' Ivoire (Ivory Coast)"
    },
    {
      'status': true,
      'name': 'Croatia'
    },
    {
      'status': true,
      'name': 'Cuba'
    },
    {
      'status': true,
      'name': 'Cyprus'
    },
    {
      'status': true,
      'name': 'Czech Republic'
    },
    {
      'status': true,
      'name': 'Denmark'
    },
    {
      'status': true,
      'name': 'Djibouti'
    },
    {
      'status': true,
      'name': 'Dominica'
    },
    {
      'status': true,
      'name': 'Dominican Republic'
    },
    {
      'status': true,
      'name': 'Ecuador'
    },
    {
      'status': true,
      'name': 'Egypt'
    },
    {
      'status': true,
      'name': 'El Salvador'
    },
    {
      'status': true,
      'name': 'Equatorial Guinea'
    },
    {
      'status': true,
      'name': 'Eritrea'
    },
    {
      'status': true,
      'name': 'Estonia'
    },
    {
      'status': true,
      'name': 'Ethiopia'
    },
    {
      'status': true,
      'name': 'Fiji'
    },
    {
      'status': true,
      'name': 'Finland'
    },
    {
      'status': true,
      'name': 'France'
    },
    {
      'status': true,
      'name': 'Gabon'
    },
    {
      'status': true,
      'name': 'Gambia'
    },
    {
      'status': true,
      'name': 'Georgia'
    },
    {
      'status': true,
      'name': 'Germany'
    },
    {
      'status': true,
      'name': 'Ghana'
    },
    {
      'status': true,
      'name': 'Greece'
    },
    {
      'status': true,
      'name': 'Grenada'
    },
    {
      'status': true,
      'name': 'Guatemala'
    },
    {
      'status': true,
      'name': 'Guinea'
    },
    {
      'status': true,
      'name': 'Guinea-Bissau'
    },
    {
      'status': true,
      'name': 'Guyana'
    },
    {
      'status': true,
      'name': 'Haiti'
    },
    {
      'status': true,
      'name': 'Holy See (Vatican City)'
    },
    {
      'status': true,
      'name': 'Honduras'
    },
    {
      'status': true,
      'name': 'Hungary'
    },
    {
      'status': true,
      'name': 'Iceland'
    },
    {
      'status': true,
      'name': 'Indonesia'
    },
    {
      'status': true,
      'name': 'Iran'
    },
    {
      'status': true,
      'name': 'Ireland'
    },
    {
      'status': true,
      'name': 'Italy'
    },
    {
      'status': true,
      'name': 'Jamaica'
    },
    {
      'status': true,
      'name': 'Japan'
    },
    {
      'status': true,
      'name': 'Jordan'
    },
    {
      'status': true,
      'name': 'Kazakhstan'
    },
    {
      'status': true,
      'name': 'Kenya'
    },
    {
      'status': true,
      'name': 'Kiribati'
    },
    {
      'status': true,
      'name': 'Korea(South)'
    },
    {
      'status': true,
      'name': 'Kuwait'
    },
    {
      'status': true,
      'name': 'Kyrgyzstan'
    },
    {
      'status': true,
      'name': 'Laos'
    },
    {
      'status': true,
      'name': 'Latvia'
    },
    {
      'status': true,
      'name': 'Lebanon'
    },
    {
      'status': true,
      'name': 'Lesotho'
    },
    {
      'status': true,
      'name': 'Liberia'
    },
    {
      'status': true,
      'name': 'Liechtenstein'
    },
    {
      'status': true,
      'name': 'Lithuania'
    },
    {
      'status': true,
      'name': 'Luxembourg'
    },
    {
      'status': true,
      'name': 'Macedonia'
    },
    {
      'status': true,
      'name': 'Madagascar'
    },
    {
      'status': true,
      'name': 'Malawi'
    },
    {
      'status': true,
      'name': 'Malaysia'
    },
    {
      '_id': {
        '$oid': '5f67786817a03523d954edcf'
      },
      'status': true,
      'name': 'Maldives'
    },
    {
      'status': true,
      'name': 'Mali'
    },
    {
      'status': true,
      'name': 'Malta'
    },
    {
      'status': true,
      'name': 'Marshall Island'
    },
    {
      'status': true,
      'name': 'Mauritius'
    },
    {
      'status': true,
      'name': 'Mexico'
    },
    {
      'status': true,
      'name': 'Micronesia'
    },
    {
      'status': true,
      'name': 'Moldova'
    },
    {
      'status': true,
      'name': 'Monaco'
    },
    {
      'status': true,
      'name': 'Mongolia'
    },
    {
      'status': true,
      'name': 'Montenegro'
    },
    {
      'status': true,
      'name': 'Morocco'
    },
    {
      'status': true,
      'name': 'Mozambique'
    },
    {
      'status': true,
      'name': 'Myanmar'
    },
    {
      'status': true,
      'name': 'Namibia'
    },
    {
      'status': true,
      'name': 'Nauru'
    },
    {
      'status': true,
      'name': 'Nepal'
    },
    {
      'status': true,
      'name': 'Netherlands'
    },
    {
      'status': true,
      'name': 'New Zealand'
    },
    {
      'status': true,
      'name': 'Nicaragua'
    },
    {
      'status': true,
      'name': 'Niger'
    },
    {
      'status': true,
      'name': 'Kosovo'
    },
    {
      'status': true,
      'name': 'Norway'
    },
    {
      'status': true,
      'name': 'Oman'
    },
    {
      'status': true,
      'name': 'Palau'
    },
    {
      'status': true,
      'name': 'Panama'
    },
    {
      'status': true,
      'name': 'Papua New Guinea'
    },
    {
      'status': true,
      'name': 'Paraguay'
    },
    {
      'status': true,
      'name': 'Peru'
    },
    {
      'status': true,
      'name': 'Philippine'
    },
    {
      'status': true,
      'name': 'Poland'
    },
    {
      'status': true,
      'name': 'Portugal'
    },
    {
      'status': true,
      'name': 'Qatar'
    },
    {
      'status': true,
      'name': 'Romania'
    },
    {
      'status': true,
      'name': 'Russia'
    },
    {
      'status': true,
      'name': 'Rwanda'
    },
    {
      'status': true,
      'name': 'Saint Kitts and Nevis'
    },
    {
      'status': true,
      'name': 'Saint Lucia'
    },
    {
      'status': true,
      'name': 'Saint Vincent and the Grenadines'
    },
    {
      'status': true,
      'name': 'San Marino'
    },
    {
      'status': true,
      'name': 'Sao Tome and Principe'
    },
    {
      'status': true,
      'name': 'Saudi Arabia'
    },
    {
      'status': true,
      'name': 'Senegal'
    },
    {
      'status': true,
      'name': 'Serbia'
    },
    {
      'status': true,
      'name': 'Seychelles'
    },
    {
      'status': true,
      'name': 'Sierra Leone'
    },
    {
      'status': true,
      'name': 'Singapore'
    },
    {
      'status': true,
      'name': 'Slovakia Republic'
    },
    {
      'status': true,
      'name': 'Slovenia'
    },
    {
      'status': true,
      'name': 'Solomon Islands'
    },
    {
      'status': true,
      'name': 'South Africa'
    },
    {
      'status': true,
      'name': 'Spain'
    },
    {
      'status': true,
      'name': 'SriLanka'
    },
    {
      'status': true,
      'name': 'Suriname'
    },
    {
      'status': true,
      'name': 'Sweden'
    },
    {
      'status': true,
      'name': 'Switzerland'
    },
    {
      'status': true,
      'name': 'Tajikistan'
    },
    {
      'status': true,
      'name': 'Tanzania'
    },
    {
      'status': true,
      'name': 'Thailand'
    },
    {
      'status': true,
      'name': 'Timor-Lest'
    },
    {
      'status': true,
      'name': 'Togo'
    },
    {
      'status': true,
      'name': 'Tonga'
    },
    {
      'status': true,
      'name': 'Trinidad & Tobago'
    },
    {
      'status': true,
      'name': 'Tunisia'
    },
    {
      'status': true,
      'name': 'Turkey'
    },
    {
      'status': true,
      'name': 'Turkmenistan'
    },
    {
      'status': true,
      'name': 'Tuvalu'
    },
    {
      'status': true,
      'name': 'U.A.E'
    },
    {
      'status': true,
      'name': 'U.K.'
    },
    {
      'status': true,
      'name': 'U.S.A'
    },
    {
      'status': true,
      'name': 'Uganda'
    },
    {
      'status': true,
      'name': 'Ukraine'
    },
    {
      'status': true,
      'name': 'Uruguay'
    },
    {
      'status': true,
      'name': 'Uzbekistan'
    },
    {
      'status': true,
      'name': 'Vanuatu'
    },
    {
      'status': true,
      'name': 'Venezuela'
    },
    {
      'status': true,
      'name': 'Viet Nam'
    },
    {
      'status': true,
      'name': 'Western Samoa'
    },
    {
      'status': true,
      'name': 'Zambia'
    },
    {
      'status': true,
      'name': 'Zimbabwe'
    }
  ],
  // countries visa status
  'countryStatus': [
    {
      'name': 'Angola',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Argentina',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Austria',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Azerbaijan',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Bahamas',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Bahrain',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Barbados',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Botswana',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Brunei',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Costa Rica',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Finland',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Germany',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Ghana',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Iceland',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Indonesia',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Italy',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Japan',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Jordan',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Korea (South)',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kuwait',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Lithuania',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Luxembourg',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Malaysia',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Maldives',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Malta',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Monaco',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Mozambique',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Nepal',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'New Zealand',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Oman',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Paraguay',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Qatar',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Rwanda',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Saint Kitts and Nevis',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Saint Lucia',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Saudi Arabia',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Singapore',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Spain',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Sri Lanka',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Switzerland',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Tajikistan',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Tanzania',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Thailand',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Tonga',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Trinidad & Tobago',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Tunisia',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Turkey',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'UAE',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Western Samoa',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Zambia',
      'onArrival': true,
      'online': true
    },
    {
      'name': 'Albania',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Andorra',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Antigua and Barbuda',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Australia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Bangladesh',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Belarus',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Belgium',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Belize',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Benin',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Bolivia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Bosnia & Herzegovina',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Brazil',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Bulgaria',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Burkina Faso',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Burundi',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Cambodia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Cameroon',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Canada',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Capbo Verde',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Central African Republic',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Chile',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'China',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Colombia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Comoros',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Congo (Republic)',
      'onArrival': false,
      'online': true
    },
    {
      'name': "Cote d' Ivoire (Ivory Coast)",
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Croatia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Cuba',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Cyprus',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Czech Republic',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Denmark',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Djibouti',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Dominica',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Dominican Republic',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Ecuador',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Egypt',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'El Salvador',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Equatorial Guinea',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Eritrea',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Estonia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Ethiopia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Fiji',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'France',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Gabon',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Gambia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Georgia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Greece',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Grenada',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Guatemala',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Guinea',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Guinea-Bissau',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Guyana',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Haiti',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Holy See (Vatican City)',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Honduras',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Hungary',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Iran',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Ireland',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Jamaica',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kazakhstan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kenya',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kiribati',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Korea(South)',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kyrgyzstan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Laos',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Latvia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Lebanon',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Lesotho',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Liberia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Liechtenstein',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Macedonia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Madagascar',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Malawi',
      'onArrival': false,
      'online': true
    },
    {
      '_id': {
        '$oid': '5f67786817a03523d954edcf'
      }
    },
    {
      'name': 'Mali',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Marshall Island',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Mauritius',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Mexico',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Micronesia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Moldova',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Mongolia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Montenegro',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Morocco',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Myanmar',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Namibia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Nauru',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Netherlands',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Nicaragua',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Niger',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kosovo',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Norway',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Palau',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Panama',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Papua New Guinea',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Peru',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Philippine',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Poland',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Portugal',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Romania',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Russia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Saint Vincent and the Grenadines',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'San Marino',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Sao Tome and Principe',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Senegal',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Serbia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Seychelles',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Sierra Leone',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Slovakia Republic',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Slovenia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Solomon Islands',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'South Africa',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'SriLanka',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Suriname',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Sweden',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Timor-Lest',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Togo',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Turkmenistan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Tuvalu',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'U.A.E',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'U.K.',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'U.S.A',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Uganda',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Ukraine',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Uruguay',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Uzbekistan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Vanuatu',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Venezuela',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Viet Nam',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Zimbabwe',
      'onArrival': false,
      'online': true
    }
  ]
};
