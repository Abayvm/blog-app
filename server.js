import express from 'express';
import bodyParser from 'body-parser';

const app= express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));;
app.use(express.static("public"));
app.set('view engine', 'ejs');

const blogs = {};

app.get('/', (req, res)=>{
    res.render('index.ejs', {posts: blogs});
})

app.get('/admin', (req, res)=>{
    res.render('admin.ejs', {posts: blogs});
})

app.get('/writeblog', (req, res)=>{
    res.render('write.ejs');
})

app.post('/post', (req, res)=>{
    let title = req.body.title;
    let blogContent = req.body.blog;
    let id = Date.now();
    console.log(Date.now());
    blogs[id] = {title: title, blogContent: blogContent};
    res.redirect('/');
})

app.get('/:id', (req, res)=>{
    let id = req.params.id;

    if(blogs[id]){
        res.render('blog.ejs', { post: blogs[id] });
    }else{
        res.status(404).send('Blog not found');
    }
})

app.get('/editpost/:id', (req, res)=>{
    let id = req.params.id;
    console.log(blogs[id].title);
    if(blogs[id]){
        res.render('edit.ejs', {postEdit: blogs[id].blogContent, postTitle: blogs[id].title, postId: id});
    }else{
        res.status(404).send('Blog not found');
    }
})

app.delete('/delete/:id', (req, res)=>{
    let id = req.params.id;
    if(blogs[id]){}
})


app.listen(port, ()=>{
    console.log(`App is live on prot:${port}`);
})