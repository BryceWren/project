import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IndividualCleanup = () => {
    const [file, setFile] = useState();

    function FileUpload(event) {
        setFile(event.target.files[0]);
        console.log(file);
    }

    return (
        <div className="Container">
            <h2>Individual CleanUp Sheet</h2>
            <div className="FileUpload">
                <form>
                    <input type="file" name="file" onChange={FileUpload} accept=".pdf, .jpeg, .png" />
                    <button className="UploadPicture">Upload</button>
                </form>
            </div>
        </div>
    );
}

export default IndividualCleanup;
