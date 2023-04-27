import AdminJS, { ListActionResponse, RecordActionResponse } from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AdminJSExpress from "@adminjs/express";
import "./Models/guild";
import "./Models/user";

const AdminJSUsers = mongoose.model("adminjs-users", <any>{
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "restricted"], required: true },
});

dotenv.config();

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const start = async () => {
  const connection = await mongoose.connect(process.env.MongoDB);
  const app = express();

  const adminJs = new AdminJS({
    resources: [
      {
        resource: AdminJSUsers,
        options: {
          navigation: {
            icon: "Fire",
            name: "Settings",
          },
          actions: {
            new: {
              isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
              before: async (request) => {
                if (request.payload?.password) {
                  request.payload.password = bcrypt.hash(
                    request.payload.password,
                    10
                  );
                }
                return request;
              },
            },
            show: {
              after: async (response: RecordActionResponse) => {
                response.record.params.password = "";
                return response;
              },
            },
            edit: {
              before: async (request) => {
                if (request.method === "post") {
                  if (request.payload?.password) {
                    request.payload.password = bcrypt.hash(
                      request.payload.password,
                      10
                    );
                  } else {
                    delete request.payload?.password;
                  }
                }
                return request;
              },
              after: async (response: RecordActionResponse) => {
                response.record.params.password = "";
                return response;
              },
            },
            list: {
              after: async (response: ListActionResponse) => {
                response.records.forEach((record) => {
                  record.params.password = "";
                });
                return response;
              },
            },
          },
          properties: {
            password: {
              isVisible: {
                list: false,
                filter: false,
                show: false,
                edit: true,
              },
            },
          },
        },
      },
    ],
    databases: [connection],
    rootPath: "/admin",
  });

  const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const ADMINShkour = {
        email: process.env.AdminUser,
        password: process.env.AdminPassword,
      };

      if (email === ADMINShkour.email && password === ADMINShkour.password) {
        return Promise.resolve(ADMINShkour);
      }

      const user = await AdminJSUsers.findOne({
        email: email,
      });
      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword:
      "somasd1nda0a423fsdff23rxfwe65f4we65weef46wef3f23sssjsdhb21uy3g",
    maxRetries: {
      count: 5,
      duration: 120,
    },
  });

  app.use(adminJs.options.rootPath, router);
  app.listen(process.env.Port, () =>
    console.log(`AdminJS is running under localhost:${process.env.Port}/admin`)
  );
};
start();
