import express from "express";
import helmet from "helmet";
import expressHandlebars from "express-handlebars";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import config from "./config/config.js";

import MongoStore from "connect-mongo";
import singleton from "./config/singleton.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";

import __dirname from "./utils.js";
import { Server } from "socket.io";

import passport from "passport";
import initializedPassport from "./config/passport.config.js";

import ProductRouter from "./routes/product.router.js";
import CartRouter from "./routes/cart.router.js";
import UserRouter from "./routes/users.router.js";
import presupuestosRouter from "./routes/presupuestos.router.js";
import ticketRouter from "./routes/ticket.router.js";
import emailRouter from "./routes/email.router.js";

import sessionsRouter from "./routes/sessions.router.js";
import usersViewRouter from "./routes/users.views.router.js";
import viewRouter from "./routes/view.router.js";
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import jwtRouter from "./routes/jwt.router.js";
import PDFkit from "./routes/PDFKit.router.js";

import MessagesManager from "./services/dao/mongoManager/messageManagerMongo.js";
import ProductManager from "./services/dao/mongoManager/productManagerMongo.js";

import ProductMockup from "./routes/mockingproducts.router.js";
import { addLogger } from "./config/logger_CUSTOM.js";
import loggerRouter from "./routes/logger.router.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express";
import PresupuestosController from "./routes/presupuestos.router.js";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

// Configurar Helmet para CSP y Referrer Policy
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "https://cdn.jsdelivr.net/npm/sweetalert2@11",
//           "/socket.io/socket.io.js",
//           "https://cdn.jsdelivr.net", // Permite scripts de jsdelivr
//           "https://cdnjs.cloudflare.com", // Permite scripts de cdnjs,
//         ],
//         styleSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://example.com",
//           "https://cdn.jsdelivr.net",
//         ],
//         imgSrc: ["'self'", "data:", "https://example.com"],
//         fontSrc: [
//           "'self'",
//           "https://datacom-web.vercel.app/css/fonts/",
//           "https://example.com",
//         ],
//         connectSrc: ["'self'", "https://example.com"], // Añade otras fuentes específicas aquí
//         objectSrc: ["'none'"],
//         frameSrc: ["'none'"],
//       },
//     },
//     referrerPolicy: { policy: "strict-origin-when-cross-origin" },
//   })
// );

/*=================
|    HANDLEBARS   |
=================*/
app.set("views", __dirname + "/views");
app.engine(
  "handlebars",
  expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

/*================
|      SERVER    |
================*/
const PORT = process.env.PORT || config.port;
const MONGO_url = config.mongoUrl;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//LOGGER Global
app.use(addLogger);

//CONECTAR A BASE DE DATOS CON PATRON SINGLETON
const ConnectMongoDB = async () => {
  try {
    await singleton.getInstance();
  } catch (error) {
    console.log(error);
  }
};
ConnectMongoDB();

const httpserver = app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});

/*==============
|    SWAGGER   |
==============*/

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentancion API Supermarket",
      description: "Documentacion para uso de Swagger",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

/*===============   
|    SESSIONS   |
===============*/
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60,
    }),
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

/*===================
|      PASSPORT     |
===================*/
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

/*=====================
|      BODY PARSER    |
=====================*/
app.use(bodyParser.text({ type: "text/html" }));

/*=================
|      ROUTES     |
=================*/
app.use(`/api/products`, ProductRouter);
app.use(`/api/carts`, CartRouter);
app.use("/api/users", UserRouter);
app.use(`/api/presupuestos`, presupuestosRouter);
app.use(`/api/sessions`, sessionsRouter);
app.use("/api/ticket", ticketRouter);
app.use("/users", usersViewRouter);
app.use("/", viewRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/email", emailRouter);
app.use("/mockingproducts", ProductMockup);
app.use("/apidocs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs));
app.use("/loggerTest", loggerRouter);
app.use("/PDFkit", PDFkit);

/*================================
|   SOCKET SERVER CONECCTION      |
=================================*/
const socketServer = new Server(httpserver);

//SE ABRE CANAL
socketServer.on("connection", (socket) => {
  /*  |        CHAT       | */
  //CONVERSACION EN ARRAY
  const messagesManager = new MessagesManager();
  const mensajes = [];

  //RECIBE
  socket.on("message", async (data) => {
    mensajes.push(data);
    console.log(data);
    await messagesManager.createMessage(data);
    //EMITE
    socketServer.emit("conversacion", mensajes);

    console.log(mensajes);
  });
  socket.on("userConnected", (data) => {
    console.log(data);
    socket.broadcast.emit("userConnected", data);
  });
  socket.on("closeChat", (data) => {
    if (data.close == "close") {
      socket.disconnect();
    }
  });
});
