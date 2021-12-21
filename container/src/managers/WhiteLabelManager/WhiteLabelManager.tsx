import React, { useCallback } from 'react';
import brandColors from '@core/assets/scss/exports/brand_colors.module.scss';
import semanticColors from '@core/assets/scss/exports/semantic_colors.module.scss';
import neutralColors from '@core/assets/scss/exports/neutral_colors.module.scss';
import colorVariants from '@core/assets/scss/exports/color_variants.module.scss';
import typography from '@core/assets/scss/exports/typography.module.scss';
import effects from '@core/assets/scss/exports/effects.module.scss';

const WhiteLabelManager = () => {
  const minifyCssString = useCallback((css) => {
    return css.replace(/\n/g, '').replace(/\s\s+/g, ' ');
  }, []);

  const combinedColors = { ...brandColors, ...semanticColors, ...neutralColors, ...colorVariants };
  const combinedColorsKeys = Object.keys(combinedColors);
  const typographyKeys = Object.keys(typography);
  const effectKeys = Object.keys(effects);

  const generateColorVariables = useCallback(() => {
    return combinedColorsKeys.map((key) => `--${key}: ${combinedColors[key]}`).join(';');
  }, [combinedColorsKeys]);

  const generateFontVariables = useCallback(() => {
    return typographyKeys.map((key) => `--${key}: ${typography[key]}`).join(';');
  }, [typographyKeys]);

  const generateEffectVariables = useCallback(() => {
    return effectKeys.map((key) => `--${key}: ${effects[key]}`).join(';');
  }, [effectKeys]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: minifyCssString(`
                        :root {                         
                            ${generateColorVariables()};
                            ${generateFontVariables()};
                            ${generateEffectVariables()};
                            --spacing: 8px;
                        }                   
                    `)
        }}
      />
    </>
  );
};

export default React.memo(WhiteLabelManager);
