import React, { PureComponent } from 'react';
import styles from './Modal.module.less'
import { View } from '@tarojs/components';
import Backdrop from './Backdrop';

// 网页版原版
class Modal extends PureComponent {
    static defaultProps = {
        className: '',
        open: false,
        BackdropComponent: Backdrop,
        BackdropProps: {},
        // closeAfterTransition: false,
        disableBackdropClick: false,
        hideBackdrop: false,
        // keepMounted: false,
        // onBackdropClick
    }

    constructor() {
        super(...arguments)

        this.state = {
            exited: true,
        }

        this.onEnter = this.onEnter.bind(this)
        this.onExited = this.onExited.bind(this)
        this.onBackdropClick = this.onBackdropClick.bind(this)
    }

    onBackdropClick() {
        const { onBackdropClick, onClose } = this.props
        if (onBackdropClick) {
            onBackdropClick()
        }
        if (onClose) {
            onClose()
        }
    }

    onEnter() {
        this.setState({
            exited: false,
        })
    }

    onExited() {
        this.setState({
            exited: true,
        })
    }

    render() {
        const { className, style, children, open, BackdropComponent, BackdropProps, disableBackdropClick, hideBackdrop } = this.props
        const { exited } = this.state

        return (
            <View
                class={`${styles.root} ${!open && exited ? styles.exited : ''} ${className}`}
                style={style}
            >
                <BackdropComponent
                    invisible={hideBackdrop} 
                    open={open}
                    onClick={disableBackdropClick ? null : this.onBackdropClick}
                    onEnter={this.onEnter}
                    onExited={this.onExited}
                    {...BackdropProps}
                >
                </BackdropComponent>
                {children}
            </View>
        )
    }
}

export default Modal;