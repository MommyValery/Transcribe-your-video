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
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const success = useSelector(getSuccess);
  const error = useSelector(getError);
  const handleFileChange = (evt) => {
    setFile(evt.target.files[0]);
    setErrorMessage('');
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!file) {
      setErrorMessage('Please choose the file.');
      return;
    }
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file type.');
      return;
     }
     if (file.size > maxSizeInBytes) {
      setErrorMessage('File size exceeds 50MB limit.');
      return;
     }
      dispatch(uploadMedia(file));
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
    errorMessage,
    loading,
    handleFileChange,
    handleSubmit
  }
};

export default useMediaUpload;