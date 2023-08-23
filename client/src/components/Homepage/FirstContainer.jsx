import React from 'react';
import FlexContainer from '../../css-components/Homepage/FlexContainer';
import SoloBox from '../../css-components/Homepage/SoloBox';
import Title from "./Title1";
import UnderTitle from './UnderTitle';
import SignUpButton from './SignUpButton';

function FirstContainer() {
  return (
    <FlexContainer 
      className="imageContainer" 
      maxWidth="false"
      >
      <SoloBox>
      <Title title="Eat smarter," />
      <Title title="live healthier." />  
      <UnderTitle title="Track your meals, exercise, and calorie goals." />
      <SignUpButton />
      
      </SoloBox>
      
    </FlexContainer>
  )
}

export default FirstContainer;