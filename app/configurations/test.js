query queryUtils_SummaryPage_Query(  $fromPlace: String!  $toPlace: String!  $intermediatePlaces: [InputCoordinates!]
$numItineraries: Int!  $modes: [TransportMode!]  $date: String!  $time: String!  $walkReluctance: Float
$walkBoardCost: Int  $minTransferTime: Int  $walkSpeed: Float  $maxWalkDistance: Float  $wheelchair: Boolean
$ticketTypes: [String]  $disableRemainingWeightHeuristic: Boolean  $arriveBy: Boolean  $transferPenalty: Int
$bikeSpeed: Float  $optimize: OptimizeType  $triangle: InputTriangle  $itineraryFiltering: Float
$unpreferred: InputUnpreferred  $allowedBikeRentalNetworks: [String]  $locale: String) {viewer {...SummaryPage_viewer_3ZG8s4}
serviceTimeRange {    ...SummaryPage_serviceTimeRange}}fragment ItineraryLine_legs on
Leg {mode  rentedBike  startTime  endTime  distance  legGeometry {points}  transitLeg
route {    shortName    color    agency {name      id}    id}  from {lat    lon    name    vertexType
bikeRentalStation {lat      lon      stationId      networks      bikesAvailable      id}
stop {gtfsId      code      platformCode      id    }}  to {lat    lon    name    vertexType
bikeRentalStation {      lat      lon      stationId      networks      bikesAvailable      id}
stop {gtfsId      code      platformCode      id}}
trip {gtfsId    stoptimes {      stop {gtfsId        id}      pickupType}    id}
intermediatePlaces {arrivalTime    stop {gtfsId      lat      lon      name      code      platformCode      id}}}
fragment ItinerarySummaryListContainer_itineraries on
Itinerary {walkDistance  startTime  endTime  legs {alerts {alertId}    realTime    realtimeState    transitLeg
startTime    endTime    mode    distance    duration    rentedBike    interlineWithPreviousLeg    intermediatePlace
intermediatePlaces {stop {zoneId        id}}    route {mode      shortName      color      agency {name        id}
alerts {alertSeverityLevel        effectiveEndDate        effectiveStartDate
trip {pattern {code            id}          id        }        id}      id}    t
rip {pattern {code        id}
stoptimes {realtimeState        stop {gtfsId          id}        pickupType}      id}
from {name      lat      lon      stop {gtfsId        zoneId        platformCode
alerts {alertSeverityLevel          effectiveEndDate          effectiveStartDate          id        }        id}
bikeRentalStation {bikesAvailable        networks        id}}    to {stop {gtfsId        zoneId
alerts {alertSeverityLevel          effectiveEndDate          effectiveStartDate          id}        id}
 bikePark {bikeParkId        name        id      }      carPark {carParkId        name        id}}}}
 fragment ItineraryTab_itinerary on Itinerary {walkDistance  duration  startTime  endTime
 arrivedAtDestinationWithRentedBicycle  fares {cents    components {cents      fareId
 routes {agency {gtfsId          fareUrl          name          id}        gtfsId        id}}    type}
 legs {mode    alerts {alertId      alertDescriptionTextTranslations {        language        text}}    ...LegAgencyInfo_leg
 from {lat      lon      name      vertexType      bikeRentalStation {networks        bikesAvailable
 lat        lon        stationId        id}      stop {gtfsId        code        platformCode        vehicleMode
 zoneId        alerts {alertSeverityLevel          effectiveEndDate          effectiveStartDate
 trip {pattern {code              id}            id          }          alertHeaderText
 alertHeaderTextTranslations {text            language}          alertUrl
 alertUrlTranslations {            text            language}          id}        id}}
 to {      lat      lon      name      vertexType
 bikeRentalStation {lat        lon        stationId        networks        bikesAvailable        id}      stop {gtfsId        code        platformCode        zoneId        name        alerts {alertSeverityLevel          effectiveEndDate          effectiveStartDate          trip {pattern {code              id}            id}          alertHeaderText          alertHeaderTextTranslations {text            language}          alertUrl          alertUrlTranslations {text            language}          id}        id}      bikePark {bikeParkId        name        id}      carPark {carParkId        name        id}      vehicleParkingWithEntrance {vehicleParking {tags          id}}    }    dropOffBookingInfo {message      dropOffMessage      contactInfo {phoneNumber        infoUrl        bookingUrl      }}    legGeometry {length      points}    intermediatePlaces {arrivalTime      stop {gtfsId        lat        lon        name        code        platformCode        zoneId        id      }}    realTime    realtimeState    transitLeg    rentedBike    startTime    endTime    interlineWithPreviousLeg    distance    duration    intermediatePlace    route {shortName      color      gtfsId      longName      url      type      desc      agency {gtfsId        fareUrl        name        phone        id}      alerts {alertSeverityLevel        effectiveEndDate        effectiveStartDate        trip {pattern {code            id          }          id}        alertHeaderText        alertHeaderTextTranslations {text          language}        alertUrl        alertUrlTranslations {text          language}        id}      id}    trip {gtfsId      tripHeadsign      pattern {code        id}      stoptimes {        pickupType        realtimeState        stop {gtfsId          id}}      id}  }}fragment ItineraryTab_plan on Plan {date}fragment LegAgencyInfo_leg on Leg {agency {name    url    fareUrl    id  }}fragment RouteLine_pattern on Pattern {code  geometry {    lat    lon}  route {mode    color    id}  stops {lat    lon    name    gtfsId    platformCode    code    ...StopCardHeaderContainer_stop    id}}fragment StopCardHeaderContainer_stop on Stop {gtfsId  name  code  desc  zoneId  alerts {alertSeverityLevel    effectiveEndDate    effectiveStartDate    id}  lat  lon  stops {name    desc    id}}fragment SummaryPage_serviceTimeRange on serviceTimeRange {start  end}fragment SummaryPage_viewer_3ZG8s4 on QueryType {  plan(fromPlace: $fromPlace, toPlace: $toPlace, intermediatePlaces: $intermediatePlaces, numItineraries: $numItineraries, transportModes: $modes, date: $date, time: $time, walkReluctance: $walkReluctance, walkBoardCost: $walkBoardCost, minTransferTime: $minTransferTime, walkSpeed: $walkSpeed, maxWalkDistance: $maxWalkDistance, wheelchair: $wheelchair, allowedTicketTypes: $ticketTypes, disableRemainingWeightHeuristic: $disableRemainingWeightHeuristic, arriveBy: $arriveBy, transferPenalty: $transferPenalty, bikeSpeed: $bikeSpeed, optimize: $optimize, triangle: $triangle, itineraryFiltering: $itineraryFiltering, unpreferred: $unpreferred, allowedBikeRentalNetworks: $allowedBikeRentalNetworks, locale: $locale) {...SummaryPlanContainer_plan    ...ItineraryTab_plan    itineraries {      duration      startTime      endTime      ...ItineraryTab_itinerary      ...SummaryPlanContainer_itineraries      legs {mode        ...ItineraryLine_legs        transitLeg        legGeometry {points}        route {gtfsId          id}        trip {gtfsId          directionId          stoptimesForDate {scheduledDeparture            pickupType}          pattern {            ...RouteLine_pattern            id}          id}        from {name          lat          lon          stop {gtfsId            zoneId            id}          bikeRentalStation {bikesAvailable            networks            id}}        to {stop {gtfsId            zoneId            id          }          bikePark {bikeParkId            name            id}}}}  }}fragment SummaryPlanContainer_itineraries on Itinerary {...ItinerarySummaryListContainer_itineraries  endTime  startTime  legs {mode    to {bikePark {bikeParkId        name        id      }}    ...ItineraryLine_legs    transitLeg    legGeometry {points}    route {      gtfsId      id}    trip {gtfsId      directionId      stoptimesForDate {scheduledDeparture      }      pattern {...RouteLine_pattern        id}      id}}}fragment SummaryPlanContainer_plan on Plan {
date

}