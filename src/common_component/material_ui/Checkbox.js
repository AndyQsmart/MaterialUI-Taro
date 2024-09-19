import React, { PureComponent } from 'react';
import styles from './Checkbox.module.less'
import { View } from '@tarojs/components';
import TouchRipple from './TouchRipple';

// 网页版原版
class Checkbox extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'secondary',
        // checked: false,
        disabled: false,
        size: 'medium',
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
        const { className, style, size, color, checked, disabled, onChange } = this.props

        let svg_class = styles.svg_color_default
        if (disabled) {
            svg_class = styles.disabled
        }
        else {
            if (styles['svg_color_'+color]) {
                svg_class = styles['svg_color_'+color]
            }
        }

        return (
            <View className={`${styles.root} ${styles['color_'+color]} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''} ${className}`} style={style}
                onClick={this.onCheck}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
            >
                <View className={styles.label} >
                    <View className={`${styles.svg_icon} ${svg_class} ${checked ? styles.checked : ''}`} ></View>
                </View>
                <TouchRipple ref={this.touch_ripple_ref} center />
            </View>
        )
    }
}

export default Checkbox;