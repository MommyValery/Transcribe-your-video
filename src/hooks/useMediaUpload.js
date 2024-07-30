import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadMedia } from "../store/action"
import {getSuccess, getError, getLoading} from "../store/upload-media/selectors"
import {validTypes, maxSizeInBytes} from "../const"

const useMediaUpload = () => {
    const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const success = useSelector(getSuccess);
  const error = useSelector(getError);
  
  const validateFile = (file) => {
    if (!validTypes.includes(file.type)) {
      return 'Invalid file type.';
     }
     if (file.size > maxSizeInBytes) {
      return 'File size exceeds 50MB limit.';
     }
     if (!file) {
      return 'Please choose the file.';
    }
     return null;
  }

  const handleFileChange = (file) => {
    setErrorMessage('');
    setFile(null);
    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    let blobURL = URL.createObjectURL(file);
    setFile(blobURL);
    dispatch(uploadMedia(file))
  };


  const handleDrop = (evt) => {
    evt.preventDefault();
    setFileEnter(false);
    if (evt.dataTransfer.items) {
      [...evt.dataTransfer.items].forEach((item) => {
          if (item.kind === 'file') {
              const droppedFile = item.getAsFile();
              if (droppedFile) {
                  handleFileChange(droppedFile);
              }
          }
      })
    }
  };

  useEffect (() => {
    if (error) {
      setErrorMessage('Error: '+ error)

    }
    if (success) {
      router.push('/upload');
    }
  }, [error, success, router]);
  
  return {
    file,
    fileEnter,
    setFileEnter,
    errorMessage,
    loading,
    handleFileChange,
    handleDrop
  }
};

export default useMediaUpload;