import React, { PureComponent } from 'react';
import styles from './Avatar.module.less'
import { View, Block, Image } from '@tarojs/components';

class Avatar extends PureComponent {
    static defaultProps = {
        className: '',
        component: View,
        src: '',
    }

    render() {
        const { className, style, children, src, onClick, component } = this.props
        
        let Component = component

        return (
            <Component
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
            </Component>
        )
    }
}

export default Avatar;