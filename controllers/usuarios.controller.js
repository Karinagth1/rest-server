const{response, request} =require('express');
const bcryptjs = require('bcryptjs');
const Usuario=require('../models/usuario');

const usuariosGet= async(req=request, res=response) => {
    const { limite =5, desde =0} =req.query;
    // const {q, nombre='No name',apikey,page =1,limit} = req.query;
    const query = {estado: true};
/*  const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
 */    
    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    
    ]);
    res.json({
        // res.status (403).json
        // ok:true, 
        // msg:'get API - controlador',
        total,
        usuarios
    });

}

const usuariosPost=async(req, res=response) => {
    
    // const body = req.body;
    const {nombre,correo, passw, rol} = req.body;
    const usuario = new Usuario({nombre,correo, passw,rol});
    
    // Encriptar la contraseña
    const salt =bcryptjs.genSaltSync();
    usuario.passw = bcryptjs.hashSync(passw,salt)
    
    // guardar constraseña
    await usuario.save();
    
    res.json({
        // ok:true,
        // res.status(201).json
        // msg:'post API  - controlador',
        usuario
    });
}
const usuariosPut= async (req, res=response) => {
    const {id}= req.params;
    const {_id, passw,google,correo,...resto}=req.body;
    //TODO validar contra bd
    if (passw){
        // Encriptar la contraseña
        const salt =bcryptjs.genSaltSync();
        resto.passw = bcryptjs.hashSync(passw,salt)  
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
}


const usuariosPatch=(req, res=response) => {
    res.json({
        // ok:true,
        msg:'patch API  - controlador'
    });
}

const usuariosDelete=async(req, res=response) => {
    const {id}=req.params;


    // Fisicamente lo borramos
    // const usuario =await Usuario.findByIdAndDelete(id); //no recomendado debido ah que se elimina el contacto completo y no se puede recuperar información de modificaciones o aporte sque alla hecho este 
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});





    res.json({
        // ok:true,
        //msg:'delete API  - controlador'
        usuario
    });
}




module.exports ={
    usuariosGet,
    usuariosPost, 
    usuariosPut,
    usuariosPatch,
    usuariosDelete 
}