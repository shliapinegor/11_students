import StudentService from "./StudentService";
import Student from "../model/Student";
import StudentsRepository from "../dao/StudentsRepository";
import StudentDto from "../dto/StudentDto";

export default class StudentServiceImpl implements StudentService{
    private studentRepository = new StudentsRepository();
     

    addStudent(student: Student): boolean {
        const students = this.studentRepository.readAll();
        const target = students.find(s => s.id === student.id);
        if(target){
            throw new Error('Student with current ID is already exist')
        }
        students.push(student);
        return this.studentRepository.writeAll(students);
    }

    findStudent(id: number): Student {
        const students = this.studentRepository.readAll();
        const target = students.find(s => s.id === id);
        if(!target){
            throw new Error(`Student with id ${id} not found`)
        }
        return target
    }

    deleteStudent(id: number): Student {
        const students = this.studentRepository.readAll();
        const index = students.findIndex(s => s.id === id);
        if(index === -1){
            throw new Error(`Student with id ${id} not found`)
        }
        const [victim] = students.splice(index, 1);
        this.studentRepository.writeAll(students)
        return victim
    }

    updateStudent(dataForUpdate: { name: string; password: string }, id: number): Student {
        const students = this.studentRepository.readAll();
        const index = students.findIndex(s => s.id === id);
        if(index === -1){
            throw new Error(`Student with id ${id} not found`)
        }
        const updatedStudent = Object.assign(students[index], dataForUpdate);
        students[index] = updatedStudent;
        this.studentRepository.writeAll(students);
        return updatedStudent;
    }

    addScore( examName: string, score: number, id: number): boolean {
        const students: Student[] = this.studentRepository.readAll();
        const index = students.findIndex(s => s.id === id);
        if (index < 0) throw new Error(`Student with id ${id} not found`);
        students[index].addScore(examName, score)
        this.studentRepository.writeAll(students);
        return true;
    }

    findByName(name: string): StudentDto[] {
        const students: Student[] = this.studentRepository.readAll();
        return students.filter(s => s.name.toLowerCase() === name.toLowerCase()).map(s => s as StudentDto)
    }

    quantityStudents(names: string[]): number {
        const students: Student[] = this.studentRepository.readAll();
        return students.filter(s => names.includes(s.name)).length;
    }

    findByMinScore(exam: string, minScore: number): Student[] {
        const students: Student[] = this.studentRepository.readAll();
        return students.filter(s => s.scores.get(exam)! >= minScore)
    }

}