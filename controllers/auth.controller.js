const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require ('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const login =async (req, res = response) =>{

    const{correo, passw}=req.body;
    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        
        // Si el usuario está activo 
        
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }


        // verificar la constraseña
        const validPassw = bcryptjs.compareSync(passw,usuario.passw)
        if (!validPassw){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - passw'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg:  'Login ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:  'Comuniquese con el administrador'
        });
    }
}



module.exports ={
    login
}