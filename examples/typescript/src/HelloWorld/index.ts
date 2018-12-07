import { HttpContext, IFunctionRequest } from 'azure-functions-typescript';

export default async function (context: HttpContext, req: IFunctionRequest) {
  context.res = {
    status: 200,
    body: 'Hello from TypeScript!',
  };
}
