import { Editor, Text, Transforms } from "slate"

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

export function onKeyDown(event, editor) {
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

export function loadPage(editor, newPage){
    editor.children = newPage.data;
    editor.onChange();
}