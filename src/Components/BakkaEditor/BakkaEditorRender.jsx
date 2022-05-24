import { useCallback } from "react";
import { PageLinkElement, DefaultElement, Leaf} from "./Elements/Elements"

const renderElement = useCallback((props) => {
    switch (props.element.type) {
        case 'pagelink':
            return <PageLinkElement {...props} />

        default:
            return <DefaultElement {...props} />
    }
});

const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
}, [])

export default {
    renderElement,
    renderLeaf
}