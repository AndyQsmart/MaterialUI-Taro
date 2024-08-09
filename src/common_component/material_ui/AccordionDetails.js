import React, { PureComponent } from 'react';
import styles from './AccordionDetails.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class AccordionDetails extends PureComponent {
    static defaultProps = {
        className: '',
    }

    render() {
        const { children, className } = this.props

        return (
            <View className={`${styles.root} ${className}`} >
                {children}
            </View>
        )
    }
}

export default AccordionDetails;