import React, { PureComponent } from 'react';
import styles from './AccordionActions.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class AccordionActions extends PureComponent {
    static muiName = 'AccordionActions'

    static defaultProps = {
        className: '',
    }

    render() {
        const { children, className } = this.props

        return (
            <View className={`${styles.root} ${styles.spacing} ${className}`} >
                {children}
            </View>
        )
    }
}

export default AccordionActions;