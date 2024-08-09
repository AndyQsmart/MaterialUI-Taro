import React, { PureComponent } from 'react';
import styles from './ListSubheader.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class ListSubheader extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'default', // 'default' 'primary' 'inherit'
        disableGutters: false,
        disableSticky: false,
        inset: false,
    }

    render() {
        const { className, style, color, disableGutters, disableSticky, inset, children } = this.props

        return (
            <View 
                className={`${styles.root} ${styles['color_'+color]} ${disableGutters ? '' : styles.gutters} ${disableSticky ? '' : styles.sticky} ${inset ? styles.inset : ''} ${className}`}
                style={style}
            >
                {children}
            </View>
        )
    }
}

export default ListSubheader;