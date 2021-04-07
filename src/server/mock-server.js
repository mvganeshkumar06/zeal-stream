import { createServer, Model, Factory } from "miragejs";
import faker from "faker";

const createMockServer = () => {
    createServer({
        models: {
            video: Model,
        },
        factories: {
            video: Factory.extend({
                id: faker.datatype.uuid,
                name: faker.lorem.words,
                channel: {
                    id: faker.datatype.uuid,
                    name: faker.lorem.word,
                    avatar: faker.random.image,
                },
                views: faker.finance.creditCardCVV,
                duration: faker.datatype.number,
                uploadTime: faker.finance.creditCardCVV,
            }),
        },
        routes() {
            this.get("/videos", (schema) => {
                return schema.all("video");
            });
        },
        seeds(server) {
            server.createList("video", 8);
        },
    });
};

export default createMockServer;
