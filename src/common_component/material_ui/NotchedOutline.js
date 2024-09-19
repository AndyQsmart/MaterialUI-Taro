import React, { PureComponent } from 'react';
import styles from './NotchedOutline.module.less'
import { View } from '@tarojs/components';

// 网页版原版
class NotchedOutline extends PureComponent {
    static defaultProps = {
        className: '',
        label: null,
        notched: false,
    }

    constructor() {
        super(...arguments)
    }

    render() {
        const { className, style, label, notched, ...others } = this.props

        return (
            <View
                className={`${styles.root} ${className}`}
                style={style}
                {...others}
            >
                <View className={`${styles.legend} ${label ? styles.labelled : ''} ${notched ? styles.notched : ''}`} >
                    {
                        label ? 
                            <View>
                                {label}
                            </View>
                        :
                            null
                    }
                </View>
            </View>
        )
    }
}

export default NotchedOutline;