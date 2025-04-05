const express = require('express');
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs')
const mongoose = require('mongoose');
const multer = require('multer')
const moment = require('moment-timezone');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const PORT = 3005;
const isDev = false;
const server = isDev ? "http://localhost:3005" : "https://blogapi.feproldo.ru";

// const uploadDir = '/uploads';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Указываем папку для загрузки
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/posts', {}).then(() => {
    console.log('Успешно подключено к базе данных');
}).catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
});

const postSchema = new mongoose.Schema({
    // index: Number,
    author: {
        img: String,
        name: String
    },
    text: String,
    imgs: [{
        name: String,
        url: String
    }],
    files: [
        {
            name: String,
            url: String,
            weight: String
        }
    ],
    tags: [String],
    rating: Number,
    article: String,
    date: Date
});

const Post = mongoose.model('Post', postSchema, 'posts');


const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  id: String,
  date: Date
});

const Article = mongoose.model('Article', articleSchema, 'articles');


app.use(express.json());
const corsOptions = isDev ? null : {
    origin: 'https://blog.feproldo.ru',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).send('Ошибка при получении постов.');
    }
});

app.post('/createPost', upload.fields([{ name: 'imgs', maxCount: Infinity }, { name: 'files', maxCount: Infinity }]), (req, res) => {
    const { author, text, article, passwd, tags } = JSON.parse(req.body.data);
    if(!login(passwd)) {
        return res.json({res: false}).status(400)
    }
    var imgs = []
    var files = []
    if (req.files['imgs']) {
      req.files['imgs'].forEach(file => {
        imgs.push({
          name: file.originalname,
          url: `/uploads/${file.filename}`
        })
      });
    }
    if (req.files['files']) {
      req.files['files'].forEach(file => {
        files.push({
          name: file.originalname,
          url: `/uploads/${file.filename}`,
          weight: (Math.round(file.size / 1024 / 1024)) + "Мб"
        })
      });
    }
    const tagss = tags.split(' ')
    const post = new Post({
        text: text,
        author: author,
        imgs: imgs,
        files: files,
        rating: 0,
        tags: tagss,
        article: article,
        date: moment().tz('Asia/Yekaterinburg').toDate()
    })
    post.save()
    res.send("ok")
});




app.post('/deletePost', async (req, res) => {
    const { id, passwd } = req.body;
    if(!login(passwd)) {
        return res.json({res: false}).status(400)
    }
    const ress = await deletebyid(id);

  if(ress) {
    res.status(200).send("deleted");
  } else {
    res.status(400).send("not deleted");
  }
});

app.post('/login', (req, res) => {
    const { passwd } = req.body;
    if(login(passwd)) {
        res.json({res: true}).status(200)
    }
    else {
        res.json({res: false}).status(400)
    }
})



// app.post('/like', async (req, res) => {
//   return res.status(404);
//     const { postId, action } = req.body;
//     //console.log(action)
//     if(action != -1 && action != 1) return res.status(400);
//     const rate = (await Post.findById(postId).select('rating')).rating;
//     const updatedDocument = await Post.findByIdAndUpdate(
//         postId, 
//         { rating: rate+action }, 
//     );
//     res.status(200)
// })
app.post('/article', async (req, res) => {
  const { id } = req.body;

  try {
    const article = await Article.findOne({ id: id }).select('title content date');
    if (!article) {
      return res.status(404).send('Article not found');
    }
    const htmlContent = md.render(article.content);

      res.json({
          title: article.title,
          content: htmlContent,
          date: article.date
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving article');
  }
});

function login(passwd) {
    if(passwd == (isDev ? "123" : "passwd (bruh, i show it...)")) {
        return true;
    }
    else {
        return false;
    }
}
async function deletebyidA(id) {
  try {
    const deletedArticle = await Article.findOneAndDelete({ id: id });
  } catch (error) {
    //console.error('Ошибка при удалении документа:', error);
    return false;
  }
}
app.post('/deleteArticle', async (req, res) => {
  const { id, passwd } = req.body;
  if(!login(passwd)) {
      return res.json({res: false}).status(400)
  }
  const ress = await deletebyidA(id);

if(ress) {
  res.status(200).send("deleted");
} else {
  res.status(400).send("not deleted");
}
});
async function deletebyid(id) {
  try {
    const result = await Post.findByIdAndDelete(id);
    if (result) {
      // Удаляем изображения из файловой системы
      result.imgs.forEach(img => {
        const filePath = path.join(__dirname, img.url);
        fs.unlink(filePath, err => {
          if (err) {
            //console.error('Ошибка при удалении изображения:', err);
          }
        });
      });

      result.files.forEach(file => {
        const filePath = path.join(__dirname, file.url);
        fs.unlink(filePath, err => {
          if (err) {
            //console.error('Ошибка при удалении документа:', err);
          }
        });
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    //console.error('Ошибка при удалении документа:', error);
    return false;
  }
}
app.post('/createArticle', upload.fields([{ name: 'imgs', maxCount: Infinity }]), async (req, res) => {
  const { title, content, id, passwd } = JSON.parse(req.body.data);
  if(!login(passwd)) {
      return res.json({res: false}).status(400)
  }
  const documentExists = await Article.findOne({ id: id });
  if(documentExists) return res.json({text: "Already exist"}).status(400)
  const files = req.files['imgs'] || [];

  let updatedContent = content;
  files.forEach((file, index) => {
    const imageUrl = `/uploads/${file.filename}`;
    console.log(index + ` (img${index}.feproldo) ` + imageUrl)
    // updatedContent = updatedContent.replaceAll(`(img${index}.feproldo)`, "("+server+imageUrl+")");
    updatedContent = updatedContent.replaceAll(`file${index}.feproldo`, server+imageUrl)
    console.log("\n"+updatedContent)
  });
  

  const newArticle = new Article({
    title,
    content: updatedContent,
    id,
    date: moment().tz('Asia/Yekaterinburg').toDate()
  });

  try {
    await newArticle.save();
    res.status(201).send('Article created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating article');
  }
});

app.listen(PORT, () => {
    //console.log(`Сервер запущен на порту ${PORT}`);
});
