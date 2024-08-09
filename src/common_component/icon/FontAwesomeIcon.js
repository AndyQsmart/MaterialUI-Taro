import React, { PureComponent }  from 'react' 
import { Text } from '@tarojs/components'

export default class FontAwesomeIcon extends PureComponent {
    render() {
        const { className, name, size, color, onClick, style } = this.props
        let the_style = style ? style : {}
        if (size) {
            the_style.fontSize = size
        }
        if (color) {
            the_style.color = color
        }
        return (
            <Text className={`fa fa-${name} ${className ? className : ''}`} style={the_style}
                onClick={onClick}
            />
        )
    }
}