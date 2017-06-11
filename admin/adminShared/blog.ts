export class Blog {
    constructor(
        public title: string,
        public content: string,
        public location: string,
        public host: string,
        public tags: string,
        public category: string,
        public imgTitle?: string,
        public img?: any,
        public imgDesc?: string,
        public id?: string
    ){}

}