import * as LocaleStorage from './LocaleStorage'

const LocaleStorageManager = {}

const KEY = {
    accessToken: 'userToken',
    pin: 'pin',
    clearBadgeNumber: 'clearBadgeNumber',
    userId: 'userId',
    lang: "vn"
}

LocaleStorageManager.initialize = async () => {
    LocaleStorageManager.accessToken = await LocaleStorage.get(KEY.accessToken);
    LocaleStorageManager.userId = await LocalStorage.get(KEY.userId)
    LocaleStorageManager.pin = await LocaleStorage.get(KEY.pin);
    LocaleStorageManager.lang = await LocalStorage.get(KEY.lang)
}

LocaleStorageManager.getUserId = () => {
    if (LocaleStorageManager.userId) {
        return LocaleStorageManager.userId
    }
    return LocaleStorage.get(KEY.userId)

}
LocaleStorageManager.setUserId = (userId) => {
    LocaleStorageManager.userId = userId;
    LocaleStorage.set(KEY.userId, userId)
}

LocaleStorageManager.getLang = () => {
    if (LocaleStorageManager.lang) {
        return LocaleStorageManager.lang
    }
    return LocaleStorage.get(KEY.lang)

}
LocaleStorageManager.setLang = (lang) => {
    LocaleStorageManager.lang = lang;
    LocaleStorage.set(KEY.lang, lang)
}


LocaleStorageManager.clearUserId = () => {
    LocaleStorageManager.userId = null;
    LocaleStorage.set(KEY.userId, '')
}

LocaleStorageManager.getAccessToken = () => {
    if (LocaleStorageManager.accessToken) {
        return LocaleStorageManager.accessToken
    }
    return LocaleStorage.get(KEY.accessToken)

}

LocaleStorageManager.setAccessToken = (token) => {
    LocaleStorageManager.accessToken = token;
    LocaleStorage.set(KEY.accessToken, token)
}

LocaleStorageManager.clearAccessToken = () => {
    LocaleStorageManager.accessToken = null;
    LocaleStorage.set(KEY.accessToken, '')
}

LocaleStorageManager.saveBadgeNumber = (count, hide) => {
    let data = { count, hide }
    LocaleStorage.set(KEY.clearBadgeNumber, JSON.stringify(data))
}

LocaleStorageManager.getBadgeNumber = async () => {
    let result = await LocaleStorage.get(KEY.clearBadgeNumber)
    return JSON.parse(result)
}

export default LocaleStorageManager