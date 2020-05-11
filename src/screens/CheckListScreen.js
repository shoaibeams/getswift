import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, StyleProvider, Text, Icon} from 'native-base';
import getTheme from '../native-base-theme/components';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import commonColor from '../native-base-theme/variables/commonColor';
import colors from '../config/colors';
import {FlatList} from 'react-native-gesture-handler';
import CheckListItem from '../components/CheckListItem';

const CheckListScreen = ({navigation, route: {params}}) => {
  const {items, id} = params;

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>Checklist</CustomHeader>
        <Text style={styles.rightAlignedText}>Job #{id}</Text>
        <View style={styles.jobsContainer}>
          <FlatList
            data={items}
            keyExtractor={({id}) => id}
            renderItem={({item: {description, qty}}) => (
              <CheckListItem description={description} quantity={qty} />
            )}
          />
        </View>
        <Button onPress={() => navigation.navigate('Signature', params)}>
          Confirm
        </Button>
      </Container>
    </StyleProvider>
  );
};

const styles = StyleSheet.create({
  jobsContainer: {
    flex: 1,
    // padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_SMOKE,
  },
  rightAlignedText: {
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 5,
    color: colors.GREEN,
  },
});

export default CheckListScreen;
