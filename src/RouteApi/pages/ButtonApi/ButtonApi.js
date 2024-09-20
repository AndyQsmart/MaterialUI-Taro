import BaseApi from '../../component/BaseApi'

class ButtonApi extends BaseApi {
    constructor() {
        super(...arguments)

        this.name = "Button"
        this.props_description = "Any other props supplied will be provided to the root Item (ButtonBase)."
        this.inheritance_description = "The props of the ButtonBase component are also available. You can take advantage of this behavior to target nested components."
        this.props_list = [
            {
                name: "children",
                type: "node",
                default_value: "",
                description: "The content of the button.",
            },
            {
                name: "color",
                type: "'default'\n| 'inherit'\n| 'primary'\n| 'secondary'",
                default_value: "'default'",
                description: "The color of the component. It supports those theme colors that make sense for this component.",
            },
            {
                name: "disabled",
                type: "bool",
                default_value: "false",
                description: "If true, the button will be disabled.",
            },
            {
                name: "disableElevation",
                type: "bool",
                default_value: "false",
                description: "If true, no elevation is used.",
            },
            {
                name: "disableRipple",
                type: "bool",
                default_value: "false",
                description: "If true, the ripple effect will be disabled.",
            },
            {
                name: "fullWidth",
                type: "bool",
                default_value: "false",
                description: "If true, the button will take up the full width of its container.",
            },
            {
                name: "size",
                type: "'large'\n| 'medium'\n| 'small'",
                default_value: "'medium'",
                description: "The size of the button. small is equivalent to the dense button styling.",
            },
            {
                name: "variant",
                type: "'contained'\n| 'outlined'\n| 'text'",
                default_value: "'text'",
                description: "The variant to use.",
            },
        ]
        this.demos_list = [
            {
                name: "Button Group",
                // url: "",
            },
            {
                name: "Buttons",
                url: "/pages/Button/ButtonPage",
            },
        ]
    }
}

export default ButtonApi
