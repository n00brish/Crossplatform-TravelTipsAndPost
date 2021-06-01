import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import IPost from "../models/IPost";
//  {}: ipostccard: ønsker å få parametere id osv. Skal arve fra Interfacet Ipostcard


const PostCard = ({id, title, description, user}: IPost) =>{
    return (
        <IonCard > 
              <IonCardContent>
              <img src= "assets/appbilde2.jpg"/> 
              </IonCardContent>
            <IonCardHeader>
              <IonCardTitle>

                {title} 
              </IonCardTitle>
              <IonCardSubtitle> 
                @ {user.display_name} &bull; ?? likes
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent> 
              {description}
            </IonCardContent>

          </IonCard>
    )
};
export default PostCard;
 // fra rad 15 og ned gjennom komponenten kalles post.username 
