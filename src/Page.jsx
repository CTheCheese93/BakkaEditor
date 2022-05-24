import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor, Transforms, Text, createEditor } from 'slate';
import { Slate, Editable, withReact, useSlate} from 'slate-react';

import "./css/Page.css";
import { getPageById } from './data';

// Now part of BakkaEditor, here just until migration happens

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

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

const pageLinkOpenLink = (e, url) => {
  if (e.ctrlKey) {
      window.open(url, '_blank')
  }
}

const PageLinkElement = props => {
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

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

// End of what is currently in BakkaEditor

export default function Page() {
    const editor = useMemo(() => withReact(createEditor()), [])

    let params = useParams();
    const [page, setPage] = useState(getPageById(parseInt(params.pageId, 10)));
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [currentPageId, setCurrentPageId] = useState();
    
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

    const loadPage = (editor, newPage) => {
        editor.children = newPage.data;
        editor.onChange();
    }

    const loadDummyData = () => {
        editor.children = [{type: 'paragraph', children: [{text: "New Children"}]}]
        editor.onChange();
    }

    const loadPage0 = () => {
      const page = getPageById(0);
      editor.children = page.data
      editor.onChange();
    }

    return (
        <div className="page">
          <div className="toolbar">
            <button onClick={() => loadDummyData()}>Load Dummy Nodes</button>
            <button onClick={() => loadPage0()}>Load Page 0 Nodes</button>
          </div>
          <Slate editor={editor} value={[{ type: 'paragraph', children: [{text: "Hello from the Page Editor!"}]}]}>
              <Editable
              autoFocus
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {onKeyDown(event, editor)}}
              />
          </Slate>
        </div>
    )
}