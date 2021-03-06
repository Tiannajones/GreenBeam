import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './context/AuthContext';
import {AxiosProvider} from './context/AxiosContext';
import React from 'react';
import {registerRootComponent} from 'expo';


const Root = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <App/>
      </AxiosProvider>
    </AuthProvider>
  );
};

export default registerRootComponent(Root);
AppRegistry.registerComponent(appName, () => Root);