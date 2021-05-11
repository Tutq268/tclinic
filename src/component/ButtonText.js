import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
const ButtonText = ({buttonStyle,textStyle,title,onPress}) =>{
    return(
        <TouchableOpacity
        style={[styles.button,buttonStyle]}
        onPress={() => onPress && onPress()}
        >
        <Text style={[styles.text,textStyle]}>
        {title}
        </Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: AppColor.color_main,
          height: scaledSize(45),
          justifyContent: 'center',
          alignItems: 'center',
        //   width: '100%',
          borderRadius: scaledSize(5)
    },
    text: {
        color: AppColor.white,
         fontWeight: '700',
        fontSize: scaledSize(14)
    }
})

export default ButtonText