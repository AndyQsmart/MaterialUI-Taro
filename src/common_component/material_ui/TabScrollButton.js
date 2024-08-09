import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro'
import styles from './TabScrollButton.module.less'
import { View } from '@tarojs/components';
import ButtonBase from './ButtonBase';

// 网页版原版
class TabScrollButton extends PureComponent {
    static defaultProps = {
        className: '',
        direction: 'left', // 'left', 'right'
        disabled: false,
        orientation: 'horizontal', // 'horizontal', 'vertical'
    }

    render() {
        const { className, style, direction, disabled, orientation, onClick } = this.props

        return (
            <ButtonBase className={`${styles.root} ${disabled ? styles.disabled : ''} ${orientation == 'vertical' ? styles.vertical : ''} ${className}`} style={style}
                onClick={onClick}
            >
                <View className={`${styles.svg_root} ${styles['svg_'+direction]}`} ></View>
            </ButtonBase>
        )
    }
}

export default TabScrollButton;