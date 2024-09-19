import React, { PureComponent } from 'react';
import styles from './ListItemAvatar.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class ListItemAvatar extends PureComponent {
    static muiName = 'ListItemAvatar'

    static defaultProps = {
        className: '',
        // alignItems: 'center', // 'flex-start' 'center'
    }

    render() {
        const { className, style, alignItems, children } = this.props

        return (
            <View 
                className={`${styles.root} ${styles['alignItems_'+alignItems]} ${className}`}
                style={style}
            >
                {children}
            </View>
        )
    }
}

export default ListItemAvatar;