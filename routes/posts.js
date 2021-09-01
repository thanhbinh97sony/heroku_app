const express = require('express');
const router = express.Router();

// Load model
const Posts = require('./models/posts');
// Hien thi cac bai viet
router.get('/posts', async (req, res) => {
    const posts = await Posts.find().lean().sort({ date: -1 })
    res.render('posts/index', { posts });
})

router.get('/add', (req, res) => {
    res.render('posts/add')
})

router.post('/posts', async (req, res) => {
    const { tittle, text } = req.body
    let errors = []
    if (!tittle) errors.push({ mgs: "Tittle requied" })
    if (!text) errors.push({ mgs: "Text requied" })
    if (errors.length > 0) res.render('posts/add', { tittle, text })
    else {
        const newPostData = { tittle, text }
        const newPost = new Posts(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

router.get('/edit/:id', async (req, res) => {
    const post = await Posts.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post });
})

router.put('/put/:id', async (req, res) => {
    const { tittle, text } = req.body
    await Posts.findOneAndUpdate({ _id: req.params.id }, { tittle, text })
    res.redirect('/posts');
})

router.delete('/delete/:id', async (req, res) => {
    await Posts.findOneAndDelete({ _id: req.params.id })
    res.redirect('/posts');
});

module.exports = router