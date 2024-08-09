import React, { PureComponent } from 'react';
import styles from './Badge.module.less'
import { View, Text } from '@tarojs/components';

class Badge extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'default', // 'default' 'error' 'primary' 'secondary'
        badgeContent: 0,
    }

    render() {
        const { className, style, children, badgeContent, color } = this.props

        return (
            <View
                className={`${styles.root} ${className}`}
                style={style}
            >
                {children}
                <Text className={`${styles.badge} ${styles.anchorOriginTopRightRectangle} ${styles['color-'+color]}`}>
                    {badgeContent}
                </Text>
            </View>
        )
    }
}

export default Badge;