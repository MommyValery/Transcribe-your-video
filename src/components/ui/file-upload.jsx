'use client'
import { Input } from "./input"
import { Label } from "./label"
import useMediaUpload from "../../hooks/useMediaUpload"

export const FileUploader = () => {
  const {file, setFileEnter, fileEnter, errorMessage, handleFileChange, handleDrop} = useMediaUpload();

   return (<div>
    {!file ?
    (<div className={`flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed rounded-md
        ${fileEnter ? 'border-blue-500' : 'border-muted'}`}
       onDragOver={(evt)=> {
        evt.preventDefault();
        setFileEnter(true);
    }} onDragLeave={(evt) => {
        setFileEnter(false);
    }} onDragEnd={(evt) => {
        evt.preventDefault();
        setFileEnter(false);
    }} onDrop = {handleDrop}
    > 
    <UploadIcon className="w-8 h-8 text-muted-foreground" />   
    <Label htmlFor="video" className="text-muted-foreground">Drag and drop a video file or click to select.</Label>
    <Input id="video" type="file" className="hidden" onChange={(evt) => handleFileChange(evt.target.files[0])}/>
    </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-muted rounded-md">
            <object className="w-40 h-40 text-muted-foreground" data={file} type="video/mp4"/>
        </div>
    )}
    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>);
    };

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