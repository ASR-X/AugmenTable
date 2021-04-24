import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export const BottomSheetSV = () => {
   // hooks
   const sheetRef = useRef<BottomSheet>(null);

   const snapPoints = useMemo(() => ['15%', '80%'], []);
 
   // callbacks
   const handleSheetChange = useCallback(index => {
     console.log('handleSheetChange', index);
   }, []);
 
   return (
       <BottomSheet
         ref={sheetRef}
         index={1}
         snapPoints={snapPoints}
         onChange={handleSheetChange}
       >
         <BottomSheetView style={styles.contentContainer}>
           
         </BottomSheetView>
       </BottomSheet>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingTop: 0,
   },
   contentContainer: {
     backgroundColor: 'white',
   },
   itemContainer: {
     padding: 6,
     margin: 6,
     backgroundColor: '#eee',
   },
});