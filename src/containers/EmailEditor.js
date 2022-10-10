import EmailEditor from "react-email-editor";
import { useRef, useState, useEffect } from "react";
import domtoimage from "dom-to-image";
import Frame from "react-frame-component";
import ReactHtmlParser from "react-html-parser";
import html2canvas from 'html2canvas';

export default function DefaultContainer() {
  const [width, updateWidth] = useState("500px");
  const emailEditorRef = useRef(null);
  const [html, updateHTML] = useState("");

  // useEffect(() => {
  //   if( html !== '' ) {
      
  //   }
  // }, [html])

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      updateHTML(html)
      console.log(html, 'html')
      setTimeout(() => {
        console.dir(
          document.querySelector("#previewer-frame").contentWindow.document.querySelector("#u_body"),
          "previewer-frame"
        );
        // this part pass to backend to generate image since there is no npm lib which can load the image from url and generate a base64 for it
        // html2canvas(
        //   document
        //     .querySelector("#previewer-frame")
        //     .contentWindow.document.querySelector("#u_body"), {
        //       imageTimeout: 0,
        //       useCORS: false
        //     }
        // ).then(function(canvas) {
        //   // document.body.appendChild(canvas);
        //   document.querySelector('#previewer-img-tag').appendChild(canvas)
        // });
      }, 1000)
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div>
      <div>
        <button className="btn btn-primary" onClick={exportHtml}>
          Export HTML
        </button>
        <input
          className="form-control"
          type="text"
          value={width}
          onChange={(e) => {
            updateWidth(e.target.value);
          }}
        />
      </div>

      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />

      <h4>Render of the dom here</h4>
      <hr />
      <div style={{ width: width }}>
        {html !== "" && (
          <Frame id="previewer-frame" style={{ width: "100%", height: "700px" }}>
            {ReactHtmlParser(html)}
          </Frame>
        )}
      </div>
      <h4>Image preview with canvas here</h4>
      <hr />
      <div id="previewer-img-tag" style={{ width: width, height: '700px' }}></div>
    </div>
  );
}
