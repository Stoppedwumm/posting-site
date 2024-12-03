"use client"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
export default function Upload({onChange}) {
    return (
        <div>
            <FileUploaderRegular
                sourceList="local, url, camera, dropbox, gdrive, gphotos, instagram"
                classNameUploader="uc-dark uc-orange"
                pubkey="e773a3d06725475d2744"
                onChange={onChange}
                multiple="false"
                img-only="true"
            />
        </div>
    );
}