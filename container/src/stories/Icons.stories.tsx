import React from 'react';
import { Svg, allIcons } from '@gourban/ui-components';
import './index.scss';

export default {
  title: 'UI Style guide/Icons'
};

const Template = () => {
  const icons = Object.keys(allIcons);

  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Icons</h1>
      </header>

      <div className="story__block">
        <div className="icons">
          {icons.map((icon) => (
            <div key={icon} className="icons__item">
              <div className="icons__item-icon">
                <Svg icon={icon} />
              </div>

              <p className="font-body-s">
                <b>{icon}</b>
              </p>
              <p>
                <code className="font-body-s">{`<Svg icon="${icon}" />`}</code>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const Icons = Template.bind({});
