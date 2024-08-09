import React, { PureComponent } from 'react';
import styles from './CircularProgress.module.less'
import { View } from '@tarojs/components';

class CircularProgress extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary',
        size: 40,
    }

    render() {
        const { className, size, color } = this.props
        let svg_class = styles.svg_color_primary
        if (styles['svg_color_'+color]) {
            svg_class = styles['svg_color_'+color]
        }

        return (
            <View className={`${styles.root} ${className}`} >
                <View className={svg_class}
                    style={{
                        width: size,
                        height: size,
                    }}
                >
                </View>
            </View>
        )
    }
}

export default CircularProgress;