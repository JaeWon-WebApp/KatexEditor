import { useEffect, useRef, useState } from 'react';
import './App.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import TexEditor from './TexEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-with-mathtype';

function App() {
  const [boardWrite, setBoardWrite] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [range, setRange] = useState(null);
  const boardRef = useRef();
  const katexPreRef = useRef();

  useEffect(() => {
    renderMathInElement(katexPreRef.current, {
      delimiters: [{left:"$", right:"$", display: false}]
    });
  }, [boardWrite]);

  const texEditorOpen = () => {
    let selection = window.getSelection().containsNode(boardRef.current, true);
    if (!selection)
      boardRef.current.focus();
    setRange(window.getSelection().getRangeAt(0));
    setModalOpen(true);
  };

  const texEditorClose = () => {
    setBoardWrite(boardRef.current.textContent);
    setModalOpen(false);
  }

  return (
    <>
      <div id="boardWrapper" style={{padding: '50px'}}>
        <div id="bar">
          <button onClick={texEditorOpen}>수식</button>
        </div>
        <div id="board" ref={boardRef} contentEditable onInput={(e) => setBoardWrite(e.currentTarget.outerHTML)}>
        </div>
        <div id="boardPre" ref={katexPreRef} dangerouslySetInnerHTML={{__html: boardWrite}}>
          {/* {boardWrite} */}
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: {
              items: [
                'heading', 'MathType', 'ChemType',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'mediaEmbed',
                'insertTable',
                'blockQuote',
                'undo',
                'redo'
              ]
            },
          }}
          data="<p>Hello from CKEditor 5 with MathType!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
          }}
        />
      </div>
      {
        modalOpen &&
        <TexEditor
          texEditorClose={texEditorClose}
          range={range}
        />
      }
    </>
  );
}

export default App;
