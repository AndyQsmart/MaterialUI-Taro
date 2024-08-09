import React, { PureComponent } from 'react'
import styles from './ColorPicker.module.css'
import { View, Slider } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TextField from './TextField'
import Button from './Button'
import Dialog from './Dialog'
import Slide from './Slide'

const TransitionUp = function(props) {
    return <Slide direction="up" {...props} />;
}

const defaultColor = {
    r: 0, g: 0, b: 0, a: 0,
}

export default class ColorPicker extends PureComponent {
    constructor() {
        super(...arguments)

        let default_hsv = this.rgb2hsv(defaultColor)

        this.state = {
            hue_color: this.rgbToStr(this.hsv2rgb(default_hsv.h, 100, 100)),
            hsv: default_hsv,
            color_res: this.rgbToStr(defaultColor),
            // 输入颜色相关
            color_input: this.rgbToStr(defaultColor),
            // 选取相关
            color_rect: null,
            pos_x: 0,
            pox_y: 0,
            fix_percent: true,
            fix_percent_x: default_hsv.s/100,
            fix_percent_y: 1-(default_hsv.v/100),
        }

        this.pick_ref = React.createRef()

        this.onSliderEnd = this.onSliderEnd.bind(this)
        this.changeHue = this.changeHue.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.handleInputColor = this.handleInputColor.bind(this)
        this.confirmColor = this.confirmColor.bind(this)
    }

    confirmColor() {
        console.log('click')
        const { onChange, onClose } = this.props
        const { color_res } = this.state
        if (onChange) {
            onChange(color_res)
        }
        if (onClose) {
            onClose()
        }
    }

    strToRgb(color_str) {
        if (!color_str) {
            return null
        }
        if (color_str[0] == '#' && color_str.length == 7) {
            let r_str = color_str.substring(1, 3)
            let g_str = color_str.substring(3, 5)
            let b_str = color_str.substring(5, 7)
            return {
                r: parseInt(r_str, 16),
                g: parseInt(g_str, 16),
                b: parseInt(b_str, 16),
            }
        }
        if (/rgb\(.*\)/g.test(color_str)) {
            let ans = /rgb\((.*)\)/g.exec(color_str)
            if (ans[1]) {
                let rgb_list = ans[1].split(',')
                return ({
                    r: parseInt(rgb_list[0].replace(' ', '')),
                    g: parseInt(rgb_list[1].replace(' ', '')),
                    b: parseInt(rgb_list[2].replace(' ', '')),
                })
            }
        }
        if (/rgba\(.*\)/g.test(color_str)) {
            let ans = /rgba\((.*)\)/g.exec(color_str)
            if (ans[1]) {
                let rgb_list = ans[1].split(',')
                return ({
                    r: parseInt(rgb_list[0].replace(' ', '')),
                    g: parseInt(rgb_list[1].replace(' ', '')),
                    b: parseInt(rgb_list[2].replace(' ', '')),
                })
            }
        }
        return null
    }

    handleInputColor(e) {
        const { value } = e.detail
        const { color_input } = this.state
        let new_value = value
        if (!new_value || new_value[0] != '#') {
            new_value = '#'+new_value
        }
        this.setState({
            color_input: new_value,
        })
        if (new_value.length == 7 && new_value != color_input) {
            let rgb = this.strToRgb(new_value)
            if (!rgb) {
                return
            }
            let hsv = this.rgb2hsv(rgb)
            this.setState({
                hue_color: this.rgbToStr(this.hsv2rgb(hsv.h, 100, 100)),
                hsv,
                color_res: this.rgbToStr(rgb),
                fix_percent: true,
                fix_percent_x: hsv.s/100,
                fix_percent_y: 1-(hsv.v/100),
            }) 
        }
    }

    to16Str(num) {
        let str = num.toString(16)
        if (str.length == 1) {
            str = '0'+str 
        }
        if (str.length == 0) {
            str = '00'
        }
        return str
    }

    rgbToStr(color) {
        return `#${this.to16Str(color.r)}${this.to16Str(color.g)}${this.to16Str(color.b)}`
    }

