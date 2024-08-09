import Taro, { getCurrentInstance } from '@tarojs/taro'

var SystemPlatform = null
const Platform = {
    DEVTOOLS: 'devtools',
    IOS: 'ios',
    ANDROID: 'android',
}

class Tools {
    static getCurrentUrl() {
        let current_pages = Taro.getCurrentPages()
        let current_page = current_pages[current_pages.length - 1]
        let url = '/' + current_page.route
        let arg = current_page.options
        let char = '?'
        for (let key in arg) {
            if (key != '__key_') {
                if (!Tools.isNone(arg[key])) {
                    url = url + char + key + '=' + encodeURIComponent(arg[key])
                    char = '&'
                }
            }
        }
        return url
    }

    static getUrlArg(url) {
        let ans = {}
        if (url) {
            let str = url.split('?')[1]
            let arg_str = str.split("&");
            for (let i = 0; i < arg_str.length; i++) {
                let pair = arg_str[i].split("=");
                ans[pair[0]] = decodeURIComponent(pair[1])
            }
        }
        else {
            let global_router = getCurrentInstance().router
            let arg = global_router.params
            for (let key in arg) {
                ans[key] = decodeURIComponent(arg[key])
            }
        }
        return ans
    }

    static getMiniUrl(url) {
        return url
    }

    static getMiniUrlWithArg(url, arg) {
        let arg_str = ''
        let char = '?'
        for (let key in arg) {
            if (!Tools.isNone(arg[key])) {
                arg_str = arg_str + char + key + '=' + encodeURIComponent(arg[key])
                char = '&'
            }
        }
        return url + arg_str
    }
    static setPermanentStorageArg(key, data) {
        console.log('setPermanentStorageArg：' + key)
        Taro.setStorageSync(key, JSON.stringify(data))
    }

    static removePermanentStorageArg(key) {
        console.log('removePermanentStorageArg：' + key)
        Taro.removeStorageSync(key)
    }

    // key加上功能块的前缀
    static getPermanentStorageArg(key) {
        console.log('getPermanentStorageArg：' + key)
        try {
            let arg = Taro.getStorageSync(key)
            return JSON.parse(arg)
        } catch (e) {
            return null
        }
    }
}

export default Tools