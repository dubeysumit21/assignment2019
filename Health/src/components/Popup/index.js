import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export interface Props{
    closePopup: Function;
    popupStyle: Object;
    popupTextStyle: Object;
    popupButtonStyle: Object;
    popButtonText: Object;
}

const Popup = (props) => {
    const { closePopup, popupStyle, popupTextStyle, popupButtonStyle, popButtonText } = props;
    return(
        <View style={popupStyle}>
            <Text style={popupTextStyle}>Your Service has started.</Text>
            <TouchableOpacity style={{ ...popupButtonStyle, width: 150,  }} onPress={closePopup}>
                <Text style={popButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Popup;