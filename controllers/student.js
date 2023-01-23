import StudentDataBase from "../models/student.js";

import Joi from "joi";

export const getStudents = async (_req, res) => {
  try {
    const allStudents = await StudentDataBase.find();
    return res.status(200).json(allStudents);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}


const studentSchema = Joi.object({
  regNumber: Joi.number()
    .min(1)
    .max(99)
    .required(),

  name: Joi.string()
    .min(4)
    .max(30)
    .required(),

  grade: Joi.string()
    .min(1)
    .max(1)
    .required()
    .pattern(new RegExp('^[a-zA-Z]$')),

  section: Joi.string()
    .min(1)
    .max(1)
    .required()
    .pattern(new RegExp('^[a-zA-Z]$'))
})


export const createStudent = async (req, res) => {
  const studentDataFromForm = req.body;

  const { error, value } = studentSchema.validate(studentDataFromForm, { abortEarly: false })

  if (error) {
    console.log(error);
    return res.send(error.details);
  }

  const newStudent = new StudentDataBase(studentDataFromForm);

  try {
    await newStudent.save();
    return res.status(201).json(newStudent);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
}

export const deleteStudent = async (req, res) => {

  const id = req.params.id;
  try {
    await StudentDataBase.findByIdAndRemove(id).exec();
    return res.send("Successfully Deleted!");
  } catch (error) {
    return console.log(error);
  }
}


const updateStudentSchema = Joi.object({
  regNumber: Joi.number()
    .min(1)
    .max(99),

  name: Joi.string()
    .min(4)
    .max(30),

  grade: Joi.string()
    .min(1)
    .max(1)
    .pattern(new RegExp('^[a-zA-Z]$')),

  section: Joi.string()
    .min(1)
    .max(1)
    .pattern(new RegExp('^[a-zA-Z]$'))
})

export const updateStudent = async (req, res) => {

  try {

    const updatedStudentData = await updateStudentSchema.validateAsync(req.body);


    const id = req.params.id;


    const data = await StudentDataBase.findByIdAndUpdate(id, updatedStudentData, { useFindAndModify: false })
    if (!data) {
      return res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` });
    }
    return res.send(data);


  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error Update user information" });
  }

}




  //   const studentDataFromForm = req.body;


//   const student = await StudentDataBase.find(req.body.id)

//   const newStudent = new StudentDataBase(studentDataFromForm);

//   try {
//     await newStudent.save();
//     return res.status(201).json(newStudent);
//   } catch (error) {
//     return res.status(409).json({ message: error.message });
//   }
// }



