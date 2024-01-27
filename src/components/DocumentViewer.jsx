import React, { useState, useRef } from 'react';
import Viewer from 'react-viewerjs';
import '../css/documentViewer.css';

const DocumentViewer = () => {
  const [file, setFile] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const viewerRef = useRef(null);

  const loadDocument = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFile(event.target.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const navigatePage = () => {
    const inputPageNumber = prompt('Enter page number:');
    const parsedPageNumber = parseInt(inputPageNumber, 10);

    if (!isNaN(parsedPageNumber) && parsedPageNumber >= 1 && parsedPageNumber <= viewerRef.current.pages) {
      setPageNumber(parsedPageNumber);
      viewerRef.current.page(parsedPageNumber);
    } else {
      alert('Invalid page number.');
    }
  };

  const rotateClockwise = () => {
    viewerRef.current.rotate(90);
  };

  const rotateAntiClockwise = () => {
    viewerRef.current.rotate(-90);
  };

  const zoomIn = () => {
    viewerRef.current.zoom(0.1);
  };

  const zoomOut = () => {
    viewerRef.current.zoom(-0.1);
  };

  const printDocument = () => {
    viewerRef.current.print();
  };

  const downloadDocument = () => {
    const fileName = prompt('Enter the file name:');
    if (fileName) {
      viewerRef.current.download(fileName);
    }
  };

  const fullScreen = () => {
    viewerRef.current.full();
  };


  return (
    <div className="document-viewer-container">
      <input type="file" onChange={loadDocument} />
      {file && (
        <Viewer
          className="viewer"
          file={file}
          pageNumber={pageNumber}
          onLoadSuccess={(viewer, numPages) => {
            console.log(`Document loaded with ${numPages} pages.`);
            viewerRef.current = viewer;
          }}
        />
      )}
      <div className="controls">
        <button className="toolbar" onClick={navigatePage}>Navigate Page</button>
        <button className="toolbar" onClick={rotateClockwise}>Rotate Clockwise</button>
        <button className="toolbar" onClick={rotateAntiClockwise}>Rotate Anti-Clockwise</button>
        <button className="toolbar" onClick={zoomIn}>Zoom In</button>
        <button className="toolbar" onClick={zoomOut}>Zoom Out</button>
        <button className="toolbar" onClick={printDocument}>Print</button>
        <button className="toolbar" onClick={downloadDocument}>Download</button>
        <button className="toolbar" onClick={fullScreen}>Full Screen</button>
      </div>
    </div>
  );
};

export default DocumentViewer;
