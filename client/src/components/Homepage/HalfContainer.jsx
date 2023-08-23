import React from 'react';
import HalfFlexContainer from '../../css-components/Homepage/HalfFlexContainer';
import SecondContainerMainBox from "./SecondContainerMainBox";

function HalfContainer() {
  return (
    <div>
    <HalfFlexContainer maxWidth={false}>
        <SecondContainerMainBox 
          title="Be a healthier you"
          explanation="Count your calories, ensure you're meeting nutritional targets, and track your progress over time."
        />
    </HalfFlexContainer>
    </div>
  )
}

export default HalfContainer;