import React from "react"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonList, IonItem, IonAvatar, IonButton, IonBackButton } from "@ionic/react";
import PostCard from "../components/PostCard";
import IPost from "../models/IPost";

const Detail = (props: any) => {
  // lager en variabel post som skal arve (bruke) interfacet IpostCrad
  // dataen til variabelen bak = henter vi location via props. Der får vi tilgang til Stateobjektet i Home.tsx.
  // så da skrives state.post som henter fra  state:{post} i Home som er der vi navigerer fra og der arreyet med infoen ligger
  // uten state.post ville vi fått en card uten noe spesefik info
  // videre ned herfra kan jeg da bruke <PostCardInfo{...post}/> som gjør at jeg henter dataen
  // til PostCardet jeg trykker på. I stedenfor at det kommer opp samme side eller en hardkodet en
  // jeg tar ? bak location og state for å unngå feilmelding

  const post: IPost = props.location?.state?.post;

  if (!post){
    return <div></div>;
  }
  
    return (
    <IonPage>
     <IonHeader>
      <IonToolbar>
        <IonButton slot="start" > 
        <IonBackButton />
        </IonButton>
       <IonTitle> Detail Page </IonTitle>
      </IonToolbar>
     </IonHeader>
        
     <IonContent>
    <PostCard {...post}/>
    <IonCard>
    <IonList>
    {
      post.comments?.map((comment, i) => (
        <IonItem key={i}>
          <IonAvatar slot="start">
          <img  src={"assets/appbilde4.jpg"} /> 
          
          </IonAvatar>
          <IonLabel>
            {/*<h3>{comment.date}</h3>*/}
            <h2>{comment.user.display_name}</h2>
            <p>{comment.text}</p>
           {/* Det vi gjør her er å loope id, user (name) og text gjennom comments arayet
           Resultatet blir en kommentar i detail siden vår hentet fra Icomments. Her kan bruker
           legge til beskrivelse av turen, og andre brukere
           kan legge til egne forslag for turen din*/}

          </IonLabel>
        </IonItem>
    ))}
  </IonList>
</IonCard>       
  </IonContent>
    </IonPage>
    )

};

export default Detail;

//            <img src={comment.profileImageURL} />
//          <img  src={"assets/appbilde3.jpg"} /> 
/*
 <IonList>
    {
      post?.comments?.map((comment, i) => (
        <IonItem key={i}>
          <IonAvatar slot="start">
          <img  src={"assets/appbilde4.jpg"} /> 
          
          </IonAvatar>
          <IonLabel>
            <h3>{comment.date}</h3>
            <h2>{comment.username}</h2>
            <p>{comment.text}</p>
          </IonLabel>
        </IonItem>
    ))}
  </IonList>
*/