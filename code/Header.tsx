import * as React from "react"
import { Frame } from "framer"

export function Header(props) {
    const variants = {
        pinned: {
            borderRadius: 0,
            width: "100%",
            background: "#09f",
        },
        unpinned: {
            borderRadius: 9999,
            width: "60%",
        },
    }
    return (
        <Frame
            background="#05f"
            color={"#fff"}
            borderRadius={9999}
            width={"60%"}
            height={"100%"}
            center
            transition={{ duration: 0.1 }}
            style={{ fontSize: 16, fontWeight: "bold" }}
            animate={props.stucked ? "pinned" : "unpinned"}
            variants={variants}
        >
            {props.stucked ? "Stucked" : "Unpinned"}
        </Frame>
    )
}
