'use client'
import { useState } from "react"
import { Input } from "./input"
import { Label } from "./label"

export const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [fileEnter, setFileEnter] = useState(false);

   return (<div>
    {!file ?
    (<div className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-muted rounded-md"
       onDragOver={(evt)=> {
        evt.preventDefault();
        setFileEnter(true);
    }} onDragLeave={(evt) => {
        setFileEnter(false);
    }} onDragEnd={(evt) => {
        evt.preventDefault();
        setFileEnter(false);
    }} onDrop = {(evt) => {
        evt.preventDefault();
        setFileEnter(false);
        if (evt.dataTransfer.items) {
            [...evt.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if (file) {
                        let blobURL = URL.createObjectURL(file);
                        setFile(blobURL);
                    }
                    console.log(`items file[${i}].name = ${file?.name}`);
                }
            });
        } else {
            [...evt.dataTransfer.files].forEach((file, i) => {
                console.log(`...file[${i}].name = ${file.name}`);
            });
        }
    }}> 
    <UploadIcon className="w-8 h-8 text-muted-foreground" />   
    <Label htmlFor="video" className="text-muted-foreground">Drag and drop a video file or click to select.</Label>
    <Input id="video" type="file" className="hidden" onChange={(evt) => {
        console.log(evt.target.files);
        let files = evt.target.files;
        if (files && files[0]) {
            let blobURL = URL.createObjectURL(files[0]);
            setFile(blobURL);
        }
      }}/>
    </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-muted rounded-md">
            <object className="w-40 h-40 text-muted-foreground" data={file} type="image/png"/>
        </div>
    )}
    </div>)
    }

function UploadIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
      </svg>)
    );
  }