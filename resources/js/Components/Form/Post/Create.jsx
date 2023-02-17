import { useForm} from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import * as React from 'react';
import { EmojiEmotions, Flag, Image, LocationOn, TurnedIn } from '@mui/icons-material';
import { createReactEditorJS } from 'react-editor-js';
import PostImageUpload from './ImageUpload';
import { useState } from 'react';

export default function PostFormCreate(props) {

    const user = props.user;

    const ReactEditorJS = createReactEditorJS();

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        group_id: null,
        content: {},
        images: [],
        tags: [],
        felling: [],
    });

    const { onClose, open } = props;

    const editorCore = React.useRef(null)

    const handleInitialize = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])


    const submit = React.useCallback(async () => {
        data.content = await editorCore.current.save();
        post(route('post'), {onSuccess: (res) => {
            data.images = [];
            onClose();
        }});
    }, []);

    const [media, showMedia] = useState(false);

    const showFormMedia = () => {
        showMedia(true);
    }

    const hideFormMedia = () => {
        data.images = [];
        showMedia(false);
    }

    const setImages = (img_list) => {
        data.images = img_list;
    }

    const meidia_html = <PostImageUpload images={data.images} setImages={setImages} open={media} onClose={hideFormMedia}/>

    return (
        <Dialog onClose={onClose} open={open}>
            <div className='w-[500px]'>
                <div>
                    <div className='flex justify-center font-bold text-[20px] text-[#050505] py-[16px]'>
                        Create post
                    </div>
                    <Divider></Divider>
                    <div className='header p-[16px] flex'>
                        <Avatar src={user.avatar} sx={{width: 40, height: 40}}></Avatar>
                        <div className='info ml-[8px]'>
                            <div className='name font-semibold'>
                                <span><a href={`/profile/${user.id}`}>{user.first_name + " " + user.last_name}</a></span>
                            </div>
                            <div className='time text-[12px]'>
                                2h ago
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-[16px] max-h-[225px] overflow-y-auto'>
                    <div className='content '>
                        <div className=''>
                            <ReactEditorJS
                                onInitialize={handleInitialize}
                                hideToolbar={true} autoFocus={true} minHeight={30}
                            />
                        </div>
                    </div>
                    <div className='media'>
                        {meidia_html}
                    </div>
                </div>
                <div className='pt-[16px]'>
                    <div className='mx-[16px] p-[8px] flex border-solid border-[1px] border-[#ced0d4] rounded-[8px] justify-between'>
                        <div className='font-bold text-[#050505] pt-[5px] px-[8px]'>Add to your post</div>
                        <div className='actions flex'>
                            <IconButton onClick={showFormMedia} color="success"><Image></Image></IconButton>
                            <IconButton color="primary"><TurnedIn></TurnedIn></IconButton>
                            <IconButton color="warning"><EmojiEmotions></EmojiEmotions></IconButton>
                            <IconButton color="error"><LocationOn></LocationOn></IconButton>
                            <IconButton color="slate"><Flag></Flag></IconButton>
                        </div>
                    </div>
                    <div className='p-[16px]'>
                        <Button color='success' variant='contained'
                            sx={{width: "100%"}}
                            onClick={submit}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
  );
}
