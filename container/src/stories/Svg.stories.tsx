import React from 'react';
import { Svg as SvgComponent } from '@gourban/ui-components';
import './index.scss';

export default {
  title: 'UI Components/Svg',
  component: SvgComponent
};

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Svg</h1>
        <p className="font-body-m">Change icon names</p>
      </header>

      <div className="icons">
        <div className="icons__item">
          <div className="icons__item-icon">
            <SvgComponent {...args} />
          </div>
        </div>
      </div>
    </>
  );
};

export const Svg = Template.bind({});
Svg.args = {
  icon: 'approve'
};
