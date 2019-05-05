import * as React from "react"
import { useState, useEffect, cloneElement } from "react"
import { Frame, Scroll } from "framer"

function isStickyElement(el) {
    return (
        el.props.componentIdentifier &&
        el.props.componentIdentifier.includes("StickyElement")
    )
}

function Empty(props) {
    return (
        <div
            style={{
                width: props.width,
                height: props.height,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#8855FF",
                background: "rgba(136, 85, 255, 0.1)",
                overflow: "hidden",
                fontSize: 13,
                fontWeight: 600,
            }}
        >
            Connect to a scroll content frame →
        </div>
    )
}

export function Sticky(props) {
    const [scrollY, setScrollY] = useState(0)
    const [lastTop, setLastTop] = useState(0)
    const [contentHeight, setContentHeight] = useState(0)
    const [stuck, setStuck] = useState(null)
    const [elements, setElements] = useState([])

    function handleScroll(info) {
        setScrollY(-info.point.y)
    }

    function getTopPosition(props) {
        if (props.top || props.top === 0) {
            return props.top
        } else if (props.bottom) {
            return contentHeight - props.bottom - props.height
        } else {
            return 0
        }
    }

    function calculatePosition(...parents) {
        let total = 0
        for (let parent of parents) total += getTopPosition(parent.props)
        return total
    }

    let aux = []

    function findStickyElements(childs, ...parents) {
        childs.map(child => {
            if (isStickyElement(child)) {
                const parent = parents[0]
                const childTop = getTopPosition(child.props)
                let parentTop = calculatePosition(...parents)

                if (child.props.name === "StickyElementRosa") {
                    //console.log(child, parents, childTop, parentTop)
                    //console.log(getTopPosition(parents[1].props))
                    //console.log(getTopPosition(parents[2].props))
                    parentTop =
                        getTopPosition(parents[1].props) +
                        getTopPosition(parents[2].props)
                }

                const clonedChild = React.cloneElement(child, {
                    stucked: true,
                    top: 0,
                })

                aux.push({
                    el: clonedChild, // child
                    top: childTop + parentTop,
                })
            } else {
                if (child.props && child.props.children.length) {
                    findStickyElements(child.props.children, child, ...parents)
                }
            }
        })

        setElements(aux)
    }

    function affixElements(elements) {
        setStuck(null) // avoid this to repaint always

        elements.forEach(child => {
            const top = child.top

            const coso = child.el.props.children[0]

            let offset = (coso && coso.props.offset) || 0

            if (scrollY > top - offset) {
                if (lastTop < top) {
                    setLastTop(top)
                }

                if (scrollY < lastTop || top >= lastTop) {
                    if (top < lastTop) {
                        setLastTop(0)
                    }

                    setStuck(child.el)
                }
            }
        })
    }

    useEffect(() => {
        const root = props.children[0]

        if (root) {
            setContentHeight(root.props.height)
        }

        if (contentHeight) {
            findStickyElements(root.props.children, root)
        }
    }, [props.children, contentHeight])

    useEffect(() => {
        affixElements(elements)
    }, [scrollY])

    if (contentHeight) {
        // const Stuck = () =>
        //     React.cloneElement(stuck, {
        //         stucked: true,
        //         top: 0,
        //     })

        return (
            <Frame size={"100%"} background="none">
                <Scroll width={"100%"} height={"100%"} onScroll={handleScroll}>
                    {props.children}
                </Scroll>

                {stuck}

                {/* {stuck && (
                    <Frame
                        background="none"
                        {...stuck.props}
                        top={0}
                        //initial={{ y: -10, opacity: 0 }}
                        //animate={{ y: 0, opacity: 1 }}
                        //transition={{ ease: "linear" }}
                    >
                        {stuck.props.children[0].props.pinned.length
                            ? stuck.props.children[0].props.pinned
                            : stuck.props.children}
                    </Frame>
                )} */}
            </Frame>
        )
    } else {
        return <Empty {...props} />
    }
}
