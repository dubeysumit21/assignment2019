import React from 'react';
import { TextInput } from 'react-native';

export interface Props{
    changeTextHandler: Function;
    item: Object;
    customStyle: Object;
}

const FormField = (props: Props) => {
    const { changeTextHandler, item, customStyle } = props;
    return(
        <TextInput 
            style={customStyle} 
            placeholder={item.placeholder} 
            onChangeText={value => changeTextHandler(value, item.id)}
        />
    );
};

export default FormField;