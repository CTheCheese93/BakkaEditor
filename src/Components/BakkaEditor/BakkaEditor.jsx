const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true
        })

        return !!match
    },

    isPageLinkActive(editor) {
        const [match] = Editor.nodes(editor, {
        match: n => n.type === 'pagelink'
        })

        return !!match
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
        )
    },

    togglePageLink(editor) {
        const isActive = CustomEditor.isPageLinkActive(editor)
        Transforms.setNodes(
        editor,
        { type: isActive ? null : 'pagelink' },
        { match: n => Editor.isBlock(editor, n) }
        )
    }
}

const pageLinkOpenLink = (e, url) => {
    if (e.ctrlKey) {
        window.open(url, '_blank')
    }
}

const loadPage = (editor, newPage) => {
    editor.children = newPage.data;
    editor.onChange();
}

function BakkaEditor() {
    const editor = useMemo(() => withReact(createEditor()), [])

    let params = useParams();
    const [page, setPage] = useState(getPageById(parseInt(params.pageId, 10)));
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [currentPageId, setCurrentPageId] = useState();

    const onKeyDown = (event, editor) => {
    if (!event.ctrlKey) {
        return
    }

    switch(event.key) {
        case '`': {
        event.preventDefault();
        CustomEditor.togglePageLink(editor);
        break;
        }

        case 'b': {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
        }
    }
    }    

    useEffect(() => {
        if (isPageLoaded == false || params.pageId !== currentPageId) {
          setPage(getPageById(parseInt(params.pageId, 10)))
          loadPage(editor, page);
          setIsPageLoaded(true);
          setCurrentPageId(page.pageId);
        }
    });

    return (
        <Slate editor={editor} value={[{ type: 'paragraph', children: [{text: "Hello from the Page Editor!"}]}]}>
            <Editable
            autoFocus
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {onKeyDown(event, editor)}}
            />
        </Slate>
    )
}

export default {
    Editor: BakkaEditor,
    loadPage,

}