    initColor() {
        const { value } = this.props
        let rgb = this.strToRgb(value)
        if (!rgb) {
            return
        }
        let hsv = this.rgb2hsv(rgb)
        let rgb_str = this.rgbToStr(rgb)
        this.setState({
            hue_color: this.rgbToStr(this.hsv2rgb(hsv.h, 100, 100)),
            hsv: hsv,
            color_res: rgb_str,
            color_input: rgb_str,
            fix_percent: true,
            fix_percent_x: hsv.s/100,
            fix_percent_y: 1-(hsv.v/100),
        })    
    }

    getCursorPercentPosition() {
        const { color_rect, pos_x, pos_y } = this.state
        
        if (!color_rect) {
            return {
                percent_x: 1,
                percent_y: 0,
            }
        }

        let in_x = Math.min(Math.max(pos_x-color_rect.left, 0), color_rect.width)
        let in_y = Math.min(Math.max(pos_y-color_rect.top, 0), color_rect.height)
        let percent_x = in_x/color_rect.width
        let percent_y = in_y/color_rect.height
        return {
            percent_x, percent_y,
        }
    }

    initRectSize(callback) {
        const { picker_id, color_rect } = this.state
        if (!color_rect) {
            Taro.createSelectorQuery().select(`#${this.pick_ref.current.uid}`).boundingClientRect((rect_info)=>{
                // console.log(rect_info)
                this.setState({
                    color_rect: rect_info,
                }, callback)
            }).exec()
        }
        else {
            if (callback) {
                callback()
            }
        }
    }

    onTouchStart(e) {
        this.initRectSize()
        if (!e.touches || !e.touches[0]) {
            return
        }
        const { clientX, clientY } = e.touches[0]
        this.setState({
            pos_x: clientX,
            pos_y: clientY,
            fix_percent: false,
            fix_percent_x: 0,
            fix_percent_y: 0,
        })

        e.stopPropagation()
    }

    onTouchEnd(e) {
        const { percent_x, percent_y } = this.getCursorPercentPosition()
        const { hsv } = this.state
        let hsv_s = percent_x*100
        let hsv_v = (1-percent_y)*100
        let ans_color_str = this.rgbToStr(this.hsv2rgb(hsv.h, hsv_s, hsv_v))
        this.setState({
            color_res: ans_color_str,
            hsv: {
                ...hsv,
                s: hsv_s,
                v: hsv_v,
            },
            color_input: ans_color_str,
        })
    }

    onTouchMove(e) {
        if (!e.touches || !e.touches[0]) {
            return
        }
        const { clientX, clientY } = e.touches[0]
        this.setState({
            pos_x: clientX,
            pos_y: clientY,
        })
        e.stopPropagation()
    }

    changeHue(e) {
        const { hsv } = this.state
        let hue = e.detail.value;
        let ans_color_str = this.rgbToStr(this.hsv2rgb(hue, hsv.s, hsv.v))
        this.setState({
            hue_color: this.rgbToStr(this.hsv2rgb(hue, 100, 100)),
            hsv: {
                ...hsv,
                h: hue,
            },
            color_res: ans_color_str,
            color_input: ans_color_str,
        })
    }

    onSliderEnd() {

    }

    hsv2rgb(h, s, v) {
        let hsv_h = (h / 360).toFixed(2);
        let hsv_s = (s / 100).toFixed(2);
        let hsv_v = (v / 100).toFixed(2);

        var i = Math.floor(hsv_h * 6);
        var f = hsv_h * 6 - i;
        var p = hsv_v * (1 - hsv_s);
        var q = hsv_v * (1 - f * hsv_s);
        var t = hsv_v * (1 - (1 - f) * hsv_s);

        var rgb_r = 0,
            rgb_g = 0,
            rgb_b = 0;
        switch (i % 6) {
            case 0:
                rgb_r = hsv_v;
                rgb_g = t;
                rgb_b = p;
                break;
            case 1:
                rgb_r = q;
                rgb_g = hsv_v;
                rgb_b = p;
                break;
            case 2:
                rgb_r = p;
                rgb_g = hsv_v;
                rgb_b = t;
                break;
            case 3:
                rgb_r = p;
                rgb_g = q;
                rgb_b = hsv_v;
                break;
            case 4:
                rgb_r = t;
                rgb_g = p;
                rgb_b = hsv_v;
                break;
            case 5:
                rgb_r = hsv_v, rgb_g = p, rgb_b = q;
                break;
        }

        // return 'rgb(' + (Math.floor(rgb_r * 255) + "," + Math.floor(rgb_g * 255) + "," + Math.floor(rgb_b * 255)) + ')';
        return {
            r: Math.floor(rgb_r * 255),
            g: Math.floor(rgb_g * 255),
            b: Math.floor(rgb_b * 255),
        }
    }

