import React, { PureComponent } from 'react';
import ButtonBase from './ButtonBase';
import { View } from '@tarojs/components';
import styles from './Button.module.less'

class Button extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'default', // 'default' 'inherit' 'primary' 'secondary'	
        disabled: false,
        size: 'medium', // 'large' 'medium' 'small'
        fullWidth: false,
        disableRipple: false,
        disableElevation: false,
        mini: false,
        variant: 'text', // contained、outlined、text、default: text
    }

    classnames(className, class_map) {
        let class_list = [styles[className]]
        for (let key in class_map) {
            if (class_map[key]) {
                class_list.push(styles[key])
            }
        }
        return class_list.join(' ')
    }

    render() {
        const { className, style, children, color, disabled, disableElevation, variant, size, fullWidth, onClick, ...others } = this.props

        let class_list = []
        if (styles[variant]) class_list.push(styles[variant])
        if (styles[variant+'_'+color]) class_list.push(styles[variant+'_'+color])
        if (styles[variant+'_size_'+size]) class_list.push(styles[variant+'_size_'+size])
        if (fullWidth) class_list.push(styles.fullWidth)
        if (disabled) class_list.push(styles.disabled)
        if (disableElevation) class_list.push(styles.disableElevation)

        return (
            <ButtonBase
                disabled={disabled}
                className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
                {...others}
                onClick={onClick}
            >
                <View className={styles.label} >
                    {children}
                </View>
            </ButtonBase>
        )
    }
}

export default Button;