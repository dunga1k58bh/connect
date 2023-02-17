import React from 'react';
import Post from './Post';

export default function BoardPost(props) {

    const user = props.user;
    const posts = props.posts || {};
    const posts_data = posts.data || [];

    return (
        <div>
            {posts_data.map((post, index) => (
                <Post key={index} post={post} user={user}></Post>
            ))}
        </div>
    );
}
