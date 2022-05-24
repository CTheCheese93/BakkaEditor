import { PageLinkElement } from "./Elements/PageLinkElement"
import { DefaultElement } from "./Elements/DefaultElement"
import { Leaf } from "./Elements/Leaf"

export function renderElement(props) {
    switch (props.element.type) {
        case 'pagelink':
            return <PageLinkElement {...props} />

        default:
            return <DefaultElement {...props} />
    }
}

export function renderLeaf(props) {
    return <Leaf {...props} />
}