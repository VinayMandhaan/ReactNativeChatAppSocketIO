import React,{useState} from 'react'
import {View,TextInput,Text, Button} from 'react-native'
import {useDispatch} from 'react-redux'


export default function JoinScreen({navigation}){
    const dispatch = useDispatch()
    const [username,setUsername] = useState("")
    return(
        <View style={{alignSelf:'center', marginTop:100}}>
            <Text>Join Screen</Text>
            <TextInput
                placeholder="Enter Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <Button title="Join Chat" onPress={
                // Dispatch Server Join action to the socket
                ()=>{dispatch({type:"server/join", data:username}),
                navigation.navigate("Friend")
            }
        }/>
        </View>
    )
}