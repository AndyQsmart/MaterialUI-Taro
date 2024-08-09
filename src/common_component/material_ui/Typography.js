import React, { PureComponent }  from 'react' 
import styles from './Typography.module.less'
import { Text } from '@tarojs/components'

// 网页版原版, 缺部分variant
export default class Typography extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'initial', // 'initial' 'inherit' 'primary' 'secondary' 'textPrimary' 'textSecondary' 'error'
        variant: 'body1',
        display: 'initial', // 'initial' 'block' 'inline'
        gutterBottom: false,
        noWrap: false,
        align: 'inherit', // 'inherit' 'left' 'center' 'right' 'justify'
        paragraph: false,
    }

    getClassName(variant) {
        switch (variant) {
            case 'h1': return styles.h1
            case 'h2': return styles.h2
            case 'h3': return styles.h3
            case 'h4': return styles.h4
            case 'h5': return styles.h5
            case 'h6': return styles.h6
            case 'body1': return styles.body1
            case 'body2': return styles.body2
            case 'subtitle1': return styles.subtitle1
            case 'subtitle2': return styles.subtitle2
            case 'caption': return styles.caption
            case 'button': return styles.button
            default: return styles.body1
        }
    }

    render() {
        const { variant, color, style, className, onClick, display, gutterBottom, paragraph, noWrap, align, children } = this.props

        return (
            <Text className={`${styles.root} ${styles['display_'+display]} ${gutterBottom ? styles.gutterBottom : ''} ${paragraph ? styles.paragraph : ''} ${noWrap ? styles.noWrap : ''} ${styles['align_'+align]} ${styles['color_'+color]} ${this.getClassName(variant)} ${className}`} style={style} onClick={onClick} >
                {children}
            </Text>
        )
    }
}
