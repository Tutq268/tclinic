import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { AppColor } from '@theme';

const Loading = ({ visible }) => {
    if (!visible) return null
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
            <ActivityIndicator size='large' color={AppColor.color_main} />
        </View>
    )
}
export default Loading