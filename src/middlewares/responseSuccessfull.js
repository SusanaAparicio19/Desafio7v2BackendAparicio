
export function responseSuccessfull(req, res, next) {
    res['successfullPost'] = function (payload){
        res
            .status(201)
            .json({
                status: 'success', 
                payload,
                message: 'login OK'
            })
        }
    res['successfullGet'] = function (payload){
         res
            .status(201)
            .json({
               status: 'success', 
               payload
            })
        }    
    res['successfullDelete'] = function (){
         res
            .status(204)
            .json({
               status: 'success', 
               
            })
        }
    res['successfullLogout'] = function (){
         res
            .status(201)
            .json({
               status: 'success',
               message: 'logout OK' 
            })
        }
    next()
}