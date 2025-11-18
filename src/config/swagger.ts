// src/config/swagger.js
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import swaggerFile from '../openapi.json';

import { NextFunction, Request, Response } from 'express';

const swaggerSetup = (app: any) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.get(
    '/openapi.json',
    async (req: Request, res: Response, next: NextFunction) => {
      // #swagger.ignore = true;
      const options = {
        openapi: '3.0.0',
        disableLogs: true,
        writeOutputFile: true
      };
      const outputFile = './openapi.json';
      const routes = ['./app.ts'];
      const doc = {
        info: {
          title: 'UMC 9th',
          description: 'UMC 9th Node.js 테스트 프로젝트입니다.'
        },
        host: 'localhost:3000'
      };

      const result = await swaggerAutogen(options)(outputFile, routes, doc);
      res.json(result ? result.data : null);
    }
  );
};

export default swaggerSetup;
