import React from 'react';
import {StatusBar} from 'react-native';

import Navigator from '~/Screens/Navigator';
import {RandomUserDataProvider} from '~/Context/RandomUserData';

interface Props{}

const App = ({} : Props) => {
  return(
    <RandomUserDataProvider cache={true}> 
    {/* false로 설정하면 매번 API를 통해 새로운 데이터를 가져온다 */}
    {/* true로 설정하면 한번 가져온 데이터를 저장하여 사용하도록 한다. */}
      <StatusBar barStyle="default"/>
      <Navigator />
    </RandomUserDataProvider>
  );
};

export default App;