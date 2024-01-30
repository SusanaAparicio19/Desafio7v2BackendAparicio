
import { UsersManager } from "../models/User.js";
import mongoose from 'mongoose';
import { Schema,model } from 'mongoose'
import { randomUUID } from "node:crypto"
import { hashear, hasheadasSonIguales } from "../utils/cripto.js"


export async function autenticarUsuario(username, password) {
  let datosUsuario;

  if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    datosUsuario = {
      email: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      rol: 'admin'
    };
  } else {
    const usuario = await mongoose.model('User').findOne({ email: username }).lean();

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    
    if (!hasheadasSonIguales(password, usuario.password)) {
      throw new Error('Los datos no coinciden');
    }

    datosUsuario = {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: 'usuario'
    };
  }
  return datosUsuario;
}

