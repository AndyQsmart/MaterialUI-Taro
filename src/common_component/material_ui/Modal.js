import React, { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Backdrop from './Backdrop'
import Portal from './Portal'
import styles from './Modal.module.less'

// 网页版原版
class Modal extends PureComponent {
    static defaultProps = {
        className: '',
        open: false,
        BackdropComponent: Backdrop,
        BackdropProps: {},
        // closeAfterTransition: false,
        disableBackdropClick: false,
        disablePortal: false,
        hideBackdrop: false,
        // keepMounted: false,
        // onBackdropClick
        unrenderAfterExit: false, // 单独为placeholder不隐藏问题修复
    }

    constructor() {
        super(...arguments)

        this.state = {
            exited: true,
            root_node: null,
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

    componentDidMount() {
        let _instance = Taro.getCurrentInstance()
        let root_node = document.getElementById(_instance.page.$taroPath)

        if (root_node) {
            this.setState({
                root_node,
            })
        }
        else {
            const onReadyEventId = _instance.router.onReady
            Taro.eventCenter.once(onReadyEventId, () => {
                console.log('onReady')
                root_node = document.getElementById(_instance.page.$taroPath)
                this.setState({
                    root_node,
                })
            })
        }
    }

    render() {
        const { className, style, children, open, BackdropComponent, BackdropProps, disableBackdropClick, disablePortal, hideBackdrop, unrenderAfterExit } = this.props
        const { exited, root_node } = this.state

        if (!root_node) {
            return null
        }

        return (
            <Portal disablePortal={disablePortal} >
                <View
                    className={`${styles.root} ${!open && exited ? styles.exited : ''} ${unrenderAfterExit ? styles.unrenderAfterExit : ''} ${className}`}
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
            </Portal>
        )
    }
}

export default Modal;