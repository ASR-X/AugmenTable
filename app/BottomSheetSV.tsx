import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';

const BottomSheetSV = () => {
   // hooks
   const sheetRef = useRef<BottomSheet>(null);

   const current = useSelector(state => state.conditions.current);

   const snapPoints = useMemo(() => ['15%', '80%'], []);
 
   // callbacks
   const handleSheetChange = useCallback(index => {
     console.log('handleSheetChange', index);
   }, []);
 
   const data = useMemo(
    () =>
      current,
    []
  );

  const renderItem = useCallback(
    condition => (
      <View style={styles.conditionContainer}>
        <Text style={styles.conditionTitle}>{condition[0]}</Text>
        <Text style={styles.description}>{condition[1]}</Text>
      </View>
    ),
    []
  );

   return (
       <BottomSheet
         ref={sheetRef}
         index={0}
         snapPoints={snapPoints}
         onChange={handleSheetChange}
       >
         <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.oconditionTitle}>Conditions</Text>
          {data.map(renderItem)}
         </BottomSheetScrollView>
       </BottomSheet>
   );
 };


const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  oconditionTitle: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 42,
    letterSpacing: 0,
    marginTop: '2%',
    textAlign: 'center',
    marginBottom: '3%'
  },
  conditionContainer: {
    width: '90%',
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#006fff",
    marginTop: '5%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  conditionTitle: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    marginTop: '2%',
    textAlign: 'center',
  },
  description: {
    fontFamily: "sf-pro-text-regular",
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    marginTop: '4%',
    marginBottom: '2%',
    textAlign: 'center',
    marginRight: '2.5%',
    marginLeft: '2.5%',
  },
});

export default BottomSheetSV