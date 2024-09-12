/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'planner';
const APP_TITLE = 'otp planner nordwest';
const APP_DESCRIPTION = 'Mit offenen Daten im Nordwesten gut unterwegs';
const API_URL = process.env.API_URL || 'https://planner.25stunden.de';
const MAP_URL = process.env.MAP_URL || 'https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMITRANSPARENT_MAP_URL || "https://tiles.stadtnavi.eu/satellite-overlay/{z}/{x}/{y}{r}.png";
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon.stadtnavi.eu/pelias/v1";
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.planner.json';

const walttiConfig = require('./config.waltti.js').default;

// const realtimeHbg = require('./realtimeUtils').default.hbg;
const hostname = new URL(API_URL);
// realtimeHbg.mqtt = `wss://${hostname.host}/mqtt/`;

// Bremen
const maxLat = 53.1323;
const minLat = 53.0187;
const maxLon = 8.9555;
const minLon = 8.7622;

export default configMerger(walttiConfig, {
    CONFIG,
    URL: {
        // otp2 router
        OTP: process.env.OTP_URL || `${API_URL}/otp/routers/default/index/graphql`,
        MAP: {
            default: MAP_URL,
            // satellite: 'https://tiles.stadtnavi.eu/orthophoto/{z}/{x}/{y}.jpg',
            // semiTransparent: SEMI_TRANSPARENT_MAP_URL,
            // bicycle: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        },
        STOP_MAP: `${API_URL}/otp/routers/default/index/graphql/vectorTiles/stops/`,
        PELIAS: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL}/search`,
        PELIAS_REVERSE_GEOCODER: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/reverse`,
        PELIAS_PLACE: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/place`,
        FONT: '' // Do not use Google fonts.
    },

    mainMenu: {
        showDisruptions: false,
    },

    availableLanguages: ['de', 'en'],
    defaultLanguage: 'de',

    // MATOMO_URL: process.env.MATOMO_URL,

    /* disable the "next" column of the Route panel as it can be confusing sometimes: https://github.com/stadtnavi/digitransit-ui/issues/167 */
    displayNextDeparture: true,
    // maxWalkDistance: 15000, from Herrenberg
    maxWalkDistance: 5000,

    optimize: "TRIANGLE",

    defaultSettings: {
        optimize: "TRIANGLE",
        safetyFactor: 0.4,
        slopeFactor: 0.3,
        timeFactor: 0.3,
    },

    defaultOptions: {
        // 2 / 4 / 6 km/h, values im m/s
        walkSpeed: [0.55, 1.11, 1.67],
    },

    itinerary: {
        delayThreshold: 60,
    },

    appBarLink: {
        name: 'VBN',
        href: 'https://www.vbn.de',
        target: '_blank'
    },

    contactName: {
        de: 'milohb',
        default: 'milohb',
    },

    colors: {
        primary: '#9fc727',
        iconColors: {
            'mode-bus': '#ff0000',
            'mode-car': '#007AC9',
            'mode-rail': '#008000',
            'mode-charging-station': '#00b096',
            'mode-bike-park': '#005ab4',
        },
    },

    sprites: 'assets/svg-sprite.hb.svg',

    socialMedia: {
        title: APP_TITLE,
        description: APP_DESCRIPTION,

        image: {
            url: '/img/stadtnavi-social-media-card.png',
            width: 600,
            height: 300,
        },

        twitter: {
            card: 'summary_large_image',
            site: '@TUGHerrenberg',
        },
    },

/*    dynamicParkingLots: {
        showDynamicParkingLots: true,
        dynamicParkingLotsSmallIconZoom: 14,
        dynamicParkingLotsMinZoom: 14
    },*/

    // bikeParks: {
    //     show: true,
    //     smallIconZoom: 14,
    //     minZoom: 14
    // },

    // weatherStations: {
    //     show: true,
    //     smallIconZoom: 17,
    //     minZoom: 15
    // },

    // chargingStations: {
    //     show: true,
    //     smallIconZoom: 14,
    //     minZoom: 14
    // },
/*

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            regiorad: {
                icon: 'regiorad',
                name: {
                    de: 'RegioRad',
                    en: 'RegioRad',
                },
                type: 'citybike',
                url: {
                    de: 'https://www.regioradstuttgart.de/de',
                    en: 'https://www.regioradstuttgart.de/',
                },
                visibleInSettingsUi: true,
            },
            taxi: {
                icon: 'taxi',
                name: {
                    de: 'Taxi',
                    en: 'Taxi',
                },
                type: 'taxi',
                visibleInSettingsUi: false,
            },
            "car-sharing": {
                icon: 'car-sharing',
                name: {
                    de: 'Carsharing',
                    en: 'Car sharing',
                },
                type: 'car-sharing',
                url: {
                    de: 'https://stuttgart.stadtmobil.de/privatkunden/',
                    en: 'https://stuttgart.stadtmobil.de/privatkunden/',
                },
                visibleInSettingsUi: false,
            },
            "cargo-bike": {
                icon: 'cargobike',
                name: {
                    de: 'Lastenrad Herrenberg',
                    en: 'Cargo bike Herrenberg',
                },
                type: 'cargo-bike',
                visibleInSettingsUi: false,
            },
        }
    },
*/

    mergeStopsByCode: true,

    title: APP_TITLE,

    favicon: './app/configurations/images/planner/favicon.png',

    meta: {
        description: APP_DESCRIPTION,
    },

    // modeToOTP: {
    //     carpool: 'CARPOOL',
    // },

    logo: 'planner/bus-15.svg',

    GTMid: '',

    // get newest version from: https://github.com/moment/moment-timezone/blame/develop/data/packed/latest.json
    timezoneData: 'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

    map: {
        useRetinaTiles: true,
        tileSize: 256,
        zoomOffset: 0,

        showZoomControl: true, // DT-3470, DT-3397
        showStreetModeSelector: false, // DT-3470
        // showLayerSelector: true, // DT-3470
        showLayerSelector: false, // DT-3470
        showStopMarkerPopupOnMobile: false, // DT-3470
        showScaleBar: true, // DT-3470, DT-3397
        genericMarker: {
            popup: {
                offset: [0,0],
                maxWidth: 250,
                minWidth: 250,
            }
        },
        attribution: {
            'default': '© <a tabindex=-1 href=https://www.maptiler.com/copyright/>MapTiler</a>, <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>,  <a tabindex=-1 href=https://www.vbn.de/service/entwicklerinfos/>Verkehrsverbund Bremen/Niedersachsen GmbH</a> und <a tabindex=-1 href=https://www.connect-fahrplanauskunft.de/index.php?id=opendata>connect OpenData</a>'
        },
    },

    feedIds: ['planner'],

    // realtime: { planner: realtimeHbg },

    searchSources: ['oa', 'osm'],

    searchParams: {
      // Niedersachsen plus
        'boundary.rect.min_lat': 51.221,
        'boundary.rect.max_lat': 53.904,
        'boundary.rect.min_lon': 6.383,
        'boundary.rect.max_lon': 12.81,
        // Domshof Bremen
        'focus.point.lat': 53.076226,
        'focus.point.lon': 8.809104
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    nationalServiceLink: { name: 'FahrPlaner', href: 'https://fahrplaner.vbn.de' },

    defaultEndpoint: {
        lat: 53.076226,
        lon: 8.809104,
    },


    defaultOrigins: [
        /*
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
          },*/
    ],

    menu: {
        copyright: {
            label: `© milohb ${YEAR}`
        },
        content: [
            {
                name: 'about-this-service',
                nameEn: 'About this service',
                route: '/dieser-dienst',
                icon: 'icon-icon_info',
            },
        ],
    },

    aboutThisService: {
        de: [
            {
                header: 'Über diesen Dienst',
                paragraphs: [
                    'planner.25stunden.de ist die Demonstrationsseite für eine Fahrplanauskunft für den ÖPNV mit OpenSource-Programmen und basierend auf offenen Daten.',
                    'Die Seite wird realisiert als Bachelorarbeit von Michael Lorenzen im Studiengang <a href=https://www.hs-kl.de/informatik-und-mikrosystemtechnik/studiengaenge/it-analyst>IT-Analyst</a> an der <a href=https://www.hs-kl.de/>Hochschule Kaiserslautern</a>',

                ],
            },
            {
                header: 'Digitransit Plattform',
                paragraphs: [
                    'Dieser Dienst basiert auf der Digitransit Plattform und dem Backend-Diensten OpenTripPlanner, tileserver-gl, Photon und pelias-photon-adapter. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beteiligten.',
                    'Der gesamte Quellcode der Plattform, die aus vielen verschiedenen Komponenten besteht, ist auf <a href="https://github.com/milohb/">Github</a> verfügbar.'
                ],
            },
            {
                header: 'Datenquellen',
                paragraphs: [
                    'Kartendaten: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'ÖPNV-Daten: Datensätze der <a target=new href=https://www.vbn.de/service/entwicklerinfos>Verkehrsverbund Bremen/Niedersachsen GmbH</a> und der <a target=new href=https://www.connect-fahrplanauskunft.de/index.php?id=opendata>Connect Fahrplanauskunft Gmbh</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende', 'Kartenkacheln von <a href=https://www.maptiler.com/copyright/>MapTiler</a>',
                    'Alle Angaben ohne Gewähr.'
                ],
            },
            {
                header: 'Impressum',
                paragraphs: [
                    'Michael Lorenzen',
                    'Schubertstraße 13',
                    '28209 Bremen',
                    'Kontakt: miloba @ m-lorenzen.de'
                ],
            },
        ],
        en: [
            {
                header: 'About this service',
                paragraphs: [
                    '',
                ],
            },
            {
                header: 'Contribute',
                paragraphs: [
                    '',
                ]
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
                    'Map data: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'Public transport data: data from  <a target=new href=https://www.vbn.de/service/entwicklerinfos>Verkehrsverbund Bremen/Niedersachsen GmbH</a> and <a target=new href=https://www.connect-fahrplanauskunft.de/index.php?id=opendata>Connect Fahrplanauskunft Gmbh</a>, Shapes enhanced with OpenStreetMap data © OpenStreetMap Mitwirkende', 'map tiles from <a href=https://www.maptiler.com/copyright/>MapTiler</a>',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ],
    },

    redirectReittiopasParams: true,

    themeMap: {
        planner: 'planner'
    },

    transportModes: {

        nearYouTitle: {
            de: 'Fahrpläne und Routen',
        },

        bus: {
            availableForSelection: true,
            defaultValue: true,
            smallIconZoom: 16,
            nearYouLabel: {
                de: 'Bushaltestellen in der Nähe',
            }
        },

        rail: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Bahnhaltestellen in der Nähe',
            }
        },

        tram: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Tramhaltestellen in der Nähe',
            }
        },

        subway: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'U-Bahnhaltestellen in der Nähe',
            }
        },
        airplane: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'Flughäfen in der Nähe',
            }
        },

        ferry: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Fähranleger in der Nähe',
            }
        },
        //
        // carpool: {
        //     availableForSelection: true,
        //     defaultValue: false,
        //     nearYouLabel: {
        //         de: 'Mitfahrpunkte in der Nähe',
        //         en: 'Nearby carpool stops on the map',
        //     }
        // },
        //
        // citybike: {
        //     availableForSelection: true,
        //     defaultValue: false,
        //     nearYouLabel: {
        //         de: 'Sharing-Angebote in der Nähe',
        //         en: 'Shared mobility near you'
        //     }
        // },
    },

    // what shall be shown in map
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
            availableForSelection: false,
            defaultValue: false,
            exclusive: false,
            icon: 'car-withoutBox',
        },

        carpool: {
            availableForSelection: false,
            defaultValue: false,
            exclusive: true,
            icon: 'carpool-withoutBox',
        },
    },

    // no ticket info for planner now
    showTicketInformation: false,
    showTicketPrice: false,
    availableTickets: { 'planner' : {}},
    fareMapping: function mapHbFareId(fareId) {
        return {
            en: "Adult",
            de: "Regulär",
        };
    },
    displayFareInfoTop: false,


    showRouteSearch: false,
    showNearYouButtons: false,

    // adding assets/geoJson/hb-layers layers
    // geoJson: {
    //     layers: [
    //         // bicycleinfrastructure includes shops, repair stations,
    //         {
    //             name: {
    //                 fi: '',
    //                 en: 'Service stations and stores',
    //                 de: "Service Stationen und Läden",
    //             },
    //             url: '/assets/geojson/hb-layers/bicycleinfrastructure.geojson',
    //         },
    //         /* Charging stations
    //         {
    //             name: {
    //                 fi: '',
    //                 en: 'Charging stations',
    //                 de: 'Ladestationen',
    //             },
    //             url: '/assets/geojson/hb-layers/charging.geojson',
    //         },*/
    //         // LoRaWan map layer
    //         {
    //             name: {
    //                 fi: '',
    //                 en: 'LoRaWAN Gateways',
    //                 de: 'LoRaWAN Gateways',
    //             },
    //             url: '/assets/geojson/hb-layers/lorawan-gateways.geojson',
    //             isOffByDefault: true,
    //         },
    //         // Nette Toilette layer
    //         {
    //             name: {
    //                 fi: '',
    //                 en: 'Public Toilets',
    //                 de: 'Nette Toilette',
    //             },
    //             url: '/assets/geojson/hb-layers/toilet.geojson',
    //             isOffByDefault: true,
    //         },
    //     ],
    // },
    staticMessagesUrl: STATIC_MESSAGE_URL,

    suggestCarMinDistance: 800,
    suggestWalkMaxDistance: 3000,
    suggestBikeAndPublicMinDistance: 3000,
    suggestBikeAndParkMinDistance: 3000,

/*    // live bus locations
    vehicles: true,
    showVehiclesOnSummaryPage: false,
    showVehiclesOnStopPage: true,*/

    showBikeAndPublicItineraries: false,
    showBikeAndParkItineraries: false,
    showStopAndRouteSearch: false,
    showTimeTableOptions: false,

    viaPointsEnabled: false,
});