import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from '../adminShared/blog';

@Injectable()

export class BlogAdminService {

    createPost(post: Blog){
        let storageRef = firebase.storage().ref();
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
            .then((snapshot) => { 
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('blogPosts/');
                let newPost = dbRef.push();
                newPost.set ({
                    title: post.title,
                    content: post.content,
                    location: post.location,
                    host: post.host,
                    tags: post.tags,
                    category: post.category,
                    imgTitle: post.imgTitle,
                    img: url,
                    imgDesc: post.imgDesc,
                    id: newPost.key
                });         
            })
            .catch ((error)=>{
                alert(`failed upload: ${error}`);
            });            
    }

    editPost(update: Blog){
        let dbRef = firebase.database().ref('blogPosts/').child(update.id)
            .update({
                title: update.title,
                content: update.content,
                location: update.location,
                host: update.host,
                tags: update.tags,
                category: update.category,
                imgDesc: update.imgDesc
            });
        alert('post updated');       
    }

    removePost(deletePost: Blog){
        let dbRef = firebase.database().ref('blogPosts/').child(deletePost.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
            .delete()
                .then(function() {
                    alert(`${deletePost.imgTitle} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deletePost.imgTitle}`);
                });
    }


}