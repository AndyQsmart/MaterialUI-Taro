import React, { PureComponent } from 'react';
import styles from './Card.module.less'
import Paper from './Paper'

class Card extends PureComponent {
    static defaultProps = {
        className: '',
        raised: false,
    }

    render() {
        const { className, style, children, raised, onClick } = this.props

        return (
            <Paper
                className={`${styles.card} ${className}`}
                elevation={raised ? 8 : 2}
                styles={style}
                onClick={onClick}
            >
                {children}
            </Paper>
        )
    }
}

export default Card;