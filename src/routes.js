const express = require('express')
const {
    feed,
    createDraft,
    addPostToCategory,
    filterPosts,
    getPostById,
    createCategory,
    publishDraft
} = require('./controllers/post')
const { createUser, setUserBio, getAuthors } = require('./controllers/user')
const router = express.Router()

router.get('/feed', feed)

router.post('/user', createUser)

router.post('/post', createDraft)

router.put('/post/:postId', publishDraft)

router.put('/addPostToCategory', addPostToCategory)

router.post('/user/:userId/profile', setUserBio)

router.get('/filterPosts', filterPosts)

router.get('/post/:postId', getPostById)

router.post('/category', createCategory)

router.get('/authors', getAuthors)

module.exports = router