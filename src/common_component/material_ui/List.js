import React, { PureComponent } from 'react';
import styles from './List.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class List extends PureComponent {
    static defaultProps = {
        className: '',
        disablePadding: false,
        dense: false,
        subheader: null,
    }

    render() {
        const { className, style, children, dense, disablePadding, subheader } = this.props

        return (
            <View 
                className={`${styles.root} ${!disablePadding ? styles.padding : ''} ${dense && !disablePadding ? styles.dense : ''} ${className}`}
                style={style}
            >
                {children}
            </View>
        )
    }
}

export default List;