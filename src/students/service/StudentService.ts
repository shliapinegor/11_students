import Student from "../model/Student";
import StudentDto from "../dto/StudentDto";

export default interface StudentService{
    addStudent(student: Student): boolean;

    findStudent(id: number): Student;

    deleteStudent(id: number): Student;

    updateStudent(dataForUpdate: { name: string; password: string }, id: number): Student;

    addScore(examName: string, score: number, id: number): boolean;

    findByName(name: string): StudentDto[];

    quantityStudents(names: string[]): number;

    findByMinScore(exam: string, minScore: number): Student[];
}