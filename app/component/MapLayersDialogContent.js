/* eslint react/forbid-prop-types: 0 */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { intlShape, FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { matchShape, routerShape, withRouter } from 'found';
import merge from 'lodash/merge';
import { isKeyboardSelectionEvent } from '../util/browser';
import Icon from './Icon';

import Checkbox from './Checkbox';
import GeoJsonStore from '../store/GeoJsonStore';
import { updateMapLayers } from '../action/MapLayerActions';
import { addAnalyticsEvent } from '../util/analyticsUtils';
import withGeojsonObjects from './map/withGeojsonObjects';
import { replaceQueryParams, clearQueryParams } from '../util/queryUtils';
import { MapMode } from '../constants';
import MapLayerStore, { mapLayerShape } from '../store/MapLayerStore';
import { setMapMode } from '../action/MapModeActions';
import LayerCategoryDropdown from './LayerCategoryDropdown';

const transportModeConfigShape = PropTypes.shape({
  availableForSelection: PropTypes.bool,
});
const mapLayersConfigShape = PropTypes.shape({
  cityBike: PropTypes.shape({
    showCityBikes: PropTypes.bool,
  }),
  geoJson: PropTypes.shape({
    layers: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.shape({
          en: PropTypes.string,
          fi: PropTypes.string.isRequired,
          sv: PropTypes.string,
        }),
      }),
    ),
  }),
  parkAndRide: PropTypes.shape({
    showParkAndRide: PropTypes.bool,
  }),
  transportModes: PropTypes.shape({
    bus: transportModeConfigShape,
    citybike: transportModeConfigShape,
    ferry: transportModeConfigShape,
    rail: transportModeConfigShape,
    subway: transportModeConfigShape,
    tram: transportModeConfigShape,
  }),
  mapLayers: PropTypes.shape({
    tooltip: PropTypes.shape({
      en: PropTypes.string,
      fi: PropTypes.string.isRequired,
      sv: PropTypes.string,
    }),
  }),
  vehicles: PropTypes.bool,
});

class MapLayersDialogContent extends React.Component {
  static propTypes = {
    mapLayers: PropTypes.object,
    setOpen: PropTypes.func.isRequired,
    updateMapLayers: PropTypes.func,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    geoJson: PropTypes.object,
  };

  sendLayerChangeAnalytic = (name, enable) => {
    const action = enable ? 'ShowMapLayer' : 'HideMapLayer';
    addAnalyticsEvent({
      category: 'Map',
      action,
      name,
    });
  };

  handlePanelState(open) {
    if (open === this.props.open) {
      return;
    }
    this.props.setOpen(open);
  }

  updateSetting = newSetting => {
    this.props.updateMapLayers({
      ...this.props.mapLayers,
      ...newSetting,
    });
  };

  updateTicketSalesSetting = newSetting => {
    const ticketSales = {
      ...this.props.mapLayers.ticketSales,
      ...newSetting,
    };
    this.updateSetting({ ticketSales });
  };

  switchMapLayers = mode => {
    const mapMode = mode;
    const { router, match } = this.context;
    replaceQueryParams(router, match, { mapMode });
    if (mapMode === MapMode.Default) {
      clearQueryParams(router, match, Object.keys(match.location.query));
    }
    this.props.setMapMode(mapMode);
  };

