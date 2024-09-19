import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import styles from './StepConnector.module.less'

// 网页原版
class StepConnector extends PureComponent {
    static defaultProps = {
        className: '',
    }

    render() {
        const { className, active, alternativeLabel, completed, disabled, index, orientation, ...others } = this.props

        let theClassName = styles.root
        theClassName += ` ${styles[orientation]}`
        if (alternativeLabel) {
            theClassName += ` ${styles.alternativeLabel}`
        }
        if (active) {
            theClassName += ` ${styles.active}`
        }
        if (completed) {
            theClassName += ` ${styles.completed}`
        }
        if (disabled) {
            theClassName += ` ${styles.disabled}`
        }

        return (
            <View
                className={`${theClassName} ${className}`}
                {...others}
            >
                <View className={`${styles.line} ${orientation === 'horizontal' ? styles.lineHorizontal : ''} ${orientation === 'vertical' ? styles.lineVertical : ''}`} />
            </View>
        )
    }
}

export default StepConnector