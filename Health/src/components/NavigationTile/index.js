import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

export interface props{
    icon: Object;
    presentScreenHandler: Function;
    customStyle: Object;
    imageStyle: Object;
    textStyle: Object;
}

const NavigationTile = (props: Props) => {
    const { icon, presentScreenHandler, customStyle, imageStyle, textStyle } = props;
    return(
        <TouchableOpacity onPress={() => presentScreenHandler(icon)} style={{ ...customStyle, backgroundColor: icon.selected ? '#D2A476' : null }}>
            <Image key={icon.id} source={icon.image} style={imageStyle} />
            <Text style={textStyle}>{icon.text}</Text>
        </TouchableOpacity>
    );
};

export default NavigationTile;