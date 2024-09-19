import React, { PureComponent } from 'react';
import styles from './Drawer.module.less'
import { View } from '@tarojs/components'
import Modal from './Modal';
import Paper from './Paper';
import Slide from './Slide';

const oppositeDirection = {
    left: 'right',
    right: 'left',
    top: 'down',
    bottom: 'up',
};

// 网页版原版
class Drawer extends PureComponent {
    static defaultProps = {
        className: '',
        open: false,
        anchor: 'left', // 'bottom' 'left' 'right' 'top'
        elevation: 16,
        hideBackdrop: false,
        ModalProps: {},
        PaperProps: {},
        SlideProps: {},
        TransitionComponent: Slide,
        transitionDuration: 225,
        variant: 'temporary', // 'permanent' 'persistent' 'temporary'
    }

    render() {
        const {
            className, style, children,
            open, anchor, variant, elevation,
            hideBackdrop, ModalProps,
            PaperProps, SlideProps,
            TransitionComponent, transitionDuration,
            onClose,
            ...others
        } = this.props

        let paper_class_list = []

        paper_class_list = []
        if (variant === 'temporary') {
            if (styles['paperAnchor_'+anchor]) paper_class_list.push(styles['paperAnchor_'+anchor])
        }
        else {
            if (styles['paperAnchorDocked_'+anchor]) paper_class_list.push(styles['paperAnchorDocked_'+anchor])
        }
        if (PaperProps.className) {
            paper_class_list.push(PaperProps.className)
        }

        const drawer = (
            <Paper
                elevation={variant === 'temporary' ? elevation : 0}
                square
                {...PaperProps}
                className={`${styles.paper} ${paper_class_list.join(' ')}`}
            >
                {children}
            </Paper>
        )

        if (variant === 'permanent') {
            return (
                <View
                    className={`${styles.docked} ${className}`}
                    style={style}
                    {...others}
                >
                    {drawer}
                </View>
            );
        }

        const slidingDrawer = (
            <TransitionComponent
                in={open}
                direction={oppositeDirection[anchor]}
                timeout={transitionDuration}
                // appear={mounted.current}
                {...SlideProps}
            >
              {drawer}
            </TransitionComponent>
        );

        if (variant === 'persistent') {
            return (
                <View
                    className={`${styles.docked} ${className}`}
                    style={style}
                    {...others}
                >
                    {slidingDrawer}
                </View>
            );
        }

        // variant === temporary
        return (
            <Modal
                BackdropProps={{
                    // ...BackdropProps,
                    // ...BackdropPropsProp,
                    transitionDuration,
                }}
                className={`${styles.root} ${styles.modal} ${className}`}
                open={open}
                style={style}
                onClose={onClose}
                hideBackdrop={hideBackdrop}
                {...others}
                {...ModalProps}
            >
                {slidingDrawer}
            </Modal>
        );
    }
}

export default Drawer;