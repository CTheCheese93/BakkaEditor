import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { getPageById } from "../../data";
import { renderElement, renderLeaf } from "./BakkaEditorRender";
import { onKeyDown, loadPage } from "./BakkaEditorHandler";

export function BakkaEditor() {
    const editor = useMemo(() => withReact(createEditor()), [])

    let params = useParams();
    const [page, setPage] = useState(getPageById(parseInt(params.pageId, 10)));
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [currentPageId, setCurrentPageId] = useState();

    useEffect(() => {
        if (isPageLoaded == false || params.pageId !== currentPageId) {
          setPage(getPageById(parseInt(params.pageId, 10)))
          loadPage(editor, page);
          setIsPageLoaded(true);
          setCurrentPageId(page.pageId);
        }
    });

    return (
        <Slate editor={editor} value={[{ type: 'paragraph', children: [{text: "Hello from BakkaEditor"}]}]}>
            <Editable
            autoFocus
            renderElement={useCallback(renderElement)}
            renderLeaf={useCallback(renderLeaf, [])}
            onKeyDown={(e) => onKeyDown(e, editor)}
            />
        </Slate>
    )
}