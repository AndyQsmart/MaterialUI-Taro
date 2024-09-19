import React, { PureComponent } from 'react';
import styles from './Accordion.module.less'
import { View } from '@tarojs/components';
import Paper from './Paper';
import Collapse from './Collapse';

// 网页版原版
class Accordion extends PureComponent {
    static defaultProps = {
        className: '',
        expanded: false,
        disabled: false,
        square: false,
    }

    constructor() {
        super(...arguments)

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { onChange, expanded } = this.props
        if (onChange) {
            onChange(e, !expanded)
        }
    }

    render() {
        const { className, style, children, expanded, disabled, square } = this.props

        let AccordionSummary_child = null
        let AccordionDetails_child = null
        let AccordionActions_child = null
        let other_child = []
        React.Children.map(children, (child)=>{
            if (child.type) {
                if (child.type.muiName == 'AccordionSummary') {
                    AccordionSummary_child = child
                    AccordionSummary_child.props.expanded = expanded
                    AccordionSummary_child.props.disabled = disabled
                    if (!AccordionSummary_child.props.onClick) {
                        AccordionSummary_child.props.onClick = this.onChange
                    }
                }
                else if (child.type.muiName == 'AccordionDetails') {
                    AccordionDetails_child = child
                }
                else if (child.type.muiName == 'AccordionActions') {
                    AccordionActions_child = child
                }
                else {
                    other_child.push(child)
                }
            }
            else {
                other_child.push(child)
            }
        })

        return (
            <Paper
                className={`${styles.root} ${expanded ? styles.expanded : ''} ${disabled ? styles.disabled : ''} ${square ? '' : styles.rounded} ${className}`}
                style={style}
                elevation={1}
                square
            >
                <View class="summary" bindtap="handleChange">
                    {AccordionSummary_child}
                </View>
                <Collapse in={expanded} >
                    {AccordionDetails_child}
                    {other_child}
                    {AccordionActions_child}
                </Collapse>
            </Paper>
        )
    }
}

export default Accordion;