import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Modal, Image, uri } from 'react-native';
import { Camera } from 'expo-camera';
import{FontAwesome} from '@expo/vector-icons';
import { Alert} from 'react-native'

export default function App() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //let [capturedPhoto] = useState(null); 
  let [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false); 
  //const setCapturedPhoto = [];
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

 async function takePicture(){
   if(camRef){
     const data = await camRef.current.takePictureAsync();
     console.log(data.uri);
    //  setCapturedPhoto.push(data.uri);
    //  setCapturedPhoto.toString();
    setCapturedPhoto = (data.uri);
    setOpen(true);
     console.log("pushed into setCapturedPhoto:"+setCapturedPhoto);
     Alert.alert('photo',setCapturedPhoto);
      
   }
 }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef} >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity
       style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#121212',
              margin: 20,
              borderRadius: 10,
              height: 50
            }} onPress={takePicture}> 
        <FontAwesome name = "camera" size = {23} color="#FFF"/>
      </TouchableOpacity>

      { capturedPhoto &&
      <Modal 
      animationType = "slide"
      transparent = {false}
      visible={open}>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
          <TouchableOpacity style={{margin: 10}} onPress={()=> setOpen(false)}>
            <FontAwesome name="window-close" size={50} color='#FF0000'/>
          </TouchableOpacity>

          <Image
          
          style={{width: '100%', height: 300, borderRadius: 20}}
          source = {{uri:capturedPhoto}}
          />

        </View>

      </Modal>
      
      }



    </View>
  );
}

