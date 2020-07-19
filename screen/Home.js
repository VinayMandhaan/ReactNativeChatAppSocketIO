/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import {useDispatch, useSelector} from 'react-redux'

export default function Home({route}){
  const { userId } = route.params;
  const dispatch = useDispatch()
  //Use selector is as same as MapStateToProps
  // Get the data of current user
  const selfUser = useSelector(state=>state.selfUser)
  // get the data of conversations
  const conversations = useSelector(state=>state.conversations)
  // Get all the messages of the selected user from all the online users
  const messages = conversations[userId].messages
  return (
    <>
    <GiftedChat
      renderUsernameOnMessage
      messages={messages}
      onSend={
        messages=> 
        {
          // Dispatch action for appending local message
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
          // Dispatch action for getting the message from sender
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }
      }
        
      user={{
        _id:selfUser.userId
      }}
      />
    </>
    );
};
