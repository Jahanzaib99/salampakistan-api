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
      'status': true,
      'name': 'Angola'
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
      'name': 'Barbados'
    },
    {
      'status': true,
      'name': 'Botswana'
    },
    {
      'status': true,
      'name': 'Brunei'
    },
    {
      'status': true,
      'name': 'Canada'
    },
    {
      'status': true,
      'name': 'China'
    },
    {
      'status': true,
      'name': 'Costa Rica'
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
      'name': 'Germany'
    },
    {
      'status': true,
      'name': 'Ghana'
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
      'name': 'Italy'
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
      'name': 'Korea (South)'
    },
    {
      'status': true,
      'name': 'Kuwait'
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
      'name': 'Malaysia'
    },
    {
      'status': true,
      'name': 'Maldives'
    },
    {
      'status': true,
      'name': 'Malta'
    },
    {
      'status': true,
      'name': 'Monaco'
    },
    {
      'status': true,
      'name': 'Mozambique'
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
      'name': 'Norway'
    },
    {
      'status': true,
      'name': 'Oman'
    },
    {
      'status': true,
      'name': 'Paraguay'
    },
    {
      'status': true,
      'name': 'Philippines'
    },
    {
      'status': true,
      'name': 'Poland'
    },
    {
      'status': true,
      'name': 'Qatar'
    },
    {
      'status': true,
      'name': 'Russian Federation'
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
      'name': 'Saudi Arabia'
    },
    {
      'status': true,
      'name': 'Singapore'
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
      'name': 'Sri Lanka'
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
      'name': 'United Arab Emirates'
    },
    {
      'status': true,
      'name': 'United Kingdom'
    },
    {
      'status': true,
      'name': 'United States of America (USA)'
    },
    {
      'status': true,
      'name': 'Western Samoa'
    },
    {
      'status': true,
      'name': 'Zambia'
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
      'name': 'Afghanistan'
    },
    {
      'status': true,
      'name': 'Algeria'
    },
    {
      'status': true,
      'name': 'Andorra'
    },
    {
      'status': true,
      'name': 'Antigua and Barbuda'
    },
    {
      'status': true,
      'name': 'Bangladesh'
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
      'name': 'Bhutan'
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
      'name': 'Brazil'
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
      'name': 'Capbo Verde'
    },
    {
      'status': true,
      'name': 'Central African Republic'
    },
    {
      'status': true,
      'name': 'Chad'
    },
    {
      'status': true,
      'name': 'Chile'
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
      'name': 'Congo Democratic Republic'
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
      'name': 'Democratic People Republic of Korea'
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
      'name': 'Iraq'
    },
    {
      'status': true,
      'name': 'Ireland'
    },
    {
      'status': true,
      'name': 'Jamaica'
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
      'name': 'Kosovo'
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
      'name': 'Mali'
    },
    {
      'status': true,
      'name': 'Marshall Island'
    },
    {
      'status': true,
      'name': 'Mauritania'
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
      'name': 'Nicaragua'
    },
    {
      'status': true,
      'name': 'Niger'
    },
    {
      'status': true,
      'name': 'Nigeria'
    },
    {
      'status': true,
      'name': 'Palau'
    },
    {
      'status': true,
      'name': 'Palestinian Territory, Occupied'
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
      'name': 'Peru'
    },
    {
      'status': true,
      'name': 'Portugal'
    },
    {
      'status': true,
      'name': 'Romania'
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
      'name': 'Somalia'
    },
    {
      'status': true,
      'name': 'South Sudan'
    },
    {
      'status': true,
      'name': 'State of Libya'
    },
    {
      'status': true,
      'name': 'Sudan'
    },
    {
      'status': true,
      'name': 'Suriname'
    },
    {
      'status': true,
      'name': 'Swaziland'
    },
    {
      'status': true,
      'name': 'Syria'
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
      'name': 'Turkmenistan'
    },
    {
      'status': true,
      'name': 'Tuvalu'
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
      'name': 'Vietnam'
    },
    {
      'status': true,
      'name': 'Yemen'
    },
    {
      'status': true,
      'name': 'Zimbabwe'
    }
  ],
  // countries visa status

  'countryStatus': [
    {
      'name': 'Afghanistan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Albania',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Algeria',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Andorra',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Angola',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Antigua and Barbuda',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Argentina',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Australia',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Austria',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Azerbaijan',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Bahamas',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Bahrain',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Bangladesh',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Barbados',
      'onArrival': true,
      'online': false
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
      'name': 'Bhutan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Bolivia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Bosnia and Herzegovina',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Botswana',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Brazil',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Brunei',
      'onArrival': true,
      'online': false
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
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Cape Verde',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Central African Republic',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Chad',
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
      'onArrival': true,
      'online': false
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
      'name': 'Congo Democratic Republic',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Costa Rica',
      'onArrival': true,
      'online': false
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
      'name': 'Democratic People Republic of Korea',
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
      'name': 'Finland',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'France',
      'onArrival': true,
      'online': false
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
      'name': 'Germany',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Ghana',
      'onArrival': true,
      'online': false
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
      'name': 'Iceland',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Indonesia',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Iran',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Iraq',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Ireland',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Italy',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Jamaica',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Japan',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Jordan',
      'onArrival': true,
      'online': false
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
      'name': 'Korea (South)',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Kosovo',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Kuwait',
      'onArrival': true,
      'online': false
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
      'name': 'Lithuania',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Luxembourg',
      'onArrival': true,
      'online': false
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
      'name': 'Malaysia',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Maldives',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Mali',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Malta',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Marshall Islands',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Mauritania',
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
      'name': 'Monaco',
      'onArrival': true,
      'online': false
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
      'name': 'Mozambique',
      'onArrival': true,
      'online': false
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
      'name': 'Nepal',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Netherlands',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'New Zealand',
      'onArrival': true,
      'online': false
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
      'name': 'Nigeria',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Norway',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Oman',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Palau',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Palestinian Territory, Occupied',
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
      'name': 'Paraguay',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Peru',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Philippines',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Poland',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Portugal',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Qatar',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Romania',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Russian Federation',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Rwanda',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Saint Kitts and Nevis',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Saint Lucia',
      'onArrival': true,
      'online': false
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
      'name': 'Saudi Arabia',
      'onArrival': true,
      'online': false
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
      'name': 'Singapore',
      'onArrival': true,
      'online': false
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
      'name': 'Somalia',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'South Africa',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'South Sudan',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Spain',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Sri Lanka',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'State of Libya',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Sudan',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Suriname',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Swaziland',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Sweden',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Switzerland',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Syria',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Tajikistan',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Tanzania',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Thailand',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Timor-Leste',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Togo',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Tonga',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Trinidad and Tobago',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Tunisia',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Turkey',
      'onArrival': true,
      'online': false
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
      'name': 'United Arab Emirates',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'United Kingdom',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'United States of America (USA)',
      'onArrival': true,
      'online': false
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
      'name': 'Vietnam',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Western Samoa',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Yemen',
      'onArrival': false,
      'online': true
    },
    {
      'name': 'Zambia',
      'onArrival': true,
      'online': false
    },
    {
      'name': 'Zimbabwe',
      'onArrival': false,
      'online': true
    }
  ]
};
