import React, { PureComponent } from 'react';
import { View } from '@tarojs/components'
import styles from './FormControl.module.less'

// 网页版原版
class FormControl extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary', // primary, secondary
        disabled: false,
        error: false,
        focused: false,
        fullWidth: false,
        hiddenLabel: false,
        margin: 'none', // 'dense', 'none', 'normal'
        required: false,
        size: 'medium', // 'medium' 'small'
        variant: 'standard', // 'filled' 'outlined' 'standard'
    }

    render() {
        const { className, style, margin, fullWidth, children, ...others } = this.props

        let class_list = []
        if (styles['margin_'+margin]) class_list.push(styles['margin_'+margin])
        if (fullWidth) class_list.push(styles.fullWidth)

        return (
            <View className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
                {...others}
            >
                {children}
            </View>
        )
    }
}

export default FormControl;