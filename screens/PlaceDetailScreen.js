import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PlaceDetailScreen = props => {
    return (
        <View>
            <Text>Places Details Screen!</Text>
        </View>
    );
}

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    };
}

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
