///////////////////////////////////////////////////////////////////////////////////////////////
// // Add photo

// app.post('/api/admin/upload',
// upload.fields([{ name: 'imgUrl', maxCount: 1 }]),  //multer files upload
//     (req, res) =>{
//         var errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(500).send({errors: errors.mapped()});
//         }
//         var filename = null;
//         if(req.files && req.files.imgUrl && req.files.imgUrl[0]) {
//             filename = req.files.imgUrl[0].filename;
//         }
// PicArea.create({
//     imgUrl: filename
// })
//     .then(function(test) {
//     console.log("Pic is uploaded")
//     res.send(tes);g
// })

        // // var area = new PicArea(req.body);
        // // area.imgUrl = filename;
        // // area
        //     // .save()
        //     .then(savedarea =>{
        //         res.json(savedarea);
        //     })
        //     .catch(err => {
        //         res.status(404).send(err);
            // });
        }
        // );
        
    // //set storage Engine
    //     var storage = multer.diskStorage({
    //         destination: function(req, file, cb) {
    //           cb(null, path.resolve(__dirname, "../uploads"));
    //         },
    //         filename: function(req, file, cb) {
    //           const extension = mime.extension(file.mimetype);
    //           let filename='';
    //           if (req.body.title) {
    //              filename = req.body.title + "-" + Date.now().toString();
    //           }else if (req.body.name) {
    //              filename = req.body.name + "-" + Date.now().toString();
    //           }else{
    //              filename = file.originalname + "-" + Date.now().toString();      
    //           }
    //           cb(null, filename + "." + extension);
    //         }
    //       });
          
    //       //this is for uploading photo
    //       var upload = multer({ storage: storage }).single('myImage')
    
    //       adminController(router,auth);
    
    //add photo
    
    // app.post('/api/admin/upload', upload.single("imgUrl"), function(req, res, next){
    
    // })
    
    // var cpUpload = upload.fields([{name: "imgUrl", maxCount: 1}])
    // app.post('/api/admin/upload', cpUpload, (req, res) =>{
    //     var errors = validationResult(req);
    //     if(!errors.isEmpty()) {
    //      return res.status(500).send({errors: errors.mapped()});
    //     }
    //     var filename = null;
    //     if(req.files && req.files.imgUrl && req.files.imgUrl[0]) {
    //     filename = req.files.imgUrl[0].filename;
    //     }
    //     var area = new PicArea(req.body);
    //     area.imgUrl = filename;
    //     area
    //     .save()
    //     .then(savedarea =>{
    //     res.json(savedarea);
    //     })
    //     .catch(err => {
    //     res.status(404).send(err);
    //     });
    // });
        
    // // set storage Engine
    // var storage = multer.diskStorage({
    // destination: function(req, file, cb) {
    // cb(null, path.resolve(__dirname, "../uploads"));
    // },
    // filename: function(req, file, cb) {
    // const extension = mime.extension(file.mimetype);
    //         let filename='';
    //         if (req.body.title) {
    //            filename = req.body.title + "-" + Date.now().toString();
    //        }else if (req.body.name) {
    //              filename = req.body.name + "-" + Date.now().toString();
    //            }else{
    //             filename = file.originalname + "-" + Date.now().toString();      
    //           }
    //           cb(null, filename + "." + extension);
    //        }
    //       });
          
    //     //this is for uploading photo
    //     var upload = multer({ storage: storage })
    
    
    