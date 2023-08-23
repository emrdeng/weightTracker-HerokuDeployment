import React from 'react';
import FooterCSS from '../../css-components/Homepage/FooterCSS';
import FooterMiniBox from './FooterMiniBox';

function FooterContainer() {
  return (
    <FooterCSS maxWidth={false}>
        <FooterMiniBox />
    </FooterCSS>
  )
}

export default FooterContainer