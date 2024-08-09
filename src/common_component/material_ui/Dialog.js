import React, { PureComponent } from 'react';
import styles from './Dialog.module.less'
import { View } from '@tarojs/components';
import Modal from './Modal'
import Paper from './Paper';
import Fade from './Fade';

// 网页原版
class Dialog extends PureComponent {
    static defaultProps = {
        className: '',
        open: false,
        disableBackdropClick: false,
        // onBackdropClick: null,
        fullScreen: false,
        fullWidth: false, // 在移动端似乎没有实际效果
        // maxWidth: 'sm', // 'lg' 'md' 'sm' 'xl' 'xs' false, 小程序端宽度不够这个参数，删减
        PaperComponent: Paper,
        PaperProps: {},
        scroll: 'paper', // 'body' 'paper'
        TransitionComponent: Fade,
        transitionDuration: 225,
        TransitionProps: {},
    }

    render() {
        const {
            className, style, children, transition, fullScreen, fullWidth, open, onClose,
            TransitionComponent, transitionDuration, TransitionProps,
            disableBackdropClick,
            PaperComponent, PaperProps,
            scroll, maxWidth,
            ...others
        } = this.props

        let paper_class_list = []
        if (scroll === 'paper') {
            paper_class_list.push(styles.paperScrollPaper)
        }
        if (scroll === 'body') {
            paper_class_list.push(styles.paperScrollBody)
        }
        if (fullWidth) {
            paper_class_list.push(styles.paperFullWidth)
        }
        else if (fullScreen) {
            paper_class_list.push(styles.paperFullScreen)
        }
        else {
            paper_class_list.push(styles.paperWidthFalse)
        }

        return (
            <Modal
                className={`${styles.root} ${className}`}
                style={style}
                open={open}
                onClose={onClose}
                disableBackdropClick={disableBackdropClick}
                {...others}
            >
                <TransitionComponent in={open} timeout={transitionDuration} {...TransitionProps} >
                    <View className={`${styles.container} ${scroll === 'body' ? styles.scrollBody : styles.scrollPaper}`} > 
                        <PaperComponent
                            elevation={24}
                            className={`${styles.paper} ${paper_class_list.join(' ')}`} 
                            {...PaperProps}
                        >
                            {children}
                        </PaperComponent>
                    </View>
                </TransitionComponent>
            </Modal>
        )
    }
}

export default Dialog;