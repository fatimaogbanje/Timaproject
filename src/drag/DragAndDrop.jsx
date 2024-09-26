import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DragAndDrop.css'; 

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        prevFiles.concat(
          acceptedFiles.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
          }))
        )
      );
    },
    accept: 'audio/*',
    multiple: true, 
  });

  return (
    <div className="drag-and-drop-container">
      <div {...getRootProps({ className: 'dropzone' })} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop music files here, or click to select files</p>
      </div>
      <div className="audio-list">
        {files.map((file, index) => (
          <div key={index} className="audio-item">
            <p className="audio-name">{file.name}</p>
            <audio controls className="audio-player">
              <source src={file.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
