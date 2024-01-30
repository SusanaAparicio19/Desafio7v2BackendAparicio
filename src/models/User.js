


import mongoose from 'mongoose';
import { Schema,model } from 'mongoose'
import { randomUUID } from "node:crypto"
import { hashear, hasheadasSonIguales } from "../utils/cripto.js"

const collection = 'usuarios'
const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
},{
  strict: 'throw',
  versionKey: false,
  methods: {
    infoPublica: function () {
      return {
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
      }
    }
  },
  statics: {
    registrar: async function (reqBody) {
      reqBody.password = hashear(reqBody.password)
      const creado = await mongoose.model(collection).create(reqBody)

      const datosUsuario = {
        email: creado.email,
        nombre: creado.nombre,
        apellido: creado.apellido,
        rol: 'usuario'
      }

      return datosUsuario
    },
    buscarSession: function (req, res) {
      if (req.session['user']) {
        return res.json(req.session['user'])
      }
       res.status(400).json({ status: 'error', message: 'No hay sesion iniciada aun' })
    },
    buscarUsuario: async function (req, res) {
      const user = req.session['user'];
      
      if (user) {
        const usuario = await UsersManager.findOne({ email: user.email }, { password: 0 }).lean();
        res.json({ status: 'success', payload: usuario });
      } else {
        res.status(400).json({ status: 'error', message: 'El Usuario no esta Logueado' });
      }
    },
    resetearContrasenia: async function (email, password) {
      const newPassword = hashear(password)

      const actualizado = await mongoose.model(collection).findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean()

      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }

      return actualizado
    },
    //logout
    deleteSession: function (req, res) {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ status: 'logout error', body: err })
        }
        res.json({ status: 'success', message: 'logout OK' })
        })
    }
  }
})

export const UsersManager = model('usuarios', userSchema)
