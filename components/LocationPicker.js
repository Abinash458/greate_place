import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLoaction, setPickedLoaction] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: "Okay" }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        setIsFetching(true);
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setPickedLoaction({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err) {
            Alert.alert(
                'Could not fetch loaction',
                'Please try again later or pick a loaction on the map.',
                [{ text: 'Okay' }]
            );
        }
        setIsFetching(false)
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLoaction}>
                {isFetching ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                        <Text>No location chosen yet!</Text>
                    )}
            </MapPreview>
            <Button
                title="Get User Location"
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default LocationPicker;
