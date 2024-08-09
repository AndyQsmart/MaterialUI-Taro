import React, { PureComponent } from 'react';
import styles from './ListItemIcon.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class ListItemIcon extends PureComponent {
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

export default ListItemIcon;