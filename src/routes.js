const express = require('express')
const { feed, createDraft, addPostToCategory, filterPosts, getPostById } = require('./controllers/post')
const { createUser, setUserBio } = require('./controllers/user')
const router = express.Router()

router.get('/feed', feed)

router.post('/user', createUser)

router.post('/post', createDraft)

router.put('/post', addPostToCategory)

router.post('/user/:userId/profile', setUserBio)

router.get('/filterPosts', filterPosts)

router.get('/post/:postId', getPostById)

module.exports = router