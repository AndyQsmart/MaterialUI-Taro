import React, { PureComponent } from 'react';
import styles from './Avatar.module.less'
import { View, Block, Image } from '@tarojs/components';

class Avatar extends PureComponent {
    static defaultProps = {
        className: '',
        src: '',
    }

    render() {
        const { className, style, children, src, onClick } = this.props

        return (
            <View
                className={`${styles.root} ${styles['color-default']} ${className}`}
                style={style}
                onClick={onClick}
            >
                {
                    src ?
                        <Block >
                            <Image 
                                src={src}
                                className={styles.img}
                            />
                        </Block>
                    :
                        null
                }
                {children}
            </View>
        )
    }
}

export default Avatar;