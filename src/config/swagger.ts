import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Users Tasks",
			version: "1.0.0",
			description: "API Rest For Users Tasks",
		},
	},
	apis: ["swagger.yml"],
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
