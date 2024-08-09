import React, { PureComponent } from 'react';
import styles from './Chip.module.less'
import { View } from '@tarojs/components';
import Avatar from './Avatar'
import Icon from './Icon'
import FontAwesomeIcon from '../Icon/FontAwesomeIcon';

class Chip extends PureComponent {
    static defaultProps = {
        className: '',
        avatar: '',
        src: '',
        delete: false,
        deleteIcon: null,
        deleteIconName: '',
    }

    render() {
        const { className, style, children, onClick, onDelete, avatar, src, deleteIcon, deleteIconName } = this.props

        return (
            <View 
                className={`${styles.root} ${className}`}
                style={style}
                hoverClass={styles['root-hover']}
                onClick={onClick}
            >
                {
                    avatar || src ?
                        <Avatar 
                            className={styles.avatar}
                            src={src}
                        >
                            {avatar}
                        </Avatar>
                    :
                        null
                }
                <View className={styles.label} >
                    {children}
                </View>
                {
                    this.props.delete ?
                        deleteIcon ?
                            deleteIcon
                        :
                            deleteIconName ?
                                <FontAwesomeIcon name={deleteIconName}
                                    onClick={onDelete}
                                    size={20}
                                    className={styles["delete-icon"]}
                                />
                            :
                                <Icon 
                                    onClick={onDelete}
                                    style={{
                                        fontSize: '48rpx'
                                    }}
                                    className={styles["delete-icon"]}
                                >
                                    cancel
                                </Icon>
                    :
                        null
                }
            </View>
        )
    }
}

export default Chip;