import React, {useContext, useState, useEffect} from 'react';
import {FlatList,View,StyleSheet} from 'react-native';
import {NavigationScreenProp, NavigationState, NavigationActions} from 'react-navigation';

import {RandomUserDataContext} from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Feed from '~/Components/Feed';

import StoryList from './StoryList';



interface Props{
    navigation: NavigationScreenProp<NavigationState>;
}

const MyFeed = ({navigation}: Props) => {
    const {getMyFeed} = useContext(RandomUserDataContext);
    const [feedList, setFeedList] = useState<Array<IFeed>>([]);
    const [storyList, setStoryList] = useState<Array<IFeed>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setFeedList(getMyFeed());
        setStoryList(getMyFeed());
    },[]);

    return(
        <FlatList
            data={feedList}
            keyExtractor={(item,index)=> {
                return `myfeed-${index}`;
            }}
            showsVerticalScrollIndicator={false}
            onRefresh={() => {
                setLoading(true);
                setTimeout(() => {
                    setFeedList(getMyFeed());
                    setStoryList(getMyFeed());
                    setLoading(false);
                },2000);
            }}
            onEndReached={()=>{
                setFeedList([...feedList, ...getMyFeed()]);
            }}
            onEndReachedThreshold={0.5}
            refreshing={loading}
            ListHeaderComponent= {<StoryList storyList={storyList} />}
            renderItem={({ item,index }) => (
                <Feed
                id={index}
                name={item.name}
                photo={item.photo}
                description={item.description}
                images={item.images}
                />
            )}
        />
    );
};

MyFeed.navigationOptions = {
    title : 'SNS App',
    headerLeft: () => <IconButton style={style.headerLeft} iconName="camera"/>,
    headerRight: () =>
        <View style={style.headerRight}>
            <IconButton style={{marginRight:4}} iconName="live"/>
            <IconButton iconName="send"/>
        </View>
    
};
const style = StyleSheet.create({
    headerRight: {
        flex: 1,
        flexDirection:'row',
        alignItems: "center",
        marginRight:8
    },

    headerLeft:{
        marginLeft:8
    }
  });
export default MyFeed;