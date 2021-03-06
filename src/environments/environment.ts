// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  algolia: {
    appId: 'L0UHIHBWFY',
    searchKey: '316a7eaec965caaf8d7a40e567256ad2',
  },
  stripe: {
    publicKey:
      'pk_test_51IAxOHL5aIglv3p1nnjCC9kb1A8YogxwH9VWWMHFGMSqKWjtbxhefSWqSAQUDuGJU1QglLtxl68Ay3AKWplD9UqW00TOLIaesT',
    price: 'price_1IHOg6L5aIglv3p1TLgSqHM5',
    tax_rates: 'txr_1IGQEHL5aIglv3p1MCIlAq2N',
  },
  firebase: {
    apiKey: 'AIzaSyCl5Wm3xB84Ix78aRirIVo4QtMwIgmbDt0',
    authDomain: 'blanky-2fc41.firebaseapp.com',
    databaseURL: 'https://blanky-2fc41.firebaseio.com',
    projectId: 'blanky-2fc41',
    storageBucket: 'blanky-2fc41.appspot.com',
    messagingSenderId: '423573406682',
    appId: '1:423573406682:web:3875da92ba30922d30b6e3',
    measurementId: 'G-2WLY5S3DGS',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
