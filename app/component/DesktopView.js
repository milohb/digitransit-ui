import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import BackButton from './BackButton'; // DT-3358

export default function DesktopView({
  title,
  header,
  map,
  content,
  scrollable,
  bckBtnColor,
}) {
  return (
    <div className="desktop">
      <div className="main-content">
        <div className="desktop-title">
          <div className="title-container h2">
            <BackButton
              title={title}
              icon="icon-icon_arrow-collapse--left"
              color={bckBtnColor}
              className="arrow-icon"
            />
          </div>
        </div>
        <div
          className={cx('scrollable-content-wrapper', {
            'momentum-scroll': scrollable,
          })}
        >
          {header}
          <ErrorBoundary>{content}</ErrorBoundary>
        </div>
      </div>
      <div className="map-content">
        <ErrorBoundary>{map}</ErrorBoundary>
      </div>
    </div>
  );
}

DesktopView.propTypes = {
  title: PropTypes.node,
  header: PropTypes.node,
  map: PropTypes.node,
  content: PropTypes.node,
  scrollable: PropTypes.bool,
  bckBtnColor: PropTypes.string,
};

DesktopView.defaultProps = {
  scrollable: false,
};
