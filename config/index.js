const config = {
    projectName: 'material_taro',
    date: '2019-12-2',
    designWidth: 750,
    deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {
    },
    copy: {
        patterns: [
        ],
        options: {
        }
    },
    // 框架，react，nerv，vue, vue3 等
    framework: 'react',
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {

                }
            },
            url: {
                enable: true,
                config: {
                    limit: 102400 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        },
        imageUrlLoaderOption: {
            limit: 1, // 关闭图片转base64，防止分享图片问题
        },
        // addChunkPages(pages) {
        //     // pages.set('subpackages/bar/index', ['subpackages/common']),
        //     // pages.set('subpackages/foo/index', ['subpackages/common'])
        // },
        // webpackChain(chain) {
        //     chain.merge({
        //         optimization: {
        //             splitChunks: {
        //                 cacheGroups: {
        //                     subpackagesCommon: {
        //                         name: 'RouteArticle/common',
        //                         minChunks: 2,
        //                         test: (module, chunks) => {
        //                             const isNoOnlySubpackRequired = chunks.find(chunk => !(/\RouteArticle\b/.test(chunk.name)))
        //                             // console.log(JSON.stringify({
        //                             //     'chunk.name': chunk.name, 
        //                             //     'isNoOnlySubpackRequired': isNoOnlySubpackRequired, 
        //                             // }))
        //                             return !isNoOnlySubpackRequired
        //                         },
        //                         priority: 200
        //                     }
        //                 }
        //             }
        //         }
        //     })
        // }
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    }
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}
