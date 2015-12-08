fs = require('fs')

### React ###
React = require('react')
ReactDOM = require('react-dom/server')

### Route and history management ###
match = require('react-router/lib/match')
RoutingContext = require('react-router/lib/RoutingContext')
createHistory = require('history/lib/createMemoryHistory')
useQueries = require('history/lib/useQueries')
useBasename = require('history/lib/useBasename')

### Fluxible ###
FluxibleComponent = require('fluxible-addons-react/FluxibleComponent')
serialize = require('serialize-javascript')

### Other libraries ###
{IntlProvider} = require('react-intl')
polyfillService = require 'polyfill-service'

### Application ###
application = require('./app')
config = require('./config')
translations = require('./translations')
ApplicationHtml = require('./html')

appRoot = process.cwd() + '/'
svgSprite = fs.readFileSync(appRoot + 'static/svg-sprite.svg')
if process.env.NODE_ENV != 'development'
  css = fs.readFileSync(appRoot + '_static/css/bundle.css')

# Cache fonts from google, so that we don't need an additional roud trip to fetch font definitions
fonts = ''
fetch(config.URL.FONT).then (res) ->
  res.text().then (text) ->
    fonts = text

# Look up paths for various asset files
if process.env.NODE_ENV != 'development'
  stats = require('../stats.json')
  manifest = fs.readFileSync(appRoot + "_static/" + stats.assetsByChunkName.manifest[0])


getPolyfills = (userAgent) ->
  if !userAgent or /(SamsungBrowser|Google Page Speed Insights)/.test(userAgent)
    # Do not trust Samsung, see https://digitransit.atlassian.net/browse/DT-360
    userAgent = ''
  polyfillService.getPolyfillString
    uaString: userAgent
    features:
      'matchMedia': flags: ['gated']
      'fetch': flags: ['gated']
      'Promise': flags: ['gated']
      'String.prototype.repeat': flags: ['gated']
      'Intl': flags: ['gated']
      'Intl.~locale.en': flags: ['gated']
      'Intl.~locale.fi': flags: ['gated']
      'Intl.~locale.sv': flags: ['gated']
      'Object.assign': flags: ['gated']
      'Array.prototype.find': flags: ['gated']
      'es5': flags: ['gated']
    minify: true
    unknown: 'polyfill'

getScripts = ->
  if process.env.NODE_ENV == 'development'
    <script async src="//localhost:9000/js/bundle.js"/>
  else
    [
      <script dangerouslySetInnerHTML={ __html: manifest }/>,
      <script src={(config.ROOT_PATH or '') + '/' + stats.assetsByChunkName.common[0]}/>,
      <script src={(config.ROOT_PATH or '') + '/' + stats.assetsByChunkName.leaflet[0]}/>,
      <script src={(config.ROOT_PATH or '') + '/' + stats.assetsByChunkName.main[0]}/>
    ]

getContent = (context, renderProps, locale) ->
  # Ugly way to see if this is a Relay RootComponent
  # until Relay gets server rendering capabilities
  if renderProps.components.some(((i) -> i instanceof Object and i.getQuery))
    return ''

  # TODO: This should be moved to a place to coexist with similar content from client.cjsx
  ReactDOM.renderToString(
    <FluxibleComponent context={context.getComponentContext()}>
      <IntlProvider locale={locale} messages={translations[locale]}>
        <RoutingContext
          history={renderProps.history}
          createElement={React.createElement}
          location={renderProps.location}
          routes={renderProps.routes}
          params={renderProps.params}
          components={renderProps.components} />
      </IntlProvider>
    </FluxibleComponent>
  )

getHtml = (context, renderProps, locale, polyfills) ->
  ReactDOM.renderToStaticMarkup <ApplicationHtml
    css={if process.env.NODE_ENV == 'development' then false else css}
    svgSprite={svgSprite}
    content={getContent(context, renderProps, locale)}
    polyfill={polyfills}
    state={'window.state=' + serialize(application.dehydrate(context)) + ';'}
    livereload={if process.env.NODE_ENV == 'development' then '//localhost:9000/' else config.ROOT_PATH + '/'}
    locale={'window.locale="' + locale + '"'}
    scripts={getScripts()}
    fonts={fonts}
  />

module.exports = (req, res, next) ->
  # pass in `req.url` and the router will immediately match
  locale = req.cookies.lang or req.acceptsLanguages(['fi', 'sv', 'en']) or 'en'
  context = application.createContext()
  #required by material-ui
  global.navigator = userAgent: req.headers['user-agent']
  location = useBasename(useQueries(createHistory))(basename: config.ROOT_PATH).createLocation(req.url)

  match {routes: context.getComponent(), location: location}
  , (error, redirectLocation, renderProps) ->
    if redirectLocation
      res.redirect 301, redirectLocation.pathname + redirectLocation.search
    else if error
      return next(error)
    else if renderProps == null
      res.status(404).send 'Not found'
    else
      promises = [getPolyfills(req.headers['user-agent'])]
      if renderProps.components[1].loadAction
        renderProps.components[1].loadAction(renderProps.params).forEach (action) ->
          promises.push context.executeAction(action[0], action[1])
      Promise.all(promises).then((results) ->
        res.send '<!doctype html>' + getHtml context, renderProps, locale, results[0]
      ).catch (err) -> return next(err) if err
