<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // TODO: Make truncate method.
        // Countries: https://countrycode.org

        DB::table('Countries')->insert([
            // Countries that begin with A
            ['country' => 'Afghanistan'],
            ['country' => 'Albania'],
            ['country' => 'Algeria'],
            ['country' => 'American Samoa'],
            ['country' => 'Andorra'],
            ['country' => 'Angola'],
            ['country' => 'Anguilla'],
            ['country' => 'Antartica'],
            ['country' => 'Antigua and Barbuda'],
            ['country' => 'Argentina'],
            ['country' => 'Armenia'],
            ['country' => 'Aruba'],
            ['country' => 'Australia'],
            ['country' => 'Austria'],
            ['country' => 'Azerbaijan'],

            // Countries that begin with B
            ['country' => 'Bahamas'],
            ['country' => 'Bahrain'],
            ['country' => 'Bangladesh'],
            ['country' => 'Barbados'],
            ['country' => 'Belarus'],
            ['country' => 'Belguim'],
            ['country' => 'Belize'],
            ['country' => 'Benin'],
            ['country' => 'Bermuda'],
            ['country' => 'Bhutan'],
            ['country' => 'Bolivia'],
            ['country' => 'Bonaire, Sint Eustatius ans Saba'],
            ['country' => 'Bosnia and Herzegovina'],
            ['country' => 'Botswana'],
            ['country' => 'Bouvet Island'],
            ['country' => 'Brazil'],
            ['country' => 'British Indian Ocean Territory'],
            ['country' => 'Brunei'],
            ['country' => 'Bulgaria'],
            ['country' => 'Burkina Faso'],
            ['country' => 'Burundi'],

            // Countries that begin with a C.
            ['country' => 'Cambodia'],
            ['country' => 'Cameroon'],
            ['country' => 'Canada'],
            ['country' => 'Cape Verde'],
            ['country' => 'Cayman Islands'],
            ['country' => 'Central African Republic'],
            ['country' => 'Chad'],
            ['country' => 'Chile'],
            ['country' => 'China'],
            ['country' => 'Christmas Island'],
            ['country' => 'Cocos (Keeling) Islands'],
            ['country' => 'Colombia'],
            ['country' => 'Comoros'],
            ['country' => 'Cook islands'],
            ['country' => 'Costa Rica'],
            ['country' => 'Cote de azur'],
            ['country' => 'Croatia'],
            ['country' => 'Cuba'],
            ['country' => 'Curacao'],
            ['country' => 'Cyprus'],
            ['country' => 'Czech Republic'],

            // Countries that begin with a D.
            ['country' => 'Democratic Republic of the congo.'],
            ['country' => 'Denmark'],
            ['country' => 'Djibouti'],
            ['country' => 'Dominica'],
            ['country' => 'Dominican Republic'],

            // Countries that begin with a E.
            ['country' => 'Ecuador'],
            ['country' => 'Egypt'],
            ['country' => 'El Salvador'],
            ['country' => 'Equatorial Guinea'],
            ['country' => 'Eritrea'],
            ['country' => 'Estonia'],
            ['country' => 'Ethiopia'],

            // Countries that begin with an F
            ['country' => 'Falkland islands'],
            ['country' => 'Faroe Islands'],
            ['country' => 'Fiji'],
            ['country' => 'Finland'],
            ['country' => 'France'],
            ['country' => 'French Guiana'],
            ['country' => 'French Polynesia'],
            ['country' => 'French Southern Territory'],

            // Countries started with an G.
            ['country' => 'Gabon'],
            ['country' => 'Gambia'],
            ['country' => 'Georgia'],
            ['country' => 'Germany'],
            ['country' => 'Ghana'],
            ['country' => 'Gibraltar'],
            ['country' => 'Greece'],
            ['country' => 'Greenland'],
            ['country' => 'Grenada'],
            ['country' => 'Guadaloupe'],
            ['country' => 'Guam'],
            ['country' => 'Guatamala'],
            ['country' => 'Guernsey'],
            ['country' => 'Guinea'],
            ['country' => 'Guinea-Bissau'],
            ['country' => 'Guyana'],

            // Countries that started with an H.
            ['country' => 'Haiti'],
            ['country' => 'Heard Island and McDonals Island'],
            ['country' => 'Honduras'],
            ['country' => 'Hong Kong'],
            ['country' => 'Hungary'],

            // Countries that started with an I.
            ['country' => 'Iceland'],
            ['country' => 'India'],
            ['country' => 'Indonesia'],
            ['country' => 'Iran'],
            ['country' => 'Iraq'],
            ['country' => 'Ireland'],
            ['country' => 'Isle of Man'],
            ['country' => 'Israel'],
            ['country' => 'Italy'],

            // Countries that started with an J
            ['country' => 'Jamaica'],
            ['country' => 'Japan'],
            ['country' => 'Jersey'],
            ['country' => 'Jordan'],

            // Countries that started with an K.
            ['country' => 'Kazakhstan'],
            ['country' => 'Kenya'],
            ['country' => 'Kiribati'],
            ['country' => 'Kosovo'],
            ['country' => 'Kuwait'],
            ['country' => 'Kyrgyzstan'],

            // Countries that started with an L
            ['country' => 'Laos'],
            ['country' => 'Latvia'],
            ['country' => 'Lebanon'],
            ['country' => 'Lesotho'],
            ['country' => 'Liberia'],
            ['country' => 'Libya'],
            ['country' => 'Liechtenstein'],
            ['country' => 'Lithuania'],
            ['country' => 'Luxembourg'],

            // Countries that started with an M.
            ['country' => 'Macao'],
            ['country' => 'Macedonia'],
            ['country' => 'Madagascar'],
            ['country' => 'Malawi'],
            ['country' => 'Malaysia'],
            ['country' => 'Maldives'],
            ['country' => 'Mali'],
            ['country' => 'Malta'],
            ['country' => 'Marshall Islands'],
            ['country' => 'Martinique'],
            ['country' => 'Mauritinia'],
            ['country' => 'Mauritius'],
            ['country' => 'Mayotte'],
            ['country' => 'Mexico'],
            ['country' => 'Micronesia'],
            ['country' => 'Moldava'],
            ['country' => 'Monaco'],
            ['country' => 'Mongolia'],
            ['country' => 'Montenegro'],
            ['country' => 'Montserrat'],
            ['country' => 'Morocco'],
            ['country' => 'Mozambique'],
            ['country' => 'Myanmar (Burma)'],

            // Countries that started with an N
            ['country' => 'Namibia'],
            ['country' => 'Nauru'],
            ['country' => 'Nepal'],
            ['country' => 'Netherlands'],
            ['country' => 'New Caledonia'],
            ['country' => 'New Zealand'],
            ['country' => 'Nicaragua'],
            ['country' => 'Niger'],
            ['country' => 'Nigeria'],
            ['country' => 'Niue'],
            ['country' => 'Norfolk Island'],
            ['country' => 'North Korea'],
            ['country' => 'Northern Mariana Islands'],
            ['country' => 'Norway'],

            // Countries started with an O.
            ['country' => 'Oman'],

            // Countries started with an P.
            ['country' => 'Pakistan'],
            ['country' => 'Palau'],
            ['country' => 'Palestine'],
            ['country' => 'Panama'],
            ['country' => 'Papua New Guinea'],
            ['country' => 'Paraguay'],
            ['country' => 'Peru'],
            ['country' => 'Phillipines'],
            ['country' => 'Pitcaim'],
            ['country' => 'Poland'],
            ['country' => 'Portugal'],
            ['country' => 'Puerto Rico'],

            // Countries started with an Q.
            ['country' => 'Qatar'],

            // Countries started with an R.
            ['country' => 'Reunion'],
            ['country' => 'Romania'],
            ['country' => 'Russia'],
            ['country' => 'Rwanda'],

            // Countries started with an S.
            ['country' => 'Saint Barthelemy'],
            ['country' => 'Saint Helena'],
            ['country' => 'Saint Kitts and Nevis'],
            ['country' => 'Saint Lucia'],
            ['country' => 'Saint Martin'],
            ['country' => 'Saint Pierre and Miquelon'],
            ['country' => 'Saint Vincent and the Grenadines'],
            ['country' => 'Samoa'],
            ['country' => 'San Marino'],
            ['country' => 'San Tome and Principe'],
            ['country' => 'Saudi Arabia'],
            ['country' => 'Senegal'],
            ['country' => 'Serbia'],
            ['country' => 'Seychelles'],
            ['country' => 'Sierra Leone'],
            ['country' => 'Singapore'],
            ['country' => 'Sint Maarten'],
            ['country' => 'Slovakia'],
            ['country' => 'Slovenia'],
            ['country' => 'Solomon Islands'],
            ['country' => 'Somalia'],
            ['country' => 'South Africa'],
            ['country' => 'South Georgia and the South Sandwich Islands'],
            ['country' => 'South Korea'],
            ['country' => 'Spain'],
            ['country' => 'Sri Lanka'],
            ['country' => 'Sudan'],
            ['country' => 'Suriname'],
            ['country' => 'Svalbard and Jan Mayen'],
            ['country' => 'Swaziland'],
            ['country' => 'Sweden'],
            ['country' => 'Switzerland'],
            ['country' => 'Syria'],

            // Countries started with an T.
            ['country' => 'Taiwan'],
            ['country' => 'Tajikistan'],
            ['country' => 'Tanzania'],
            ['country' => 'Thailand'],
            ['country' => 'Timor-Leste (East Timot)'],
            ['country' => 'Togo'],
            ['country' => 'Tokelau'],
            ['country' => 'Tonga'],
            ['country' => 'Trinidad and Tobago'],
            ['country' => 'Tunesia'],
            ['country' => 'Turkey'],
            ['country' => 'Turkmenistan'],
            ['country' => 'Turks and Caicos Islands'],
            ['country' => 'Tuvalu'],

            // Countries started with an U.
            ['country' => 'Uganda'],
            ['country' => 'Ukraine'],
            ['country' => 'United Arab Emirates'],
            ['country' => 'United Kingdom'],
            ['country' => 'United States'],
            ['country' => 'United States Minor Outlying Islands'],
            ['country' => 'Uruguay'],
            ['country' => 'Uzbekistan'],

            // Countries started with an V.
            ['country' => 'Vanuatu'],
            ['country' => 'Vatican City'],
            ['country' => 'Venezuela'],
            ['country' => 'Vietnam'],
            ['country' => 'Virigin Islands (British)'],
            ['country' => 'Vigin Islands (US)'],


            // Countries started with an W
            ['country' => 'Wallis and Futuna'],
            ['country' => 'Western Sahara'],

            // Countries started with an Y.
            ['country' => 'Yemen'],

            // Countries started with an Z
            ['country' => 'Zambia'],
            ['country' => 'Zimbabwe']
        ]);
    }

}
