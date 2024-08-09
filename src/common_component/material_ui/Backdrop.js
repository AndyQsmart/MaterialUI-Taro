import React, { PureComponent } from 'react';
import styles from './Backdrop.module.less'
import Fade from './Fade';
import { View } from '@tarojs/components';

// 网页版原版
class Backdrop extends PureComponent {
    static defaultProps = {
        className: '',
        invisible: false,
        open: false,
        TransitionComponent: Fade,
        transitionDuration: 225,
    }

    render() {
        const { className, style, open, children, invisible, componentsProps, TransitionComponent, transitionDuration, onClick, ...others } = this.props

        return (
            <TransitionComponent
                in={open} timeout={transitionDuration}
                {...others}
            >
                <View className={`${styles.root} ${invisible ? styles.invisible : ''} ${className}`}
                    style={style}
                    onClick={onClick}
                >
                    {children}
                </View>
            </TransitionComponent>
        )
    }
}

export default Backdrop;