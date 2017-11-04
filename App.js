import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    BackHandler
} from 'react-native';
import Button from 'react-native-button';

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			initialPosition: 'unknown',
		};
	}

    componentDidMount() {
		navigator.geolocation.clearWatch( this.watchId );
        locationCheck();
    }
	
	componentWillMount(){
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true // false => Directly catch method is called if location services are turned off
        }).then(function(success) {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
               this.watchId = navigator.geolocation.watchPosition((position) => {
                    let initialPosition = JSON.stringify(position);
                    this.setState({ initialPosition });
                }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        
        BackHandler.addEventListener('hardwareBackPress', () => {
               LocationServicesDialogBox.forceCloseDialog();
        });
	}
	
	componentWillUnmount(){
		navigator.geolocation.clearWatch( this.watchId );
	}
	
	
	checkLocation(){
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true // false => Directly catch method is called if location services are turned off
        }).then(function(success) {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
               this.watchId = navigator.geolocation.watchPosition((position) => {
                    let initialPosition = JSON.stringify(position);
                    this.setState({ initialPosition });
                }, error => console.log(error), { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        
        BackHandler.addEventListener('hardwareBackPress', () => {
               LocationServicesDialogBox.forceCloseDialog();
        });
	}
	

    render() {
        return (
            <View>
                <Text>
                    Geolocation: {this.state.initialPosition}
                </Text>
				<Button
					style={{fontSize: 20, color: 'green'}}
					styleDisabled={{color: 'red'}}
					onPress={() => this.checkLocation()}>
					Check Location!
				</Button>
            </View>
        );
    }
}

export function locationCheck(geolocationSettings = {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000, distanceFilter:10}){
  return (dispatch) => {
    navigator.geolocation.watchPosition(
        () => {
            dispatch({
                type: types.LOCATION_STATE,
                state: true
            })
        },
        () => {
            dispatch({
                type: types.LOCATION_STATE,
                state: false
            })
        },
        geolocationSettings)
  }
}

AppRegistry.registerComponent('App', () => App);