import React, { useState } from 'react';
import { Image } from 'react-native';

export default function GameScreen() {
  const imageList = [
    require('./assets/images/loader1.png'),
    require('./assets/images/loader2.png'),
  ];

  const imageRender = id => {
    return (
      <Image
        source={imageList[id]}
        style={{position: 'absolute', width: '100%', height: '100%'}}
      />
    );
  };

  const [imageID, setImageID] = useState(0);
  setTimeout(() => {
    setImageID(1);
  }, 1000);

  return imageRender(imageID);
}
