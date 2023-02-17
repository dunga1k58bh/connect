import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Icon } from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function PostImageUpload(props) {

    if (!props.open){
        return "";
    }

    const [images, setImages] = React.useState(props.images);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);

        props.setImages(imageList);
    };

    return (
        <div className="image-upload">
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
            }) => (
            // write your building UI
            <div className="upload__image-wrapper">
                <div className='p-[8px] border-solid border-[1px] border-zinc-300 mb-[16px] relative'>
                    <div className="hover:bg-[#ccc] bg-[#f2f3f5] flex justify-center h-[155px] flex-col cursor-pointer"
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        <div className='flex justify-center'>
                            <AddPhotoAlternate></AddPhotoAlternate>
                        </div>
                        <div className='flex justify-center text-[17px] text-[#050505] font-bold'>
                            Add Photos/Videos
                        </div>
                        <div className='flex justify-center text-[12px] text-[#65676B]'>
                            Or drag and drop
                        </div>
                        {/* <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Remove all images</button>
                        {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>Update</button>
                            <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                        ))} */}
                    </div>
                    <div className='absolute top-4 right-4 bg-white hover:bg-[#ccc] round-[100%]] cursor-pointer' onClick={props.onClose}>
                        <Close></Close>
                    </div>
                </div>
            </div>
            )}
        </ImageUploading>
        </div>
    );
}
