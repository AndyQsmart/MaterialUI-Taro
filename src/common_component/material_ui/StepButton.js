import React, { PureComponent } from 'react'
import ButtonBase from './ButtonBase'
import StepLabel from './StepLabel'
import styles from './StepButton.module.less'

// 网页原版
class StepButton extends PureComponent {
    static defaultProps = {
        className: '',
        // icon: null,
        // optional: null,
    }

    render() {
        const { active, alternativeLabel, children, className, completed, disabled, icon, last, optional, orientation, ...others } = this.props

        const childProps = {
            active,
            alternativeLabel,
            completed,
            disabled,
            icon,
            optional,
            orientation,
        }

        const child = React.Children.count(children) == 1 && children.type && children.type.muiName == 'StepLabel' ? 
                React.cloneElement(children, childProps)
            :
                <StepLabel {...childProps}>{children}</StepLabel>
        
        return (
            <ButtonBase
                disabled={disabled}
                TouchRippleProps={{ className: styles.touchRipple }}
                className={`${styles.root} ${styles[orientation]} ${className}`}
                {...others}
            >
                {child}
            </ButtonBase>
        )
    }
}

export default StepButton