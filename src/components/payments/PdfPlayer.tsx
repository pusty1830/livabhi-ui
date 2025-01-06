import React from "react";

const PDFViewer = ({ url, comments }: any) => (
    <div>
        <h3>PDF Viewer</h3>
        <iframe src={url} title="PDF Viewer" style={{ width: "100%", height: "500px" }} />

    </div>
);

export default PDFViewer;
