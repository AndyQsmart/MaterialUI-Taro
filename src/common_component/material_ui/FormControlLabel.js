import React, { PureComponent } from 'react';
import styles from './FormControlLabel.module.less'
import { View } from '@tarojs/components';
import Typography from './Typography'

// 网页版原版
class FormControlLabel extends PureComponent {
    static defaultProps = {
        className: '',
        // checked: false,
        control: null,
        disabled: false,
        label: '',
        labelPlacement: 'end', // 'bottom' 'end' 'start' 'top'
        // value: '',
    }

    constructor() {
        super(...arguments)

        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        let { disabled, checked, control, value, onChange } = this.props

        if (disabled) {
            return
        }

        if (typeof checked === 'undefined') {
            checked = control.props.checked
        }

        if (onChange) {
            onChange({
                target: {
                    value,
                    checked: !checked,
                },
                detail: {
                    value,
                    checked: !checked,
                }
            })
        }
        else {
            if (control.props.onChange) {
                control.props.onChange({
                    target: {
                        value,
                        checked: !checked,
                    },
                    detail: {
                        value,
                        checked: !checked,
                    }
                })
            }
        }
    }

    render() {
        const { className, style, checked, control, disabled, label, labelPlacement, value, onChange } = this.props

        let controlProps = {
            disabled,
            onChange: null,
        }

        let prop_list = ['checked', 'value']
        for (let i = 0; i < prop_list.length; i++) {
            let key = prop_list[i]
            if (typeof control.props[key] === 'undefined' && typeof this.props[key] !== 'undefined') {
                controlProps[key] = this.props[key]
            }
        }

        return (
            <View className={`${styles.root} ${disabled ? styles.disabled : ''} ${styles['label_placement_'+labelPlacement]} ${className}`} style={style} onClick={this.onChange} >
                {React.cloneElement(control, controlProps)}
                <Typography variant='body1' >
                    {label}
                </Typography>
            </View>
        )
    }
}

export default FormControlLabel;