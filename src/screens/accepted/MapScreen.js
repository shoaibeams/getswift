import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Container, StyleProvider} from 'native-base';
import getTheme from '../../native-base-theme/components';
import CustomHeader from '../../components/CustomHeader';
import commonColor from '../../native-base-theme/variables/commonColor';
import colors from '../../config/colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import PubNubReact from 'pubnub-react';
import {useSelector} from 'react-redux';

const MapScreen = ({navigation}) => {
  const jobs = useSelector(state => state.jobsReducer.jobs);

  useEffect(() => {
  }, [jobs]);
  const {pick_up_lat, pick_up_long} = jobs[0];

  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = pick_up_lat;
  const LONGITUDE = pick_up_long;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>MAP</CustomHeader>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // customMapStyle={mapStyle}
          >
            <Marker
              draggable
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={'Test Marker'}
              description={'This is a description of the marker'}
            />
          </MapView>
        </View>
      </Container>
    </StyleProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {
    flex: 1,
    backgroundColor: colors.WHITE_SMOKE,
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    position: 'absolute',
    top: 56,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
