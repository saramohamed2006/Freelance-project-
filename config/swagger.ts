//swagger options: 

import swaggerJSDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "freelance API",
            version: "1.0.0",
            description: "Document to manage api"
        },
        servers : [{
           url: "http://localhost:5000"} // or "/" (for the current API)
        ]
    },
    apis: ["./routes/*.ts","./models/*.ts"]
}
export const spec=swaggerJSDoc(options)