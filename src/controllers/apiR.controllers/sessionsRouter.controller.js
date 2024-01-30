//listo

import { autenticarUsuario } from '../../middlewares/autenticar.js';

export async function postSessionsController(req, res) {
  try {
    const { email, password } = req.body;
    const datosUsuario = await autenticarUsuario(email, password);

    req.session.user = datosUsuario;

    return res.json(datosUsuario);
  } catch (error) {
    return res.status(401).json({ status: 'error', message: error.message });
  }
}

export function getCurrentSessionsController(req, res) {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.status(401).json({ status: 'error', message: 'No hay sesión activa' });
}

export function deleteCurrentSessionsController(req, res) {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error al cerrar sesión' });
      }
      return res.json({ status: 'success', message: 'Sesión cerrada exitosamente' });
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
