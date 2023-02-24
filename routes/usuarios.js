const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check ('id','No es un ID válido').isMongoId(),
    check ('id').custom(existeUsuarioPorId),
    check ('rol').custom( esRoleValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('passw','la contraseña es obligatoria y mayor a 6 letras').isLength({min:6}),
    check('correo','el correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check ('rol').custom( esRoleValido),
    // check('rol','el rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check ('id','No es un ID válido').isMongoId(),
    check ('id').custom(existeUsuarioPorId),
    
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);








module.exports = router;