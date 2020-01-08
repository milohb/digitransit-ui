/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'hb';
const APP_TITLE = 'Mobil in Herrenberg';
const APP_DESCRIPTION = '';
const API_URL = process.env.API_URL || 'https://api.mobil-in-herrenberg.de';
const MAP_URL = process.env.MAP_URL || 'https://maps.wikimedia.org/osm-intl/';
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || `https://pelias.locationiq.org/v1`;
const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;
const GEOJSON_LAYERS_BASE_URL = process.env.GEOJSON_LAYERS_BASE_URL || 'http://opentripplanner-data-con-hb:8080/routing-data/v2/hb/';
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
  process.env.STATIC_MESSAGE_URL ||
  '/assets/messages/message.hb.json';

const walttiConfig = require('./waltti').default;

const minLat = 48.55525;
const maxLat = 48.64040;
const minLon = 8.78597;
const maxLon = 8.98613;

export default configMerger(walttiConfig, {
  CONFIG,
  URL: {
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/routers/hb/`,
    MAP: {
      default: MAP_URL,
    },
    STOP_MAP: `${API_URL}/map/v1/stop-map/`,
    DYNAMICPARKINGLOTS_MAP: `${API_URL}/map/v1/hb-parking-map/`,

    PELIAS: `${GEOCODING_BASE_URL}/search${LOCATIONIQ_API_KEY ? '?api_key=' + LOCATIONIQ_API_KEY : ''}`,
    PELIAS_REVERSE_GEOCODER: `${GEOCODING_BASE_URL}/reverse${LOCATIONIQ_API_KEY ? '?api_key=' + LOCATIONIQ_API_KEY : ''}`,
  },

  availableLanguages: ['de', 'en'],
  defaultLanguage: 'de',

  appBarLink: { name: 'Herrenberg.de', href: 'https://www.herrenberg.de' },

  contactName: {
    de: 'transportkollektiv',
    default: 'transportkollektiv',
  },

  colors: {
    primary: '#9fc727',
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },

  dynamicParkingLots: {
    showDynamicParkingLots: false,
    dynamicParkingLotsSmallIconZoom: 16,
    dynamicParkingLotsMinZoom: 14
  },

  mergeStopsByCode: true,

  title: APP_TITLE,

  favicon: './app/configurations/images/hb/favicon.png',

  meta: {
    description: APP_DESCRIPTION,
  },

  textLogo: true,
  GTMid: '',

  timezoneData: 'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o 00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
    attribution: '&copy; <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>'
  },

  feedIds: ['hb'],
  searchSources: ['oa', 'osm'],

  searchParams: {
    'boundary.rect.min_lat': 48.4521,
    'boundary.rect.max_lat': 48.85,
    'boundary.rect.min_lon': 8.5,
    'boundary.rect.max_lon': 9.2780,
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
  ],

  nationalServiceLink: { name: 'Fahrplanauskunft efa-bw', href: 'https://www.efa-bw.de' },

  defaultEndpoint: {
    address: 'ZOB Herrenberg',
    lat: 48.5942066,
    lon: 8.8644041,
  },

  defaultOrigins: [
    {
      icon: 'icon-icon_bus',
      label: 'ZOB Herrenberg',
      lat: 48.5942066,
      lon: 8.8644041,
    },
    {
      icon: 'icon-icon_star',
      label: 'Krankenhaus',
      lat: 48.59174,
      lon: 8.87536,
    },
    {
      icon: 'icon-icon_star',
      label: 'Waldfriedhof / Schönbuchturm',
      lat: 48.6020352, 
      lon: 8.9036348,
    },
  ],

  footer: {
    content: [
      { label: `© Stadt Herrenberg ${YEAR}` },
      {},
      {
        name: 'about-this-service',
        nameEn: 'About this service',
        route: '/tietoja-palvelusta',
        icon: 'icon-icon_info',
      },
      {
        name: 'imprint',
        nameEn: 'Imprint',
        href: 'https://www.herrenberg.de/impressum',
      },
      {
        name: 'privacy',
        nameEn: 'Privacy',
        href: 'https://www.herrenberg.de/datenschutz',
      },
    ],
  },

  aboutThisService: {
    de: [
      {
        header: 'Über diesen Dienst',
        paragraphs: [
          'Mobil-in-Herrenberg ist eine Reiseplannungs-Anwendung für die Region Herrenberg. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, und PKW-Routing, inklusive Park&Ride.',
          
        ],
      },
      {
        header: 'Digitransit Plattform',
        paragraphs: [
          'Dieser Dienst basiert auf der Digitransit Platform und dem Backend-Dienst OpenTripPlanner. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beteiligten.',        ],
      },
      {
        header: 'Datenquellen',
        paragraphs: [
          'Kartendaten: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
          'ÖPNV-Daten: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> und der <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
          'Alle Angaben ohne Gewähr.'
        ],
      },
    ],
    en: [
      {
        header: 'About this service',
        paragraphs: [
          'This service is provided by Hb for route planning in Hb region. The service covers public transport, walking, cycling, and some private car use. Service is built on Digitransit platform and OpenTriPlanner.',
        ],
      },
      {
        header: 'Digitransit platform',
        paragraphs: [
          'The Digitransit service platform is an open source routing platform developed by HSL and Traficom. It builds on OpenTripPlanner by Conveyal. Enhancements by Transportkollektiv and MITFAHR|DE|ZENTRALE. All software is open source. Thanks to everybody working on this!',
        ],
      },
      {
        header: 'Data sources',
        paragraphs: [
          'Map data: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap contributors</a>',
          'Public transit data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> and <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
          'No responsibility is accepted for the accuracy of this information.'
        ],
      },
    ],
  },

  redirectReittiopasParams: false,

  themeMap: {
    hb: 'hb',
  },

  transportModes: {
    rail: {
      availableForSelection: true,
      defaultValue: true,
    },

    tram: {
      availableForSelection: false,
      defaultValue: false,
    },

    subway: {
      availableForSelection: false,
      defaultValue: false,
    },

    citybike: {
      availableForSelection: false,
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false,
    },
  },

  streetModes: {
    public_transport: {
      availableForSelection: true,
      defaultValue: true,
      exclusive: false,
      icon: 'bus-withoutBox',
    },

    walk: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'walk',
    },

    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'bicycle-withoutBox',
    },

    car: {
      availableForSelection: false,
      defaultValue: false,
      exclusive: false,
      icon: 'car-withoutBox',
    },

    car_park: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: false,
      icon: 'car-withoutBox',
    }
  },
  
  geoJson: {
    layers: [
      {
        name: {
          fi: '',
          en: 'Bicycle parkings',
          de: 'Fahrrad-Abstellanlagen',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'bicycle-parking.geojson',
      },
      // bicycleinfrastructure includes shops, repair stations, 
      {
        name: {
          fi: '',
          en: 'Bicycle infrastructure',
          de: "Rund um's Fahrrad",
        },
        url: GEOJSON_LAYERS_BASE_URL + 'bicycleinfrastucture.geojson',
      },
      // sharing options
      {
        name: {
          fi: '',
          en: 'Taxi & Sharing',
          de: 'Taxi & Sharing-Angebot',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'taxi-and-sharing.geojson',
      },
      {
        name: {
          fi: '',
          en: 'Car parkings',
          de: 'Parken (& Reisen)',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'car-parking.geojson',
      },
      // Charging stations 
      {
        name: {
          fi: '',
          en: 'Charging stations',
          de: 'Ladestationen',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'charging.geojson',
      },
      // bike charging stations in Stuttgart
      {
        name: {
          fi: '',
          en: 'Bicycle charging stations',
          de: 'Fahrradladestationen',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'bicyclechargingstation.geojson',
      },
      // Bike rental places in Stuttgart
      {
        name: {
          fi: '',
          en: 'Bicycle rental places',
          de: 'Fahrradverleih',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'bikerental.geojson',
      },
      // park and ride places
      {
        name: {
          fi: '',
          en: 'Park and Ride',
          de: 'Park-Und-Ride',
        },
        url: GEOJSON_LAYERS_BASE_URL + 'parkandride.geojson',
      }
      /*,
       Had to comment out since there is no bike monitoring stations
        in Herrenberg's neighbourhood and so would return an error.
      // bike monitoring stations
      {
        name: {
          fi: '',
          en: 'Bicycle monitoring stations',
          de: 'Fahrradzählstellen',
        },
        url: 'http://opentripplanner-data-con-hb:8080/layers/bicyclemonitoringstation.geojson',
      }
      */
    ],
},
staticMessagesUrl: STATIC_MESSAGE_URL,
  
});
