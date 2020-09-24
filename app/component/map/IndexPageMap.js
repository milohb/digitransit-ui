import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connectToStores } from 'fluxible-addons-react';
import { matchShape, routerShape } from 'found';
import isEqual from 'lodash/isEqual';
import MapWithTracking from './MapWithTracking';
import withBreakpoint from '../../util/withBreakpoint';
import SelectMapLayersDialog from '../SelectMapLayersDialog';
import SelectStreetModeDialog from '../SelectStreetModeDialog';
import OriginStore from '../../store/OriginStore';
import DestinationStore from '../../store/DestinationStore';
import LazilyLoad, { importLazy } from '../LazilyLoad';
import { dtLocationShape } from '../../util/shapes';
import { parseLocation } from '../../util/path';
import * as ModeUtils from '../../util/modeUtils';
import { addAnalyticsEvent } from '../../util/analyticsUtils';

const renderMapLayerSelector = () => <SelectMapLayersDialog />;

const renderStreetModeSelector = (config, router, match) => (
  <SelectStreetModeDialog
    selectedStreetMode={ModeUtils.getStreetMode(match.location, config)}
    selectStreetMode={(streetMode, isExclusive) => {
      addAnalyticsEvent({
        category: 'ItinerarySettings',
        action: 'SelectTravelingModeFromIndexPage',
        name: streetMode,
      });
      ModeUtils.setStreetMode(streetMode, config, isExclusive);
    }}
    streetModeConfigs={ModeUtils.getAvailableStreetModeConfigs(config)}
  />
);

const locationMarkerModules = {
  LocationMarker: () =>
    importLazy(import(/* webpackChunkName: "map" */ './LocationMarker')),
};
let previousFocusPoint;
let previousMapTracking;
function IndexPageMap(
  { match, router, breakpoint, origin, destination },
  { config },
) {
  const originFromURI = parseLocation(match.params.from);
  const destinationFromURI = parseLocation(match.params.to);
  let focusPoint;
  let initialZoom = 16; // Focus to the selected point
  const useDefaultLocation =
    (!origin || !origin.set) && (!destination || !destination.set);
  if (useDefaultLocation) {
    focusPoint = config.defaultMapCenter || config.defaultEndpoint;
    initialZoom = 12; // Show default area
  } else if (origin.set && (origin.ready || (!origin.ready && origin.gps))) {
    focusPoint = origin;
  } else if (destination.set && destination.ready) {
    focusPoint = destination;
  }

  const mwtProps = {};

  const mapTracking =
    (origin && origin.gps) || (destination && destination.gps);
  if (previousFocusPoint && previousFocusPoint.gps && !mapTracking) {
    previousMapTracking = false;
    mwtProps.mapTracking = false;
  } else if (previousMapTracking !== mapTracking) {
    previousMapTracking = mapTracking;
    mwtProps.mapTracking = mapTracking;
  }
  const focusPointChanged =
    !previousFocusPoint || !isEqual(previousFocusPoint, focusPoint);
  if (focusPointChanged && focusPoint && focusPoint.lat && focusPoint.lon) {
    previousFocusPoint = focusPoint;
    mwtProps.focusPoint = focusPoint;
  }
  if (originFromURI.set || destinationFromURI.set) {
    // Origin or destination from URI
    mwtProps.focusPoint = originFromURI.set
      ? originFromURI
      : destinationFromURI;
    initialZoom = 16;
  }
  const leafletObjs = [];

  if (origin && origin.ready === true) {
    leafletObjs.push(
      <LazilyLoad modules={locationMarkerModules} key="from">
        {({ LocationMarker }) => (
          <LocationMarker position={origin} type="from" />
        )}
      </LazilyLoad>,
    );
  }

  if (destination && destination.ready === true) {
    leafletObjs.push(
      <LazilyLoad modules={locationMarkerModules} key="to">
        {({ LocationMarker }) => (
          <LocationMarker position={destination} type="to" />
        )}
      </LazilyLoad>,
    );
  }
  let map;
  if (breakpoint === 'large') {
    map = (
      <MapWithTracking
        breakpoint={breakpoint}
        // TODO: Fix an issue where map doesn't center to right place when user is coming to indexPage with origin or destination set with url
        defaultMapCenter={config.defaultMapCenter}
        showStops
        showScaleBar
        {...mwtProps}
        showLocationMessages
        initialZoom={initialZoom}
        leafletObjs={leafletObjs}
        renderCustomButtons={() => (
          <>
            {config.map.showStreetModeSelector &&
              renderStreetModeSelector(config, router, match)}
            {config.map.showLayerSelector && renderMapLayerSelector()}
          </>
        )}
      />
    );
  } else {
    map = (
      <>
        <div className={cx('flex-grow', 'map-container')}>
          <MapWithTracking
            breakpoint={breakpoint}
            showStops
            {...mwtProps}
            defaultMapCenter={config.defaultMapCenter}
            leafletObjs={leafletObjs}
            renderCustomButtons={() => (
              <>
                {config.map.showStreetModeSelector &&
                  renderStreetModeSelector(config, router, match)}
                {config.map.showLayerSelector && renderMapLayerSelector()}
              </>
            )}
          />
        </div>
      </>
    );
  }

  return map;
}

IndexPageMap.propTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired,
  breakpoint: PropTypes.string.isRequired,
  origin: dtLocationShape,
  destination: dtLocationShape,
};

IndexPageMap.defaultProps = {
  origin: {},
  destination: {},
};

IndexPageMap.contextTypes = {
  config: PropTypes.object.isRequired,
};

const IndexPageMapWithBreakpoint = withBreakpoint(IndexPageMap);

const IndexPageMapWithStores = connectToStores(
  IndexPageMapWithBreakpoint,
  [OriginStore, DestinationStore],
  ({ getStore }) => {
    const origin = getStore(OriginStore).getOrigin();
    const destination = getStore(DestinationStore).getDestination();

    return {
      origin,
      destination,
    };
  },
);

export {
  IndexPageMapWithStores as default,
  IndexPageMapWithBreakpoint as Component,
};