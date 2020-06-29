import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

export interface Props {
    selectServiceHandler: Function;
    item: Object;
    customStyle: Object;
    imageStyle: Object;
}

const ServiceTile = (props: Props) => {
    const { selectServiceHandler, item, customStyle, imageStyle } = props;
    return (
        <TouchableOpacity style={{ ...customStyle, backgroundColor: item.selected ? '#D2A476' : null }} onPress={() => selectServiceHandler(item)}>
            <Image source={item.image} style={imageStyle} />
            <Text>{item.text}</Text>
        </TouchableOpacity>
    );
}

export default ServiceTile;
