import React, {useContext, useState, useEffect} from 'react';
import {FlatList,View,StyleSheet, TouchableOpacityBase,TouchableOpacity,Text, PanResponder, Alert, CameraRoll} from 'react-native';
import {NavigationScreenProp, NavigationState, NavigationActions} from 'react-navigation';

import {RandomUserDataContext} from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Feed from '~/Components/Feed';

import {RNCamera} from 'react-native-camera';

import StoryList from './StoryList';
import { MyCamera } from '~/Screens/MyFeed/MyCamera.tsx';



interface Props{
    navigation: NavigationScreenProp<NavigationState>;
    // onPress ?: ()=> void; // 내가 추가한 것
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

// class Camera1{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <RNCamera
//                     style={styles.preview}
//                 />
//             </View>
//         );
//     }
// }


// const Camera = () =>{
//     return (<MyCamera />);

    // console.log('camera test');
    
    // return(
    //     console.log('camera test'),
    //     <View style={styles.container}>
    //         <RNCamera
    //             // ref={ref => {
    //             //     this.camera = ref;
    //             // }}
    //             style={styles.preview}
    //             // type={RNCamera.Constants.Type.back}
    //             // flashMode={RNCamera.Constants.FlashMode.on}
    //             // androidCameraPermissionOptions={{
    //             //     title: 'Permission to use camera',
    //             //     message: 'We need your permission to use your camera',
    //             //     buttonPositive: 'Ok',
    //             //     buttonNegative: 'Cancel',
    //             // }}
    //             // androidRecordAudioPermissionOptions={{
    //             //     title: 'Permission to use audio recording',
    //             //     message: 'We need your permission to use your audio',
    //             //     buttonPositive: 'Ok',
    //             //     buttonNegative: 'Cancel',
    //             // }}
    //             // onGoogleVisionBarcodesDetected={({ barcodes }) => {
    //             //     console.log(barcodes);
    //             // }}
    //         />
    //         {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}> */}
    //         {/* <TouchableOpacity onPress={Camera} style={styles.capture}> */}
    //             <Text style={{ fontSize: 14 }}> SNAP </Text>
    //         {/* </TouchableOpacity> */}
    //         {/* </View> */}
    //     </View>
        
    //     ,console.log('camera test over')
        
    
    // );

    // takePicture = async() => {
    //     if (this.camera) {
    //       const options = { quality: 0.5, base64: true };
    //       const data = await this.camera.takePictureAsync(options);
    //       console.log(data.uri);
    //     }
    // };
// }
MyFeed.navigationOptions = {
    title : 'SNS App',
    headerLeft: () => <IconButton onPress={(MyCamera)} style={style.headerLeft} iconName="camera"/>,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
    
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
      
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
})
export default MyFeed;