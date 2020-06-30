import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

export interface Props{
    setCustomContent: Function;
    item: Object;
    customStyle: Object;
    imageStyle: Object;
}

const CustomService = (props: Props) => {
    const { item, setCustomContent, customStyle, imageStyle } = props;
    return(
        <TouchableOpacity style={customStyle} onPress={() => setCustomContent(item)}>
            <Image source={item.image} style={imageStyle} />
            <Text>{item.text}</Text>
        </TouchableOpacity>
    );
};

export default CustomService;