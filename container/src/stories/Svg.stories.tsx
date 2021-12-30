import React from 'react';
import { Svg as SvgComponent } from '@gourban/ui-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import './index.scss';

export default {
  title: 'UI Components/Svg',
  component: SvgComponent
};

const codeSnippet = Prism.highlight(
  `
    <Svg 
        icon="approve"
        className="some-class"   
    />`,
  Prism.languages.javascript,
  'javascript'
);

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
            {' '}
            <SvgComponent {...args} />
          </div>
        </div>
      </div>

      <br />

      <pre className="language-js">
        <code dangerouslySetInnerHTML={{ __html: codeSnippet }} />
      </pre>
    </>
  );
};

export const Svg = Template.bind({});
Svg.args = {
  icon: 'approve'
};
