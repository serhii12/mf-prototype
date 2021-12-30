import React from 'react';
import { Tooltip as TooltipComponent } from '@gourban/ui-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';

export default {
  title: 'UI Components/Tooltip',
  component: TooltipComponent
};

const codeSnippet = Prism.highlight(
  `
    <Tooltip 
        content="Text that will be displayed on hover"  // Content displayed after hover  
        placement="top" // Tooltip placement. top|bottom|left|right
        trigger="click" // When should tooltip be displayed. hover|click, default hover
        className="some-class" // Additional class if needed
    >
        Some text
    </Tooltip>`,
  Prism.languages.javascript,
  'javascript'
);

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Tooltip</h1>
        <p className="font-body-m">Hover over text bellow</p>
      </header>
      <TooltipComponent {...args}>Hover me</TooltipComponent>

      <br />
      <br />
      <pre className="language-js">
        <code dangerouslySetInnerHTML={{ __html: codeSnippet }} />
      </pre>
    </>
  );
};

export const Tooltip = Template.bind({});
// @ts-ignore
Tooltip.args = {
  content: 'I am hovered!',
  placement: 'top',
  trigger: 'hover'
};
