
export function soloLogueadosApi(req, res, next) {
  if (!req.session.usuario) {
    return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' });
  }
  next();
}
  

export function soloLogueadosWeb(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
      }
    next();
  }

  

export function soloAdmin(req, res, next) {
  if (!req.session.user) {
    return res.status(403).json({ status: 'error', message: 'Acceso no autorizado' });
  }
  next();
}


export function soloRoles(roles = []) {
  return function (req, res, next) {
    if (!req.session.user || !roles.includes(req.session.user.rol)) {
      return res.status(403).json({ status: 'error', message: 'Acceso no autorizado' });
    }
    next();
  };
}



export function isAdmin(username, password) {
        return username === 'adminCoder@coder.com' && password === 'adminCod3r123'
    }
