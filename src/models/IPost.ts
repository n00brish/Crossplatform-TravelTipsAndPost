// cardmodels skal representere datamodellene våre

import IComment from "./IComment";

// I i ICard kommer fra c# convensjon og står for interface for 
interface IPost {

    id:  number;
    title: string;
    description: string;
    user:{
        display_name: string;

    };  
    comments?: IComment[];

    //likes: number ;



};
export default IPost;