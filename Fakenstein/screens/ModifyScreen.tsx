import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import { Text, View } from '../components/Themed';
import {dWidth, ImageType, Navigation, resizeBoxes} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";
import PopupBox from "../components/PopupBox";
import {BoundaryBox} from "../constants/Face";

type Props = {
  route: Route;
  navigation: Navigation;
}

export default function ModifyScreen({route, navigation}: Props) {
  const image: ImageType = route.params.image;
  const imageHeight = Math.round(dWidth / image.width * image.height);

  const [boxes, setBoxes] = useState<BoundaryBox[]>(route.params.boxes);

  useEffect(() => {
    console.log("Modify");
    console.log(boxes);
    setBoxes(resizeBoxes(imageHeight, image, boxes));
  }, []);

  const handlePushToExport = () => {
    navigation.push('Export', {
      image: image
    });
  }


  return  (
    !!image && (
      <View style={styles.container}>
        <Text style={styles.text}>Select faces to modify</Text>
        <Image source={{uri: image.uri}} style={styles.image}/>
        <View style={[styles.boxContainer, {height: imageHeight}]}>
          {(boxes.length > 0) && boxes.map((face, index) => (
            <PopupBox key={index} inx={index} face={face} handler={null}/>
          ))}
        </View>
        <BottomToolBox right={null} middle={null} next={handlePushToExport}/>
      </View>
    )
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: undefined,
    resizeMode: 'contain',
  },
  boxContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  text: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: '600',
  },
});
