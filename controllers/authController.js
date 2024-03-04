import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} =req.body
        //Validación
        if(!name){
            return res.send({message: 'El nombre es requerido'});
        }
        if(!email){
            return res.send({message: 'El email es requerido'});
        }
        if(!password){
            return res.send({message: 'La contraseña es requerida'});
        }
        if(!phone){
            return res.send({message: 'El telefono no es requerido'});
        }
        if(!address){
            return res.send({message: 'La dirección es requerido'});
        }

        if (!answer) {
            return res.send({ message: "La respuesta es requerida" });
        }

        //Chequea usuario
        const exisitingUser = await userModel.findOne({email})

        //Existe usuario
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Ya existe este usuario'
            })
        }

        //Registro de usuario
        const hashedPassword = await hashPassword(password)

        //Guardar
        const user = await new userModel({
            name, 
            email, 
            phone, 
            address, 
            password: hashedPassword,
            answer,
          }).save();

        res.status(201).send({
            success:true,
            message:'Usuario registrado satisfactoriamente',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error en el Registro',
            error
        })
    }
};

//POST LOGIN
export const loginController =  async (req, res) => {
    try {
        const {email, password} = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Email o contraseña incorrecta",
            });
        }
        //CHEKEANDO USUARIO
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(404).send({
                success:false,
                message:'El email no esta registrado'
            })
        }
        const match = await comparePassword(password,user.password)
        if (!match){
            return res.status(200).send({
                success:false,
                message:'Contraseña Invalida'
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success:true,
            message:'Inicio de sesión satisfactorio',
            user:{
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error en el inicio de sesión',
            error,
        });
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Email es requerriddo" });
      }
      if (!answer) {
        res.status(400).send({ message: "Respuesta es requerrida" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "La nueva contraseña es requerida" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Correo electrónico o respuesta incorrectos",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Restablecimiento de contraseña exitoso",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Algo salió mal",
        error,
      });
    }
  };

//test controller
export const testController = (req, res) =>{
    try {
        res.send("Ruta protegida");
    } catch (error) {
        console.log(error);
        res.send({error});
    }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    //if (password && password.length < 6) {
      //return res.json({ error: "Passsword is required and 6 character long" });
    //}
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Perfil actualizado con éxito",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error al actualizar el perfil",
      error,
    });
  }
};



//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};