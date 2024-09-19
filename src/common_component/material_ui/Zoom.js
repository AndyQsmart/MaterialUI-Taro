import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro'

class Zoom extends PureComponent {
    static defaultProps = {
        timeout: 225,
        in: false,
        // onEnter: PropTypes.func,
        // onEntered: PropTypes.func,
        // onEntering: PropTypes.func,
        // onExit: PropTypes.func,
        // onExited: PropTypes.func,
        // onExiting: PropTypes.func,
    }

    constructor() {
        super(...arguments)

        this.state = {
            transition_style: {},
        }

        this.timer = null
    }

    doTimeout(func, duration) {
        if (!this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(func, duration)
    }

    onTransition(transition_style, callback) {
        this.setState({
            transition_style,
        }, callback)
    }

    componentDidUpdate(prevProps) {
        const { onEnter, onEntered, onExit, onExited, timeout } = this.props
        let transition_define = `transform ${timeout}ms cubic-bezier(0.4, 0, 0.2, 1);`

        // 从关闭到开启
        if (!prevProps.in && this.props.in) {
            if (onEnter) {
                onEnter()
            }
            // 开始动画，先设置成显示
            this.onTransition({
                visibility: 'visible',
                transform: 'scale(0)',
                transition: transition_define,
            }, ()=>{
                Taro.nextTick(()=>{
                    // 进行动画，设置透明度
                    this.onTransition({
                        visibility: 'visible',
                        transform: 'scale(1)',
                        transition: transition_define,
                    })
                }, ()=>{
                    this.doTimeout(()=>{
                        // 动画结束
                        if (onEntered) {
                            onEntered()
                        }
                        this.onTransition({
                            visibility: 'visible',
                            transform: 'none',
                            transition: transition_define,
                        })
                    }, timeout+10)
                })
            })
        }

        // 从开启到关闭
        if (prevProps.in && !this.props.in) {
            if (onExit) {
                onExit()
            }
            // 开始动画，先设置透明度
            this.onTransition({
                visibility: 'visible',
                transform: 'scale(1)',
                transition: transition_define,
            }, ()=>{
                this.onTransition({
                    visibility: 'visible',
                    transform: 'scale(0)',
                    transition: transition_define,
                }, ()=>{
                    this.doTimeout(()=>{
                        if (onExited) {
                            onExited()
                        }
                        // 动画结束，然后隐藏
                        this.onTransition({
                            visibility: 'hidden',
                            transform:'scale(0)',
                            transition: transition_define,
                        })
                    }, timeout+10)
                })
            })
        }
    }

    componentDidMount() {
        const { timeout } = this.props
        let transition_define = `transform ${timeout}ms cubic-bezier(0.4, 0, 0.2, 1);`

        if (this.props.in) {
            this.onTransition({
                visibility: 'visible',
                transform: 'none',
                transition: transition_define,
            })
        }
        else {
            this.onTransition({
                visibility: 'hidden',
                transform: 'scale(0)',
                transition: transition_define,
            })
        }
    }

    render() {
        const { children } = this.props
        const { transition_style } = this.state

        if (!children || React.Children.count(children) > 1) {
            console.error("Need a single child")
            return null
        }

        const childProps = children.props

        return React.cloneElement(children, {
            ...childProps,
            style: {
                ...transition_style,
                ...(childProps.style),
            },
        })
    }
}

export default Zoom;