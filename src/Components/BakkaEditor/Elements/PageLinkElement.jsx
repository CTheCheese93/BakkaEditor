import { Transforms } from "slate";
import { useSlate } from "slate-react";

export function PageLinkElement(props) {
    const editor = useSlate();

    const pageLinkOpenLink = (e, url) => {
        if (e.ctrlKey) {
            window.open(url, '_blank')
        }
    }

    const pageLinkPromptEdit = (e, element) => {
        let newUrl = prompt("",element.url);
        Transforms.setNodes(
            editor,
            { url: newUrl },
            {
                match: (n, path) => n.id === element.id
            }
        )
    }

    return (
        <div className='page-link'>
        <a href={props.element.url} onClick={(e) => { pageLinkOpenLink(e, props.element.url) }}>{props.children}</a>
        <button className='edit' onClick={(e) => { pageLinkPromptEdit(e, props.element) }}>Edit</button>
        </div>
    )
}