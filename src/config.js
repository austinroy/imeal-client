require('dotenv').config();

const env = {
    API_URL : process.env.API_URL || "http://localhost:8080"
}

export default env; 