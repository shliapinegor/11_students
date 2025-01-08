export default class Student {
    id: number;
    name: string;
    password: string;
    scores: Map<string, number>;


    constructor(id: number, name: string, password: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.scores = new Map();
    }

    addScore(key: string, value: number) {
        if (this.scores.get(key) !== undefined) {
            throw new Error(`Score is added for ${key}`);
        }
        this.scores.set(key, value);
    }

}