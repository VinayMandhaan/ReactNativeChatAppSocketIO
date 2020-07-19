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
  const selfUser = useSelector(state=>state.selfUser)
  const conversations = useSelector(state=>state.conversations)
  const messages = conversations[userId].messages
  return (
    <>
    <GiftedChat
      renderUsernameOnMessage
      messages={messages}
      onSend={
        messages=> 
        {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
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
