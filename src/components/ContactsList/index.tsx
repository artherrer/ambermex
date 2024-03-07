import { Avatar, Box, FlatList, HStack, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import userPlaceholder from '../../assets/images/user_placeholder.png';

interface Props {
  onSelectedContact: (contact: Contact) => void;
  multiple?: boolean;
}

interface ItemProps {
  item: Contact;
}

export default function ContactsList(props: Props) {
  const [contacts, setContacts] = useState<any>([]);
  const [permission, setPermission] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await check(PERMISSIONS.ANDROID.READ_CONTACTS);

      setPermission(permission);

      if (permission === RESULTS.GRANTED) {
        await getContacts();
      }
    };

    if (Platform.OS === 'ios') {
      getContacts();
    }
    if (Platform.OS === 'android') {
      requestPermission();
    }
  }, []);

  const getContacts = async () => {
    try {
      const contacts = await Contacts.getAll();
      mutateContacts(contacts);
    } catch (error) {
      console.log(error);
    }
  };

  const mutateContacts = (contacts: Contact[]) => {
    const orderedContacts = contacts
      .reduce((filteredContacts: Contact[], contact) => {
        // Filter out contacts without phone numbers
        if (contact.phoneNumbers.length > 0) {
          filteredContacts.push(contact);
        }
        return filteredContacts;
      }, [])
      .sort((a, b) => a.givenName.localeCompare(b.givenName));

    setContacts(orderedContacts);
    setLoading(false);
  };

  return (
    <Box>
      {permission === RESULTS.DENIED && <Text>Permission denied</Text>}
      {permission === RESULTS.BLOCKED && <Text>Permission blocked</Text>}

      {loading && <Text>Loading...</Text>}
      {!loading && contacts.length === 0 && <Text>No contacts found</Text>}

      <FlatList
        data={contacts}
        renderItem={({ item }: ItemProps) => (
          <TouchableOpacity onPress={() => props.onSelectedContact(item)}>
            <HStack space={3} mb={3}>
              {item.hasThumbnail && <Avatar source={{ uri: item.thumbnailPath }} />}
              {!item.hasThumbnail && <Avatar source={userPlaceholder} />}
              <VStack>
                <Text>
                  {item.givenName} {item.familyName}
                </Text>
                <Text>{item.phoneNumbers[0].number}</Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        )}
      />
    </Box>
  );
}
