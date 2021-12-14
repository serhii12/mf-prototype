// Button.stories.js | Button.stories.jsx
import React from 'react';
import { storiesOf } from '@storybook/react';
import typography from '../assets/scss/exports/typography.module.scss';

console.log(typography);

storiesOf('Style', module).add('Typography', () => {
  const typographyKeys = Object.keys(typography);

  const renderInfo = ({ name, font_name, weight, font_size, spacing }) => {
    return (
      <div className="story__typography-single__info">
        <h4>{name}</h4>
        <p className="font-body-s">
          {font_name} • {weight}
        </p>
        <p className="font-body-s">{font_size}</p>
        <p className="font-body-s">spacing: {spacing}</p>
      </div>
    );
  };

  const renderTypographyInformation = (item) => {
    switch (item) {
      case 'font-1':
        return renderInfo({
          name: 'H1',
          font_name: 'Inter',
          weight: 'Semibold ( 600 )',
          font_size: '34 / 40',
          spacing: '1.21'
        });
      case 'font-2':
        return renderInfo({
          name: 'H2',
          font_name: 'Inter',
          weight: 'Semibold ( 600 )',
          font_size: '28 / 34',
          spacing: '1.29'
        });
      case 'font-3':
        return renderInfo({
          name: 'H3',
          font_name: 'Inter',
          weight: 'Semibold ( 600 )',
          font_size: '22 / 26',
          spacing: '1.45'
        });
      case 'font-4':
        return renderInfo({
          name: 'H4',
          font_name: 'Inter',
          weight: 'Semibold ( 600 )',
          font_size: '18 / 22',
          spacing: '1.9'
        });
      case 'font-5':
        return renderInfo({
          name: 'H5',
          font_name: 'Inter',
          weight: 'Bold ( 700 )',
          font_size: '14 / 20',
          spacing: '1'
        });
      case 'font-body-l':
        return renderInfo({
          name: 'Body L',
          font_name: 'Inter',
          weight: 'Semibold ( 600 )',
          font_size: '16 / 22',
          spacing: '0'
        });
      case 'font-body-m':
        return renderInfo({
          name: 'Body M',
          font_name: 'Inter',
          weight: 'Regular ( 400 )',
          font_size: '16 / 22',
          spacing: '0'
        });
      case 'font-body-s':
        return renderInfo({
          name: 'Body S',
          font_name: 'Inter',
          weight: 'Regular ( 400 )',
          font_size: '14 / 20',
          spacing: '0'
        });
      case 'font-caption':
        return renderInfo({
          name: 'Caption',
          font_name: 'Inter',
          weight: 'Regular ( 400 )',
          font_size: '12 / 16',
          spacing: '0'
        });
      default:
        return null;
    }
  };

  const renderTypography = (item) => {
    console.log(item);
    switch (item) {
      case 'font-1':
        return (
          <h1>Better to remain silent and be thought a fool that to speak and remove all doubt</h1>
        );
      case 'font-2':
        return (
          <h2>Better to remain silent and be thought a fool that to speak and remove all doubt</h2>
        );
      case 'font-3':
        return (
          <h3>Better to remain silent and be thought a fool that to speak and remove all doubt</h3>
        );
      case 'font-4':
        return (
          <h4>Better to remain silent and be thought a fool that to speak and remove all doubt</h4>
        );
      case 'font-5':
        return (
          <h5>Better to remain silent and be thought a fool that to speak and remove all doubt</h5>
        );
      case 'font-body-l':
        return (
          <p className="font-body-l">
            Alice was beginning to get very tired of sitting by her sister on the bank, and of
            having nothing to do: once or twice she had peeped into the book her sister was reading,
            but it had no pictures or conversations in it, “and what is the use of a book,” thought
            Alice, “without pictures or conversation"?
          </p>
        );
      case 'font-body-m':
        return (
          <p className="font-body-m">
            Alice was beginning to get very tired of sitting by her sister on the bank, and of
            having nothing to do: once or twice she had peeped into the book her sister was reading,
            but it had no pictures or conversations in it, “and what is the use of a book,” thought
            Alice, “without pictures or conversation"?
          </p>
        );
      case 'font-body-s':
        return (
          <p className="font-body-s">
            Alice was beginning to get very tired of sitting by her sister on the bank, and of
            having nothing to do: once or twice she had peeped into the book her sister was reading,
            but it had no pictures or conversations in it, “and what is the use of a book,” thought
            Alice, “without pictures or conversation"?
          </p>
        );
      case 'font-caption':
        return (
          <p className="font-caption">
            Alice was beginning to get very tired of sitting by her sister on the bank, and of
            having nothing to do: once or twice she had peeped into the book her sister was reading,
            but it had no pictures or conversations in it, “and what is the use of a book,” thought
            Alice, “without pictures or conversation"?
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Typography</h1>
      </header>

      <div className="story__block">
        {typographyKeys.map((typographySingle) => (
          <div className="story__typography-single">
            {renderTypographyInformation(typographySingle)}
            {renderTypography(typographySingle)}
          </div>
        ))}
      </div>
    </>
  );
});
