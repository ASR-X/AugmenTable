import React, {useMemo, useState, useCallback} from 'react';
import { StyleSheet, View, Text, ViewStyle, TextInput, TouchableOpacity} from 'react-native';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import filter from 'lodash.filter';
import { useDispatch, useSelector } from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCondition} from './actions/ConditionsActions'

export const CreateCondition = ({ navigation }) => {

    const headerHeight = useHeaderHeight();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('')
    const fullData = useSelector(state => state.conditions.possible);
    const dispatch = useDispatch();
    const [textbool, setTextBool] = useState(false);

    
    
    //setData(fullData);
    const fullDataMemo = useMemo(
        () =>
            fullData,
        []
    )

    const contentContainerStyle = useMemo<ViewStyle>(
        () => ({
          ...styles.contentContainer,
          paddingBottom: '10%',
          paddingTop: headerHeight
        }),
        [headerHeight]
    );
    
    const renderHeader = useCallback( () => (
        <View style={[styles.SearchBarBasic,]}>
            <View style={styles.inputBox}>
            <Icon name="magnify" style={styles.inputLeftIcon}></Icon>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                placeholder="Search"
                style={styles.inputStyle}
                onChangeText={text => handleSearch(text)}
                status='info'
                textStyle={{ color: '#000' }} 
                />
            </View>
        </View>
        ),
        []
    )

    const contains = ( [name, description], query) => {
        if (name.includes(query) || description.includes(query)) {
          return true
        }
        return false
      }
    
    const handleSearch = (text) => {
        if (text) {
            setTextBool(true)
        }
        else{
            setTextBool(false)
        }
        const formattedQuery = text.toLowerCase()
        const data = filter(fullDataMemo, condition => {
          return contains(condition, formattedQuery)
        })
        setData(data)
        setQuery(text)
      }

    const renderItem = useCallback(
        ({item, index}) => 
        (
            <TouchableOpacity onPress={ () => {handleSelection(index)} } style={[{width: '100%'}, {flexDirection: 'row'}, {alightItems:'center'}]}>
                <View style={styles.conditionContainer}>
                    <Text style={styles.conditionTitle}>{item[0]}</Text>
                    <Text style={styles.description}>{item[1]}</Text>
                </View>
            </TouchableOpacity>
        ),
        [handleSearch]
    );

    const bind = useMemo(
        () => {
          return bindActionCreators(addCondition, dispatch)
        },
        [dispatch]
    )
    
    const handleSelection = useCallback( conditionIndex => {
            bind(conditionIndex)
            navigation.navigate("Home")
        },[]
    )

    return (
        <BottomSheetFlatList
            initialNumToRender={5}
            windowSize={10}
            maxToRenderPerBatch={5}
            data={!textbool ? fullDataMemo: data}
            contentContainerStyle={contentContainerStyle}
            ListHeaderComponent={ renderHeader }
            keyExtractor={condition => condition[0]}
            renderItem={renderItem}
        >
        </BottomSheetFlatList>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    SearchBarBasic: {
        height: '10%',
        width: '90%',
        backgroundColor: "rgba(255,255,255,1)",
        flexDirection: "row",
        alignItems: "center",
        marginTop: '-5%',
        marginBottom: '-5%'        
    },
    inputBox: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#EFEFF4",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    inputLeftIcon: {
        color: "#000",
        fontSize: 20,
        alignSelf: "center",
        paddingLeft: 5,
        paddingRight: 5
    },
    inputStyle: {
        height: '100%',
        width:' 100%',
        alignSelf: "flex-start",
        fontSize: 15,
        lineHeight: 15,
        color: "#000",
        flex: 1
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