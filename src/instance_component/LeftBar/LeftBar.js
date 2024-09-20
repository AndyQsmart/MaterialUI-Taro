import React, { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Drawer from '../../common_component/material_ui/Drawer'
import Paper from '../../common_component/material_ui/Paper'
import List from '../../common_component/material_ui/List'
import ListItem from '../../common_component/material_ui/ListItem'
import FontAwesomeIcon from '../../common_component/icon/FontAwesomeIcon'
import styles from './LeftBar.module.scss'
import Tools from '../../common_js/Tools'
import Collapse from '../../common_component/material_ui/Collapse'
import Typography from '../../common_component/material_ui/Typography'

const ButtonConfig = [
    {
        name: "Components 组件",
        subList: [
            {
                name: "Inputs 输入框",
                subList: [
                    {
                        name: "Button 按钮",
                        icon: 'hand-pointer-o',
                        url: '/pages/Button/ButtonPage',
                    }
                ]
            },
            {
                name: "Surfaces 表面展示",
                subList: [
                    {
                        name: "Paper 纸张",
                        icon: 'sticky-note-o',
                    }
                ]
            },
            {
                name: "Utils 工具包",
                subList: [
                    {
                        name: "Transitions 过度动画",
                        icon: 'exchange',
                        // url: "/transitionspage"
                    }
                ]
            },
        ],
    },
    {
        name: "Component API",
        subList: [
            {
                name: "Button",
                url: "/RouteApi/pages/ButtonApi/ButtonApi"
            },
            {
                name: "Button Base",
                // url: "/api/buttonbase"
            },
            {
                name: "Icon",
                // url: "/api/icon"
            },
            {
                name: "Paper",
                // url: "/api/paper"
            },
        ],
        hidden: true
    }
]

class LeftBar extends PureComponent {
    static defaultProps = {
        className: '',
    }

    constructor() {
        super(...arguments)

        this.state = {
            show_drawer: false,
            hidden_map: {},
        }

        this.go_page_func = {}
        this.check_collapse_func = {}

        this.showDrawer = this.showDrawer.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
    }

    showDrawer() {
        this.setState({
            show_drawer: true,
        })
    }

    closeDrawer() {
        this.setState({
            show_drawer: false,
        })
    }

    checkCollapse(path, init_hidden=false) {
        if (!this.check_collapse_func[path]) {
            this.check_collapse_func[path] = ()=>{
                const { hidden_map } = this.state
                let new_hidden_map = {...hidden_map}
                if (init_hidden && !hidden_map[path] && hidden_map[path] != false) {
                    new_hidden_map[path] = false
                }
                else {
                    new_hidden_map[path] = hidden_map[path] ? false : true
                }
                this.setState({
                    hidden_map: new_hidden_map,
                })
            }
        }
        return this.check_collapse_func[path]
    }

    goPage(url) {
        if (!this.go_page_func[url]) {
            this.go_page_func[url] = ()=>{
                if (url) {
                    Taro.redirectTo({
                        url: Tools.getMiniUrl(url)
                    })
                }
            }
        }

        return this.go_page_func[url]
    }

    renderMiniButtons(button_list, deep=0) {
        let ans = []
        for (let i = 0; i < button_list.length; i++) {
            let item = button_list[i]
            if (item.subList) {
                let subList = item.subList
                let sub_ans = this.renderMiniButtons(subList, deep+1)
                ans = [...ans, ...sub_ans]
            }
            else {
                if (item.icon) {
                    ans.push(
                        <ListItem key={`${deep}_${i}`} button className={styles.list_item} onClick={this.goPage(item.url)} >
                            <FontAwesomeIcon name={item.icon} />
                        </ListItem> 
                    )
                }
            }
        }
        return ans
    }

    renderFullButtons(button_list, deep=0, path='') {
        const { hidden_map } = this.state

        let ans = []
        for (let i = 0; i < button_list.length; i++) {
            let item = button_list[i]
            let theClassName = styles[`padding_${deep*40}`]
            let now_path = path+'_'+i
            if (item.subList) {
                theClassName += ' '+styles.bold
            }
            ans.push(
                <ListItem key={i} button onClick={item.subList ? this.checkCollapse(now_path, item.hidden) : this.goPage(item.url)} >
                    <Typography variant='body2' className={theClassName} >
                        {item.name}
                    </Typography>
                </ListItem>
            )
            if (item.subList) {
                let hidden = hidden_map[now_path]
                if (!hidden && hidden != false && item.hidden) {
                    hidden = true
                }
                ans.push(
                    <Collapse key={`collapse${i}`} in={!hidden} >
                        {this.renderFullButtons(item.subList, deep+1, now_path)}
                    </Collapse>
                )
            }
        }
        return ans
    }

    renderDrawer() {
        const { show_drawer } = this.state

        return (
            <Drawer
                anchor='left'
                open={show_drawer}
                onClose={this.closeDrawer}
            >
                <List>
                    <ListItem button >
                        <Typography variant='body2' >
                            首页
                        </Typography>
                    </ListItem>
                    {this.renderFullButtons(ButtonConfig)}
                </List>
            </Drawer>
        ) 
    }

    render() {
        const { className } = this.props

        return (
            <React.Fragment>
                <Paper className={`${styles.container} ${className}`} square >
                    <List>
                        <ListItem button className={styles.list_item} onClick={this.showDrawer} >
                            <FontAwesomeIcon name='bars' />
                        </ListItem>
                        {this.renderMiniButtons(ButtonConfig)}
                    </List>
                </Paper>
                {this.renderDrawer()}
            </React.Fragment>
        )
    }
}

export default LeftBar;