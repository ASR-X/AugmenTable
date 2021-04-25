import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { BarcodeTrackingAdvancedOverlayView } from 'scandit-react-native-datacapture-barcode';
import { StyleSheet, FlatList } from 'react-native';
import url from './constant'
import {store} from './store'
import {addModal} from './actions/ConditionsActions';

var Spinner = require('react-native-spinkit');
export class ARInfo extends BarcodeTrackingAdvancedOverlayView {
  constructor(props) {
    super(props);
    this.state = { loading: false, warnings: []};
  }

  renderItem({item}) {
    return (
    <TouchableOpacity onPress={ () => {console.log('sent'); store.dispatch(addModal(item))}} style={[{width: '100%'}, {flexDirection: 'row'}, {alightItems:'center'}, {justifyContent:'center'}, {alignText:'center'}]}>
      <Text style={styles.entry}>{item}</Text>
    </TouchableOpacity>
    );
  }

  renderWarnings() {
    if (this.state.loading){
      return(<></>)
    }
    if (this.state.warnings.length) {
        return (<>
          <Text style={[styles.status, {color:"rgba(255,0,0,1)"}]}>
                    Avoid
                </Text>
                <FlatList 
                  data={this.state.warnings}
                  renderItem={item => this.renderItem(item)}
                  keyExtractor={item => item}
                  ItemSeparatorComponent={this.renderSeparator}
                  style={{width:'90%', borderColor:"#CED0CE", borderWidth: 0.5, borderRadius: 8, marginBottom: '4%'}}
                />
            </>)
            ;
    }
    return (
      <Text style={[styles.status, {color:"rgba(0,0,255,1)"}]}>
        Safe
      </Text>
    );
  }

  componentDidMount() {
    conditionsarr = []
    const state = store.getState()
    const current = state.conditions.current
    for (let i =0; i < current.length; i++) {
      conditionsarr.push(current[i][0])
    }
    var obj = {}
    obj["conditions"] = {"conditions": conditionsarr}
    obj["barcodein"] = {"barcode": this.props.barcodeData}

    fetch(url+'/getBads', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(obj) // body data type must match "Content-Type" header
    })
    .then((resp) => resp.json())
    .then(function(response) {
        this.setState({loading: false, warnings: response['bads']})
      }
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    )
  }
  
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.rect}>
        <Spinner style={styles.spinner} isVisible={loading} size={50} type={'Pulse'} color={'#006fff'}></Spinner>
        {this.renderWarnings()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  spinner: {
    marginVertical: '5%',
  },
  rect: {
    flexDirection: "column",
    width: 250,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "center",
    borderColor: "rgba(6,111,255,1)",
    textAlign: 'center',
    flexGrow: 0
  },
  status: {
    fontFamily: "sf-pro-text-regular",
    fontSize: 30,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 8
  },
  entry: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    marginBottom: 4,
    padding: 2,
    textAlign: 'center',
    fontSize: 20,
  },
  line: {
    flex: 1, height: 1, backgroundColor: 'black'
  },
  lottie: {
    width: '40%',
    height: '40%'
  }
})
