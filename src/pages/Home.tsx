import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonLabel, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostCard from '../components/PostCard';
import IPost from '../models/IPost';
import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import IpostList from '../models/IPostList';
import { auth } from '../utils/nhost';
import { exitOutline } from 'ionicons/icons';

// her henter vi postene fra hasura
const GET_POSTS = gql  `
query{
  posts{
    id
    title
    description
    user{
      display_name
    }
    comments {
      id
      text
      user{
        display_name
      }
    }
  }
}



`;
// useQuery tar i bruk interfacet ipostlist med <>
const Home = () => {
  let history=useHistory();

  const logout = async () => {
    try {
      await auth.logout();
      history.replace("/login");
    } catch (e) {
      console.log(e);
    }
  }


  const {loading,data} = useQuery <IpostList> (GET_POSTS);
  if (loading){
    return<IonLabel>Laster inn </IonLabel>
  }
  if (data){
    console.log(data);
  }


  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot={'start'}>
            <IonButton onClick={logout}>
              <IonIcon icon={exitOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Turapp</IonTitle>
          <IonButtons slot={'end'}>
          <IonButton onClick={() =>history.replace("/newpost")}>
          Legg til en ny tur
        </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          data?.posts.map(post => (
            //link komponenten gjør at når vi trykker på et card så skal vi kalle på to= {{ }} propertien
            // første vi sender inn er pathname altså hvilken side vi skal navigere til
            // the neste er ey objekt som heter state
            // Hvor vi sender inn et nytt objekt som heter post. og det er da posten vi trykker på 

            // derfor hvis du legger til en ny kommentar og refresher må du ut fra detail siden, tilbake til Home,
            // og deretter trykke deg inn på posten som da får sendt de oppdatterte kommentarene

            <Link style={{ textDecoration: 'none' }} key={post.id} to={{
              pathname: `/detail/${post.id}`,
              state: {
                post
              }
            }}>
              <PostCard {...post} />
            </Link>
          ))
        }
      </IonContent>
    </IonPage>
  );
};


export default Home;

