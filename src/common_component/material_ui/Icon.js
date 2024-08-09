import React, { PureComponent } from 'react';
import styles from './Icon.module.less'
import { Text } from '@tarojs/components';

class Icon extends PureComponent {
    static defaultProps = {
        className: '',
        type: 'book',
    }

    render() {
        const { className, style, children, onClick } = this.props

        return (
            <Text
                class={`${styles['material-icons']} ${className}`}
                style={style}
                onClick={onClick}
            >
                {children}
            </Text>

        )
    }
}

export default Icon;