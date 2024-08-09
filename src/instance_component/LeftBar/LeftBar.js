import React, { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Paper from '../../common_component/material_ui/Paper'
import List from '../../common_component/material_ui/List'
import ListItem from '../../common_component/material_ui/ListItem'
import FontAwesomeIcon from '../../common_component/icon/FontAwesomeIcon'
import styles from './LeftBar.module.scss'
import Tools from '../../common_js/Tools'

const ButtonConfig = [
    {
        // Button
        icon: 'hand-pointer-o',
        url: '/pages/Button/ButtonPage',
    },
    {
        // Paper
        icon: 'sticky-note-o',
    },
    {
        // Transitions
        icon: 'exchange',
    },
]

class LeftBar extends PureComponent {
    static defaultProps = {
        className: '',
    }

    constructor() {
        super(...arguments)

        this.go_page_func = {}
    }

    goPage(index) {
        if (!this.go_page_func[index]) {
            this.go_page_func[index] = ()=>{
                let item = ButtonConfig[index]
                if (item && item.url) {
                    Taro.redirectTo({
                        url: Tools.getMiniUrl(item.url)
                    })
                }
            }
        }

        return this.go_page_func[index]
    }

    render() {
        const { className } = this.props

        return (
            <Paper className={`${styles.container} ${className}`} square >
                <List>
                    <ListItem button className={styles.list_item} >
                        <FontAwesomeIcon name='bars' />
                    </ListItem>
                    {
                        ButtonConfig.map((item, index)=>{
                            return (
                                <ListItem key={index} button className={styles.list_item} onClick={this.goPage(index)} >
                                    <FontAwesomeIcon name={item.icon} />
                                </ListItem> 
                            )
                        })
                    }
                </List>
            </Paper>
        )
    }
}

export default LeftBar;