
export function responseFailed(req, res, next) {
    res['failedPost'] = function (payload){
        res
            .status(401)
            .json({
                status: 'error', 
                payload,
                message: 'login failed'
            })
        }
    res['failedGet'] = function (payload){
         res
            .status(400)
            .json({
               status: 'error', 
               payload,
               message: 'No hay sesión iniciada aun'
            })
        }    
    res['failedDelete'] = function (){
         res
            .status(500)
            .json({
               status: 'logout error', 
               body: err
            })
        }
    next()
}