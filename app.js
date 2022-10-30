const express = require("express")
const app = express()
app.set("port", process.env.PORT || 8080)
const morgan = require("morgan")
const cors = require('cors')
const api = require('./routers/api')
app.use(cors())

app.use(morgan("dev"))
// const low = require("lowdb")
// post 사용
const bodyParser =  require('body-parser')
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json());

/** swagger 설치용 코드 */
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const option = require("./src/swagger")

const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

// https://www.youtube.com/watch?v=S8kmHtQeflo
/** ----------------------- */


const nunjucks = require("nunjucks")
const path = require("path")

app.set('view engine', 'html')
nunjucks.configure('views', {
    express : app,
    watch : true,
})

app.use(express.static(path.join(__dirname, "html")))

app.get("/", (req, res,next) => {
    console.log("접속")
    res.render(express.static(path.join(__dirname, "./html/index.html")))
});

app.use("/api", api)




app.listen(app.get("port"), () => {
    console.log("서버 작동중.")
})


