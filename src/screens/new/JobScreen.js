import React from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {Container, StyleProvider, Text, Icon} from 'native-base';
import getTheme from '../../native-base-theme/components';
import CustomHeader from '../../components/CustomHeader';
import Button from '../../components/Button';
import commonColor from '../../native-base-theme/variables/commonColor';
import colors from '../../config/colors';
import GlobalStyles from '../../config/styles';
import Item from '../../components/Item';
import {useDispatch, useSelector} from 'react-redux';
import {acceptJob, rejectJob} from '../../redux/jobs/jobs.actions';

const JobScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.userReducer.token);
  const {
    id,
    company_name,
    contact_name,
    drop_off_addr,
    pick_up_addr,
    contact_phone,
    created_at,
    distance_in_kms,
  } = route.params;

  // console.log('job', route.params);

  const acceptJobHandler = () => {
    dispatch(acceptJob(token, id));
    navigation.goBack();
    ToastAndroid.showWithGravity(
      'Job has been accepted successfully',
      3000,
      ToastAndroid.CENTER,
    );
  };

  const rejectJobHandler = () => {
    dispatch(rejectJob(token, id));
    navigation.goBack();
    ToastAndroid.showWithGravity(
      'Job has been rejected successfully',
      3000,
      ToastAndroid.CENTER,
    );
  };

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>Job #{id}</CustomHeader>
        <Text style={styles.rightAlignedText}>{created_at}</Text>
        <View style={styles.jobsContainer}>
          <Item>
            <Text>
              <Text style={GlobalStyles.txtGrey}>FROM:</Text> {pick_up_addr}
            </Text>
            <View>
              <Text style={GlobalStyles.txtGrey}>{company_name}</Text>
            </View>
            <Text>
              <Icon name="phone" type="Entypo" style={{fontSize: 17}} />
              {contact_phone}
            </Text>
            <Text>{distance_in_kms} away from you </Text>
          </Item>
          <Item>
            <Text>
              <Text style={GlobalStyles.txtGrey}>TO:</Text> Contact Name
            </Text>
            <Text>{contact_name}</Text>
            <Text>Regular Customer</Text>
            <Text>{drop_off_addr}</Text>
          </Item>
          <Item>
            <Text style={GlobalStyles.txtGrey}>Instructions</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum eveniet ducimus doloribus sunt quasi quaerat id, eius
              cupiditate eligendi facere exercitationem maiores quae hic
              assumenda repudiandae aperiam beatae ut vel.
            </Text>
          </Item>
          <View style={styles.buttonsContainer}>
            <Button onPress={acceptJobHandler} style={{width: '45%'}}>
              ACCEPT JOB
            </Button>
            <Button
              onPress={rejectJobHandler}
              style={{width: '45%', backgroundColor: colors.RED}}>
              REJECT JOB
            </Button>
          </View>
        </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default JobScreen;
