import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { matchShape, routerShape } from 'found';

import OriginDestinationBar from './OriginDestinationBar';
import QuickSettingsPanel from './QuickSettingsPanel';
import { isBrowser } from '../util/browser';
import { parseLocation, PREFIX_ITINERARY_SUMMARY } from '../util/path';
import withBreakpoint from '../util/withBreakpoint';

class SummaryNavigation extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }).isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    breakpoint: PropTypes.string.isRequired,
    serviceTimeRange: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
    toggleSettings: PropTypes.func.isRequired,
  };

  static defaultProps = {
    startTime: null,
    endTime: null,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    router: routerShape,
    match: matchShape.isRequired,
  };

  componentDidMount() {
    this.unlisten = this.context.router.addTransitionHook(location => {
      if (
        this.context.match.location.state &&
        this.context.match.location.state.customizeSearchOffcanvas &&
        (!location.state || !location.state.customizeSearchOffcanvas) &&
        !this.transitionDone &&
        location.pathname.startsWith(`/${PREFIX_ITINERARY_SUMMARY}/`)
      ) {
        this.transitionDone = true;
        const newLocation = {
          ...this.context.match.location,
          state: {
            ...this.context.match.location.state,
            customizeSearchOffcanvas: false,
          },
        };
        setTimeout(() => this.context.router.replace(newLocation), 0);
      } else {
        this.transitionDone = false;
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const className = cx({ 'bp-large': this.props.breakpoint === 'large' });

    return (
      <div className="summary-navigation-container">
        <OriginDestinationBar
          className={className}
          origin={parseLocation(this.props.params.from)}
          destination={parseLocation(this.props.params.to)}
          isMobile={this.props.breakpoint === 'small'}
        />
        {isBrowser && (
          <React.Fragment>
            <QuickSettingsPanel
              timeSelectorStartTime={this.props.startTime}
              timeSelectorEndTime={this.props.endTime}
              timeSelectorServiceTimeRange={this.props.serviceTimeRange}
              toggleSettings={this.props.toggleSettings}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withBreakpoint(SummaryNavigation);
