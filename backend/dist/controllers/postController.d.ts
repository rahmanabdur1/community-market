import { Request, Response } from 'express';
export declare const createPost: (req: any, res: Response) => Promise<void>;
export declare const getPosts: (req: Request, res: Response) => Promise<void>;
export declare const getPostById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addComment: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePost: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=postController.d.ts.map