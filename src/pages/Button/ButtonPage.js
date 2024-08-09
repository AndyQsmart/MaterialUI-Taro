import React, { Component }  from 'react'
import Taro from '@tarojs/taro'
import './ButtonPage.scss'
import { View, ScrollView, Image } from '@tarojs/components'
// import TextField from '../../common_component/material_ui/TextField'
// import Divider from '.../../common_component/material_ui/Divider'
import Typography from '../../common_component/material_ui/Typography'
import Button from '../../common_component/material_ui/Button'
import LeftBar from '../../instance_component/LeftBar/LeftBar'

class ButtonPage extends Component {
    constructor() {
        super(...arguments)
    }

    componentDidMount() {
    }

    componentWillUnmount() { }

    componentDidShow() {
    }

    componentDidHide() { }

    render() {
        return (
            <View className='container' >
                <LeftBar />
                <ScrollView scrollY className='main_area_container' >
                    <View className='main_area' >
                        <Typography variant='h5' gutterBottom >
                            Button 按钮
                        </Typography>
                        <Typography variant='h6' >
                            只需轻点按钮，用户就可以触发动作或做出选择。
                        </Typography>
                        <View className='spacing' ></View>
                        <Typography gutterBottom >
                            <Typography color='secondary' >按钮 </Typography>传达了一系列用户可以执行的操作命令。 他们通常直接放置在您的用户界面中，例如：
                        </Typography>
                        <Typography>
                            · Dialogs 对话框
                        </Typography>
                        <Typography>
                            · Modal windows 模态窗口
                        </Typography>
                        <Typography>
                            · Forms 表单
                        </Typography>
                        <Typography>
                            · Cards 卡片
                        </Typography>
                        <Typography>
                            · Toolbars 工具栏
                        </Typography>
                        <View className='spacing' ></View>

                        <Typography variant='h6' gutterBottom >
                            Contained Buttons 实心按钮
                        </Typography>
                        <Typography gutterBottom >
                            <Typography color='secondary' >实心按钮 </Typography>表示高度的强调，你根据它们的立体效果和填充颜色来区分彼此。 它们用于触发应用程序所具有的主要功能。
                        </Typography>
                        <View className='component_area' >
                            <Button variant='contained' className='component_item' >
                                Default
                            </Button>
                            <Button variant='contained' color='primary' className='component_item' >
                                Primary 
                            </Button>
                            <Button variant='contained' color='secondary' className='component_item' >
                                Secondary
                            </Button>
                            <Button variant='contained' disabled className='component_item' >
                                Disabled
                            </Button>
                        </View>
                        <ScrollView scrollX className='code_container' >
                            <View className='code_area' >
                                <Typography className='code_text' >
                                    {'<Button>Default</Button>'}
                                </Typography>
                                <Typography className='code_text' >
                                    {'<Button color="primary">Primary</Button>'}
                                </Typography>
                                <Typography className='code_text' >
                                    {'<Button color="secondary">Secondary</Button>'}
                                </Typography>
                                <Typography className='code_text' >
                                    {'<Button disabled>Disabled</Button>'}
                                </Typography>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ButtonPage
