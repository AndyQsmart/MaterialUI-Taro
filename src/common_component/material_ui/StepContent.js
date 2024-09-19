import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Collapse from './Collapse'
import styles from './StepContent.module.less'

// 网页原版
class StepContent extends PureComponent {
    static defaultProps = {
        className: '',
        TransitionComponent: Collapse,
        transitionDuration: 225,
        // TransitionProps: null,
    }

    render() {
        const { active, alternativeLabel, children, className, completed, last, optional, orientation, TransitionComponent, transitionDuration, TransitionProps, ...others } = this.props

        if (!(orientation === 'vertical')) {
            console.log(
                'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
            );
        }

        return (
            <View className={`${styles.root} ${last ? styles.last: ''} ${className}`} {...others}>
                <TransitionComponent
                    in={active}
                    className={styles.transition}
                    timeout={transitionDuration}
                    unmountOnExit
                    {...TransitionProps}
                >
                    {children}
                </TransitionComponent>
            </View>
        )
    }
}

export default StepContent