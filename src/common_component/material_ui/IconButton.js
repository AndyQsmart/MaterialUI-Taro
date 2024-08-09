import React, { PureComponent } from 'react';
import styles from './IconButton.module.less'
import { View } from '@tarojs/components';
import Ripple from './Ripple';

// 网页版原版
class IconButton extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'default', // 'default' 'inherit' 'primary' 'secondary'
        disabled: false,
        disableRipple: false,
        edge: false, // 'start' 'end' false
        size: 'medium' // 'small' 'medium'
    }

    constructor() {
        super(...arguments)

        this.state = {
            show_ripple: false,
        }

        this.onClick = this.onClick.bind(this)
        this.finishRapple = this.finishRapple.bind(this)
    }

    finishRapple() {
        this.setState({
            show_ripple: false,
        })
    }

    onClick(e) {
        this.setState({
            show_ripple: true,
        })
        const { onClick } = this.props
        if (onClick) {
            onClick(e)
        }
    }

    render() {
        const { className, style, color, disabled, disableRipple, edge, size, children, onClick } = this.props
        const { show_ripple } = this.state

        return (
            <View className={`${styles.root} ${styles['color_'+color]} ${disabled ? styles.disabled : ''} ${edge ? styles['edge_'+edge] : ''} ${styles['size_'+size]} ${className}`} style={style} onClick={this.onClick} >
                <View className={styles.label} >
                    {children}
                </View>
                {
                    disableRipple ?
                        null
                    :
                        <Ripple visible={show_ripple} onFinish={this.finishRapple} />
                }
            </View>
        )
    }
}

export default IconButton;