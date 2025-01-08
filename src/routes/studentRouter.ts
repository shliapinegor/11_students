import {Router} from "express";
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentController from "../students/controller/StudentController";
import AddStudentDTO from "../students/dto/AddStudentDTO";
import {body, param} from "express-validator";
import validationMiddleware from "../middleware/validationMiddleware";
import expressAsyncHandler from "express-async-handler";
import exp from "node:constants";

const router = Router();

 const studentService = new StudentServiceImpl();
 const studentController = new StudentController(studentService)

router.post('/student',
    body('id').isInt({min: 1}),
    body('name').isAlpha(),
    body('password').notEmpty().isString(),
    validationMiddleware, expressAsyncHandler(async (req, res) => {
    const studentDto = req.body as AddStudentDTO;
    const isSuccess = studentController.addStudent(studentDto);
    res.status(200).send(isSuccess)
}))

router.route('/student/:id')
    .get(
        param('id').isInt({min: 1}),
        validationMiddleware,
        expressAsyncHandler(async (req, res) => {
            const id = +req.params.id;
            const result = studentController.findStudent(id);
            res.status(200).send(result)
        })
    )
    .delete(
        param('id').isInt({min: 1}),
        validationMiddleware,
        expressAsyncHandler(async (req, res) => {
            const id = +req.params.id;
            const result = studentController.deleteStudent(id);
            res.status(200).send(result)
        })
    )
    .put(body('name').optional().notEmpty().isString(),
        body('password').optional().notEmpty().isString(),
        param('id').isInt({min: 1}),
        validationMiddleware,
        expressAsyncHandler(async (req, res) => {
            const id = +req.params.id;
            const dataForUpdate = req.body as {name: string, password: string}
            const result = studentController.updateStudent(dataForUpdate, id);
            res.status(200).send(result)
        })
    )

router.put('/score/student/:id',
    body('examName').notEmpty().isString(),
    body('score').isInt({min: 0, max: 100}),
    param('id').isInt({min: 1}),
    validationMiddleware,
    expressAsyncHandler(async (req, res) => {
        const id = +req.params.id;
        const dataForUpdate = req.body as {examName: string, score: number}
        const result = studentController.addScore(dataForUpdate.examName, dataForUpdate.score, id);
        res.status(200).send(result)
    })
    )

router.get('/students/name/:name',
    param('name').notEmpty().isString().isAlpha(),
    validationMiddleware,
    expressAsyncHandler(async (req, res) => {
        const name = req.params.name.toString();
        const result = studentController.findByName(name);
        res.status(200).send(JSON.stringify(result))
    }))

router.post('/quantity/students',
    body().isArray(),
    validationMiddleware,
    expressAsyncHandler(async (req, res) => {
        const names = req.body as string[];
        const result = studentController.quantityStudents(names);
        res.status(200).send(`Quantity os students: ${result}`)
    })
    )

router.get('/students/exam/:exam/minscore/:minScore',
    param('exam').notEmpty().isString(),
    param('minScore').isInt({min: 0, max: 100}),
    validationMiddleware,
    expressAsyncHandler(async (req, res) => {
        const exam = '' + req.params.exam;
        const minScore = +req.params.minScore;
        const result = studentController.findByMinScore(exam, minScore);
        res.status(200).send(result)
    }))


export default router;