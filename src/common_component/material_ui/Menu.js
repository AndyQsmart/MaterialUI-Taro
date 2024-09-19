import React, { PureComponent } from 'react';
import Popover from './Popover';
import MenuList from './MenuList';
import styles from './Menu.module.less'

// 网页版原版
class Menu extends PureComponent {
    static defaultProps = {
        className: '',
        MenuListProps: {},
        onClose: null,
        open: false,
        transitionDuration: 225,
        TransitionProps: {},
    }

    render() {
        const { children, MenuListProps, PaperProps, ...others } = this.props

        return (
            <Popover
                PaperProps={{
                    ...PaperProps,
                    className: `${PaperProps ? PaperProps.className : ''} ${styles.paper}`,
                }}
                {...others}
            >
                <MenuList {...MenuListProps} >
                    {children}
                </MenuList>
            </Popover>
        )
    }
}

export default Menu
