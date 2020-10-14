import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {

    const initialLoaction = props.navigation.getParam('initialLoaction');
    const readonly = props.navigation.getParam('readonly');
    const [selectedLoaction, setSelectedLoaction] = useState(initialLoaction);

    const mapRegion = {
        latitude: initialLoaction ? initialLoaction.lat : 37.78,
        longitude: initialLoaction ? initialLoaction.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }
        setSelectedLoaction({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    };

    const savePickedLoactionHandler = useCallback(() => {
        if (!selectedLoaction) {
            return;
        }
        props.navigation.navigate('NewPlace', {
            pickedLoaction: selectedLoaction
        });
    }, [selectedLoaction]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLoactionHandler })
    }, [savePickedLoactionHandler]);

    let markerCoordinates;

    if (selectedLoaction) {
        markerCoordinates = {
            latitude: selectedLoaction.lat,
            longitude: selectedLoaction.lng
        }
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            { markerCoordinates && <Marker title='Picked Loaction' coordinate={markerCoordinates} ></Marker>}
        </MapView>
    );
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');

    if (readonly) {
        return {};
    }

    return {
        headerTitle: '',
        headerRight: (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === "android" ? 'white' : Colors.primary
    }
});

export default MapScreen;
