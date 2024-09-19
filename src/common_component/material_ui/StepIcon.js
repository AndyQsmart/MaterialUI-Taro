import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import styles from './StepIcon.module.less'

// 网页原版
class StepIcon extends PureComponent {
    static defaultProps = {
        className: '',
        // active: false,
        // completed: false,
        // error: false,
        // icon: null,
    }

    render() {
        const { completed, icon, active, error } = this.props

        if (typeof icon === 'number' || typeof icon === 'string') {
            if (error) {
                return <View className={`${styles.warning_icon} ${styles.root} ${styles.error}`} />
            }
            if (completed) {
                return <View className={`${styles.check_circle_icon} ${styles.root} ${styles.completed}`} />
            }

            let fillColor = 'rgba(0, 0, 0, 0.38)'
            if (active) {
                fillColor = 'rgb(80,122,245)'
            }

            return (
                <View className={`${styles.root} ${active ? styles.active : ''}`}
                    style={{
                        width: '48rpx',
                        height: '48rpx',
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}" ><circle cx="12" cy="12" r="12"></circle><text x="12" y="16" font-size="12" fill="white" text-anchor="middle">${icon}</text></svg>') `
                    }}
                />
            )
        }

        return icon
    }
}

export default StepIcon