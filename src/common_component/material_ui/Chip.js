import React, { PureComponent } from 'react'
import styles from './Chip.module.less'
import { View } from '@tarojs/components'

// 网页原版
class Chip extends PureComponent {
    static defaultProps = {
        className: '',
        color: 'default', // 'default' 'inherit' 'primary' 'secondary'	
        deleteIcon: null,
        disabled: false,
        avatar: null,
        icon: null,
        label: '',
        onDelete: null,
        size: 'medium', // 'medium' 'small'
        variant: 'default', // default、outlined
    }

    constructor() {
        super(...arguments)

        this.handleDeleteIconClick = this.handleDeleteIconClick.bind(this)
    }

    handleDeleteIconClick(event) {
        // Stop the event from bubbling up to the `Chip`
        event.stopPropagation()

        const { onDelete } = this.props
        if (onDelete) {
            onDelete(event)
        }
    }

    render() {
        const { className, style, onClick, onDelete, avatar, icon, label, variant, size, color, disabled, deleteIcon } = this.props

        let deleteIconComponent = null
        if (onDelete) {
            let customClasses = `${styles.deleteIcon}`
            if (size == 'small') {
                customClasses += ` ${styles.deleteIcon_small}`
            }
            if (color !== 'default' && variant !== 'outlined') {
                customClasses += ` ${styles['deleteIcon_color_'+color]}`
            }
            if (color !== 'default' && variant === 'outlined') {
                customClasses += ` ${styles['deleteIcon_outlined_color_'+color]}`
            }
            if (deleteIcon) {
                deleteIconComponent = React.cloneElement(deleteIcon, {
                    className: `${deleteIcon.props.className} ${customClasses}`,
                    onClick: this.handleDeleteIconClick,
                })
            }
            else {
                deleteIconComponent = (
                    <View className={`${styles.svg_delete_icon} ${styles.deleteIcon} ${customClasses}`} onClick={this.handleDeleteIconClick} >
                    </View>
                )
            }
        }

        let avatarComponent = null
        if (avatar && React.isValidElement(avatar)) {
            let customClasses = ''
            if (size == 'small') {
                customClasses += ` ${styles.avatar_small}`
            }
            if (color !== 'default') {
                customClasses += ` ${styles['avatar_color_'+color]}`
            }
            avatarComponent = React.cloneElement(avatar, {
                className: `${styles.avatar} ${avatar.props.className} ${customClasses}`,
            })
        }

        let iconComponent = null
        if (icon && React.isValidElement(icon)) {
            let customClasses = ''
            if (size == 'small') {
                customClasses += ` ${styles.icon_small}`
            }
            if (color !== 'default') {
                customClasses += ` ${styles['icon_color_'+color]}`
            }
            iconComponent = React.cloneElement(icon, {
                className: `${styles.icon} ${icon.props.className} ${customClasses}`,
            })
        }

        let rootClasses = ''
        if (disabled) {
            rootClasses += ` ${styles.disabled}`
        }
        if (size == 'small') {
            rootClasses += ` ${styles.size_small}`
        }
        if (color !== 'default') {
            rootClasses += ` ${styles['color_'+color]}`
        }
        if (variant === 'outlined') {
            rootClasses += ` ${styles.outlined}`
            if (color == 'primary') {
                rootClasses += ` ${styles.outlined_primary}`
            }
            else if (color == 'secondary') {
                rootClasses += ` ${styles.outlined_secondary}`
            }
        }

        return (
            <View 
                className={`${styles.root} ${rootClasses} ${className}`}
                style={style}
                onClick={onClick}
            >
                {avatarComponent || iconComponent}
                <View className={`${styles.label} ${variant == 'small' ? styles.label_small : ''}`} >
                    {label}
                </View>
                {deleteIconComponent}
            </View>
        )
    }
}

export default Chip;