import * as React from "react"
import { Frame, ControlType, addPropertyControls } from "framer"

export function StickyElement(props) {
    const { children, stuck } = props
    const hasChild = children.length > 0

    if (hasChild) {
        // Clone element with `stuck` property if child is a code component
        if (children[0].props.componentIdentifier) {
            return React.cloneElement(children[0].props.children[0], {
                stuck: stuck,
            })
        }

        if (props.responsive) {
            const childFrame = React.cloneElement(children[0], {
                width: "100%",
            })

            return childFrame
        }

        return (
            <Frame
                background="none"
                size={"100%"}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Frame
                    background="none"
                    {...children[0].props}
                    position={"relative"}
                >
                    {children[0].props.children}
                </Frame>
            </Frame>
        )
    } else {
        return (
            <Frame
                size={"100%"}
                style={{
                    color: "#8855FF",
                    background: "rgba(136, 85, 255, 0.1)",
                    fontSize: 13,
                    fontWeight: 600,
                }}
            >
                Connect to a sticky element →
            </Frame>
        )
    }
}

StickyElement.defaultProps = {
    children: null,
    pinned: null,
    offset: 0,
}

addPropertyControls(StickyElement, {
    children: {
        type: ControlType.ComponentInstance,
        title: "Default",
    },
    pinned: {
        type: ControlType.ComponentInstance,
        title: "Pinned",
    },
    offset: {
        type: ControlType.Number,
        title: "Offset",
        defaultValue: 0,
        unit: "px",
        min: -300,
        max: 300,
        step: 1,
    },
    responsive: {
        type: ControlType.Boolean,
        title: "Responsive",
        defaultValue: false,
    },
})
