export default {
    pages: [
        'pages/index/index',
        'pages/Button/ButtonPage',
    ],
    subPackages: [
        {
            root: 'RouteApi',
            pages: [
                'pages/ButtonApi/ButtonApi',
            ]
        },
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'Material-Taro',
        navigationBarTextStyle: 'black',
        backgroundColor: '#f9f9fc',
    },
}