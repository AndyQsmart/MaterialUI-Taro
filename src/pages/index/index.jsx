import React, { Component }  from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Typography from '../../common_component/material_ui/Typography'
import LeftBar from '../../instance_component/LeftBar/LeftBar'
import Tools from '../../common_js/Tools'
import logo_icon from './logo.png'
import './index.scss'

class Index extends Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
        // Taro.redirectTo({
        //     url: '/pages/Button/ButtonPage'
        // }) 
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='container' >
                <LeftBar />
                <View className='main_area' >
                    <Image src={logo_icon} className='logo_icon' />
                    <Typography variant='h6' color='primary' gutterBottom >
                        Material-Taro 
                    </Typography>
                    <Typography color='primary' >
                        Taro3组件用于更快速、更便捷的Taro小程序开发。
                    </Typography>
                </View>
            </View>
        )
    }
}

export default Index
