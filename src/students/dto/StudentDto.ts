export default class StudentDto {
    id: number;
    name: string;
    scores: object


    constructor(id: number, name: string, scores: object) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }

}