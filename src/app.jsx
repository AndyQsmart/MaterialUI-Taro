import React, { Component }  from 'react' 
// import { Provider } from 'react-redux'
// import ReduxHelper from './redux/ReduxHelper'

import './app.scss'
import './common_component/icon/FontAwesomeIcon.scss'

// const redux_store = ReduxHelper.createStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
    componentDidMount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidCatchError() { }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return this.props.children
        // return (
        //     <Provider store={redux_store}>
        //         {this.props.children}
        //     </Provider>
        // )
    }
}

export default App
