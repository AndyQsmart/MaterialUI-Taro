import React, { PureComponent } from 'react';
import styles from './ListItem.module.less'
import { View } from '@tarojs/components';
import TouchRipple from './TouchRipple';

// 网页版原版
class ListItem extends PureComponent {
    static defaultProps = {
        className: '',
        alignItems: 'center', // 'flex-start' 'center'
        dense: false,
        disabled: false,
        disableGutters: false,
        divider: false,
        selected: false,
        button: false,
    }

    constructor() {
        super(...arguments)

        this.touch_ripple_ref = React.createRef()

        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
    }

    onTouchStart(e) {
        const { button, disabled } = this.props
        if (!disabled && button && this.touch_ripple_ref.current) {
            this.touch_ripple_ref.current.start(e)
        }
    }

    onTouchEnd(e) {
        const { button, disabled } = this.props
        if (!disabled && button && this.touch_ripple_ref.current) {
            this.touch_ripple_ref.current.stop(e)
        }
    }

    render() {
        const { className, style, children, dense, disabled, disableGutters, divider, button, alignItems, onClick } = this.props

        React.Children.map(children, (child)=>{
            if (child.type) {
                if (child.type.name == 'ListItemAvatar') {
                    child.props.alignItems = alignItems
                }
                else if (child.type.name == 'ListItemIcon') {
                    child.props.alignItems = alignItems
                }
            }
        })

        return (
            <View 
                className={`${styles.root} ${!disableGutters ? styles.gutters : ''} ${disabled ? styles.disabled : ''} ${divider ? styles.divider : ''} ${dense ? styles.dense : ''} ${button ? styles.button_style : ''} ${styles['alignItems_'+alignItems]} ${className}`}
                style={style}
                onClick={onClick}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
            >
                {children}
                {
                    button ?
                        <TouchRipple ref={this.touch_ripple_ref} />
                    :
                        null
                }
            </View>
        )
    }
}

export default ListItem;