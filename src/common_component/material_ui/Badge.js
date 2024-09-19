import React, { PureComponent } from 'react';
import styles from './Badge.module.less'
import { View } from '@tarojs/components';

class Badge extends PureComponent {
    static defaultProps = {
        className: '',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        // badgeContent: null,
        color: 'default', // 'default' 'error' 'primary' 'secondary'
        // invisible
        max: 99,
        overlap: 'rectangle', // 'circle' | 'rectangle' | 'circular' | 'rectangular'
        showZero: false,
        variant: 'standard', // 'dot' | 'standard'
    }

    render() {
        const { className, style, children, anchorOrigin, badgeContent, color, invisible, max, overlap, showZero, variant } = this.props

        let class_list = [styles.badge]
        class_list.push(styles[`color-${color}`])
        if (variant == 'dot') {
            class_list.push(styles.dot)
        }
        if (invisible || (badgeContent == 0 && !showZero)) {
            class_list.push(styles.invisible)
        }
        class_list.push(styles[`anchorOrigin-${anchorOrigin.vertical}-${anchorOrigin.horizontal}-${overlap}`])

        let badgeContentProps = badgeContent
        if (parseInt(badgeContent) > max) {
            badgeContentProps = `${max}+`
        }

        return (
            <View
                className={`${styles.root} ${className}`}
                style={style}
            >
                {children}
                <View className={class_list.join(' ')}>
                    {
                        variant == 'dot' ?
                            null
                        :
                            badgeContentProps
                    }
                </View>
            </View>
        )
    }
}

export default Badge;