import express, {Application, NextFunction, Request, Response} from 'express'
import studentRouter from "./routes/studentRouter";
import validationMiddleware from "./middleware/validationMiddleware";


const app: Application = express();

const PORT = 8080;

app.use(express.json());


app.use('/', studentRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(404).json({
        message: err.message,
        timestamp: new Date().toUTCString(),
        status: 404,
        error: "Not Found",
        path: req.path
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})