  render() {
    const {
      citybike,
      parkAndRide,
      stop,
      terminal,
      geoJson,
      vehicles,
      bikeParks,
      roadworks,
      dynamicParkingLots,
      weatherStations,
      chargingStations,
    } = this.props.mapLayers;
    const { currentMapMode } = this.props;
    let geoJsonLayers;
    if (this.props.geoJson) {
      geoJsonLayers = Object.entries(this.props.geoJson)?.map(([k, v]) => {
        return { url: k, ...v };
      });
    }

    const isTransportModeEnabled = transportMode =>
      transportMode && transportMode.availableForSelection;
    const transportModes = this.context.config.transportModes || {};

    const bikeServiceLayer = geoJsonLayers?.find(
      layer => layer.name.en === 'Service stations and stores',
    );
    const publicToiletsLayer = geoJsonLayers?.find(
      layer => layer.name.en === 'Public Toilets',
    );
    const gatewaysLayer = geoJsonLayers?.find(
      layer => layer.name.en === 'LoRaWAN Gateways',
    );

    return (
      <Fragment>
        <button
          className="panel-close"
          onClick={() => this.handlePanelState(false)}
          onKeyDown={e =>
            isKeyboardSelectionEvent(e) && this.handlePanelState(false)
          }
          type="button"
        >
          <Icon img="icon-icon_close" />
        </button>
        <span className="map-layer-header">
          {this.context.intl.formatMessage({
            id: 'select-map-layers-header',
            defaultMessage: 'Bubble Dialog Header',
          })}
        </span>
        <div className="checkbox-grouping" />
        {this.context.config.vehicles && (
          <div className="checkbox-grouping">
            <div style={{ padding: '10px' }}>
              <Checkbox
                checked={vehicles}
                defaultMessage="Moving vehicles"
                labelId="map-layer-vehicles"
                onChange={e => {
                  this.updateSetting({ vehicles: e.target.checked });
                  this.sendLayerChangeAnalytic('Vehicles', e.target.checked);
                }}
              />
            </div>
          </div>
        )}
        <div className="checkbox-grouping">
          <LayerCategoryDropdown
            title={this.context.intl.formatMessage({
              id: 'map-layer-category-public-transit',
              defaultMessage: 'Public Transit',
            })}
            onChange={newSettings =>
              this.updateSetting(merge(this.props.mapLayers, newSettings))
            }
            options={[
              isTransportModeEnabled(transportModes.bus) && {
                checked: stop.bus,
                defaultMessage: 'Bus stop',
                labelId: 'map-layer-stop-bus',
                settings: { stop: 'bus' },
              },
              isTransportModeEnabled(transportModes.subway) && {
                checked: terminal.subway,
                defaultMessage: 'Subway station',
                labelId: 'map-layer-terminal-subway',
                settings: { stop: 'subway', terminal: 'subway' },
              },
              isTransportModeEnabled(transportModes.rail) && {
                checked: terminal.rail,
                defaultMessage: 'Railway station',
                labelId: 'map-layer-terminal-rail',
                settings: { stop: 'rail', terminal: 'rail' },
              },
              isTransportModeEnabled(transportModes.tram) && {
                checked: stop.tram,
                defaultMessage: 'Tram stop',
                labelId: 'map-layer-stop-tram',
                settings: { stop: 'tram' },
              },
              isTransportModeEnabled(transportModes.ferry) && {
                checked: stop.ferry,
                defaultMessage: 'Ferry',
                labelId: 'map-layer-stop-ferry',
                settings: { stop: 'ferry' },
              },
            ]}
          />

          <LayerCategoryDropdown
            title={this.context.intl.formatMessage({
              id: 'map-layer-category-bicycle',
              defaultMessage: 'Bicycle',
            })}
            onChange={newSettings =>
              this.updateSetting(merge(this.props.mapLayers, newSettings))
            }
            options={[
              this.context.config.bikeParks &&
                this.context.config.bikeParks.show && {
                  checked: bikeParks,
                  defaultMessage: 'Bike parks',
                  labelId: 'map-layer-bike-parks',
                  settings: 'bikeParks',
                },
              bikeServiceLayer && {
                checked:
                  (bikeServiceLayer.isOffByDefault &&
                    geoJson[bikeServiceLayer.url] === true) ||
                  (!bikeServiceLayer.isOffByDefault &&
                    geoJson[bikeServiceLayer.url] !== false),
                defaultMessage: bikeServiceLayer.name[this.props.lang],
                key: bikeServiceLayer.url,
                settings: { geoJson: bikeServiceLayer.url },
              },
            ]}
          />

          <LayerCategoryDropdown
            title={this.context.intl.formatMessage({
              id: 'map-layer-category-sharing',
              defaultMessage: 'Sharing',
            })}
            onChange={newSettings =>
              this.updateSetting(merge(this.props.mapLayers, newSettings))
            }
            options={[
              this.context.config.cityBike &&
                this.context.config.cityBike.showCityBikes && {
                  checked: citybike,
                  defaultMessage: 'Sharing',
                  labelId: 'map-layer-sharing',
                  settings: 'citybike',
                },
              isTransportModeEnabled(transportModes.carpool) && {
                checked: terminal.carpool,
                defaultMessage: 'Carpool stops',
                labelId: 'map-layer-carpool',
                settings: { stop: 'carpool', terminal: 'carpool' },
              },
            ]}
          />

          <LayerCategoryDropdown
            title={this.context.intl.formatMessage({
              id: 'map-layer-category-car',
              defaultMessage: 'Car',
            })}
            onChange={newSettings =>
              this.updateSetting(merge(this.props.mapLayers, newSettings))
            }
            options={[
              this.context.config.dynamicParkingLots &&
                this.context.config.dynamicParkingLots
                  .showDynamicParkingLots && {
                  checked: dynamicParkingLots,
                  defaultMessage: 'Parking',
                  labelId: 'map-layer-dynamic-parking-lots',
                  settings: 'dynamicParkingLots',
                },
              this.context.config.parkAndRide &&
                this.context.config.parkAndRide.showParkAndRide && {
                  checked: parkAndRide,
                  defaultMessage: 'Park &amp; ride',
                  labelId: 'map-layer-park-and-ride',
                  settings: 'parkAndRide',
                },
              this.context.config.chargingStations &&
                this.context.config.chargingStations.show && {
                  checked: chargingStations,
                  defaultMessage: 'Charging stations',
                  labelId: 'map-layer-charging-staions',
                  settings: 'chargingStations',
                },
            ]}
          />

          <LayerCategoryDropdown
            title={this.context.intl.formatMessage({
              id: 'map-layer-category-others',
              defaultMessage: 'Others',
            })}
            onChange={newSettings =>
              this.updateSetting(merge(this.props.mapLayers, newSettings))
            }
            options={[
              publicToiletsLayer && {
                checked:
                  (publicToiletsLayer.isOffByDefault &&
                    geoJson[publicToiletsLayer.url] === true) ||
                  (!publicToiletsLayer.isOffByDefault &&
                    geoJson[publicToiletsLayer.url] !== false),
                defaultMessage: publicToiletsLayer.name[this.props.lang],
                key: publicToiletsLayer.url,
                settings: { geoJson: publicToiletsLayer.url },
              },
              this.context.config.roadworks &&
                this.context.config.roadworks.showRoadworks && {
                  checked: roadworks,
                  defaultMessage: 'Roadworks',
                  labelId: 'map-layer-roadworks',
                  settings: 'roadworks',
                },
              this.context.config.weatherStations &&
                this.context.config.weatherStations.show && {
                  checked: weatherStations,
                  defaultMessage: 'Road weather',
                  labelId: 'map-layer-weather-stations',
                  settings: 'weatherStations',
                },
              gatewaysLayer && {
                checked:
                  (gatewaysLayer.isOffByDefault &&
                    geoJson[gatewaysLayer.url] === true) ||
                  (!gatewaysLayer.isOffByDefault &&
                    geoJson[gatewaysLayer.url] !== false),
                defaultMessage: gatewaysLayer.name[this.props.lang],
                key: gatewaysLayer.url,
                settings: { geoJson: gatewaysLayer.url },
              },
            ]}
          />
        </div>

        <div className="checkbox-grouping">
          <h4>
            <FormattedMessage
              id="map-background"
              defaultMessage="Map background"
            />
          </h4>
          <label className="radio-label" htmlFor="street">
            <input
              type="radio"
              id="street"
              value="street"
              name="mapMode"
              onChange={() => {
                this.switchMapLayers(MapMode.Default);
              }}
              checked={currentMapMode === MapMode.Default}
            />
            <FormattedMessage id="streets" defaultMessage="Streets" />
          </label>
          <label className="radio-label" htmlFor="satellite">
            <input
              type="radio"
              id="satellite"
              value="satellite"
              name="mapMode"
              onChange={() => {
                this.switchMapLayers(MapMode.Satellite);
              }}
              checked={currentMapMode === MapMode.Satellite}
            />
            <FormattedMessage id="satellite" defaultMessage="Satellite" />
          </label>
          <label className="radio-label" htmlFor="bicycle">
            <input
              type="radio"
              id="bicycle"
              value="bicycle"
              name="mapMode"
              onChange={() => {
                this.switchMapLayers(MapMode.Bicycle);
              }}
              checked={currentMapMode === MapMode.Bicycle}
            />
            <FormattedMessage id="bicycle" defaultMessage="Bicycle" />
          </label>
        </div>
      </Fragment>
    );
  }
}

