import { IonCard, IonContent, IonFabButton, IonIcon, IonInput, IonItem, IonList, IonPage, IonSpinner, IonToast, useIonViewWillEnter, IonButton } from "@ionic/react";
import { arrowForwardCircle, personAddOutline } from "ionicons/icons";
import React, { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Wave from "../components/Wave";
import { auth } from "../utils/nhost";
/**
 For å hente ut verdien i inputfeltet for login bruker vi en property som ionic har som heter onIonInput={} hvor vi sender en
  arrow funskjon som tar inn en customEvent som vi kaller e som er kort 
 for event. Da kjører vi setEmailAdress med vardien som vi henter fra e/ eventet., 
 derreter endrer jeg den fra cusomEvent til AnyEvent ved å bruke e:any.
 */
const waveString = encodeURIComponent(renderToStaticMarkup(<Wave />));

const Login = () => {
  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  useIonViewWillEnter(() => {
    if (auth.isAuthenticated()) {
      history.replace("/home");
    }
  });
      // lager  hook for spinningen til piltasten IsAuthenticating og stter defaultverdien som false slik at den ikke roterer når vi åpner prosjektet
    // setter jeg setIsAuthenticating = true om vi trykker på logginn knappen (piltasten)
    //setter igjen isauthenticatingspinning til false etter innlogggingen
      //setter igjen isauthenticatingspinning til false etter innlogggingen feiler
  const authenticateUser = async () => {
    setIsAuthenticating(true);
    try {
      await auth.login(emailAddress, password);
      setIsAuthenticating(false);
      history.replace("/home");
    } catch (exception) {
      console.error(exception);
      setIsAuthenticating(false);
      setShowErrorToast(true);
    }
  }

  const registerUser = async () => {
    try {
      await auth.register(emailAddress, password);
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <IonPage>
      <IonContentStyled>
        <CenterContainer>
          <PageTitle>Turapp</PageTitle>
          <LoginCard>
            <IonList>
              <IonItem>
                <IonInput placeholder="Epostadresse" onIonInput={(e: any) => setEmailAddress(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonInput placeholder="Passord" type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
              </IonItem>
            </IonList>
          </LoginCard>
          <LoginButton onClick={authenticateUser}>
                  {/*bruker en turnery/if else check . Med andre ord så kan knappen ha 2 forskjellige tilstander  */}

            {
              isAuthenticating ?
                <IonSpinner name="crescent" /> :
                <IonIcon icon={arrowForwardCircle} />
            }
          </LoginButton>

          <LoginButton onClick={registerUser}>
            <IonIcon icon={personAddOutline} />
          </LoginButton>
          <IonButton onClick={() =>history.push("/home")}>
          Hopp over
        </IonButton>

        </CenterContainer>
        <IonToast

          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Feil brukernavn/passord."
          duration={3000}
          color="warning"
        />
      </IonContentStyled>
    </IonPage>
    
  );
      {/* kode hentet fra https://ionicframework.com/docs/api/toast*/}

};

const LoginCard = styled(IonCard)`
  padding: 20px;
`; 

const IonContentStyled = styled(IonContent)`
  --background: none;
  background: url("data:image/svg+xml,${waveString}") no-repeat fixed;
  background-size: cover;
`;

const PageTitle = styled.h1`
  font-size: 3em;
  align-self: center;
  color: #3880ff;
  font-family: 'Quicksand', sans-serif;
`;
// -- gjør at ikke bakgrunnen, men kun knappen endrer farge, om det ikke hadde vært med hadde det kommet en grønn boks bak den runde knappen

const LoginButton = styled(IonFabButton)`
  --background: #3880ff;
  align-self: center;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export default Login;


