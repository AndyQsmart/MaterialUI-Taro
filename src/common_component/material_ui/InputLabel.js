import React, { PureComponent } from 'react';
import styles from './InputLabel.module.less'
import FormLabel from './FormLabel';

// 网页版原版
class InputLabel extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary', // 'primary' 'secondary'	
        disableAnimation: false,
        disabled: false,
        error: false,
        focused: false,
        margin: 'dense',
        shrink: false,
        variant: 'standard', // 'filled' 'outlined' 'standard'
    }

    render() {
        const {
            className, style,
            disableAnimation,
            margin,
            shrink,
            variant,
            filled,
            ...others
        } = this.props

        let class_list = []

        if (margin == 'dense') class_list.push(styles.marginDense)
        if (shrink) class_list.push(styles.shrink)
        if (!disableAnimation) class_list.push(styles.animated)
        if (styles[variant]) class_list.push(styles[variant])
        // if (filled) class_list.push(styles.filled)

        return (
            <FormLabel
                className={`${styles.root} ${styles.formControl} ${class_list.join(' ')} ${className}`}
                style={style}
                {...others}
            />
        )
    }
}

export default InputLabel;