import React, {useContext, useState, useEffect} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

import {StyleSheet, View} from 'react-native';

import Styled from 'styled-components/native';

import {RandomUserDataContext} from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Input from '~/Components/Input';
import ImageFeedList from '~/Components/ImageFeedList';
import styled from 'styled-components';

const SearchBar = Styled.View``;

interface Props{
    navigation: NavigationScreenProp<NavigationState>;
}

const Feeds =({navigation} : Props) => {
    const {getMyFeed} = useContext(RandomUserDataContext);
    const [feedList, setFeedList] = useState<Array<IFeed>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setFeedList(getMyFeed(24));
    }, []);

    return(
        <ImageFeedList
        feedList={feedList}
        loading={loading}
        onRefresh={()=> {
            setLoading(true);
            setTimeout(()=>{
                setFeedList(getMyFeed(24));
                setLoading(false);
            },2000);
        }}
        onEndReached={()=>{
            setFeedList([...feedList, ...getMyFeed(24)]);
        }}
        onPress={()=>{
            navigation.navigate('FeedListOnly');
        }}
        />
    );
};

Feeds.navigationOptions = {
    headerTitle: () => (
        <SearchBar>
            <View style={style.searchBar}>
                <Input placeholder="검색"/>
                <IconButton iconName="camera" />
            </View>
        </SearchBar>
    ),
    headerBackTitle: null,
};

const style = StyleSheet.create({
    searchBar:{
        flex: 1,
        flexDirection:'row',
        marginLeft: 8,
        height: 32,
        alignItems:'center',
        width:340,
    }
})

export default Feeds;