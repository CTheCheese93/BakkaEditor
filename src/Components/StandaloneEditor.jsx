import { useMemo } from "react"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"

export function StandaloneEditor(props) {
    const editor = useMemo(() => withReact(createEditor()), [])

    return (
        <div className="page">
            <Slate editor={editor} value={[{ type: 'paragraph', children: [{text: "Hello from the Standalone Editor!"}]}]}>
                <Editable />
            </Slate>
        </div>
    )
}