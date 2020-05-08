import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { intlShape } from 'react-intl';
import IconWithBigCaution from './IconWithBigCaution';
import IconWithIcon from './IconWithIcon';
import ComponentUsageExample from './ComponentUsageExample';
import { realtimeDeparture as exampleRealtimeDeparture } from './ExampleData';
import { isMobile } from '../util/browser';

const LONG_ROUTE_NUMBER_LENGTH = 6;

function RouteNumber(props, context) {
  const mode = props.mode.toLowerCase();
  const { alertSeverityLevel, color } = props;

  if (mode === 'bicycle' || mode === 'car') {
    // mode += '-withoutBox';
  }

  const longText = props.text && props.text.length >= LONG_ROUTE_NUMBER_LENGTH;
  // Checks if route only has letters without identifying numbers and
  // length doesn't fit in the tab view
  const hasNoShortName =
    props.text &&
    new RegExp(/^([^0-9]*)$/).test(props.text) &&
    props.text.length > 3;

  const getIcon = (icon, isCallAgency, hasDisruption, badgeFill, badgeText) => {
    if (isCallAgency) {
      return (
        <IconWithIcon
          color={color}
          className={`${mode} call`}
          img={icon || `icon-icon_${mode}`}
          subIcon="icon-icon_call"
        />
      );
    }

    if (hasDisruption || !!alertSeverityLevel) {
      return (
        <IconWithBigCaution
          alertSeverityLevel={alertSeverityLevel}
          color={color}
          className={mode}
          img={icon || `icon-icon_${mode}`}
        />
      );
    }

    return (
      <IconWithIcon
        badgeFill={badgeFill}
        badgeText={badgeText}
        color={color}
        className={mode}
        img={icon || `icon-icon_${mode}`}
        subIcon=""
      />
    );
  };

  // props.vertical is FALSE in Near you view
  // props.vertical is TRUE in itinerary view
  return (
    <span
      style={{ display: longText && isMobile ? 'block' : null }}
      className={cx('route-number', {
        'overflow-fade': longText && props.fadeLong,
        vertical: props.vertical,
        hasNoShortName: hasNoShortName && longText && !props.vertical,
      })}
    >
      <span
        className={cx('vcenter-children', props.className)}
        aria-label={context.intl.formatMessage({
          id: mode,
          defaultMessage: 'Vehicle',
        })}
        role="img"
      >
        {props.vertical === true && mode !== 'walk' ? (
          <div className={`special-icon ${mode}`}>
            {getIcon(
              props.icon,
              props.isCallAgency,
              props.hasDisruption,
              props.badgeFill,
              props.badgeText,
            )}
          </div>
        ) : (
          <div className={`icon ${mode}`}>
            {getIcon(props.icon, props.isCallAgency, props.hasDisruption)}
          </div>
        )}
        {props.withBar && (
          <div className="bar-container">
            <div
              style={{
                color: mode === 'call' ? 'white' : color || 'currentColor',
              }}
              className={cx('bar', mode)}
            >
              <div className="bar-inner" />
            </div>
          </div>
        )}
      </span>
      {props.text &&
        (props.renderNumber === true && (
          <div className="vehicle-number-container-v">
            <span
              className={cx('vehicle-number', mode, {
                'overflow-fade': longText && props.fadeLong,
                long: longText,
              })}
            >
              {props.text}
            </span>
          </div>
        ))}
      {props.renderNumber === true &&
        (mode === 'walk' && (
          <div className="vehicle-number-container-v">
            <span className="walking-time">{props.walkingTime}</span>
          </div>
        ))}
    </span>
  );
}

RouteNumber.description = () => (
  <div>
    <p>Display mode icon and route number with mode color</p>
    <ComponentUsageExample>
      <RouteNumber
        mode={exampleRealtimeDeparture.pattern.route.mode}
        text={exampleRealtimeDeparture.pattern.route.shortName}
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="with disruption">
      <div style={{ paddingLeft: '5px' }}>
        <RouteNumber
          mode={exampleRealtimeDeparture.pattern.route.mode}
          text={exampleRealtimeDeparture.pattern.route.shortName}
          hasDisruption
        />
      </div>
    </ComponentUsageExample>
    <ComponentUsageExample description="with callAgency">
      <div style={{ paddingLeft: '5px' }}>
        <RouteNumber
          mode={exampleRealtimeDeparture.pattern.route.mode}
          text={exampleRealtimeDeparture.pattern.route.shortName}
          isCallAgency
        />
      </div>
    </ComponentUsageExample>
    <ComponentUsageExample description="in vertical configuration">
      <RouteNumber
        mode={exampleRealtimeDeparture.pattern.route.mode}
        text={exampleRealtimeDeparture.pattern.route.shortName}
        vertical
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="in vertical configuration with disruption">
      <div style={{ paddingLeft: '5px' }}>
        <RouteNumber
          mode={exampleRealtimeDeparture.pattern.route.mode}
          text={exampleRealtimeDeparture.pattern.route.shortName}
          hasDisruption
          vertical
        />
      </div>
    </ComponentUsageExample>
    <ComponentUsageExample description="in vertical configuration with callAgency">
      <div style={{ paddingLeft: '5px' }}>
        <RouteNumber
          mode={exampleRealtimeDeparture.pattern.route.mode}
          text={exampleRealtimeDeparture.pattern.route.shortName}
          isCallAgency
          vertical
        />
      </div>
    </ComponentUsageExample>
  </div>
);

RouteNumber.propTypes = {
  alertSeverityLevel: PropTypes.string,
  mode: PropTypes.string.isRequired,
  color: PropTypes.string,
  text: PropTypes.node,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  hasDisruption: PropTypes.bool,
  fadeLong: PropTypes.bool,
  withBar: PropTypes.bool,
  isCallAgency: PropTypes.bool,
  badgeFill: PropTypes.string,
  badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  renderNumber: PropTypes.bool,
  walkingTime: PropTypes.number,
};

RouteNumber.defaultProps = {
  alertSeverityLevel: undefined,
  badgeFill: undefined,
  badgeText: undefined,
  className: '',
  vertical: false,
  hasDisruption: false,
  fadeLong: false,
  text: '',
  withBar: false,
  isCallAgency: false,
  icon: undefined,
};

RouteNumber.contextTypes = {
  intl: intlShape.isRequired,
};

RouteNumber.displayName = 'RouteNumber';
export default RouteNumber;
