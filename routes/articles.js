const express = require("express");
const Article = require('./../models/article')
const router = express.Router();

router.get("/new",(req,res)=>{
 res.render("articles/new", { article : new Article()})
})

// for edit 
router.get('/edit/:id',async(req,res)=>{
     const article = await Article.findById(req.params.id)
     if(article ==null)res.redirect('/')
     res.render('articles/edit',{article:article})
})

// for edit put
router.put('/:id',async(req,res,next)=>{
  req.article =await Article.findById(req.params.id)
  next()
},saveArticleAndRedirect('edit'))

router.get('/:slug',async(req,res)=>{
    const article =await Article.findOne({ slug:req.params.slug})
    if(article == null)res.redirect('/')
  res.render('articles/show',{article: article })
})

router.post('/',async(req,res,next)=>{
   req.article = new Article()
   next()
},saveArticleAndRedirect('new'))

     
router.delete('/:id',async(req,res)=>{
 await Article.findByIdAndDelete(req.params.id)
 res.redirect('/')
})
// same funtion 
function saveArticleAndRedirect(path){
  return async(req,res)=>{
      
    let article = req.article

      article.title = req.body.title
      article.description = req.body.description,
      article.markdown = req.body.markdown 
      
    try {
       await article.save()
        .then(()=>{
         console.log("article saved")
        }).catch((e)=>{
         console.log("not saved")
        })
        res.redirect(`/articles/${article.slug}`)
    } catch (error) {
        res.render(`articles/${path}`, {article : article})
    }
  }
}

  
module.exports = router