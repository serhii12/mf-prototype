import React, { useCallback } from 'react';

const WhiteLabelManager = () => {
  const minifyCssString = useCallback((css) => {
    return css.replace(/\n/g, '').replace(/\s\s+/g, ' ');
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: minifyCssString(`
                        body {                         
                            --primary-color: #FF0000;
                        }                   
                    `),
        }}
      />
    </>
  );
};

export default React.memo(WhiteLabelManager);
