import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import ButtonBase from './ButtonBase'
import styles from './Tab.module.less'

// 网页版原版
class Tab extends PureComponent {
    static defaultProps = {
        className: '',
        disabled: false,
        icon: null,
        label: null,
        value: null,
        wrapped: false,
        // onChange
        // onClick
    }

    constructor() {
        super(...arguments)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        const { selected, value, onChange, onClick } = this.props

        if (!selected && onChange) {
            onChange(event, value);
        }
    
        if (onClick) {
            onClick(event);
        }
    }

    render() {
        const { className, style, icon, label, disabled, wrapped, textColor, fullWidth, selected } = this.props

        let class_list = []
        if (icon && label) class_list.push(styles.labelIcon)
        class_list.push(styles['textColor_'+textColor])
        if (fullWidth) class_list.push(styles.fullWidth)
        if (wrapped) class_list.push(styles.wrapped)
        if (disabled) class_list.push(styles.disabled)
        if (selected) class_list.push(styles.selected)

        return (
            <ButtonBase
                className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
                disabled={disabled}
                onClick={this.handleClick}
            >
                <View className={styles.wrapper} >
                    {icon}
                    {label}
                </View>
            </ButtonBase>
        )
    }
}

export default Tab;