import React, { PureComponent } from 'react';
import styles from './Ripple.module.less'
import { View } from '@tarojs/components';

class Ripple extends PureComponent {
    static defaultProps = {
        className: '',
        pulsate: false,
        rippleX: 0,
        rippleY: 0,
        rippleSize: 0,
        in: false,
        timeout: 0,
        // onExited,
    }

    constructor() {
        super(...arguments)

        this.state = {
            leaving: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.in && !this.props.in) {
            const { onExited, timeout } = this.props
            this.setState({
                leaving: true,
            })
            setTimeout(()=>{
                if (onExited) {
                    onExited()
                }
            }, timeout)
        }
    }

    componentDidMount() {
        if (!this.props.in) {
            const { onExited, timeout } = this.props
            this.setState({
                leaving: true,
            })
            setTimeout(()=>{
                if (onExited) {
                    onExited()
                }
            }, timeout)
        }
    }

    render() {
        const { className, style, pulsate, rippleX, rippleY, rippleSize, in: inProps, timeout } = this.props
        const { leaving } = this.state

        return (
            <View
                style={{
                    width: rippleSize,
                    height: rippleSize,
                    top: -(rippleSize / 2) + rippleY,
                    left: -(rippleSize / 2) + rippleX,
                    ...style,
                }}
                className={`${styles.ripple} ${styles['ripple-visible']} ${pulsate ? styles['ripple-pulsate'] : ''} ${className}`}
            >
                <View className={`${styles.child} ${leaving ? styles['child-leaving'] : ''} ${pulsate ? styles['child-pulsate'] : ''}`} ></View>
            </View>
        )
    }
}

export default Ripple;