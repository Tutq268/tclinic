import colors from './color'

export default {
    base: {
        fontSize: 14,
        color: colors.grey,
        ...Platform.select({
            ios: {
                family: 'Lato-Regular',
            },
            android: {
                family: 'LatoRegular',
            },
        })
    },

    italic: {
        fontSize: 14,
        ...Platform.select({
            ios: {
                family: 'Lato-Italic',
            },
            android: {
                family: 'LatoItalic',
            },
        })
    },

    bold: {
        ...Platform.select({
            ios: {
                family: 'Lato-Bold',
            },
            android: {
                family: 'LatoBold',
            },
        }),

    },
    black: {
        ...Platform.select({
            ios: {
                family: 'Lato-Black',
            },
            android: {
                family: 'LatoBlack',
            },
        })
    },
    light: {
        ...Platform.select({
            ios: {
                family: 'Lato-Light',
            },
            android: {
                family: 'LatoLight',
            },
        })
    }
}