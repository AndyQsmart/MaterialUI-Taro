import React, { PureComponent } from 'react';
import styles from './RadioGroup.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class RadioGroup extends PureComponent {
    static defaultProps = {
        className: '',
        value: '',
        row: false,
    }

    constructor() {
        super(...arguments)

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { onChange } = this.props
        if (onChange) {
            onChange({
                detail: {
                    value: e.detail.value,
                }
            })
        }
    }

    render() {
        const { className, style, value, row, children, onChange } = this.props

        React.Children.map(children, (child)=>{
            if ((value == 0 || value) && child.props.value == value) {
                child.props.checked = true
            }
            else {
                child.props.checked = false
            }
            child.props.onChange = this.onChange
        })

        return (
            <View className={`${styles.root} ${row ? styles.row : ''} ${className}`} style={style} onClick={this.onCheck} >
                {children}
            </View>
        )
    }
}

export default RadioGroup;