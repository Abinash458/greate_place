import React from 'react';
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {

    const places = useSelector(state => state.places.places);

    return (
        <View>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <PlaceItem
                        title={itemData.item.title}
                        image={null}
                        address={null}
                        onSelect={() => {
                            props.navigation.navigate('PlaceDetail', {
                                placeTitle: itemData.item.title,
                                placeId: itemData.item.id
                            });
                        }}
                    />
                }
            />
        </View>
    );
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Add Place"
                iconName={Platform.OS === "android" ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('NewPlace');
                }}
            />
        </HeaderButtons>
    };
}

const styles = StyleSheet.create({});

export default PlacesListScreen;
