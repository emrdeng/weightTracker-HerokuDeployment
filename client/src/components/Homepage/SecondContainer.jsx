import React from 'react';
import MiddleFlexContainer from '../../css-components/Homepage/MiddleFlexContainer';
import LittleSummaryBoxes from './LittleSummaryBoxes';

function SecondContainer() {
  return (
    <div>
    <MiddleFlexContainer maxWidth={false}>
      <LittleSummaryBoxes />
    </MiddleFlexContainer>
    
    </div>
  )
}

export default SecondContainer;