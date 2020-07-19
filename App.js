/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Home from './screen/Home'
import Routes from './screen/Routes'
import {createStore, applyMiddleware} from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import {Provider} from 'react-redux'
import io from 'socket.io-client'
import { act } from 'react-test-renderer';
const socket = io("http://192.168.1.108:5000")
const socketIoMidlleware = createSocketIoMiddleware(socket,"server/")


// Used Redux, Reducer for state.
function reducer(state = { conversations: {} }, action) {
  switch(action.type){
    // User Online Reducer
    case 'users_online':
      const conversations = { ...state.conversations };
      // Get All the Users from Socket Io
      const usersOnline = action.data;
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        // Check If User Exist, If User Does Not Exist, Create an Conversation Object of a particular User with Messages array and Username
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          };
        }
      }
      return { ...state, usersOnline, conversations };
    // Get Data of Joined User (Self User)
    case 'self_user':
      return{...state,selfUser:action.data}
    // Append Messages in the Messages array and ConversationId in the ConversationId Array
    case "private_message":
      const conversationId = action.data.conversationId
      return {
        ...state,
        conversations : {
          ...state.conversations,
          [conversationId] : {
            ...state.conversations[conversationId],
            messages:[
              action.data.message,
              ...state.conversations[conversationId].messages
            ]
          }
        }
      }
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMidlleware)(createStore)(reducer)
store.subscribe(()=>{
  console.log("new state",store.getState())
})



export default function App(){
  return (
    <Provider store={store}>
    <Routes/>
    </Provider>
    );
};
