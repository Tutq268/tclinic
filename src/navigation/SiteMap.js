import { NavigationActions, StackActions, CommonActions } from '@react-navigation/native'

class SiteMap {
    static showScreen(navigation, screenName, params = {}) {
        navigation.navigate(screenName, params);
    }

    static openScreen(navigation, screenName, params = {}) {
        navigation.push(screenName, params);
    }

    static replaceScreen(navigation, screenName, params = {}) {
        navigation.replace(screenName, params);
    }

    static goBack(navigation, key) {
        navigation.dispatch(CommonActions.goBack());
    }

    static pop(navigation) {
        navigation.goBack(null)
    }

    static popToTop(navigation) {
        navigation.popToTop()
    }

    static resetToRoot(navigation, routeName) {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: routeName ?? 'App' }
            ]
        })
        navigation.dispatch(resetAction)
    }
}

export default SiteMap;
