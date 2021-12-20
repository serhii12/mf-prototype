import React from 'react';
import brand_colors from '../assets/scss/exports/brand_colors.module.scss';
import neutral_colors from '../assets/scss/exports/neutral_colors.module.scss';
import semantic_colors from '../assets/scss/exports/semantic_colors.module.scss';
import variantionColors from '../assets/scss/exports/color_variants.module.scss';
import './index.scss';

export default {
  title: 'UI Style guide/Colors'
};

const Template = () => {
  const brandColorKeys = Object.keys(brand_colors);
  const neutralColorKeys = Object.keys(neutral_colors);
  const semanticColorsKeys = Object.keys(semantic_colors);

  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Colors</h1>
      </header>

      <div className="story__block">
        <h2>Brand colors</h2>
        {brandColorKeys.map((color) => (
          <div key={color} className="color__box">
            <div className="color__box-item">
              <div className={`color__item color--${color}`} />
              <p>
                Key: <b>{color}</b>
              </p>
              <p>
                Code: <b>{brand_colors[color]}</b>
              </p>
            </div>

            <div className="color__box-item-shades">
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-30`} />
                <p>
                  Variant #{1}: <b>lighten(30)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_30`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-20`} />{' '}
                <p>
                  Variant #{2}: <b>lighten(20)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_20`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-10`} />{' '}
                <p>
                  Variant #{3}: <b>lighten(10)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_10`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-d-20`} />{' '}
                <p>
                  Variant #{4}: <b>darken(20)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_d_20`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-d-40`} />{' '}
                <p>
                  Variant #{5}: <b>darken(40)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_d_40`]}</b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="story__block">
        <h2>Neutral colors</h2>
        {neutralColorKeys.map((color) => (
          <div key={color} className="color__box">
            <div className="color__box-item">
              <div className={`color__item color--${color}`} />
              <p>
                Key: <b>{color}</b>
              </p>
              <p>
                Code: <b>{neutral_colors[color]}</b>
              </p>
            </div>

            <div className="color__box-item-shades">
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-30`} />
                <p>
                  Variant #{1}: <b>lighten(30)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_30`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-20`} />{' '}
                <p>
                  Variant #{2}: <b>lighten(20)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_20`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-10`} />{' '}
                <p>
                  Variant #{3}: <b>lighten(10)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_10`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-d-20`} />{' '}
                <p>
                  Variant #{4}: <b>darken(20)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_d_20`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-d-40`} />{' '}
                <p>
                  Variant #{5}: <b>darken(40)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_d_40`]}</b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="story__block">
        <h2>Semantic colors</h2>
        {semanticColorsKeys.map((color) => (
          <div key={color} className="color__box">
            <div className="color__box-item">
              <div className={`color__item color--${color}`} />
              <p>
                Key: <b>{color}</b>
              </p>
              <p>
                Code: <b>{semantic_colors[color]}</b>
              </p>
            </div>

            <div className="color__box-item-shades">
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-30`} />
                <p>
                  Variant #{1}: <b>lighten(30)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_30`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-20`} />{' '}
                <p>
                  Variant #{2}: <b>lighten(20)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_20`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-l-10`} />{' '}
                <p>
                  Variant #{3}: <b>lighten(10)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_l_10`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-d-20`} />{' '}
                <p>
                  Variant #{4}: <b>darken(20)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_d_20`]}</b>
                </p>
              </div>
              <div className="color__box-item">
                <div className={`color__item color--${color}-d-40`} />{' '}
                <p>
                  Variant #{5}: <b>darken(40)</b>
                </p>
                <p>
                  Code: <b>{variantionColors[`${color}_variation_d_40`]}</b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const Colors = Template.bind({});
