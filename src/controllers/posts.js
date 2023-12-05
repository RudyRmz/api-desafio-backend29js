
module.exports = {
    getById: async (req, res, next)=>{
        const { id } = req.params
        try {
            let users = await Users.findById(id)
            next({ status: 200, send: { msg: "Publicacion encontrado", data: {} } })
        } catch (error) {
            next({ status: 404, send: { msg: "Publicacion no encontrado" } })
        }
    },
    getAll: async (req, res, next)=>{
        try {
            let users = await Users.find()
            next({ status: 200, send: { msg: "Publicaciones encontrados", data: [] } })
        } catch (error) {
            next({ status: 404, send: { msg: "Publicacion no encontrados" } })
        }
    },
    post: async(req, res, next)=>{
        try {
            let user = await Users.create(req.body)
            next({ status: 201, send: { msg: "Publicacion creado", data: {} } })
        } catch (error) {
            next({ status: 400, send: { msg: "Publicacion no creado", err: error} })
        }
    },
    delete: async(req, res, next)=>{
        const { id } = req.params;
    try {
        let users = await Users.findByIdAndDelete(id)
        next({status: 200, send: { msg: "Publicacion eliminado correctamente" }})
    } catch (error) {
        next({ status: 400, send: { msg: "No se pudo eliminar la publicacion", err: error } })
    }
    }, 
    put: async(req, res, next)=>{
        const { id } = req.params;
    try {
        let updatedUsers = await Users.findByIdAndUpdate(id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            password: req.body.password
        },
        { new: true }
        );
        next({ status: 201, send: { msg: "Publicacion actualizado correctamente", data: {} } });
    } catch (error) {
        next({status: 400, send: { msg: "No se pudo actualizar la publicacion", err: error }})
    }
    }
}