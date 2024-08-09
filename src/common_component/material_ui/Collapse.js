import React, { PureComponent } from 'react';
import styles from './Collapse.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

class Collapse extends PureComponent {
    static defaultProps = {
        className: '',
        in: false,
    }

    constructor() {
        super(...arguments)

        this.state = {
            content_height: 0,
            visible_height: 0,
        }
        this.height_init = false

        this.wrap_ref = React.createRef()
    }

    initHeight(callback) {
        if (this.height_init) {
            if (callback) {
                callback()
            }
            return
        }

        if (this.wrap_ref.current) {
            Taro.createSelectorQuery().select(`#${this.wrap_ref.current.uid}`).boundingClientRect(res => {
                console.log('Collapse height init')
                this.height_init = true
                this.setState({
                    content_height: res.height,
                }, callback)
            }).exec()
        }
        else {
            if (callback) {
                callback()
            }
        }
    }

    componentWillMount() {
        const onReadyEventId = Taro.getCurrentInstance().router.onReady
        Taro.eventCenter.once(onReadyEventId, () => {
            // onReady 触发后才能获取小程序渲染层的节点
            // 后续看需不需要每次重新获取高度
            this.initHeight()
            this.setState({
                visible_height: this.props.in ? 'auto' : 0,
            })
            // Taro.createSelectorQuery().select(`#${this.wrap_ref.current.uid}`).boundingClientRect(res => {
            //     this.setState({
            //         content_height: res.height,
            //         visible_height: this.props.in ? 'auto' : 0,
            //     })
            // }).exec()
        })
    }

    componentDidUpdate(preProps) {
        // 由关闭到打开
        if (this.props.in && !preProps.in) {
            this.initHeight(()=>{
                this.setState({
                    visible_height: this.state.content_height,
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({
                            visible_height: 'auto',
                        })
                    }, 160)
                })
            })
        }
        // 由打开到关闭
        if (!this.props.in && preProps.in) {
            this.initHeight(()=>{
                this.setState({
                    visible_height: this.state.content_height,
                }, ()=>{
                    Taro.nextTick(()=>{
                        this.setState({
                            visible_height: 0,
                        })
                    })
                })
            })
        }
    }

    render() {
        const { className, style, children } = this.props
        const { visible_height } = this.state

        return (
            <View
                className={`${styles.root} ${className}`}
                style={{
                    ...style,
                    height: visible_height,
                }}
            >
                <View ref={this.wrap_ref} >
                    {children}
                </View>
            </View>

        )
    }
}

export default Collapse;