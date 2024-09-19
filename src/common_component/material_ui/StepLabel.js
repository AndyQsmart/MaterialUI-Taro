import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Typography from './Typography'
import StepIcon from './StepIcon'
import styles from './StepLabel.module.less'

// 网页原版
class StepLabel extends PureComponent {
    static muiName = 'StepLabel'

    static defaultProps = {
        className: '',
        // disabled: false,
        // error: false,
        // icon: null, // 没有默认值，不传，不然会有问题
        // optional: null,
        // StepIconComponent: null,
        // StepIconProps: null,
    }

    render() {
        const { className, active, alternativeLabel, children, completed, disabled, error, icon, last, optional, orientation, StepIconComponent, StepIconProps, ...others } = this.props

        let TheStepIconComponent = StepIconComponent
        if (icon && !TheStepIconComponent) {
            TheStepIconComponent = StepIcon
        }

        let theClassName = styles.root
        theClassName += ` ${styles[orientation]}`
        if (disabled) {
            theClassName += ` ${styles.disabled}`
        }
        if (alternativeLabel) {
            theClassName += ` ${styles.alternativeLabel}`
        }
        if (error) {
            theClassName += ` ${styles.error}`
        }

        let labelClassName = styles.label
        if (alternativeLabel) {
            labelClassName += ` ${styles.alternativeLabel}`
        }
        if (completed) {
            labelClassName += ` ${styles.completed}`
        }
        if (active) {
            labelClassName += ` ${styles.active}`
        }
        if (error) {
            labelClassName += ` ${styles.error}`
        }

        return (
            <View className={`${theClassName} ${className}`} {...others} >
                {
                    icon || TheStepIconComponent ?
                        <View className={`${styles.iconContainer} ${alternativeLabel ? styles.alternativeLabel : ''}`} >
                            <TheStepIconComponent
                                completed={completed}
                                active={active}
                                error={error}
                                icon={icon}
                                {...StepIconProps}
                            />
                        </View>
                    :
                        null
                }
                <View className={styles.labelContainer} >
                    <Typography className={labelClassName} >
                        {children}
                    </Typography>
                    {optional}
                </View>
            </View>
        )
    }
}

export default StepLabel