import React, {useRef} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import {Container, StyleProvider} from 'native-base';
import commonColor from '../../native-base-theme/variables/commonColor';
import getTheme from '../../native-base-theme/components';
import GlobalStyles from '../../config/styles';
import CustomHeader from '../../components/CustomHeader';
import colors from '../../config/colors';
import Button from '../../components/Button';

const SignatureScreen = ({route}) => {
  const signRef = useRef(null);
  const {company_name, price} = route.params;

  const _onSaveEvent = result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    ToastAndroid.showWithGravity(
      'Signature has been saved successfully',
      3000,
      ToastAndroid.CENTER,
    );
  };

  const _onDragEvent = () => {};

  return (
    <StyleProvider style={getTheme(commonColor)}>
      <Container style={styles.container}>
        <CustomHeader>Signature</CustomHeader>
        <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
          <View style={styles.textContainer}>
            <Text style={GlobalStyles.txtMd}>{company_name}</Text>
            <Text style={GlobalStyles.txtMd}>${price}</Text>
          </View>

          <SignatureCapture
            style={[{flex: 1}, styles.signature]}
            ref={signRef}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
          />

          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonStyle}
              onPress={() => {
                signRef.current.resetImage();
              }}>
              CLEAR
            </Button>
            <Button
              style={styles.buttonStyle}
              onPress={() => {
                signRef.current.saveImage();
              }}>
              ADD SIGNATURE
            </Button>
          </View>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default SignatureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_SMOKE,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    margin: 10,
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
