import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Container, StyleProvider, Text, Icon} from 'native-base';
import getTheme from '../../native-base-theme/components';
import CustomHeader from '../../components/CustomHeader';
import ListItem from '../../components/ListItem';
import {getAllJobs} from '../../redux/jobs/jobs.actions';
import commonColor from '../../native-base-theme/variables/commonColor';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../config/colors';
import GlobalStyles from '../../config/styles';

const AcceptedJobsListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.userReducer.token);
  const jobs = useSelector(state => state.jobsReducer.jobs);
  const [acceptedJobs, setAcceptedJobs] = useState([]);

  useEffect(() => {
    console.log('jobs', jobs);
    if (!jobs) {
      dispatch(getAllJobs(token));
    } else {
      setAcceptedJobs(jobs.filter(job => job.pivot.is_accepted == true));
    }
  }, [dispatch, token, jobs]);

  console.log('acceptedJobs :>> ', acceptedJobs);

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>Accepted Jobs</CustomHeader>
        {acceptedJobs.length === 0 ? (
          <View style={styles.jobsContainer}>
            <View style={GlobalStyles.centerText}>
              {acceptedJobs.length === 0 && <Text>No accepted jobs yet</Text>}
            </View>
          </View>
        ) : (
          <FlatList
            data={acceptedJobs ? acceptedJobs : null}
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
              <TouchableOpacity
                onPress={() => navigation.navigate('CheckList', item)}>
                <ListItem>
                  <View style={styles.rightAlignedText}>
                    <Text style={GlobalStyles.txtGrey}>JOB # {id}</Text>
                    <Text style={GlobalStyles.txtGreen}>{created_at}</Text>
                  </View>
                  <View style={styles.textWithIconContainer}>
                    <View>
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
                    </View>
                    <View style={styles.iconContainer}>
                      <Icon
                        name="checkcircleo"
                        type="AntDesign"
                        style={{color: 'green', fontSize: 60}}
                      />
                    </View>
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
          />
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWithIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    paddingTop: 10,
  },
});

export default AcceptedJobsListScreen;
