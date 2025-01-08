import * as fs from "node:fs";
import Student from "../model/Student";

export default class StudentRepository{
    private readonly filePath: string;

    constructor(filePath = './db.txt') {
        this.filePath = filePath;
    }

    readAll(): Student[] {
        try {
            const data = fs.readFileSync(this.filePath, { encoding: 'utf-8' });
            const students = JSON.parse(data) as Student[];
            return students.map(student => {
                const studentInstance = new Student(student.id, student.name, student.password);
                studentInstance.scores = new Map(Object.entries(student.scores || {})); // Преобразуем объект обратно в Map
                return studentInstance;
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }


    writeAll(arg: Student[]): boolean {
        try {
            const data = JSON.stringify(arg.map(student => ({
                ...student,
                scores: Object.fromEntries(student.scores), // Преобразуем Map в объект
            })),null,2);
            fs.writeFileSync(this.filePath, data, { encoding: 'utf-8' });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}