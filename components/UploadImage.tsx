import { CldImage } from 'next-cloudinary';
import { ChangeEvent, useState } from 'react';
import { addBookStyles } from '../styles/books/addBook';
import { imageUploadToCloudinary } from '../utilis/imageUpload';

type Props = {
  setImgPath: (imageUrl: string) => void;
  imgPath: string | null;
  cloudinaryAPI: string;
};

function UploadImage({ setImgPath, imgPath, cloudinaryAPI }: Props) {
  const imgState = imgPath ? imgPath : null;
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(imgState);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;

    /* Creating a URL for the file. */
    setPreview(URL.createObjectURL(newFile));

    /* Uploading the file to Cloudinary. */
    const imageUrlStr = await imageUploadToCloudinary(newFile, cloudinaryAPI);

    /* Calling the function that was passed in as a prop and setting the new state in the parent component */
    setImgPath(imageUrlStr);
  };

  return (
    <div css={addBookStyles.imageContainer}>
      <div>
        {imgPath ? (
          <label htmlFor="file">Upload a new image</label>
        ) : (
          <label htmlFor="file">Upload an image</label>
        )}
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <p>
          Make sure the image is the book cover with the title and author
          clearly visible.{' '}
        </p>
        <p>Max. 1 MB </p>
        <p>Extensions: png, jpg, jpeg</p>
      </div>
      <div>
        {!!preview && (
          <CldImage
            width={150}
            height={150}
            src={String(preview.slice(50))}
            alt="preview"
          />
        )}
      </div>
    </div>
  );
}

export default UploadImage;
