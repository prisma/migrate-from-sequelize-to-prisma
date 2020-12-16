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
const { createUser, setUserBio } = require('./controllers/user')
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

module.exports = router