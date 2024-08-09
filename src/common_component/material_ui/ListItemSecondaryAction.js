import React, { PureComponent } from 'react';
import styles from './ListItemSecondaryAction.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class ListItemSecondaryAction extends PureComponent {
    static defaultProps = {
        className: '',
    }

    render() {
        const { className, style, children, onClick } = this.props

        return (
            <View 
                className={`${styles.root} ${className}`}
                style={style}
                onClick={onClick}
            >
                {children}
            </View>
        )
    }
}

export default ListItemSecondaryAction;