import React from 'react';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const zoomOut = {
    0: {
        opacity: 1,
        scale: 0.8,
    },
    0.5: {
        opacity: 1,
        scale: 1.2,
    },
    1: {
        opacity: 1,
        scale: 1,
    },
};

export default class TabBarIcon extends React.Component {

    componentWillUpdate(props, state) {
        if (props.focused) {
            this.animationRef && this.animationRef.animate(zoomOut, 300, 0);
        }
    }

    render() {
        const { focused, name, color } = this.props;
        let iconName = focused ? name : name;
        let isFocus = name === 'flower';
        // You can return any component that you like here!
        let iconSize = isFocus ? (focused ? 32 : 30) : 24
        return (
            <Animatable.View ref={ref => this.animationRef = ref} animation='zoomIn'>
                <Icon
                    containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    style={{ alignSelf: 'center' }}
                    name={iconName}
                    size={iconSize}
                    color={color}
                    type='ionicon'
                />
            </Animatable.View>
        );
    }
}

