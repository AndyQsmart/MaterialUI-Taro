import React, { PureComponent } from 'react';
import ListItem from './ListItem';
import styles from './MenuItem.module.less'

// 网页版原版
class MenuItem extends PureComponent {
    static defaultProps = {
        className: '',
        dense: false,
        disableGutters: false,
    }

    render() {
        const { className, disableGutters, ...others } = this.props

        return (
            <ListItem
                button
                className={`${styles.root} ${disableGutters ? '' : styles.gutters} ${className}`}
                {...others}
            />
        )
    }
}

export default MenuItem
