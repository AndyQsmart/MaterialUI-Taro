import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import styles from './Step.module.less'

// 网页原版
class Step extends PureComponent {
    static defaultProps = {
        className: '',
        // active: false,
        // completed: false,
        // disabled: false,
        // expanded: false,
    }

    render() {
        const { className, active, alternativeLabel, children, completed, connector, disabled, index, last, orientation, ...others } = this.props

        return (
            <View
                className={`${styles.root} ${styles[orientation]} ${alternativeLabel ? styles.alternativeLabel : ''} ${completed ? styles.completed : ''} ${className}`}
                {...others}
            >
                {
                    connector &&
                    alternativeLabel &&
                    index !== 0 &&
                    React.cloneElement(connector, {
                        orientation,
                        alternativeLabel,
                        index,
                        active,
                        completed,
                        disabled,
                    })
                }
                {
                    React.Children.map(children, child => {
                        if (!React.isValidElement(child)) {
                            return null;
                        }

                        if (child.type == React.Fragment) {
                            console.log("Material-UI: the Step component doesn't accept a Fragment as a child.", 'Consider providing an array instead.')
                        }

                        return React.cloneElement(child, {
                            active,
                            alternativeLabel,
                            completed,
                            disabled,
                            last,
                            icon: index + 1,
                            orientation,
                            ...child.props,
                        })
                    })
                }
            </View>
        )
    }
}

export default Step