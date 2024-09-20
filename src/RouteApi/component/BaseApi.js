import React, { Component }  from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import Typography from '../../common_component/material_ui/Typography'
import Button from '../../common_component/material_ui/Button'
import LeftBar from '../../instance_component/LeftBar/LeftBar'
import List from '../../common_component/material_ui/List'
import ListItem from '../../common_component/material_ui/ListItem'
import styles from './BaseApi.module.scss'
import Divider from '../../common_component/material_ui/Divider'

class BaseApi extends Component {
    constructor() {
        super(...arguments)

        this.name = ""
        this.props_list = []
        this.demos_list = []

        this.go_url_func = {}
    }

    goUrl(url) {
        if (!this.go_url_func[url]) {
            this.go_url_func[url] = ()=>{
                Taro.redirectTo({
                    url: url,
                })
            }
        }

        return this.go_url_func[url]
    }

    render() {
        return (
            <View className={styles.container} >
                <LeftBar />
                <ScrollView scrollY className={styles.main_area_container} >
                    <View className={styles.main_area} >
                        <Typography variant='h5' gutterBottom >
                            {`${this.name} API`}
                        </Typography>
                        <Typography variant='h6' >
                            {`The API documentation of the ${this.name} React component. Learn more about the props.`}
                        </Typography>



                        <View className={styles.spacing_big} ></View>
                        <Typography variant='h6' gutterBottom >
                            Import
                        </Typography>
                        <ScrollView scrollX className={styles.code_container} >
                            <View className={styles.code_area} >
                                <Typography className={styles.code_text} >
                                    {`import ${this.name} from '../material_ui/${this.name}';`}
                                </Typography>
                            </View>
                        </ScrollView>
                        {
                            this.description ?
                                <Typography>
                                    {this.description}
                                </Typography>
                            :
                                null
                        }



                        <View className={styles.spacing_big} ></View>
                        <Typography variant='h6' gutterBottom >
                            Props
                        </Typography>
                        <View className={styles.props_area} >
                            <View className={styles.props_item} >
                                <View className={styles.props_row} >
                                    <View className={styles.props_head} >
                                        Name
                                    </View>
                                    <View className={styles.props_head_last} >
                                        Type
                                    </View>
                                </View>
                                <View className={styles.props_head_bottom} >
                                    Default
                                </View>
                                <View className={styles.props_head_bottom} >
                                    Description
                                </View>
                            </View>
                            {
                                this.props_list.map((item, index)=>{
                                    return (
                                        <React.Fragment key={index} >
                                            <Divider light />
                                            <View className={styles.props_item} >
                                                <View className={styles.props_row} >
                                                    <View className={styles.props_prop} >
                                                        {item.name}
                                                    </View>
                                                    <View className={styles.props_prop_last} >
                                                        <Typography color='secondary' variant='body2' >
                                                            {item.type}
                                                        </Typography>
                                                    </View>
                                                </View>
                                                <View className={styles.props_prop_bottom} >
                                                    {item.default_value}
                                                </View>
                                                <View className={styles.props_prop_bottom} >
                                                    <Typography color='textSecondary' variant='body2' >
                                                        {item.description}
                                                    </Typography>
                                                </View>
                                            </View>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </View>
                        {
                            this.props_description ?
                                <Typography >
                                    {this.props_description}
                                </Typography>
                            :
                                null
                        }


                        {
                            this.inheritance_description ?
                                <React.Fragment>
                                    <View className={styles.spacing_big} ></View>
                                    <Typography variant='h6' gutterBottom >
                                        Inheritance
                                    </Typography>
                                    <Typography >
                                        {this.inheritance_description}
                                    </Typography>
                                </React.Fragment>
                            :
                                null
                        }



                        <View className={styles.spacing_big} ></View>
                        <Typography variant='h6' >
                            Demos
                        </Typography>
                        <List>
                            {
                                this.demos_list.map((item, index)=>{
                                    return (
                                        <ListItem key={index} >
                                            · <Button className={styles.demo_button} color='secondary' onClick={this.goUrl(item.url)} >{item.name}</Button>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default BaseApi
