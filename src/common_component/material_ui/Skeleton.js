import React, { PureComponent } from 'react';
import PropTyps from 'prop-types'
import { View } from '@tarojs/components';
import styles from './Skeleton.module.less'

class Skeleton extends PureComponent {
    render() {
        const { className, variant, show, width, height, children } = this.props
        if (!show && children) {
            return children
        }
        let variantClassName = null
        switch (variant) {
            case 'text': {
                variantClassName = styles.skeleton_text
                break
            }
            case 'rect': {
                variantClassName = null
                break
            }
            case 'circle': {
                variantClassName = styles.skeleton_circle
                break
            }
            default: {
                variantClassName = styles.skeleton_text
            }
        }
        return (
            <View
                className={`${className} ${styles.skeleton_default} ${variantClassName}`}
                style={{
                    width: typeof width == 'number' ? `${width}rpx` : width,
                    height: typeof height == 'number' ? `${height}rpx` : height,
                }}
            ></View>
        )
    }
}

Skeleton.propTyps = {
    show: PropTyps.bool,
    width: PropTyps.oneOfType([PropTyps.number, PropTyps.string]),
    height: PropTyps.oneOfType([PropTyps.number, PropTyps.string]),
    variant: PropTyps.oneOf(['text', 'rect', 'circle']),
    disableAnimate: PropTyps.bool,
}

Skeleton.defaultProps = {
    show: false,
    variant: 'text',
}

export default Skeleton;