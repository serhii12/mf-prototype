// Button.stories.js | Button.stories.jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import manifest from '../components/Svg/manifest';

console.log(manifest);

storiesOf('Style', module).add('Icons', () => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Icons</h1>
      </header>

      <div className="story__block"></div>
    </>
  );
});
