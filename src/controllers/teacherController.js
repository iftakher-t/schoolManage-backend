const Teacher = require('../models/Teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { userValidator ,options } = require('../../validator/userValidator')


const createTeacherController = async (req,res)=>{
    try{
        const {error, value }= userValidator.validate(req.body)
        if(error){
            res.status(500).json({
                result: value,
                message: 'validation error',
                Error: error.details[0].message
            })
        }else{

        const teacher = new Teacher(req.body)
        const result = await teacher.save()
            res.status(200).json({
                result: result,
                message: 'teacher saved successfully'
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error create teacher",
            err
        })
    }
}

const updateTeacherInfoController = async (req,res)=>{
    try{
        await Teacher.findByIdAndUpdate(
            { _id : req.params.id },

            { $set: req.body }, 
            { multi : true }
            )
        
        res.status(200).json({
            message: 'teachers data updated successfully ',
            updatedResult: req.body // show new data (req.body)
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error from teacher update",
            err
        })
    }
}

const TeacherdeleteController = async (req,res)=>{
    try{
        const data = await Teacher.findOneAndUpdate(
            {_id:req.params.id},
            { $set:{
                isActive : false
                }
            }
            )
        res.status(200).json({
            result: data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const changeactivityController = async (req,res)=>{
    try{
        const id = req.params.id

        const data = await Teacher.findOneAndUpdate(
            {_id:id},

            {
                $set: {
                    isActive: true
                    }
            }
            )
        
        return res.json({
            message: 'Activity updated success',
            result : data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const allTeacherGetController = async (req,res)=>{
    try{
        const teacher = await Teacher.find()
        if(teacher.length){
            res.status(200).json({
                result: teacher 
            })
        }else{
            res.status(200).json({
                message: 'No teacher yet'
            })
        }
    }catch(err){
        res.status(500).json({
            message : "server error allteacher",
            err
        })
    }
}

const profileImageChangeController = async (req ,res)=>{
    try{
        const update = await Teacher.findByIdAndUpdate(
            {_id:req.params.id},
            { $set:{
                profileImage:req.file.filename
                }
            });
         res.status(200).json({
                message: 'profileImage updated success',
                result : update
            })

    }catch(err){
        res.status(500).json({
            message : "server error up p i",
            err
        })
    }
}


module.exports = { 
    createTeacherController,
    updateTeacherInfoController,
    TeacherdeleteController,
    changeactivityController,
    allTeacherGetController,
    //--------------------

    profileImageChangeController,
    // createAQuestionController,
    //resultGetController

            }
// delete permanent
// router.delete("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       await Ads.findByIdAndDelete(req.params.id);
//       res.status(200).json("Ads has been deleted");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
  // } else {
  //   return res.status(403).json("You can delete only your ads!");
  // }
// });
