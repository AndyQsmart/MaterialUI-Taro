import React, { PureComponent } from 'react';
import styles from './FormControlLabel.module.less'
import { View } from '@tarojs/components';
import Typography from './Typography'

// 网页版原版
class FormControlLabel extends PureComponent {
    static defaultProps = {
        className: '',
        checked: false,
        control: null,
        disabled: false,
        label: '',
        labelPlacement: 'end', // 'bottom' 'end' 'start' 'top'
        value: '',
    }

    constructor() {
        super(...arguments)

        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        const { disabled, checked, value, onChange } = this.props

        if (disabled) {
            return
        }

        if (onChange) {
            onChange({
                detail: {
                    value,
                    checked: !checked,
                }
            })
        }
    }

    render() {
        const { className, style, checked, control, disabled, label, labelPlacement, value, onChange } = this.props

        control.props.checked = checked
        control.props.value = value
        control.props.disabled = disabled

        return (
            <View className={`${styles.root} ${disabled ? styles.disabled : ''} ${styles['label_placement_'+labelPlacement]} ${className}`} style={style} onClick={this.onChange} >
                {control}
                <Typography variant='body1' >
                    {label}
                </Typography>
            </View>
        )
    }
}

export default FormControlLabel;