import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Container, StyleProvider, Text} from 'native-base';
import getTheme from '../../native-base-theme/components';
import CustomHeader from '../../components/CustomHeader';
import Item from '../../components/Item';
import {getAllJobs} from '../../redux/jobs/jobs.actions';
import commonColor from '../../native-base-theme/variables/commonColor';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import colors from '../../config/colors';
import GlobalStyles from '../../config/styles';

const NewScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.userReducer.token, shallowEqual);
  const jobs = useSelector(state => state.jobsReducer.jobs, shallowEqual);
  const [unacceptedJobs, setUnacceptedJobs] = useState([]);

  useEffect(() => {
    // console.log('jobs', jobs);
    if (!jobs) {
      dispatch(getAllJobs(token));
    } else {
      setUnacceptedJobs(jobs.filter(job => job.is_accepted === false));
    }
  }, [dispatch, token, jobs]);

  // console.log('unacceptedJobs :>> ', unacceptedJobs);

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>New Jobs</CustomHeader>
        <View style={styles.jobsContainer}>
          <FlatList
            data={unacceptedJobs ? unacceptedJobs : null}
            keyExtractor={item => item.id}
            renderItem={({
              item,
              item: {
                id,
                pick_up_addr,
                drop_off_addr,
                price,
                created_at,
                distance_in_kms,
              },
            }) => (
              <TouchableOpacity onPress={() => navigation.push('Job', item)}>
                <Item>
                  <View style={styles.rightAlignedText}>
                    <Text style={GlobalStyles.txtGrey}>JOB # {id}</Text>
                    <Text style={GlobalStyles.txtGreen}>{created_at}</Text>
                  </View>

                  <Text>
                    <Text style={GlobalStyles.txtGrey}>FROM:</Text>{' '}
                    {pick_up_addr}
                  </Text>
                  <Text>
                    <Text style={GlobalStyles.txtGrey}>TO:</Text>{' '}
                    {drop_off_addr}
                  </Text>
                  <Text>{distance_in_kms} </Text>
                  <Text style={GlobalStyles.txtGrey}>${price}</Text>
                </Item>
              </TouchableOpacity>
            )}
          />
        </View>
      </Container>
    </StyleProvider>
  );
};

const styles = StyleSheet.create({
  jobsContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_SMOKE,
  },
  rightAlignedText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewScreen;
