export default function PageLinkElement(props) {
    const editor = useSlate();

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