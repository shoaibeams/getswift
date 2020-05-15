import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, StyleProvider, Text, Icon} from 'native-base';
import getTheme from '../../native-base-theme/components';
import CustomHeader from '../../components/CustomHeader';
import Button from '../../components/Button';
import commonColor from '../../native-base-theme/variables/commonColor';
import colors from '../../config/colors';
import {FlatList} from 'react-native-gesture-handler';
import CheckListItem from '../../components/CheckListItem';
import {useSelector} from 'react-redux';

const CheckListScreen = ({navigation, route: {params}}) => {
  const jobs = useSelector(state => state.jobsReducer.jobs);

  const {items, id} = params;
  const [jobItems, setJobItems] = useState(items);
  const [activeJobId, setActiveJobId] = useState(id);

  // console.log('activeJobId', activeJobId);
  const nextJobItems = jobs.filter(job => job.id === activeJobId + 1);
  // const [nextJob, setNextJobItem] = useState(nextJobItems);

  // console.log('nextJob :>> ', nextJobItems);

  const updateJobItemsContent = () => {
    setJobItems(nextJobItems[0].items);
    setActiveJobId(activeJobId + 1);
  };

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>Checklist</CustomHeader>
        <Text style={styles.rightAlignedText}>
          Job #{activeJobId}
          {'  '}
          {nextJobItems.length > 0 && (
            <Text onPress={updateJobItemsContent}>Job #{activeJobId + 1}</Text>
          )}
        </Text>
        <View style={styles.jobsContainer}>
          <FlatList
            data={jobItems}
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
