import React from 'react'
import {Text,View, Image, FlatList, TouchableOpacity} from 'react-native'
import { useSelector } from "react-redux";

export default function FriendListScreen({navigation}){
    const usersOnline = useSelector(state => state.usersOnline);
    console.log("usersOnline", usersOnline);
    return(
        <View style={{ flex: 1}}>
            <FlatList
                data={usersOnline}
                renderItem={({ item }) => {
                console.log("item", item);
                return(
                <TouchableOpacity onPress={()=>navigation.navigate("Home",{userId:item.userId})}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Image style={{width:100,height:100, borderRadius:50}} source={{uri:item.avatar}}/>
                    <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                    <Text>{item.username}</Text>
                    </View>
                </View>
                </TouchableOpacity>
                )
                }}
                keyExtractor={item => item.userId}
            />
        </View>
    )
}
