import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()
const userAxios = axios.create()


userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `bearer ${token}`
    return config
})


function UserProvider(props){
    useEffect(() => { 
        pageReloaded()
    }, [])

    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "", 
        posts: [],
        allPosts: [], 
        errMsg: "",
        isTrue: true,
        comments: [],
        allComments: [],
    } 

    // const comments = []

    const [userState, setUserState] = useState(initState)
    const [toggle, setToggle] = useState(true)

    function handleToggle(){ 
        setToggle(prev => !prev)
    }


    function signUp(credentials){ 
        axios.post("/auth/signup", credentials)
            .then(res => { 
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({
                    ...prev, 
                    user,
                    token
                }))

            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }
    function login(credentials){ 
        axios.post("/auth/login", credentials)
            .then(res => { 
                const {token, user} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getAllPosts()
                getPosts()
                getAllComments()
                setUserState(prev => ({ 
                    ...prev, 
                    user, 
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function logout(){ 
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUserState({ 
            user: {}, 
            token: "",
            posts: []
        })
    }

    function handleAuthError(errMsg){ 
        setUserState(prev => ({ 
            ...prev, 
            errMsg
        }))
    }

    function resetAuthError(){ 
        setUserState({ 
            errMsg: ""
        })
    }

    function addPost(newPost){ 
        userAxios.post("/api/posts", newPost)
            .then(res => setUserState(prev => ({ 
                ...prev, 
                posts: [...userState.posts, res?.data],
                allPosts: [...userState.allPosts, res?.data]
            })))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getPosts(){ 
        userAxios.get("/api/posts/user")
            .then(res => setUserState(prev => ({ 
                ...prev, 
                posts: res.data
            })))
            .catch(err => console.log(err))
    }

    function getAllPosts(){ 
        userAxios.get("/api/posts/posts")
            .then(res => setUserState(prev => ({ 
                ...prev, 
                allPosts: res.data
            })))
            
            .catch(err => console.log(err))
    }

    function getAllComments(){ 
        userAxios.get("/api/posts/words")
            .then(res => setUserState(prev => ({
                ...prev, 
                comments: res.data
            })))
            .catch(err => console.log(err))
            
    }

    function deletePost(postId){ 
        userAxios.delete(`/api/posts/${postId}`)
            .then(res => setUserState(prevPosts => ({ 
                ...prevPosts,
                posts: prevPosts.posts.filter(posts => posts._id !== postId),
                allPosts: prevPosts.posts.filter(posts => posts._id !== postId)
            })))
            .catch(err => console.log(err))
    }

     function editPost(postId, updates){ 
        userAxios.put(`/api/posts/${postId}`, updates)
            .catch(err => console.log(err))
            updates._id = postId
            setUserState(prev => ({ 
                ...prev,
                posts: prev.posts.map(post => post._id !== postId && updates.title && updates.description ? post : updates ),
                allPosts: prev.allPosts.map(post => post._id !== postId && updates.title && updates.description ? post : updates), 
            }))
    }

    //getAll comments 

    // function getUserComments(){
    //     userAxios.get("/api/posts/user/comments")
    //         .then(res => setUserState(prev => ({ 
    //             ...prev, 
    //             comments: res.data
    //         })))
    //         .catch(err => console.log(err))
    // }

    // add like
    function sendLike(postId, like){ 
        userAxios.put(`/api/posts/like/${postId}`, like)
        .then(res => setUserState(prev => ({ 
            ...prev, 
            // posts: prev.posts.map(post => post._id !== postId && like.title && like.description ? post : res.data ),
            allPosts: prev.allPosts.map(post => post._id !== postId ? post : res.data), 
        }))
        )
        .catch(err => console.log(err))
              
        like._id = postId
        
    }

    // // remove like
    // function removeLike(postId, like){ 
    //     console.log("remove like", like)
    //     userAxios.put(`/api/posts/dislike/${postId}`, like)
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    //                 setUserState(prev => ({ 
    //                 ...prev, 
    //                 posts: prev.posts.map(post => post._id !== postId ? post : like ),
    //                 allPosts: prev.allPosts.map(post => post._id !== postId ? post : like), 
    //             }))
            
    //     like._id = postId
        
    // }



    

    function addComment(newComment){ 
        console.log(userState.comments)
        userAxios.post(`/api/posts/comment`, newComment)
            .then(res => setUserState(prev => ({ 
                ...prev, 
                comments: [...userState.comments, res.data]
            })))
            .catch(err => console.log(err.response.data.errMsg))
            // relateComments(userState.comments)
    }

    // function addComment(postId, updates){ 
    //     console.log( 123, updates)
    //     //Extract the comment
    //     //Extract all of the comments from the post
    //     //Compile previous comments and add the new comment
    //     //Pass this updated array of comments to the server
    //     userAxios.put(`/api/posts/comment/${postId}`, updates)
    //         .catch(err => console.log(err))
    //         setUserState(prev => ({ 
    //             ...prev, 
    //             allPosts: prev.allPosts.map(post => post._id !== postId && updates.title && updates.description ? post : updates)
    //         }))
    //         console.log(2, userState.allPosts)
    // }

    // function relateComments(postComments){ 
    //    for(let i = 0; i < userState.allPosts.length; i++){ 
    //         const fComments = postComments.filter(post => post.post === userState.allPosts[i]._id)
    //         console.log(userState.allPosts)
    //         userState.allPosts[i].comments.push(fComments)
    //    }
    // }

    function pageReloaded(){ 
        
        getPosts()
        getAllPosts()
        // getUserComments()
        getAllComments()
        // console.log(userState.comments)
        // relateComments(userState.comments)
    }
    
    

    return( 
        <UserContext.Provider value = {{ 
            ...userState, 
            signUp,
            login,
            logout,
            resetAuthError,
            addPost,
            deletePost,
            editPost,
            addComment,
            pageReloaded,
            // relateComments,
            getAllComments, 
            sendLike, 
            toggle, 
            handleToggle
            
            
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserProvider