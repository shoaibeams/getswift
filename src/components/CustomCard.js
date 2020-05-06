import React from 'react';
import {Content, Body, Card, CardItem, Text} from 'native-base';

const CustomCard = ({children}) => {
  return (
    <Content padder>
      <Card>
        <CardItem>
          <Body>
            <Text>{children}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

export default CustomCard;
