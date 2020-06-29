import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface Props {
    item: Object;
    customStyle: Object;
    textStyle: Object;
}

const styles=StyleSheet.create({
    near: { color: '#7f4307', width: 30, height: 30, borderRadius: 15, backgroundColor: '#7f4307' },
    mid: { color: '#C47F00', width: 30, height: 30, borderRadius: 15, backgroundColor: '#C47F00' },
    far: { color: '#FFAC14', width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFAC14' },
});

const getIntensity = type => {
    switch(type){
        case 'NEAR': 
            return (
                <Text style={styles.near}>.</Text>
            );
        case 'MID':
            return (
                <Text style={styles.mid}>.</Text>
            );
        case 'FAR':
            return (
                <Text style={styles.far}>.</Text>
            );
        default: return;
    }
};

const Intensity = (props: Props) => {
    const { item, customStyle, textStyle } = props;
    return(
        <View style={customStyle}>
            {getIntensity(item)}
            <Text style={textStyle}>{item}</Text>
        </View>
    );
}

export default Intensity;