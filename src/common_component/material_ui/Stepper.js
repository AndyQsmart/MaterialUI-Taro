import React, { PureComponent } from 'react'
import Paper from './Paper'
import StepConnector from './StepConnector'
import styles from './Stepper.module.less'

// 网页原版
class Stepper extends PureComponent {
    static defaultProps = {
        className: '',
        activeStep: 0,
        alternativeLabel: false,
        connector: <StepConnector />,
        nonLinear: false,
        orientation: 'horizontal', // 'horizontal' | 'vertical'
    }

    render() {
        const { className, activeStep, alternativeLabel, connector, nonLinear, orientation, children, ...others } = this.props

        const connectorComponent = React.isValidElement(connector) ? React.cloneElement(connector, { orientation }) : null

        const childrenArray = React.Children.toArray(children)
        const steps = childrenArray.map((step, index) => {
            const controlProps = {
                alternativeLabel,
                connector,
                last: index + 1 === childrenArray.length,
                orientation,
            }

            let state = {
                index,
                active: false,
                completed: false,
                disabled: false,
            }

            if (activeStep === index) {
                state.active = true
            }
            else if (!nonLinear && activeStep > index) {
                state.completed = true
            }
            else if (!nonLinear && activeStep < index) {
                state.disabled = true
            }

            return [
                !alternativeLabel &&
                connectorComponent &&
                index !== 0 &&
                React.cloneElement(connectorComponent, {
                    key: index, // eslint-disable-line react/no-array-index-key
                    ...state,
                }),
                React.cloneElement(step, { ...controlProps, ...state, ...step.props }),
            ]
        })

        return (
            <Paper
                square elevation={0}
                className={`${styles.root} ${styles[orientation]} ${alternativeLabel ? styles.alternativeLabel : ''} ${className}`}
                {...others}
            >
                {steps}
            </Paper>
        )
    }
}

export default Stepper