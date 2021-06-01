import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonCard, IonContent, IonInput, IonItem, IonList, IonBackButton, IonButtons } from "@ionic/react";
import React, { useState } from "react";
import { useCamera } from "@capacitor-community/react-hooks/camera";
import { CameraResultType } from "@capacitor/core";
import { auth, storage } from "../utils/nhost";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const INSERT_POST = gql`
    mutation InsertPost($post: posts_insert_input!) {
        insert_posts_one(object: $post) {
            title,
            user_id,
            description,
            image_filename
        }
    }  
`;
/* 
Kamera ved bruk av react hooken useCamera
Importeter usCamera, en hook skal enten returne et objekt eller et arrey som er vanligst. Usacamera returnerer et objekt med et par elementer, som photo og getPhoto.
Reacthooks brukes for en nativeintegrasjon med kamera.
 

*/ 

const useImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const startUploading = async ({ base64string, filenameWithExtension }: { base64string: string, filenameWithExtension: string }) => {
        try {
            await storage.putString(`/public/${filenameWithExtension}`, base64string, "data_url", null, (pe: ProgressEvent) => {
                setUploadProgress((pe.loaded / pe.total) * 100);
            });
        } catch (e) {
            console.warn(e);
        }
    };

    return {
        uploadProgress,
        startUploading
    }

};

const NewPost = () => {

    const { startUploading, uploadProgress } = useImageUpload();
    const { photo, getPhoto } = useCamera();
    const [insertPostMutation] = useMutation(INSERT_POST);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [filename, setFilename] = useState<string>("");

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        });
        setFilename(`${Date.now().toString()}.jpeg`);
    }

    const uploadImage = async () => {
        if (photo?.dataUrl) {
            await startUploading({
                base64string: photo.dataUrl,
                filenameWithExtension: filename
            })
        } else {
            alert("Feilmelding, du må ta et bilde");
        }
    }

    const insertPost = async () => {
        try {
            await insertPostMutation({
                variables: {
                    post: {
                        title,
                        description,
                        image_filename: filename,
                        user_id: auth.getClaim('x-hasura-user-id')
                    }
                }
            });
        } catch (e) {

        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={'start'}>
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Nytt innlegg</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <img src={photo?.dataUrl} />
                    <IonList>
                        <IonItem>
                            <IonInput placeholder="Tittel" onIonInput={(e: any) => setTitle(e.target.value)} />
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="Beskrivelse" onIonInput={(e: any) => setDescription(e.target.value)} />
                        </IonItem>
                    </IonList>
                    <IonButton onClick={triggerCamera}>Ta bilde</IonButton>
                        {/* her står det at hvis photo har en url så skal det vises inne img-tagen i ioncardte   */}

                    <IonButton onClick={uploadImage}>Last opp bilde ({filename})</IonButton>
                    <IonButton onClick={insertPost}>Send post</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default NewPost;