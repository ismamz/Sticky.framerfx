import { Override } from "framer"

export function ScrollHandler(): Override {
    return {
        onScroll: info => {
            console.log(info)
        },
    }
}
