import React, { PureComponent } from 'react';
import styles from './Radio.module.less'
import { View } from '@tarojs/components';
import TouchRipple from './TouchRipple';

// 网页版原版
class Radio extends PureComponent {
    static defaultProps = {
        className: '',
        // checked: false,
        // value: '',
        color: 'secondary', // 'default' 'primary' 'secondary'
        disabled: false,
        size: 'medium', // 'medium' 'small'
    }

    constructor() {
        super(...arguments)

        this.touch_ripple_ref = React.createRef()

        this.onCheck = this.onCheck.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
    }

    
    onTouchStart(e) {
        const { disabled } = this.props
        if (!disabled && this.touch_ripple_ref.current) {
            this.touch_ripple_ref.current.start(e)
        }
    }

    onTouchEnd(e) {
        const { disabled } = this.props
        if (!disabled && this.touch_ripple_ref.current) {
            this.touch_ripple_ref.current.stop(e)
        }
    }

    onCheck() {
        const { checked, value, disabled, onChange } = this.props
        if (disabled) {
            return
        }
        if (onChange) {
            onChange({
                target: {
                    value,
                    checked: !checked,
                },
                detail: {
                    checked: !checked,
                    value,
                }
            })
        }
    }

    render() {
        const { className, style, size, color, checked, disabled, onChange } = this.props

        let svg_color_class = 'default'
        if (disabled) {
            svg_color_class = 'disabled'
        }
        else if (checked) {
            svg_color_class = color ? color : 'default'
        }

        return (
            <View className={`${styles.root} ${styles['color_'+color]} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''} ${className}`} style={style}
                onClick={this.onCheck}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
            >
                <View className={styles.label} >
                    <View className={`${styles.svg_icon} ${styles.svg_outter} ${styles[svg_color_class]}`} ></View>
                    <View className={`${styles.svg_icon} ${styles.svg_inner} ${styles[svg_color_class]} ${checked ? styles.checked : ''}`} ></View>
                </View>
                <TouchRipple ref={this.touch_ripple_ref} center />
            </View>
        )
    }
}

export default Radio;