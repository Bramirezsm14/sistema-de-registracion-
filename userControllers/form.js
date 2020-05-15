const fs = require('fs')
const path = require('path')
const bcrypt=require('bcrypt')
/**Aca esta la conversion de la B.D a un objeto de JS */
let rutasJson = path.join(__dirname,'../data/store.json');
let jsonDb = fs.readFileSync(rutasJson,'utf-8')|| "[]";
let usersJs= JSON.parse(jsonDb)


 const controller ={

    register:(req,res)=> res.render('registro'),
         
    store:(req, res,next) =>{
        let newUser = {
            id:1,//(jsonDb==''? 1:usersJs[usersJs.length - 1].id + 1), problema 1 
            nombre:req.body.name,
            apellido:req.body.apellido,
            email: req.body.email,
            contraseña:bcrypt.hashSync(req.body.contraseña,10),
            rcontraseña:bcrypt.hashSync(req.body.rcontraseña,10), 
            image:req.files[0].filename }
            let newDB= [...usersJs,newUser] 
        fs.writeFileSync(rutasJson,JSON.stringify(newDB, null, ' '))
        res.redirect('/users/profile')
    },
    login: (req,res)=> res.render('login'),  
     
    auth:(req,res)=> //problema 2 
    {
        let usuarioEncontrado=usersJs.find(usuario=>req.body.mail==usuario.email)// para traer al usuario 
        console.log(usuarioEncontrado);
        
         let autorizado= bcrypt.compareSync(req.body.password,usuarioEncontrado)
         autorizado?res.redirect('/users/profile'):res.render('login')
        

    },
    profile:(req,res) => res.render('profile')
         

}
    module.exports = controller;
           
        
            
         
        
        

   
        
    
           
    
      




    





