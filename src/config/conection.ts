export const API_VERSION = "v1"

let url = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "http://localhost:8090" //dev
} else {
    url = "http://inf2265e.inf.pucp.edu.pe"; //prod
}

export const BASE_PATH = url
