import styles from '@/styles/Form.module.css';
import { useState } from 'react';
import { API_URL } from '../config';

const ImageUpload = ({eventId, imageUploaded, token}) => {
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('files', image)
        formData.append('ref', 'events')
        formData.append('refId', eventId)
        formData.append('field', 'image')

        fetch(`${API_URL}/upload`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            imageUploaded()
        } )
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }
  
    return (
        <div className={styles.form}>
           <h2>Upload Event Image</h2>
           <form onSubmit={handleSubmit}>
               <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
               </div>
               <input type="submit" value="Upload" className="btn"/>
           </form>
        </div>
    );
}

export default ImageUpload;