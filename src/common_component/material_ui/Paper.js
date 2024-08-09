import React, { PureComponent } from 'react';
import styles from './Paper.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class Paper extends PureComponent {
    static defaultProps = {
        className: '',
        square: false,
        elevation: 1,
        variant: 'elevation', //  'elevation' 'outlined'
    }

    render() {
        const { className, style, children, square, elevation, variant, onClick } = this.props

        return (
            <View
                className={`${styles.paper} ${!square ? styles.rounded : ''} ${variant == 'outlined' ? styles.outlined : styles[`m-ui__shadow${elevation}`]} ${className}`}
                style={style}
                onClick={onClick}
            >
                {children}
            </View>
        )
    }
}

export default Paper;