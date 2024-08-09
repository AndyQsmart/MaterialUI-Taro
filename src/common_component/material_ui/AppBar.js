import React, { PureComponent } from 'react';
import styles from './AppBar.module.less'
import Paper from './Paper'

class AppBar extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'primary', // default, primary, secondary
        position: 'fixed', // absolute, fixed, relative, static, sticky,
    }

    render() {
        const { className, style, children, color, position } = this.props

        return (
            <Paper
                square
                className={`${styles.root} ${styles['color-'+color]} ${styles['position-'+position]} ${className}`}
                style={style}
                elevation={4}
            >
                {children}
            </Paper>
        )
    }
}

export default AppBar;