MapLayersDialogContent.propTypes = {
  mapLayers: mapLayerShape.isRequired,
  updateMapLayers: PropTypes.func.isRequired,
  lang: PropTypes.string,
  currentMapMode: PropTypes.string.isRequired,
  setMapMode: PropTypes.func.isRequired,
};

MapLayersDialogContent.contextTypes = {
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  match: matchShape.isRequired,
};

/**
 * Retrieves the list of geojson layers in use from the configuration or
 * the geojson store. If no layers exist in these sources, the
 * defaultValue is returned.
 *
 * @param {*} config the configuration for the software installation.
 * @param {*} store the geojson store.
 * @param {*} defaultValue the default value, defaults to undefined.
 */
export const getGeoJsonLayersOrDefault = (
  config,
  store,
  defaultValue = undefined,
) => {
  return (
    (config &&
      config.geoJson &&
      Array.isArray(config.geoJson.layers) &&
      config.geoJson.layers) ||
    (store && Array.isArray(store.layers) && store.layers) ||
    defaultValue
  );
};

const connectedComponent = connectToStores(
  withGeojsonObjects(MapLayersDialogContent),
  [GeoJsonStore, MapLayerStore, 'PreferencesStore', 'MapModeStore'],
  ({ config, executeAction, getStore }) => ({
    config: {
      ...config,
      geoJson: {
        layers: getGeoJsonLayersOrDefault(config, getStore(GeoJsonStore)),
      },
    },
    mapLayers: getStore(MapLayerStore).getMapLayers(),
    updateMapLayers: mapLayers =>
      executeAction(updateMapLayers, { ...mapLayers }),
    lang: getStore('PreferencesStore').getLanguage(),
    currentMapMode: getStore('MapModeStore').getMapMode(),
    setMapMode: mapMode => executeAction(setMapMode, mapMode),
  }),
  {
    config: mapLayersConfigShape,
    executeAction: PropTypes.func,
  },
);

export { connectedComponent, MapLayersDialogContent as Component };
export default withRouter(connectedComponent);
