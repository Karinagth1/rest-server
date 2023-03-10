const{response, request} =require('express');

const usuariosGet= (req=request, res=response) => {
    
    const {q, nombre='No name',apikey,page =1,limit} = req.query;
    
    res.json({
        // res.status (403).json
        // ok:true, 
        msg:'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });

}

const usuariosPost=(req, res=response) => {
    // const body = req.body;
    const {nombre, edad} = req.body;

    res.json({
        // ok:true,
        // res.status(201).json
        msg:'post API  - controlador',
        nombre,
        edad
    });
}
const usuariosPut=(req, res=response=response) => {
    const {id}= req.params;
    res.json({
        // res.status(500).json
        // ok:true,
        msg:'put API  - controlador',
        id
    });
}


const usuariosPatch=(req, res=response) => {
    res.json({
        // ok:true,
        msg:'patch API  - controlador'
    });
}

const usuariosDelete=(req, res=response) => {
    res.json({
        // ok:true,
        msg:'delete API  - controlador'
    });
}




module.exports ={
    usuariosGet,
    usuariosPost, 
    usuariosPut,
    usuariosPatch,
    usuariosDelete 
}