    rgb2hsv(color) {
        // let rgb = color.split(',');
        // let R = parseInt(rgb[0].split('(')[1]);
        // let G = parseInt(rgb[1]);
        // let B = parseInt(rgb[2].split(')')[0]);
        let R = color.r
        let G = color.g
        let B = color.b

        let hsv_red = R / 255, hsv_green = G / 255, hsv_blue = B / 255;
        let hsv_max = Math.max(hsv_red, hsv_green, hsv_blue),
            hsv_min = Math.min(hsv_red, hsv_green, hsv_blue);
        let hsv_h, hsv_s, hsv_v = hsv_max;

        let hsv_d = hsv_max - hsv_min;
        hsv_s = hsv_max == 0 ? 0 : hsv_d / hsv_max;

        if (hsv_max == hsv_min) hsv_h = 0;
        else {
            switch (hsv_max) {
                case hsv_red:
                    hsv_h = (hsv_green - hsv_blue) / hsv_d + (hsv_green < hsv_blue ? 6 : 0);
                    break;
                case hsv_green:
                    hsv_h = (hsv_blue - hsv_red) / hsv_d + 2;
                    break;
                case hsv_blue:
                    hsv_h = (hsv_red - hsv_green) / hsv_d + 4;
                    break;
            }
            hsv_h /= 6;
        }
        return {
            h: (hsv_h * 360).toFixed(),
            s: (hsv_s * 100).toFixed(),
            v: (hsv_v * 100).toFixed()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value != prevProps.value) {
            this.initColor()
        }
    }

    componentDidMount() {
        this.initColor()
    }

    render() {
        const { open, onClose } = this.props
        const { color_res, hue_color, hsv, fix_percent, fix_percent_x, fix_percent_y, color_input } = this.state
        const { percent_x, percent_y } = this.getCursorPercentPosition()

        return (
            <Dialog open={open} onClose={onClose} TransitionComponent={TransitionUp} >
                <View className={styles.container} >
                    <View ref={this.pick_ref} className={styles.color_select_container}
                        style={{
                            backgroundColor: hue_color,
                        }}
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                        onTouchEnd={this.onTouchEnd}
                    >
                        <View className={styles.saturation_white} >
                            <View className={styles.saturation_black} ></View>
                        </View>
                        <View className={styles.cursor}
                            style={{
                                marginLeft: `${fix_percent ? fix_percent_x*100 : percent_x*100}%`,
                                marginTop: `${fix_percent ? fix_percent_y*100 : percent_y*100}%`,
                            }}
                        >
                        </View>
                    </View>
                    <Slider
                        className={styles.color_silder}
                        value={hsv.h}
                        max={360}
                        activeColor='transparent'
                        backgroundColor='transparent'
                        blockSize={24}
                        blockColor={hue_color}
                        onTouchEnd={this.onSliderEnd}
                        onChange={this.changeHue}
                    />
                    <View className={styles.color_input_area} >
                        <View className={styles.color_quick_view}
                            style={{
                                backgroundColor: color_res,
                            }}
                        >
                        </View>
                        <TextField
                            className={styles.color_quick_input}
                            value={color_input}
                            onChange={this.handleInputColor}
                        />
                    </View>
                </View>
                <View className={styles.func_area} >
                    <Button variant='outlined'  onClick={this.confirmColor} >
                        确定
                    </Button>
                    <Button variant='outlined' onClick={onClose} >
                        取消
                    </Button>
                </View>
            </Dialog>
        )
    }
}