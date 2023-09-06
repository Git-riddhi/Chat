import React, { useState, useEffect } from 'react';
import { View, Button, Alert, PermissionsAndroid, Text, ScrollView, FlatList, TouchableOpacity, StatusBar, TextInput, Image, ActivityIndicator } from 'react-native';
import Contacts from 'react-native-contacts';
import { styles } from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import IconTwo from 'react-native-vector-icons/Fontisto'

const ContactPicker = (props) => {
    const [contacts, setContacts] = useState([]);
    const [showTextInput, setShowTextInput] = useState(false)
    const [isLoading, setIsLoading] = useState(true); 
    const [search, setSearch] = useState('')
    const [contactList, setContactList] = useState(contacts)

    const contactSearch = (input) => {

        setSearch(input)
        // var filteredContacts = contacts.filter(word => word.displayName.match(input))

        var filteredContacts = contacts.filter(contact => contact.displayName.toLowerCase().includes(input.toLowerCase()));
        setContactList(filteredContacts);

    }

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        try {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                loadContacts();
            } else {
                Alert.alert('Permission denied', 'Please grant contacts permission to use this feature.');
            }
        } catch (error) {
            console.error('Error requesting permission: ', error);
        }
    };

    const loadContacts = () => {
        Contacts.getAll()
            .then(contactList => {
                setContacts(contactList);
                // console.log('contactList ====>', contactList);
                setContactList(contactList);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Error loading contacts ===>', error);
            });
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemMainView}>
            <View style={styles.imageView}>
                <Image resizeMode='cover' source={require('../../../../../assets/personIcon.png')} style={{ height: 35, width: 35, }} />
            </View>
            <View>
                <Text style={styles.displayNameStyle}>{item.displayName}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.containerStyle}>
            <StatusBar barStyle={'light-content'} backgroundColor={'rgb(11,129,105)'} />
            {!showTextInput ?
                <View style={styles.appBarStyle}>
                    <TouchableOpacity style={styles.backIconStyle} onPress={() => props.navigation.goBack()}>
                        <Icon name='arrowleft' size={25} color='white' />
                    </TouchableOpacity>

                    <Text style={styles.headingStyle}>Contacts to send</Text>
                    <TouchableOpacity style={styles.backIconStyle} onPress={() => { setShowTextInput(true), setSearch(false) }}>
                        <IconTwo name='search' size={20} color='white' />
                    </TouchableOpacity>

                </View>

                :
                <View style={styles.searchBarView}>
                    <TouchableOpacity style={styles.backIconStyle} onPress={() => setShowTextInput(false)}>
                        <Icon name='arrowleft' size={25} color='white' />
                    </TouchableOpacity>

                    <TextInput
                        // autoFocus={true}
                        style={styles.textInputstyle}
                        placeholder='Search'
                        placeholderTextColor={'white'}
                        onChangeText={(search) => contactSearch(search)}
                        value={search}
                    />

                </View>

            }

            {/* <Button title="Pick a Contact" onPress={requestPermission} /> */}

            {isLoading ? ( 
                <ActivityIndicator size="large" color='rgb(11,129,105)' />
            ) : (

                <FlatList
                    data={contactList}
                    renderItem={renderItem}
                    ItemSeparatorComponent={
                        <View
                            style={{ height: 10, width: '100%', alignSelf: 'center' }}
                        />
                    }
                    keyExtractor={(item, index) => item + index}
                />
            )
            }


        </View>
    );
};

export default ContactPicker;
