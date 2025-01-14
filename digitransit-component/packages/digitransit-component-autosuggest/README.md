# @digitransit-component/digitransit-component-autosuggest

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## DTAutosuggest

**Extends React.Component**

### Parameters

-   `props`  

### Examples

```javascript
const searchContext = {
  isPeliasLocationAware: false // true / false does Let Pelias suggest based on current user location
  minimalRegexp: undefined // used for testing min. regexp. For example: new RegExp('.{2,}'),
  lineRegexp: undefined //  identify searches for route numbers/labels: bus | train | metro. For example: new RegExp(
   //   '(^[0-9]+[a-z]?$|^[yuleapinkrtdz]$|(^m[12]?b?$))',
   //  'i',
   //  ),
  URL_PELIAS: '' // url for pelias searches
  feedIDs: ['HSL', 'HSLLautta'] // FeedId's like  [HSL, HSLLautta]
  geocodingSources: ['oa','osm','nlsfi']  // sources for geocoding
  geocodingSearchParams; {}  // Searchparmas fro geocoding
  getFavouriteLocations: () => ({}),    // Function that returns array of favourite locations.
  getFavouriteStops: () => ({}),        // Function that returns array of favourite stops.
  getLanguage: () => ({}),              // Function that returns current language.
  getFavouriteRoutes: () => ({}),       // Function that returns array of favourite routes.
  getPositions: () => ({}),             // Function that returns user's geolocation.
  getRoutesQuery: () => ({}),           // Function that returns query for fetching routes.
  getAllBikeRentalStations: () => ({}), // Function that returns all bike rental stations from graphql API.
  getStopAndStationsQuery: () => ({}),  // Function that fetches favourite stops and stations from graphql API.
  getFavouriteRoutesQuery: () => ({}),  // Function that returns query for fetching favourite routes.
  getFavouriteBikeRentalStations: () => ({}),  // Function that returns favourite bike rental station.
  getFavouriteBikeRentalStationsQuery: () => ({}), // Function that returns query for fetching favourite bike rental stations.
  startLocationWatch: () => ({}),       // Function that locates users geolocation.
  saveSearch: () => ({}),               // Function that saves search to old searches store.
  clearOldSearches: () => ({}),         // Function that clears old searches store.
  getFutureRoutes: () => ({}),          // Function that return future routes
  saveFutureRoute: () => ({}),          // Function that saves a future route
  clearFutureRoutes: () => ({}),        // Function that clears future routes
};
const lang = 'fi'; // en, fi or sv
const onSelect = () => {
   // Funtionality when user selects a suggesions. No default implementation is given.
   return null;
};
const onClear = () => {
   // Called  when user clicks the clear search string button. No default implementation.
   return null;
};
const transportMode = undefined;
const placeholder = "stop-near-you";
const targets = ['Locations', 'Stops', 'Routes']; // Defines what you are searching. all available options are Locations, Stops, Routes, BikeRentalStations, FutureRoutes, MapPosition and CurrentPosition. Leave empty to search all targets.
const sources = ['Favourite', 'History', 'Datasource'] // Defines where you are searching. all available are: Favourite, History (previously searched searches) and Datasource. Leave empty to use all sources.
return (
 <DTAutosuggest
   appElement={appElement} // Required. Root element's id. Needed for react-modal component.
   searchContext={searchContext}
   icon="origin" // Optional String for icon that is shown left of searchfield. used with Icon library
   id="origin" // used for style props and info for component.
   placeholder={placeholder} // String that is showns initally in search field
   value="" // e.g. user typed string that is shown in search field
   onSelect={onSelect}
   onClear={onClear}
   autoFocus={false} // defines that should this field be automatically focused when page is loaded.
   lang={lang}
   transportMode={transportMode} // transportmode with which we filter the routes, e.g. route-BUS
   geocodingSize={10} // defines how many stops and stations to fetch from geocoding. Useful if you want to filter the results and still get a reasonable amount of suggestions.
   filterResults={results => return results} // Optional filtering function for routes and stops
   handelViaPoints={() => return null } // Optional Via point handling logic. This is currently managed with DTAutosuggestpanel by default, but if DTAutosuggest is used seperatelly own implementation must be provided.
   focusChange={() => return null} // When suggestion is selected, handle changing focus. This is currently managed with DTAutosuggestpanel by default, but if DTAutosuggest is used seperatelly own implementation must be provided.
   storeRef={() => return null} // Functionality to store refs. Currenlty managed with DTAutosuggestpanel by default, but if DTAutosuggest is used seperatelly own implementation must be provided.
   sources={sources}
   targets={targets}
   isMobile  // Optional. Defaults to false. Whether to use mobile search.
```

<!-- This file is automatically generated. Please don't edit it directly:
if you find an error, edit the source file (likely index.js), and re-run
./scripts/generate-readmes in the digitransit-component project. -->

---

This module is part of the Digitransit-ui project. It is maintained in the
[HSLdevcom/digitransit-ui](https://github.com/HSLdevcom/digitransit-ui) repository, where you can create
PRs and issues.

### Installation

Install this module individually:

```sh
$ npm install @digitransit-component/digitransit-component-autosuggest
```

Or install the digitransit-component module that includes it as a class:

```sh
$ npm install @digitransit-component/digitransit-component
```
