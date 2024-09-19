import React, { PureComponent } from 'react';
import { View } from '@tarojs/components';
import styles from './ButtonGroup.module.less'

class ButtonGroup extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'default', // 'default' | 'inherit' | 'primary' | 'secondary'
        // disabled: false,
        // disableElevation: false,
        // disableRipple: false,
        fullWidth: false,
        orientation: 'horizontal', // 'horizontal' | 'vertical'
        size: 'medium', // 'large' | 'medium' | 'small'
        variant: 'outlined', // 'contained' | 'outlined' | 'text'
    }

    render() {
        const { className, style, children, color, disabled, disableElevation, disableRipple, fullWidth, orientation, size, variant, ...others } = this.props

        const class_list = [styles.root]
        if (variant == 'contained') {
            class_list.push(styles.contained)
        }
        if (disableElevation) {
            class_list.push(styles.disableElevation)
        }
        if (fullWidth) {
            class_list.push(styles.fullWidth)
        }
        if (orientation == 'vertical') {
            class_list.push(styles.vertical)
        }
        class_list.push(className)

        return (
            <View className={class_list.join(' ')} {...others} >
                {
                    React.Children.map(children, (item)=>{
                        if (!item) {
                            return null
                        }

                        let theClassName = item.props && item.props.className ? item.props.className : ''
                        theClassName += ` ${styles['grouped_'+orientation]}`
                        theClassName += ` ${styles['grouped_'+variant]}`
                        theClassName += ` ${styles['grouped_'+variant+'_'+orientation]}`
                        theClassName += ` ${styles['grouped_'+variant+'_'+color]}`
                        return React.cloneElement(item, {
                            className: `${theClassName} ${styles.grouped}`,
                            variant: variant,
                            color: color,
                            size: size,
                            disabled: disabled,
                            disableRipple: disableRipple,
                        })
                    })
                }
            </View>
        )
    }
}

export default ButtonGroup;