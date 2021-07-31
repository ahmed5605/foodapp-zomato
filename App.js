/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { LogBox } from 'react-native';
import TabScreen from './src/TabScreen';

LogBox.ignoreAllLogs(true)

export class App extends Component {
    render() {
        return (
            <>
                <TabScreen/>
            </>
        )
    }
}

export default App;