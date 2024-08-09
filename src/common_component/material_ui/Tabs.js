import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro'
import styles from './Tabs.module.less'
import { View, ScrollView } from '@tarojs/components';
import TabScrollButton from './TabScrollButton';

// 网页版原版
class Tabs extends PureComponent {
    static defaultProps = {
        className: '',
        centered: false,
        indicatorColor: 'secondary', // primary, secondary
        orientation: 'horizontal', // 'horizontal', 'vertical'
        // ScrollButtonComponent
        scrollButtons: 'auto', // 'auto' 'off' 'on'
        textColor: 'inherit', // 'inherit', 'primary', 'secondary'
        value: null,
        variant: 'standard', // 'fullWidth', 'scrollable', 'standard'
        // onChange
    }

    constructor() {
        super(...arguments)

        this.state = {
            // 指示器相关
            mounted: false,
            indicatorStyle: {},
            // 滚入动画相关
            scrollIntoView: {},
            // 滚动按钮相关
            scrollInfo: {},
            scrollRect: {},
        }

        this.scrollerRef = React.createRef()
        this.flexContainerRef = React.createRef()
        this.valueToIndex = {}

        this.onScroll = this.onScroll.bind(this)
        this.handleStartScrollClick = this.handleStartScrollClick.bind(this)
        this.handleEndScrollClick = this.handleEndScrollClick.bind(this)
    }

    moveTabsScroll(offset) {
        const { orientation } = this.props
        const { scrollInfo } = this.state
        const vertical = orientation === 'vertical'
        const scrollStart = vertical ? 'scrollTop' : 'scrollLeft'
        
        const currentScrollStart = scrollInfo[scrollStart] ? scrollInfo[scrollStart] : 0

        this.setState({
            scrollIntoView: {
                [scrollStart]: currentScrollStart+offset,
            }
        })
    }

    getScrollSize() {
        const { orientation } = this.props
        const { scrollRect } = this.state
        const vertical = orientation === 'vertical'
        const size = vertical ? 'height' : 'width'
        return scrollRect[size] ? scrollRect[size] : 0
    }

    handleStartScrollClick() {
        this.moveTabsScroll(-1 * this.getScrollSize())
    }

    handleEndScrollClick() {
        this.moveTabsScroll(this.getScrollSize())
    }

