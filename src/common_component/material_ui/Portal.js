import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro';
import { createPortal } from '@tarojs/react'

// 网页版原版
class Portal extends PureComponent {
    static defaultProps = {
        container: null,
        disablePortal: false,
    }

    constructor() {
        super(...arguments)

        this.state = {
            root_node: null,
        }
    }

    getContainer(container) {
        return typeof container === 'function' ? container() : container;
    }

    getRootNode() {
        let { root_node } = this.state

        if (root_node) {
            return
        }

        let _instance = Taro.getCurrentInstance()
        root_node = document.getElementById(_instance.page.$taroPath)

        if (root_node) {
            this.setState({
                root_node,
            })
        }
        else {
            const onReadyEventId = _instance.router.onReady
            Taro.eventCenter.once(onReadyEventId, () => {
                console.log('onReady')
                root_node = document.getElementById(_instance.page.$taroPath)
                this.setState({
                    root_node,
                })
            })
        }
    }

    componentDidUpdate() {
        if (!this.props.container) {
            this.getRootNode()
        }
    }

    componentDidMount() {
        if (!this.props.container) {
            this.getRootNode()
        }
    }

    render() {
        const { container, disablePortal, children } = this.props
        const { root_node } = this.state

        if (disablePortal) {
            return children
        }

        let the_node = container ? this.getContainer(container) : root_node

        if (!the_node) {
            return null
        }

        return createPortal(children, the_node)
    }
}

export default Portal;