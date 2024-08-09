import React, { PureComponent } from 'react';
import styles from './ButtonBase.module.less'
import { View, Button } from '@tarojs/components';
import TouchRipple from './TouchRipple';

class ButtonBase extends PureComponent {
    static defaultProps = {
        className: '',
        centerRipple: false,
        disabled: false,
    }

    constructor() {
        super(...arguments)

        this.touch_ripple_ref = React.createRef()

        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
    }

    onTouchStart(e) {
        const { disabled } = this.props
        if (!disabled && this.touch_ripple_ref.current) {
            this.touch_ripple_ref.current.start(e)
        }
    }

    onTouchEnd(e) {
        const { disabled } = this.props
        if (!disabled && this.touch_ripple_ref.current) {
            this.touch_ripple_ref.current.stop(e)
        }
    }

    render() {
        const { className, style, children, centerRipple, disabled, onClick, ...others } = this.props

        return (
            <View
                className={`${styles.root} ${disabled ? styles.disabled : ''} ${className}`}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                style={style}
            >
                {children}
                <Button className={styles.hidden_button} disabled={disabled} onClick={onClick} {...others} ></Button>
                {
                    disabled ?
                        null
                    :
                        <TouchRipple ref={this.touch_ripple_ref} center={centerRipple} />
                }
            </View>
        )
    }
}

export default ButtonBase;