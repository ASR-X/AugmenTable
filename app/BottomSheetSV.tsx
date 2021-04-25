import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import {
  createStackNavigator,
  HeaderBackButton,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {CreateCondition} from './CreateCondition'
import { NavigationContainer } from '@react-navigation/native';

const BottomSheetSV = () => {
   // hooks
   

   const sheetRef = useRef<BottomSheet>(null);

   const snapPoints = useMemo(() => ['15%', '80%'], []);
 
   // callbacks
   const handleSheetChange = useCallback(index => {
     console.log('handleSheetChange', index);
   }, []);

  const renderItem = useCallback(
    condition => (
      <View style={styles.conditionContainer}>
        <Text style={styles.conditionTitle}>{condition[0]}</Text>
        <Text style={styles.description}>{condition[1]}</Text>
      </View>
    ),
    []
  );

  const NestedStack = createStackNavigator();

  const SV = ({navigation}) => {
    const current = useSelector(state => state.conditions.current);
    return (
      <>
        <Text style={styles.oconditionTitle}>Conditions</Text>
        <BottomSheetScrollView contentContainerStyle={contentContainerStyle}>
            {current.map(renderItem)}
          <TouchableOpacity
            onPress={() => navigation.navigate("Create Condition")}
            style={[{width: '100%'}, {flexDirection: 'row'}, {alightItems:'center'}]}
          >
            <View style={[styles.conditionContainer, {justifyContent: 'center'}]}>
                <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </>
    )
  }

  const Navigator = () => {
    const screenOptions = useMemo<StackNavigationOptions>(
      () => ({
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: true,
        safeAreaInsets: { top: 0 },
        headerLeft: ({ onPress, ...props }) => (
          <TouchableOpacity onPress={onPress}>
            <HeaderBackButton {...props} />
          </TouchableOpacity>
        ),
        cardStyle: {
          backgroundColor: 'white',
          overflow: 'visible',
        },
      }),
      []
    );

    return (
        <NavigationContainer independent={true}>
          <NestedStack.Navigator screenOptions={screenOptions}>
            <NestedStack.Screen
              name="Home"
              options={{headerShown: false}}
              component={SV}
              />
            <NestedStack.Screen
              name="Create Condition"
              options={screenOptions}
              component={CreateCondition}
            />
          </NestedStack.Navigator>
        </NavigationContainer>
      );
  };

  const contentContainerStyle = useMemo<ViewStyle>(
    () => ({
      ...styles.contentContainer,
      paddingBottom: '10%',
    }),
    []
  );

   return (
       <BottomSheet
         ref={sheetRef}
         index={0}
         snapPoints={snapPoints}
         onChange={handleSheetChange}
       >
        <Navigator />
       </BottomSheet>
   );
 };


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  plus: {
    fontFamily: "sf-pro-text-regular",
    color: "#121212",
    fontSize: 100,
    textAlign: 'center',
  },
});

export default BottomSheetSV