    onScroll(e) {
        const { scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.detail
        this.setState({
            scrollInfo: {
                scrollWidth, scrollHeight,
                scrollLeft, scrollTop,
            }
        })
    }

    getScrollerRect(callback) {
        let scrollerNode = this.scrollerRef.current

        if (!scrollerNode) {
            callback(null)
            return
        }
        Taro.createSelectorQuery().select(`#${scrollerNode.uid}`).boundingClientRect(res => {
            callback(res)
        }).exec()
    }

    getFlexContainerRect(callback) {
        let flexContainerNode = this.flexContainerRef.current

        if (!flexContainerNode) {
            callback(null)
            return
        }

        Taro.createSelectorQuery().select(`#${flexContainerNode.uid}`).boundingClientRect(res => {
            callback(res)
        }).exec()
    }

    getActiveTabRect(callback) {
        let flexContainerNode = this.flexContainerRef.current

        if (!flexContainerNode) {
            callback(null)
            return
        }

        const children = flexContainerNode.children
        if (children.length > 0) {
            const { value } = this.props
            const tab = children[this.valueToIndex[value]]

            if (!tab) {
                callback(null)
                return
            }

            // console.log(tab)
            Taro.createSelectorQuery().select(`#${tab.uid}`).boundingClientRect(res => {
                callback(res)
            }).exec()
        }
        else {
            callback(null)
        }
    }

    getTabsRect(callback) {
        this.getScrollerRect((scrollerRect)=>{
            this.getFlexContainerRect((flexContainerRect)=>{
                this.getActiveTabRect((tabItemRect)=>{
                    callback({
                        scrollerRect,
                        flexContainerRect,
                        tabItemRect,
                    })
                })
            })
        })
    }

    updateIndicatorState({ flexContainerRect, tabItemRect }) {
        let startValue = 0;
        const { orientation } = this.props
        const vertical = orientation === 'vertical';
        const start = vertical ? 'top' : 'left';
        const size = vertical ? 'height' : 'width';

        if (tabItemRect && flexContainerRect) {
            if (vertical) {
                startValue = tabItemRect.top - flexContainerRect.top;
            }
            else {
                startValue = tabItemRect.left - flexContainerRect.left
            }
        }
    
        const newIndicatorStyle = {
            [start]: startValue,
            // May be wrong until the font is loaded.
            [size]: tabItemRect ? tabItemRect[size] : 0,
        };
    
        // IE11 support, replace with Number.isNaN
        // eslint-disable-next-line no-restricted-globals
        const { indicatorStyle } = this.state
        if (!indicatorStyle[start] || !indicatorStyle[size]) {
            this.setState({
                mounted: true,
                indicatorStyle: newIndicatorStyle,
            })
        }
        else {
            const dStart = Math.abs(indicatorStyle[start] - newIndicatorStyle[start]);
            const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
    
            if (dStart >= 1 || dSize >= 1) {
                this.setState({
                    mounted: true,
                    indicatorStyle: newIndicatorStyle,
                })
            }
        }
    }

    scrollIntoView({ scrollerRect, flexContainerRect, tabItemRect }) {
        const { variant, orientation } = this.props

        if (variant != 'scrollable') {
            return
        }

        const vertical = orientation === 'vertical'
        const scrollStart = vertical ? 'scrollTop' : 'scrollLeft'
        const start = vertical ? 'top' : 'left'
        const end = vertical ? 'bottom' : 'right'
        // const clientSize = vertical ? 'clientHeight' : 'clientWidth'
        const size = vertical ? 'height' : 'width'

        if (scrollerRect[start] > tabItemRect[start]) {
            this.setState({
                scrollIntoView: {
                    [scrollStart]: tabItemRect[start]-flexContainerRect[start],
                    // [scrollStart]: tabItemRect[start]-flexContainerRect[start],
                }
            })
            return
        }
        if (scrollerRect[end] < tabItemRect[end]) {
            // console.log({
            //     scrollIntoView: {
            //         [scrollStart]: tabItemRect[end]-flexContainerRect[end],
            //     }
            // })
            this.setState({
                scrollIntoView: {
                    [scrollStart]: tabItemRect[start]-flexContainerRect[start]-scrollerRect[size]+tabItemRect[size],
                    // [scrollStart]: tabItemRect[end]-flexContainerRect[end],
                }
            })
            return
        }
    }

    updateScrollButtonState({ scrollerRect, flexContainerRect, tabItemRect }) {
        const { variant } = this.props

        if (variant != 'scrollable') {
            return
        }

        const { scrollInfo } = this.state
        let newScrollInfo = {...scrollInfo}
        if (!newScrollInfo.scrollWidth && !newScrollInfo.scrollHeight) {
            newScrollInfo.scrollWidth = flexContainerRect.width+11 // fixbug一开始获取的宽度有问题
            newScrollInfo.scrollHeight = flexContainerRect.height+11 // fixbug
            newScrollInfo.scrollLeft = tabItemRect.left-flexContainerRect.left
            newScrollInfo.scrollTop = tabItemRect.top-flexContainerRect.top
        }

        this.setState({
            scrollInfo: newScrollInfo,
            scrollRect: {
                width: scrollerRect.width,
                height: scrollerRect.height,
            },
        })
    }

    updateAnimation() {
        Taro.nextTick(()=>{
            this.getTabsRect((rectInfo)=>{
                this.updateIndicatorState(rectInfo)
                this.scrollIntoView(rectInfo)
                this.updateScrollButtonState(rectInfo)
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value) {
            this.updateAnimation()
        }
    }

    componentWillMount() {
        const onReadyEventId = Taro.getCurrentInstance().router.onReady
        Taro.eventCenter.once(onReadyEventId, () => {
            // onReady 触发后才能获取小程序渲染层的节点
            // 后续看需不需要每次重新获取高度
            this.updateAnimation()
        })
    }

    componentDidMount() {
        // this.updateIndicatorState() // 用上述替代
    }

    render() {
        const {
            className, style, children,
            variant, orientation, centered, indicatorColor, textColor, scrollButtons,
            value, onChange
        } = this.props
        const { mounted, indicatorStyle, scrollIntoView, scrollInfo, scrollRect } = this.state

        const scrollable = variant === 'scrollable'
        const vertical = orientation === 'vertical'

        // style_props
        const styleProps = {
            fixed: !scrollable,
            // hideScrollbar: scrollable && !visibleScrollbar,
            scrollableX: scrollable && !vertical,
            scrollableY: scrollable && vertical,
            centered: centered && !scrollable,
        }

        let root_class_list = []
        if (vertical) root_class_list.push(styles.vertical)

        let scroller_class_list = []
        if (styleProps.fixed) scroller_class_list.push(styles.fixed)
        if (vertical) scroller_class_list.push(styles.scroller_fix_height)
        else scroller_class_list.push(styles.scroller_fix_width)
        // if (styleProps.hideScrollbar) scroller_class_list.push(styles.hideScrollbar)
        // if (styleProps.scrollableX) scroller_class_list.push(styles.scrollableX)
        // if (styleProps.scrollableY) scroller_class_list.push(styles.scrollableY)

        let flexContainer_class_list = []
        if (vertical) flexContainer_class_list.push(styles.flexContainerVertical)
        if (styleProps.centered) flexContainer_class_list.push(styles.centered)

        let indicator_class_list = []
        indicator_class_list.push(styles['indicator_'+indicatorColor])
        if (vertical) indicator_class_list.push(styles.indicator_vertical)

        let childIndex = 0;
        React.Children.map(children, (child)=>{
            let childValue = child.props.value
            if (childValue != 0 && !childValue) {
                childValue = childIndex
            }
            child.props.value = childValue
            child.props.fullWidth = (variant === 'fullWidth')
            child.props.selected = (value == childValue)
            child.props.onChange = onChange
            child.props.textColor = textColor
            this.valueToIndex[childValue] = childIndex
            childIndex += 1
        })

        const scrollStart = vertical ? 'scrollTop' : 'scrollLeft'
        const scrollSize = vertical ? 'scrollHeight' : 'scrollWidth'
        const size = vertical ? 'height' : 'width'
        let displayScroll = {
            start: false,
            end: false,
        }
        if (scrollInfo[scrollStart] && scrollInfo[scrollStart] > 10) {
            displayScroll.start = true
        }
        if ((scrollInfo[scrollStart] == 0 || scrollInfo[scrollStart]) && scrollRect[size] && scrollInfo[scrollSize] && scrollInfo[scrollStart]+scrollRect[size] < scrollInfo[scrollSize]-10) {
            displayScroll.end = true
        }

        const scrollButtonsActive = displayScroll.start || displayScroll.end
        const showScrollButtons = scrollable && ((scrollButtons === 'auto' && scrollButtonsActive) || scrollButtons === 'on');

        // indicator层级放进去了一层
        return (
            <View
                className={`${styles.root} ${root_class_list.join(' ')} ${className}`}
                style={style}
            >
                {
                    showScrollButtons ?
                        <TabScrollButton orientation={orientation}
                            disabled={!displayScroll.start}
                            onClick={this.handleStartScrollClick}
                        />
                    :
                        null
                }
                <ScrollView ref={this.scrollerRef}
                    className={`${styles.scroller} ${scroller_class_list.join(' ')}`}
                    scrollX={styleProps.scrollableX} scrollY={styleProps.scrollableY}
                    enableFlex
                    onScroll={this.onScroll}
                    scrollWithAnimation
                    upperThreshold={10}
                    lowerThreshold={10}
                    {...scrollIntoView}
                >
                    <View ref={this.flexContainerRef} className={`${styles.flexContainer} ${flexContainer_class_list.join(' ')}`} >
                        {children}
                        {
                            mounted ?
                                <View className={`${styles.indicator} ${indicator_class_list.join(' ')}`}
                                    style={indicatorStyle}
                                >
                                </View>
                            :
                                null
                        }
                    </View>
                </ScrollView>
                {
                    showScrollButtons ?
                        <TabScrollButton direction='right' orientation={orientation}
                            disabled={!displayScroll.end}
                            onClick={this.handleEndScrollClick}
                        />
                    :
                        null
                }
            </View>
        )
    }
}

export default Tabs;