"use client"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
/**
 * A component for uploading images.
 * @param {{onChange: function}} props
 *   onChange is called when a file is selected, with the selected file as an argument.
 * @returns {ReactElement} A div containing a FileUploaderRegular component.
 */
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
                use-cloud-image-editor="true"
            />
        </div>
    );
}