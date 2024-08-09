import React, { PureComponent } from 'react';
import styles from './Divider.module.less'
import { View } from '@tarojs/components';

// 网页原版
class Divider extends PureComponent {
    static defaultProps = {
        className: '',
        flexItem: false,
        light: false,
        orientation: 'horizontal', // 'horizontal' 'vertical'
        variant: 'fullWidth' // 'fullWidth' 'inset' 'middle'
    }

    render() {
        const { className, style, flexItem, orientation, light, variant } = this.props

        let class_list = []
        if (orientation == 'vertical') {
            class_list.push(styles.vertical)
            if (flexItem) {
                class_list.push(styles.flexItem)
            }
        }
        else {
            if (styles[variant]) {
                class_list.push(styles[variant])
            }
        }

        return (
            <View
                className={`${styles.root} ${light ? styles.light : ''} ${class_list.join(' ')} ${className}`}
                style={style}
            >
            </View>
        )
    }
}

export default Divider;