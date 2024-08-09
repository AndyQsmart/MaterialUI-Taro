import React, { PureComponent } from 'react';
import styles from './Select.module.less'
import { View, Picker } from '@tarojs/components';
import TouchRipple from './TouchRipple';

// 网页版原版
class Select extends PureComponent {
    static defaultProps = {
        className: '',
        variant: 'standard', // 'filled' 'outlined' 'standard'
        value: null,
        disabled: false,
        // onChange
    }

    constructor() {
        super(...arguments)

        this.state = {
            select_list: [],
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { onChange } = this.props
        const { select_list } = this.state
        const { value } = e.detail
        if (onChange) {
            onChange({
                detail: {
                    value: select_list[value].value,
                }
            })
        }
    }

    updateSelectList() {
        const { children } = this.props
        const { select_list } = this.state
        let need_update = false
        let new_select_list = []
        React.Children.map(children, (child)=>{
            if (child.props && child.props.children) {
                let text = child.props.children
                let value = child.props.value
                new_select_list.push({
                    text,
                    value,
                })
            }
        })

        if (select_list.length != new_select_list.length) {
            need_update = true
        }
        else {
            for (let i = 0; i < select_list.length; i++) {
                let item = select_list[i]
                let new_item = new_select_list[i]
                if (item.text != new_item.text || item.value != new_item.value) {
                    need_update = true
                    break
                }
            }
        }

        if (need_update) {
            this.setState({
                select_list: new_select_list,
            })
        }
    }

    componentDidUpdate() {
        this.updateSelectList()
    }

    componentDidMount() {
        this.updateSelectList()
    }

    render() {
        const { className, style, value, disabled, variant, children } = this.props
        const { select_list } = this.state

        let range_list = []
        let current_index = null
        let current_text = ''
        for (let i = 0; i < select_list.length; i++) {
            let item = select_list[i]
            if (item.value == value) {
                current_index = i
                current_text = item.text
            }
            range_list.push(item.text)
        }

        let variant_clas_name = 'underline'
        if (variant == 'outlined') {
            variant_clas_name = 'outlined'
        }
        else if (variant == 'filled') {
            variant_clas_name = 'filled'
        }

        return (
            <Picker disabled={disabled} range={range_list} value={current_index} onChange={this.onChange} >
                <View className={`${styles.root} ${disabled ? styles.disabled : ''}`} >
                    <View className={`${styles.select_root} ${styles[variant_clas_name]} ${disabled ? styles.disabled : ''} ${className}`}
                        style={style}
                        hoverClass={disabled ? 'none' : `${styles.select_root_focus} ${styles[variant_clas_name+'_focus']}`}
                        hoverStayTime={1000}
                    >
                        {current_text}
                    </View>
                    <View className={`${styles.icon} ${styles['icon_'+variant_clas_name]}`} ></View>
                </View>
            </Picker>
        )
    }
}

export default Select;