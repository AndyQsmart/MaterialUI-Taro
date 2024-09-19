import React, { PureComponent } from 'react';
import styles from './Collapse.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

class Collapse extends PureComponent {
    static defaultProps = {
        className: '',
        in: false,
        timeout: 225,
        collapsedSize: 0,
    }

    constructor() {
        super(...arguments)

        this.state = {
            visible_height: 0,
        }

        this.wrap_ref = React.createRef()
    }

    getWrapHeight(callback) {
        if (this.wrap_ref.current) {
            Taro.nextTick(()=>{
                Taro.createSelectorQuery().select(`#${this.wrap_ref.current.uid}`).boundingClientRect(res => {
                    if (res) {
                        callback(res.height)
                    }
                }).exec()
            })
        }
        else {
            callback(0)
        }
    }

    componentDidUpdate(preProps) {
        const { onEnter, onEntered, onExit, onExited, collapsedSize, timeout } = this.props

        // 由关闭到打开
        if (this.props.in && !preProps.in) {
            if (onEnter) {
                onEnter()
            }
            this.getWrapHeight((wrap_height)=>{
                this.setState({
                    visible_height: wrap_height,
                }, ()=>{
                    setTimeout(()=>{
                        if (onEntered) {
                            onEntered()
                        }
                        this.setState({
                            visible_height: 'auto',
                        })
                    }, timeout+10)
                })
            })
        }

        // 由打开到关闭
        if (!this.props.in && preProps.in) {
            if (onExit) {
                onExit()
            }
            this.getWrapHeight((wrap_height)=>{
                this.setState({
                    visible_height: wrap_height,
                }, ()=>{
                    Taro.nextTick(()=>{
                        this.setState({
                            visible_height: collapsedSize,
                        }, ()=>{
                            if (onExited) {
                                onExited()
                            }
                        })
                    })
                })
            })
        }
    }

    componentDidMount() {
        const { collapsedSize } = this.props

        if (this.props.in) {
            this.setState({
                visible_height: 'auto',
            })
        }
        else {
            this.setState({
                visible_height: collapsedSize,
            })
        }
    }

    render() {
        const { className, style, children, timeout } = this.props
        const { visible_height } = this.state

        return (
            <View
                className={`${styles.root} ${className}`}
                style={{
                    ...style,
                    transition: `height ${timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
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