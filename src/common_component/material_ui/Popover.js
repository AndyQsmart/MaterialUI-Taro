import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro'
import Modal from './Modal';
import Paper from './Paper';
import Grow from './Grow';
import styles from './Popover.module.less'

class RefPaper extends Paper {
    render() {
        const { theRef } = this.props
        let ans = super.render()
        return React.cloneElement(ans, {
            ref: theRef,
        })
    }
}

// 网页版原版
class Popover extends PureComponent {
    static defaultProps = {
        className: '',
        anchorEl: null,
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        // { horizontal: 'center' | 'left' | 'right' | number,
        // vertical: 'bottom' | 'center' | 'top' | number }
        anchorPosition: null, // { left: number, top: number }
        anchorReference: 'anchorEl', // 'anchorEl' | 'anchorPosition' | 'none'
        // container: null,
        elevation: 8,
        // getContentAnchorEl: null,
        marginThreshold: 16,
        onClose: null,
        open: null,
        PaperProps: {},
        transformOrigin: { vertical: 'top', horizontal: 'left' },
        // { horizontal: 'center' | 'left' | 'right' | number,
        // vertical: 'bottom' | 'center' | 'top' | number }
        TransitionComponent: Grow,
        transitionDuration: 225, // 'auto' | number | { appear?: number, enter?: number, exit?: number }
        TransitionProps: {},
    }

    constructor() {
        super(...arguments)

        this.state = {
            open_state: false,
            paper_style: {},
        }

        this.paper_ref = React.createRef()
    }

    getOffsetTop(rect, vertical) {
        let offset = 0

        if (typeof vertical === 'number') {
            offset = vertical
        }
        else if (vertical === 'center') {
            offset = rect.height / 2
        }
        else if (vertical === 'bottom') {
            offset = rect.height
        }

        return offset
    }

    getOffsetLeft(rect, horizontal) {
        let offset = 0

        if (typeof horizontal === 'number') {
            offset = horizontal
        }
        else if (horizontal === 'center') {
            offset = rect.width / 2
        }
        else if (horizontal === 'right') {
            offset = rect.width
        }

        return offset
    }

    // Return the base transform origin using the element
    // 获取Popover中Paper相对于自身的transformOrigin
    getTransformOrigin(elemRect) {
        const { transformOrigin } = this.props
        return {
            vertical: this.getOffsetTop(elemRect, transformOrigin.vertical),
            horizontal: this.getOffsetLeft(elemRect, transformOrigin.horizontal),
        }
    }

    // 把transformOrigin对象转换成css样式
    getTransformOriginValue(transformOrigin) {
        return [transformOrigin.horizontal, transformOrigin.vertical].map(
            (n) => (typeof n === 'number' ? `${n}px` : n)
        ).join(' ')
    }

    // Returns the top/left offset of the position
    // to attach to on the anchor element (or body if none is provided)
    getAnchorOffset(anchorRect) {
        const { anchorOrigin, anchorReference, anchorPosition } = this.props

        if (anchorReference === 'anchorPosition') {
            // warning(
            //     anchorPosition,
            //     'Material-UI: you need to provide a `anchorPosition` property when using ' +
            //     '<Popover anchorReference="anchorPosition" />.',
            // )
            return anchorPosition
        }

        return {
            top: anchorRect.top + this.getOffsetTop(anchorRect, anchorOrigin.vertical),
            left: anchorRect.left + this.getOffsetLeft(anchorRect, anchorOrigin.horizontal),
        }
    }

    // // Sum the scrollTop between two elements.
    // getScrollParent(parent, child) {
    //     let element = child;
    //     let scrollTop = 0;
    
    //     while (element && element !== parent) {
    //         element = element.parentElement;
    //         scrollTop += element.scrollTop;
    //     }
    //     return scrollTop;
    // }

    getPositioningStyle(anchor, element, system_info) {
        // console.log(element)
        // console.log(system_info)
        const { anchorReference, marginThreshold } = this.props

        // Check if the parent has requested anchoring on an inner content node
        const elemRect = {
            width: element.width,
            height: element.height,
        }

        // Get the transform origin point on the element itself
        // 获取paper对于自身的transformOrigin
        const transformOrigin = this.getTransformOrigin(elemRect)

        // 如果没有anchor参考对象，则直接返回
        if (anchorReference === 'none') {
            return {
                top: null,
                left: null,
                transformOrigin: this.getTransformOriginValue(transformOrigin),
            }
        }

        // Get the offset of of the anchoring element
        const anchorOffset = this.getAnchorOffset(anchor)
        // console.log('anchorOffset:', anchorOffset)
        // console.log('transformOrigin:', transformOrigin)

        // Calculate element positioning
        let top = anchorOffset.top - transformOrigin.vertical
        let left = anchorOffset.left - transformOrigin.horizontal
        const bottom = top + elemRect.height
        const right = left + elemRect.width
        // console.log(top, left)

        // Use the parent window of the anchorEl if provided
        // const containerWindow = ownerWindow(getAnchorEl(anchorEl));

        // Window thresholds taking required margin into account
        const heightThreshold = system_info.windowHeight - marginThreshold
        const widthThreshold = system_info.windowWidth - marginThreshold

        // Check if the vertical axis needs shifting
        if (top < marginThreshold) {
            const diff = top - marginThreshold
            top -= diff
            transformOrigin.vertical += diff
        }
        else if (bottom > heightThreshold) {
            const diff = bottom - heightThreshold
            top -= diff
            transformOrigin.vertical += diff
        }

        // Check if the horizontal axis needs shifting
        if (left < marginThreshold) {
            const diff = left - marginThreshold
            left -= diff
            transformOrigin.horizontal += diff
        }
        else if (right > widthThreshold) {
            const diff = right - widthThreshold
            left -= diff
            transformOrigin.horizontal += diff
        }

        return {
            top: `${top}px`,
            left: `${left}px`,
            transformOrigin: this.getTransformOriginValue(transformOrigin),
        }
    }

