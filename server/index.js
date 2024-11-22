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
const isDev = true;
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
      cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    }
  });
  
  const upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/posts', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
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
    origin: 'https://blog.feproldo.ru', // без завершающего слэша
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // если нужны дополнительные методы
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // если нужны дополнительные заголовки
    // credentials: true // если нужен доступ к cookies
};

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(fileUpload());
// app.use('/files', express.static(uploadDir));

// //files

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // Можно добавить уникальные имена
//     }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.array('files', 10), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).send('Ошибка при загрузке файлов.');
//     }

//     const filesData = req.files.map(file => ({
//         name: file.originalname,
//         url: `/files/${file.filename}`,
//         weight: (file.size / 1024).toFixed(2) + ' KB' // Вес файла в килобайтах
//     }));

//     res.json({ files: filesData }); // Возвращаем данные о файлах
// });

//files

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Получаем все посты из базы данных
        res.json(posts); // Отправляем посты в формате JSON
    } catch (error) {
        res.status(500).send('Ошибка при получении постов.');
    }
});

app.post('/createPost', upload.fields([{ name: 'imgs', maxCount: Infinity }, { name: 'files', maxCount: Infinity }]), (req, res) => {
    const { author, text, article, passwd, tags } = JSON.parse(req.body.data);
    //console.log(req.body.data)
    if(!login(passwd)) {
        return res.json({res: false}).status(400)
    }
    var imgs = []
    var files = []
    if (req.files['imgs']) {
      req.files['imgs'].forEach(file => {
        //console.log(`Изображение: ${file.originalname}, URL: /uploads/${file.filename}`);
        imgs.push({
          name: file.originalname,
          url: `/uploads/${file.filename}`
        })
      });
    }
    if (req.files['files']) {
      req.files['files'].forEach(file => {
        //console.log(`Документ: ${file.originalname}, URL: /uploads/${file.filename}`);
        files.push({
          name: file.originalname,
          url: `/uploads/${file.filename}`,
          weight: (Math.round(file.size / 1024 / 1024)) + "Мб"
        })
        //console.log((file.size / 1024 / 1024))
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
    //console.log("delete")
    if(!login(passwd)) {
        return res.json({res: false}).status(400)
    }
    const ress = await deletebyid(id);

  if(ress) {
    res.status(200).send("deleted");
    //console.log("deleted");
  } else {
    res.status(400).send("not deleted");
    //console.log("not deleted 400");
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



app.post('/like', async (req, res) => {
  return res.status(404);
    const { postId, action } = req.body;
    //console.log(action)
    // if(action > 2 || action < -2) return res.status(400);
    if(action != -1 && action != 1) return res.status(400);
    const rate = (await Post.findById(postId).select('rating')).rating;
    const updatedDocument = await Post.findByIdAndUpdate(
        postId, 
        { rating: rate+action }, 
    );
    // if(action == "addLike") {
    //     const updatedDocument = await Post.findByIdAndUpdate(
    //         postId, 
    //         { rating: rate+1 }, 
    //     );
    // }
    // else if(action == "removeDislike") {
    //     const updatedDocument = await Post.findByIdAndUpdate(
    //         postId, 
    //         { rating: rate+1 }, 
    //     );
    // }
    // else if(action == "addDislike" || action == "removeLike") {
    //     const updatedDocument = await Post.findByIdAndUpdate(
    //         postId, 
    //         { rating: rate-1 }, 
    //     );
    // }
    // else if (action == "removeLike") {
    //     const updatedDocument = await Post.findByIdAndUpdate(
    //         postId, 
    //         { rating: rate-1 }, 
    //     );
    // }
    res.status(200)
})
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
    if(passwd == (isDev ? "123" : "feproldo@chiv1337!")) {
        return true;
    }
    else {
        return false;
    }
}


// app.post('/loadImg', (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     let sampleFile = req.files.file;
//     let fileIndex = fs.readdirSync(uploadDir).length + 1;
//     let uploadPath = path.join(uploadDir, `${fileIndex}${path.extname(sampleFile.name)}`);

//     sampleFile.mv(uploadPath, (err) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         res.send('File uploaded!');
//     });
// });
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
  //console.log("deleted");
} else {
  res.status(400).send("not deleted");
  //console.log("not deleted 400");
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

      // Удаляем документы из файловой системы
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
