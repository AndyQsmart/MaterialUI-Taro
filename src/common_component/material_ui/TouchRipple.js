import React, { PureComponent } from 'react';
import styles from './TouchRipple.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components';
import Ripple from './Ripple';

const DURATION = 550

class TouchRipple extends PureComponent {
    static defaultProps = {
        className: '',
        center: false,
    }

    constructor() {
        super(...arguments)

        this.state = {
            ripples: [],
            ripples_in: [], // 用于修复获取rect异步的问题
        }
        this.ripple_ref = React.createRef()
        this.nextKey = 0

        this.onExitedRipple = this.onExitedRipple.bind(this)
    }

    onExitedRipple() {
        const { ripples, ripples_in } = this.state
        let delete_index = 0
        for (let i = 0; i < ripples.length; i++) {
            if (!ripples_in[i]) {
                delete_index = i
            }
        }
        let new_ripples = [...ripples]
        let new_ripples_in = [...ripples_in]
        new_ripples.splice(delete_index, 1)
        new_ripples_in.splice(delete_index, 1)
        this.setState({
            ripples: new_ripples,
            ripples_in: new_ripples_in,
        })
    }

    getRect(callback) {
        let item = this.ripple_ref.current
        if (item) {
            Taro.createSelectorQuery().select(`#${item.uid}`).boundingClientRect(callback).exec()
        }
    }

    fixPropsIn(callback) {
        const { ripples, ripples_in } = this.state
        let newRipples = [...ripples]
        for (let i = 0; i < ripples.length; i++) {
            let item = ripples[i]
            item.props = {
                ...(item.props),
                in: ripples_in[i],
            }
        }
        this.setState({
            ripples: newRipples,
        }, callback)
    }

    startCommit(params) {
        const { pulsate, rippleX, rippleY, rippleSize, callback } = params
        const { ripples: oldRipples } = this.state
        this.setState({
            ripples: [
                ...oldRipples,
                <Ripple
                    key={this.nextKey}
                    in={true}
                    timeout={DURATION}
                    pulsate={pulsate}
                    rippleX={rippleX}
                    rippleY={rippleY}
                    rippleSize={rippleSize}
                    onExited={this.onExitedRipple}
                />,
            ]
        }, ()=>{
            this.fixPropsIn(callback)
        })
        this.nextKey += 1
    }

    start(event={}, options={}, callback) {
        let pulsate = options.pulsate ? true : false
        let center = this.props.center || options.pulsate
        const { ripples_in } = this.state
        this.setState({
            ripples_in: [
                ...ripples_in,
                true,
            ]
        })
        this.getRect(rect => {
            let rippleX;
            let rippleY;
            let rippleSize;

            if (center || !event.touches) {
                rippleX = Math.round(rect.width / 2);
                rippleY = Math.round(rect.height / 2);
            }
            else {
                const { clientX, clientY } = event.touches[0]
                rippleX = Math.round(clientX - rect.left);
                rippleY = Math.round(clientY - rect.top);
            }

            if (center) {
                rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
        
                // For some reason the animation is broken on Mobile Chrome if the size if even.
                if (rippleSize % 2 === 0) {
                    rippleSize += 1;
                }
            }
            else {
                const sizeX = Math.max(Math.abs(rect.width - rippleX), rippleX) * 2 + 2;
                const sizeY = Math.max(Math.abs(rect.height - rippleY), rippleY) * 2 + 2;
                rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
            }

            this.startCommit({
                pulsate, rippleX, rippleY, rippleSize, callback,
            })
        })
    }

    pulsate(event={}, options={}, callback) {
        this.start(event, {
            ...options,
            pulsate: true,
        }, callback)
    }

    stop(event, callback) {
        const { ripples_in } = this.state
        let newRipplesIn = [...ripples_in]
        for (let i = 0; i < newRipplesIn.length; i++) {
            if (newRipplesIn[i]) {
                newRipplesIn[i] = false
                break
            }
        }
        this.setState({
            ripples_in: newRipplesIn,
        }, ()=>{
            this.fixPropsIn(callback)
        })
    }

    render() {
        const { className, style } = this.props
        const { ripples } = this.state

        return (
            <View
                ref={this.ripple_ref}
                className={`${styles.root} ${className}`} style={style}
            >
                {ripples}
            </View>
        )
    }
}

export default TouchRipple;