import * as React from "react"
import { useState, useEffect } from "react"
import { Frame, Scroll } from "framer"

// Empty component to show when not scroll content connected
function Empty() {
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
            Connect to a scroll content frame →
        </Frame>
    )
}

// Check if an element is a StickyElement instance
function isStickyElement(el) {
    return (
        el.props.componentIdentifier &&
        el.props.componentIdentifier.includes("StickyElement")
    )
}

export function Sticky(props) {
    const { onScroll, ...rest } = props

    // Scroll position and direction
    const [scroll, setScroll] = useState({ y: 0, reverse: false })

    // Top position of the last sticky element
    const [lastTop, setLastTop] = useState(0)

    // Scroll content height to use in position calculations
    const [contentHeight, setContentHeight] = useState(0)

    // Current element to be fixed (includes absolute top position)
    const [stuck, setStuck] = useState(null)

    // Array of all sticky elements within scroll content
    const [elements, setElements] = useState([])

    // Update the state with the scroll Y position
    function handleScroll(info) {
        setScroll(prevScroll => {
            const reverse = prevScroll.y > -info.point.y
            return { y: -info.point.y, reverse }
        })

        // Pass down onScroll prop to the scroll component
        onScroll(info)
    }

    // Get top position value (sometimes `props.top` is not defined)
    function getTopPosition(props) {
        if (props.top || props.top === 0) {
            return props.top
        } else if (props.bottom) {
            return contentHeight - props.bottom - props.height
        } else {
            return 0
        }
    }

    // Calculate total top position from props of their parents
    function calculatePosition(...parents) {
        let total = 0
        for (let parent of parents) total += getTopPosition(parent.props)
        return total
    }

    // Array to keep the reference of the found elements
    let aux = []

    // Recursive function to find StickyElement instances (including nested)
    function findStickyElements(childs, ...parents) {
        childs.map(child => {
            if (isStickyElement(child)) {
                const childTop = getTopPosition(child.props)
                const parentTop = calculatePosition(...parents)

                aux.push({
                    // The cloned element to be fixed with new props
                    el: React.cloneElement(child, {
                        stuck: true,
                        top: 0,
                    }),
                    // The top position relative to the scroll content
                    top: childTop + parentTop,
                })
            } else {
                // Keep looking for StickyElement within frames
                if (child.props.children && child.props.children.length) {
                    // All parents are added to calculate the total position
                    findStickyElements(child.props.children, child, ...parents)
                }
            }
        })

        // Sort elements by top position (from less to more)
        aux.sort((a, b) => {
            return a.top - b.top
        })

        // Update state with all StickyElement instances found
        setElements(aux)
    }

    // For each sticky elements in array checks top position and compares with `scroll.y`
    function handleSticky(elements) {
        // Check if is reverse scrolling to avoid unnecessary repaint
        if (scroll.reverse) {
            setStuck(null)
        }

        elements.forEach(child => {
            const top = child.top
            const stickyEl = child.el.props.children[0]
            const offset = (stickyEl && stickyEl.props.offset) || 0

            if (scroll.y > top - offset) {
                if (lastTop < top) {
                    setLastTop(top)
                }

                if (scroll.y < lastTop || top >= lastTop) {
                    if (top < lastTop) {
                        setLastTop(0)
                    }

                    setStuck(child.el)
                }
            }
        })
    }

    // Update array of sticky elements whenever root children changes
    useEffect(() => {
        const root = props.children[0]

        if (root) {
            setContentHeight(root.props.height)
        }

        if (contentHeight) {
            // `contentHeight` is necessary for calculations
            findStickyElements(root.props.children, root)
        }
    }, [props.children, contentHeight])

    // Update stuck element when `scrollY` value changes
    useEffect(() => {
        handleSticky(elements)
    }, [scroll.y])

    // Check for `contentHeight` means that root children exists
    if (contentHeight) {
        let content = stuck && stuck.props.children

        if (stuck && stuck.props.children[0].props.pinned.length) {
            content = React.cloneElement(
                stuck.props.children[0].props.pinned[0],
                { position: "relative" } // It should be centered
            )
        }

        return (
            <Frame size={"100%"} background="none">
                <Scroll
                    {...rest}
                    width={"100%"}
                    height={"100%"}
                    onScroll={handleScroll}
                >
                    {props.children}
                </Scroll>

                {stuck && (
                    <Frame
                        background="none"
                        {...stuck.props}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {content}
                    </Frame>
                )}
            </Frame>
        )
    } else {
        return <Empty />
    }
}

Sticky.defaultProps = {
    onScroll: () => {},
}
