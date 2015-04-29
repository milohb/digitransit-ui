Store = require 'fluxible/addons/BaseStore'

class LocationStore extends Store

  STATUS_NO_LOCATION: 'no-location'
  STATUS_SEARCHING_LOCATION: 'searching-location'
  STATUS_FOUND_LOCATION: 'found-location'
  STATUS_FOUND_ADDRESS: 'found-address'
  STATUS_GEOLOCATION_DENIED: 'geolocation-denied'
  STATUS_GEOLOCATION_NOT_SUPPORTED: 'geolocation-not-supported'

  @storeName: 'LocationStore'

  constructor: (dispatcher) ->
    super(dispatcher)
    @removeLocation()

  removeLocation: () ->
    @lat = 0
    @lon = 0
    @address = ''
    @status = @STATUS_NO_LOCATION
    @emitChange()

  geolocationSearch: () ->
    @status = @STATUS_SEARCHING_LOCATION
    @emitChange()

  geolocationNotSupported: () ->
    @status = @STATUS_GEOLOCATION_NOT_SUPPORTED
    @emitChange()

  geolocationDenied: () ->
    @status = @STATUS_GEOLOCATION_DENIED
    @emitChange()

  storeLocation: (location) ->
    @lat = location.lat
    @lon = location.lon
    @status = @STATUS_FOUND_LOCATION
    @emitChange()

  storeAddress: (location) ->
    @address = location.address + " " + location.number
    @status = @STATUS_FOUND_ADDRESS
    @emitChange()

  storeLocationAndAddress: (location) ->
    @lat = location.lat
    @lon = location.lon
    @address = location.address
    @status = @STATUS_FOUND_ADDRESS
    @emitChange()

  getLocationState: () ->
    lat: @lat
    lon: @lon
    address: @address
    status: @status

  @handlers:
    "GeolocationSearch":       'geolocationSearch'
    "GeolocationFound":        'storeLocation'
    "GeolocationRemoved":      'removeLocation'
    "GeolocationNotSupported": 'geolocationNotSupported'
    "GeolocationDenied":       'geolocationDenied'
    "ManuallySetPosition":     'storeLocationAndAddress'
    "AddressFound":            'storeAddress'
      
module.exports = LocationStore