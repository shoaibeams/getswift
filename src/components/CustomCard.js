import React from 'react';
import {StyleSheet} from 'react-native';
import {Content, Card, CardItem, Text} from 'native-base';

const CustomCard = ({children}) => {
  return (
    <Content padder style={styles.container}>
      <Card>
        <CardItem>
          <Text>{children}</Text>
        </CardItem>
      </Card>
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    width: 500,
  },
});

export default CustomCard;
