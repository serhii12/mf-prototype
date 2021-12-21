import React from 'react';
import './index.scss';

export default {
  title: 'UI Style guide/Effects'
};

const Template = () => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Effects</h1>
      </header>

      <div className="story__block">
        <div className="story__effects">
          <div className="story__effects-block">
            <div className="story__effects-box-shadow" />
            <h5>Box shadow effect</h5>
            <p className="font-body-s">Details: 1px 1px 10px #646464</p>
            <p className="font-body-s">
              Code: <code>box-shadow: getBoxShadow()</code>
            </p>
          </div>

          <div className="story__effects-block">
            <div className="story__effects-overlay" />
            <h5>Overlay effect</h5>
            <p className="font-body-s">Color: #000000, opacity 0.8</p>
            <p className="font-body-s">
              Code: <code>background: getOverlay()</code>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const Effects = Template.bind({});