    getAnchorEl(anchorEl) {
        return typeof anchorEl === 'function' ? anchorEl() : anchorEl
    }

    fixPaperSize(paper_rect) {
        // 起始可能有缩放，需要考虑
        if (paper_rect.transform) {
            let ans = paper_rect.transform.match(/matrix\((.*?),.*?,.*?,(.*?),/)
            if (ans && ans[1] && ans[2]) {
                paper_rect.width /= ans[1]
                paper_rect.height /= ans[2]
            }
        }
        return paper_rect
    }

    setPositioningStyles(callback) {
        const { anchorEl } = this.props
        let the_el = this.getAnchorEl(anchorEl)
        // if (!the_el || !this.paper_ref.current) {
        //     return
        // }

        let the_uid = null
        if (the_el) {
            the_uid = the_el.uid ? the_el.uid : the_el.id
        }
        let paper_uid = null
        if (this.paper_ref.current) {
            paper_uid = this.paper_ref.current.uid
        }
        // console.log('the_uid:', the_uid)
        Taro.createSelectorQuery().select(`#${the_uid}`).boundingClientRect(res => {
            if (!res) {
                res = {
                    left: 0, top: 0, width: 0, height: 0,
                }
            }
            Taro.createSelectorQuery().select(`#${paper_uid}`).fields({
                size: true,
                computedStyle: ['transform'],
            },paper_res => {
                if (!paper_res) {
                    paper_res = {
                        left: 0, top: 0, width: 0, height: 0,
                    }
                }
                Taro.getSystemInfo().then((system_info)=>{
                    paper_res = this.fixPaperSize(paper_res)
                    // console.log('anchor:', res)
                    // console.log('paper:', paper_res)
                    const positioning = this.getPositioningStyle(res, paper_res, system_info)

                    let paper_style = {}

                    if (positioning.top !== null) {
                        paper_style.top = positioning.top
                    }
                    if (positioning.left !== null) {
                        paper_style.left = positioning.left
                    }
                    paper_style.transformOrigin = positioning.transformOrigin
                    // console.log(paper_style)
                    this.setState({
                        paper_style,
                    }, callback)
                })
            }).exec()
        }).exec()
    }

    componentDidUpdate(prevProps) {
        // 从关闭到开启
        if (!prevProps.open && this.props.open) {
            this.setPositioningStyles(()=>{
                this.setState({
                    open_state: true,
                })
            })
        }

        // 从开启到关闭
        if (prevProps.open && !this.props.open) {
            this.setState({
                open_state: false,
            })
        }
    }

    componentDidMount() {
        if (this.props.open) {
            this.setPositioningStyles(()=>{
                this.setState({
                    open_state: true,
                })
            })
        }
    }

    render() {
        const { className, style, children,
            anchorEl, anchorOrigin, anchorPosition, anchorReference,
            getContentAnchorEl, marginThreshold,
            TransitionComponent, transformOrigin, transitionDuration, TransitionProps,
            open, elevation, PaperProps,
            ...others
        } = this.props

        const { open_state, paper_style } = this.state

        let paper_ans_style = PaperProps.style ? { ...PaperProps.style } : {}
        paper_ans_style = {
            ...paper_ans_style,
            ...paper_style
        }

        return (
            <Modal
                open={open_state}
                BackdropProps={{ invisible: true }}
                className={`${styles.root} ${className}`}
                {...others}
            >
                <TransitionComponent
                    in={open_state}
                    timeout={transitionDuration}
                >
                    <RefPaper
                        theRef={this.paper_ref}
                        elevation={elevation}
                        {...PaperProps}
                        className={`${styles.paper} ${PaperProps.className}`}
                        style={paper_ans_style}
                    >
                        {children}
                    </RefPaper>
                </TransitionComponent>
            </Modal>
        )
    }
}

export default Popover;