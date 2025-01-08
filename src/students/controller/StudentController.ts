import StudentService from "../service/StudentService";
import Student from "../model/Student";
import AddStudentDTO from "../dto/AddStudentDTO";
import studentRouter from "../../routes/studentRouter";
import StudentDto from "../dto/StudentDto";
import StudentUpdate from "../dto/StudentUpdate";

export default class StudentController{
    private studentService: StudentService;

    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    addStudent(studentDto: AddStudentDTO): boolean{
        const student: Student = new Student(studentDto.id, studentDto.name, studentDto.password)
        return this.studentService.addStudent(student);
    }

    findStudent(id: number) : StudentDto {
        const target = this.studentService.findStudent(id);
        return new StudentDto(target.id, target.name, target.scores) ;

    }


    deleteStudent(id: number) : StudentDto {
        const target = this.studentService.deleteStudent(id);
        return new StudentDto(target.id, target.name, target.scores) ;
    }

    updateStudent(dataForUpdate: { name: string; password: string }, id: number) : StudentUpdate {
        const target = this.studentService.updateStudent(dataForUpdate, id);
        return new StudentUpdate(target.id, target.name, target.password) ;
    }

    addScore(examName: string, score: number, id: number): boolean {
        return this.studentService.addScore(examName, score, id);
    }

    findByName(name: string) {
        return this.studentService.findByName(name);

    }

    quantityStudents(names: string[]): number {
        return this.studentService.quantityStudents(names)
    }

    findByMinScore(exam: string, minScore: number) : StudentDto[] {
        const result =  this.studentService.findByMinScore(exam, minScore)
        return result.map(s => new StudentDto(s.id, s.name, Object.fromEntries(s.scores)));

    }
}