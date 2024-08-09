import React, { PureComponent } from 'react';
import styles from './FormLabel.module.less'
import { View, Text } from '@tarojs/components';

// 网页版原版, filled属性暂有问题
class FormLabel extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary', // 'primary' 'secondary'	
        disabled: false,
        error: false,
        filled: false,
        focused: false,
        required: false,
    }

    render() {
        const {
            className, style,
            children,
            color,
            disabled,
            error,
            filled,
            focused,
            required,
            ...others
        } = this.props

        let class_list = []
        if (focused) class_list.push(styles.focused)
        if (styles['color_'+color]) class_list.push(styles['color_'+color])
        if (disabled) class_list.push(disabled)
        if (error) class_list.push(styles.error)

        return (
            <Text 
                className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
                {...others}
            >
                {children}
                {
                    required ?
                        <Text className={`${styles.asterisk} ${error ? styles.error : ''}`} >
                            &thinsp;{'*'}
                        </Text>
                    :
                        null
                }
            </Text>
        )
    }
}

export default FormLabel;