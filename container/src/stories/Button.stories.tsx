// Button.stories.js | Button.stories.jsx
import React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('Components', module).add('Button', () => {
  // const variations = {
  //   'Primary (Default)': 'primary',
  //   Secondary: 'secondary',
  //   Tertiary: 'tertiary',
  //   Link: 'link',
  // };

  //  defining knobs
  const label = text('Label', 'Button');
  // const variation = radios('Variation', variations, 'primary');

  return <button>{label}</button>;
});