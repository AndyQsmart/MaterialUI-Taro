import React, { PureComponent }  from 'react' 
import styles from './TextField.module.css'
import FormControl from './FormControl'
import Input from './Input'
import FilledInput from './FilledInput'
import OutlinedInput from './OutlinedInput'
import InputLabel from './InputLabel'

const variantComponent = {
    standard: Input ,
    filled: FilledInput,
    outlined: OutlinedInput,
};

// 网页版原版
export default class TextField extends PureComponent {
    static defaultProps = {
        color: 'primary', // primary, secondary
        disabled: false,
        error: false,
        FormHelperTextProps: {},
        fullWidth: false,
        helperText: null,
        InputLabelProps: {},
        inputProps: {},
        InputProps: {},
        label: null,
        margin: 'none', // 'dense' 'none' 'normal'
        multiline: false,
        placeholder: '',
        required: false,
        rows: null,
        rowsMin: null,
        rowsMax: null,
        size: 'medium', // 'medium' 'small'
        type: 'text',
        value: '',
        variant: 'standard', // standard, outlined, filled
        password: false,
        fixed: false, // 如果多行输入textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
        onConfirm: null,
    }

    constructor() {
        super(...arguments)

        this.state = {
            is_focus: false,
        }

        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
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
        const {
            className,
            children,
            color,
            disabled,
            error,
            FormHelperTextProps,
            fullWidth,
            helperText,
            InputLabelProps,
            inputProps,
            InputProps,
            label,
            maxRows,
            minRows,
            multiline,
            onBlur,
            onChange,
            onFocus,
            onConfirm,
            placeholder,
            required,
            rows,
            type,
            value,
            variant,
            size,
            ...others
        } = this.props
        const { is_focus } = this.state

        const InputMore = {}
        if (variant === 'outlined') {
            if (InputLabelProps && (InputLabelProps.shrink !== null && InputLabelProps.shrink !== undefined)) {
                InputMore.notched = InputLabelProps.shrink
            }
            if (label) {
                InputMore.label = label
                // const displayRequired = InputLabelProps.required === null || InputLabelProps.required === undefined ? required : InputLabelProps.required
                // InputMore.label = (
                //     <React.Fragment>
                //         {label}
                //         {displayRequired && '\u00a0*'}
                //     </React.Fragment>
                // );
            }
        }

        const InputComponent = variantComponent[variant];
        if (!InputComponent) {
            console.error(`invalid variant: ${variant}`)
            return null
        }

        const InputElement = (
            <Input
                fullWidth={fullWidth}
                multiline={multiline}
                rows={rows}
                color={color}
                disabled={disabled}
                error={error}
                required={required}
                maxRows={maxRows}
                minRows={minRows}
                type={type}
                value={value}
                margin={size === 'small' ? 'dense' : 'normal'}
                onBlur={this.onBlur}
                onChange={onChange}
                onFocus={this.onFocus}
                onConfirm={onConfirm}
                placeholder={placeholder}
                inputProps={inputProps}
                {...InputMore}
                {...InputProps}
            />
        )

        return (
            <FormControl
                className={`${styles.root} ${className}`}
                disabled={disabled}
                error={error}
                fullWidth={fullWidth}
                required={required}
                color={color}
                variant={variant}
                {...others}
            >
                {
                    label ?
                        <InputLabel
                            variant={variant}
                            margin={size === 'small' ? 'dense' : 'normal'}
                            filled={value ? true : false}
                            shrink={value ? true : is_focus}
                            {...InputLabelProps}
                        >
                            {label}
                        </InputLabel>
                    :
                        null
                }
                {InputElement}
            </FormControl>
        )
    }
}
