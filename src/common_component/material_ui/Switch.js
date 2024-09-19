import React, { PureComponent } from 'react';
import styles from './Switch.module.less'
import { View, Switch as TaroSwitch } from '@tarojs/components';

class Switch extends PureComponent {
    static defaultProps = {
        className: '',
        checked: false,
        disabled: false,
        variant: 'material', // material, native
        size: 'medium', // large, medium, small
        color: 'secondary', // default, primary, secondary
    }

    constructor() {
        super(...arguments)

        this.onCheck = this.onCheck.bind(this)
    }

    onCheck() {
        const { checked, disabled, onChange } = this.props
        if (disabled) {
            return
        }
        if (onChange) {
            onChange({
                target: {
                    checked: !checked,
                },
                detail: {
                    checked: !checked,
                }
            })
        }
    }

    render() {
        const { className, style, variant, size, color, checked, disabled, onChange } = this.props

        if (variant == 'native') {
            return (
                <TaroSwitch
                    className={`${styles['native_'+size]} ${className}`}
                    style={style}
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                />
            )
        }

        return (
            <View className={`${styles.root} ${styles['size_'+size]} ${className}`} style={style} >
                <View className={`${styles.switch_root} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''} ${styles['color_'+color]}`} onClick={this.onCheck} >
                    <View className={styles.label} >
                        <View className={styles.thumb} ></View>
                    </View>
                </View>
                <View className={styles.track} ></View>
            </View>
        )
    }
}

export default Switch;