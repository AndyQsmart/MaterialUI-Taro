import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro'
import { View, Textarea, Input } from '@tarojs/components';
import styles from './InputBase.module.less'

// 网页版原版
class InputBase extends PureComponent {
    static defaultProps = {
        className: '',
        // color: 'primary', // 'primary' 'secondary'
        value: '',
        disabled: false,
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
            let the_uid = this.inputRef.current.uid
            Taro.createSelectorQuery().select(`#${the_uid}`).context(res => {
                this.setState({
                    is_focus: true,
                })
            }).exec()
        }
    }

    onFocus() {
        const { onFocus } = this.props
        this.setState({
            is_focus: true,
        }, onFocus)
    }

    onBlur(e) {
        const { onBlur, onChange } = this.props
        this.setState({
            is_focus: false,
        }, onBlur)
        if (onChange) {
            // fix 不触发 onChange 的问题
            onChange(e)
        }
    }

    renderInputComponent(inputProps) {
        const { multiline, rows, maxRows, minRows } = this.props
        if (multiline) {
            const { style } = inputProps
            let textarea_props = {
                autoHeight: rows ? false : true,
                // minRows,
                // maxRows,
            }
            let new_style = {...style}
            // console.log(rows)
            if (rows) {
                new_style.height = `${rows*1.4375}em`
            }
            if (minRows) {
                new_style.minHeight = `${minRows*1.4375}em`
            }
            if (maxRows) {
                new_style.maxHeight = `${maxRows*1.4375}em`
            }
            return (
                <Textarea
                    ref={this.inputRef}
                    {...textarea_props}
                    {...inputProps}
                    style={new_style}
                />
            )
        }
        else {
            return (
                <Input
                    ref={this.inputRef}
                    {...inputProps}
                />
            )
        }
    }

    render() {
        const {
            className, style,
            color, value, disabled,
            startAdornment, endAdornment,
            error, fullWidth,
            inputProps, margin,
            fixed,
            multiline, placeholder, required, rows, rowsMin, rowsMax, size,
            renderSuffix,
            onChange,
            onFocus, onBlur,
            ...others
        } = this.props
        const { is_focus } = this.state

        let input_class_list = []
        if (multiline) input_class_list.push(styles.multiline)
        if (styles[size]) input_class_list.push(styles[size])

        const {
            className: inputPropsClass,
            onFocus: inputOnFocus, onBlur: inputOnBlur, onInput,
            ...inputPropsOthers
        } = inputProps
        const theInputProps = {
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            value,
            disabled,
            fixed,
            placeholder,
            className: `${styles.input} ${input_class_list.join(' ')} ${inputPropsClass}`,
            onInput: onChange,
            focus: is_focus,
            ...others,
            ...inputPropsOthers,
        }

        let class_list = []
        if (disabled) class_list.push(styles.disabled)
        if (fullWidth) class_list.push(styles.fullWidth)
        if (multiline) class_list.push(styles.multiline)
        if (styles[size]) class_list.push(styles[size])

        return (
            <View 
                className={`${styles.root} ${class_list.join(' ')} ${className}`}
                style={style}
            >
                {startAdornment}
                {this.renderInputComponent(theInputProps)}
                {endAdornment}
                {
                    renderSuffix ? 
                        renderSuffix({
                            startAdornment,
                            focused: is_focus,
                            filled: value ? true : false,
                        })
                    :
                        null
                }
            </View>
        )
    }
}

export default InputBase;