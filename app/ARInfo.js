import React from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import { BarcodeTrackingAdvancedOverlayView } from 'scandit-react-native-datacapture-barcode';
import { StyleSheet } from 'react-native';

export class ARInfo extends BarcodeTrackingAdvancedOverlayView {
  render() {
    return (
      <View style={styles.rect}>
        <View style={[flexDirection="vertical", alignItems="center", textAlign='center']}>
          <Text style={styles.status}>
            Avoid Status
          </Text>
          <Text style={styles.entry}>
            Avoid Entry
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rect: {
    flexDirection: "column",
    width: 200,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "center",
    borderColor: "rgba(6,111,255,1)"
  },
  status: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center'
  },
  entry: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    marginTop: 20,
    textAlign: 'center'
  },
  line: {
    flex: 1, height: 1, backgroundColor: 'black'
  }
})