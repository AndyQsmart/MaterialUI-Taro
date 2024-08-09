import React, { PureComponent } from 'react';
import styles from './ListItemText.module.less'
import { View } from '@tarojs/components';
import Typography from './Typography'

// 网页版原版
class ListItemText extends PureComponent {
    static defaultProps = {
        className: '',
        disableTypography: false,
        primary: null,
        secondary: null,
        inset: false,
        primaryTypographyProps: {},
        secondaryTypographyProps: {},
    }

    render() {
        const { className, style, children, inset, disableTypography, primary, secondary, primaryTypographyProps, secondaryTypographyProps } = this.props

        return (
            <View 
                className={`${styles.root} ${inset ? styles.inset : ''} ${primary && secondary ? styles.multiline : ''} ${className}`}
                style={style}
            >
                {
                    primary ?
                        (
                            disableTypography ?
                                primary
                            :
                                <Typography 
                                    display='block'
                                    variant="body1"
                                    className={styles.primary}
                                    {...primaryTypographyProps}
                                >
                                    {primary}
                                </Typography>
                        )
                    :
                        null
                }
                {
                    secondary ?
                        (
                            disableTypography ?
                                secondary
                            :
                                <Typography 
                                    display='block'
                                    variant="body2"
                                    className={styles.secondary}
                                    color="textSecondary"
                                    {...secondaryTypographyProps}
                                >
                                    {secondary}
                                </Typography>
                        )
                    :
                        null
                }
            </View>
        )
    }
}

export default ListItemText;