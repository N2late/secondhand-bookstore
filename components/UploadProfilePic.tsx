import { ChangeEvent } from 'react';
import { addBookStyles } from '../styles/books/addBook';
import { profileStyles } from '../styles/profile';
import { imageUploadToCloudinary } from '../utilis/imageUpload';

type Props = {
  setProfilePicture: (imageUrl: string) => void;
  cloudinaryAPI: string;
};

function UploadProfilePic({ setProfilePicture, cloudinaryAPI }: Props) {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;

    /* Creating a URL for the file. */
    setProfilePicture(URL.createObjectURL(newFile));

    /* Uploading the file to Cloudinary. */
    const imageUrlStr = await imageUploadToCloudinary(newFile, cloudinaryAPI);

    /* Calling the function that was passed in as a prop and setting the new state in the parent component */
    setProfilePicture(imageUrlStr);
  };

  return (
    <div css={addBookStyles.imageContainer}>
      <div>
        <label htmlFor="file" css={profileStyles.uploadPicBtn}>
          Upload
        </label>
        <input
          css={profileStyles.uploadPicInput}
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default UploadProfilePic;
