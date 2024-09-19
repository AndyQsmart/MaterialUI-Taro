import React, { PureComponent } from 'react';
import styles from './FilledInput.module.less'
import InputBase from './InputBase';

// 网页版原版
class FilledInput extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary', // 'primary' 'secondary'
        value: '',
        disabled: false,
        disableUnderline: false,
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
        rows: null,
        rowsMin: null,
        rowsMax: null,
        hiddenLabel: false,
        // onBlur
        // onChange
    }

    constructor() {
        super(...arguments)

        this.state = {
            is_focus: false,
        }

        this.inputRef = React.createRef()

        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    focus() {
        if (this.inputRef.current) {
            this.inputRef.current.focus()
        }
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

    render() {
        const { className, style, disableUnderline, disabled, error, inputProps, color, hiddenLabel, ...others } = this.props
        const { is_focus } = this.state

        let class_list = []
        if (!disableUnderline) class_list.push(styles.underline)
        if (is_focus) class_list.push(styles.focused)
        if (disabled) class_list.push(styles.disabled)
        if (error) class_list.push(styles.error)
        if (styles['color_'+color]) class_list.push(styles['color_'+color])
        if (others.startAdornment) class_list.push(styles.adornedStart)
        if (others.endAdornment) class_list.push(styles.adornedEnd)
        if (others.multiline) class_list.push(styles.multiline)
        if (others.margin == 'dense') class_list.push(styles.marginDense)

        let input_class_list = []
        if (others.startAdornment) input_class_list.push(styles.inputAdornedStart)
        if (others.endAdornment) input_class_list.push(styles.inputAdornedEnd)
        if (others.multiline) input_class_list.push(styles.inputMultiline)
        if (others.margin == 'dense') input_class_list.push(styles.inputMarginDense)
        if (hiddenLabel) input_class_list.push(styles.inputHiddenLabel)

        return (
            <InputBase
                ref={this.inputRef}
                className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
                disabled={disabled}
                error={error}
                {...others}
                inputProps={{
                    ...inputProps,
                    className: `${styles.input} ${input_class_list.join(' ')}`,
                }}
                focused={is_focus}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        )
    }
}

export default FilledInput;