import React from 'react';
import {Header, Body, Title, Right} from 'native-base';

const CustomHeader = ({children}) => {
  return (
    <Header>
      <Body>
        <Title style={{paddingLeft: 10}}>{children}</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default CustomHeader;
