import React, { PureComponent } from 'react';
import InputBase from './InputBase';
import NotchedOutline from './NotchedOutline';
import styles from './OutlinedInput.module.less'

// 网页版原版
class OutlinedInput extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary', // 'primary' 'secondary'
        value: '',
        disabled: false,
        // disableUnderline: false,
        startAdornment: null,
        endAdornment: null,
        error: false,
        fullWidth: false,
        inputProps: {},
        margin: 'none', // 'dense' 'none'
        fixed: false, // 如果多行输入textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
        multiline: false,
        placeholder: '',
        required: false,
        size: 'medium', // 'medium' 'small'
        rows: null,
        rowsMin: null,
        rowsMax: null,
        label: null,
        notched: null,
        // onBlur
        // onChange
    }

    constructor() {
        super(...arguments)

        this.state = {
            is_focus: false,
        }

        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.renderSuffix = this.renderSuffix.bind(this)
    }

    onFocus() {
        const { onFocus } = this.props
        this.setState({
            is_focus: true,
        }, onFocus)
    }

    onBlur(e) {
        const { onBlur } = this.props
        this.setState({
            is_focus: false,
        }, onBlur)
    }

    renderSuffix(state) {
        // console.log(state)
        const { label, notched } = this.props
        return (
            <NotchedOutline
                className={styles.notchedOutline}
                label={label}
                notched={
                    notched !== null ?
                        notched
                    : 
                        Boolean(state.startAdornment || state.filled || state.focused)
                }
            />
        )
    }

    render() {
        const { className, style, disabled, error, inputProps, color, ...others } = this.props
        const { is_focus } = this.state
        
        let class_list = []
        if (is_focus) class_list.push(styles.focused)
        if (styles['color_'+color]) class_list.push(styles['color_'+color])
        if (disabled) class_list.push(styles.disabled)
        if (others.startAdornment) class_list.push(styles.adorned_start)
        if (others.endAdornment) class_list.push(styles.adorned_end)
        if (others.multiline) class_list.push(styles.multiline)
        if (others.margin == 'dense') class_list.push(styles.margin_dense)

        let input_class_list = []
        if (others.startAdornment) input_class_list.push(styles.inputAdornedStart)
        if (others.endAdornment) input_class_list.push(styles.inputAdornedEnd)
        if (others.multiline) input_class_list.push(styles.inputMultiline)
        if (others.margin == 'dense') input_class_list.push(styles.inputMarginDense)

        return (
            <InputBase
                className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
                disabled={disabled}
                error={error}
                {...others}
                inputProps={{
                    ...inputProps,
                    className: `${styles.input} ${input_class_list.join(' ')} ${inputProps.className}`,
                }}
                focused={is_focus}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                renderSuffix={this.renderSuffix}
            />
        )
    }
}

export default OutlinedInput;