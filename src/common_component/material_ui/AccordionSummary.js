import React, { PureComponent } from 'react';
import { View } from '@tarojs/components';
import ButtonBase from './ButtonBase';
import styles from './AccordionSummary.module.less'

// 网页版原版
class AccordionSummary extends PureComponent {
    static muiName = 'AccordionSummary'
    
    static defaultProps = {
        className: '',
        expandIcon: null,
        IconButtonProps: null,
        expanded: false, // 内部传入
        disabled: false, // 内部传入
    }

    render() {
        const { className, style, children, expanded, disabled, IconButtonProps, expandIcon, onClick } = this.props

        return (
            <View
                className={`${styles.root} ${disabled ? styles.disabled : ''} ${expanded ? styles.expanded : ''} ${className}`}
                style={style}
                onClick={onClick}
            >
                <View className={`${styles.content} ${expanded ? styles.expanded : ''}`} >
                    {children}
                </View>
                {
                    expandIcon ?
                        <ButtonBase className={`${styles.iconButton} ${styles.expandIcon} ${expanded ? styles.expanded : ''}`} {...IconButtonProps} >
                            {expandIcon}
                        </ButtonBase>
                    :
                        null
                }
            </View>
        )
    }
}

export default AccordionSummary;