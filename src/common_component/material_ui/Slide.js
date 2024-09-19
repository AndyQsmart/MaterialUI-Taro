import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro'

class Slide extends PureComponent {
    static defaultProps = {
        direction: 'down', // 'down' 'left' 'right' 'up'
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

        this.system_info = null
    }

    getWindowSize() {
        if (!this.system_info) {
            this.system_info = Taro.getSystemInfoSync()
        }
        return this.system_info
    }

    onTransition(transition_style, callback) {
        this.setState({
            transition_style,
        }, callback)
    }

    getTransition(direction, timeout, reset=false) {
        let transform_define = `transform ${timeout}ms cubic-bezier(0, 0, 0.2, 1) 0ms`
        if (reset) {
            return {
                transition: transform_define,
                transform: 'translate(0, 0)',
            }
        }

        let window_size = this.getWindowSize()

        switch (direction) {
            case 'left': {
                return {
                    transition: transform_define,
                    transform: `translateX(${window_size.windowWidth}px)`,
                }
            }
            case 'right': {
                return {
                    transition: transform_define,
                    transform: `translateX(-${window_size.windowWidth}px)`,
                }
            }
            case 'up': {
                return {
                    transition: transform_define,
                    transform: `translateY(${window_size.windowHeight}px)`,
                } 
            }
            default: {
                return {
                    transition: transform_define,
                    transform: `translateY(-${window_size.windowHeight}px)`,
                } 
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { direction, onEnter, onEntered, onExit, onExited, timeout } = this.props

        // 从关闭到开启
        if (!prevProps.in && this.props.in) {
            if (onEnter) {
                onEnter()
            }
            this.onTransition({
                visibility: 'visible',
                ...(this.getTransition(direction, timeout)),
            }, ()=>{
                Taro.nextTick(()=>{
                    this.onTransition({
                        visibility: 'visible',
                        ...(this.getTransition(direction, timeout, true)),
                    }, ()=>{
                        setTimeout(()=>{
                            // 动画结束
                            if (onEntered) {
                                onEntered()
                            }
                        }, timeout+10)
                    })
                })
            })
        }

        // 从开启到关闭
        if (prevProps.in && !this.props.in) {
            if (onExit) {
                onExit()
            }
            this.onTransition({
                visibility: 'visible',
                ...(this.getTransition(direction, timeout)),
            }, ()=>{
                setTimeout(()=>{
                    this.onTransition({
                        visibility: 'hidden',
                        ...(this.getTransition(direction, timeout)),
                    }, ()=>{
                        if (onExited) {
                            onExited()
                        }
                    })
                }, timeout+10)
            })
        }
    }

    componentDidMount() {
        const { direction, timeout } = this.props

        if (this.props.in) {
            this.onTransition({
                visibility: 'visible',
                ...(this.getTransition(direction, timeout, true)),
            })
        }
        else {
            this.onTransition({
                visibility: 'hidden',
                ...(this.getTransition(direction, timeout)),
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

export default Slide;