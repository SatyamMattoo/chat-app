import { useState, useEffect, useRef } from "react";
import { Box, Container, VStack, HStack, Input, Button } from "@chakra-ui/react";
import Messages from "./components/Messages";
import {signOut ,onAuthStateChanged , getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {app} from "./firebase.js";
import {getFirestore,addDoc, serverTimestamp,collection, onSnapshot,query, orderBy} from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app);
const logOut = () => signOut(auth);




const loginGoogle= () => {
  const providerGoogle = new GoogleAuthProvider();
  signInWithPopup(auth, providerGoogle);
}


function App() {

  const [user,setUser]= useState(false);
  const [message,setMessage]= useState("");
  const [messages,setMessages]= useState([]);

  const scroll = useRef(null);

  const submitHandler = async (e) =>
{
  e.preventDefault();

  try {
    await addDoc(collection(db,"Messages"),{
      text : message,
      uid : user.uid,
      uri : user.photoURL,
      createdAt : serverTimestamp()
      })

      setMessage("");
      scroll.current.scrollIntoView({behaviour : "smooth"})
  } catch (error) {
    alert(error);
  }
}
useEffect(() => {
    const q = query(collection(db,"Messages"),orderBy("createdAt","asc")) ;
    const unsubscribe = onAuthStateChanged(auth,(data)=>{
    setUser(data);
    });

    const unsubscribeForMessages = onSnapshot(q,(snap) => {
    
        setMessages(snap.docs.map((item) => 
        {
          const id = item.id;
          return {id, ...item.data()};
        }
        ));
      
    })
  
    return () => {
      unsubscribe();
      unsubscribeForMessages();
    }
  },[])
  

  return (
    <Box bg="blue.100">
     {
      (user)? <Container bg="blue.300" height={"100vh"}>
      <VStack h={"full"}>
        <HStack padding="4px" width={"full"}>
          <img
            src="./android-chrome-512x512.png"
            alt="logo"
            style={{ height: "60px", borderRadius: "20px" }}
          />
          <h1
            style={{
              width: "80vh",
              fontWeight: "700",
              fontSize: "2rem",
              color: "white",
              textAlign: "center",
            }}
          >
            Chat App
          </h1>
          <button
            type="submit"
            onClick={logOut}
            style={{
              padding: "5px",
              color: "white",
              backgroundColor: "rgb(9, 74, 134)",
              borderRadius: "5px",
              width: "20vh",
            }}
          >
            Log Out
          </button>
        </HStack>

        <VStack h={"full"} width={"full"} overflowY={"auto"} css={{"&::-webkit-scrollbar":{display:"none"}}}>
          {
          messages.map((item) => {
            return(
            <Messages 
            key = {item.id}
            text={item.text} 
            uri={item.uri} 
            user={item.uid === user.uid? "me":"other"} />)
          } ) 
          }

          <div ref={scroll}></div>
        </VStack>

        

        <form style={{ width: "100%" }}>
          <HStack>
            <Input
              value={message}
              onChange={ (e) => setMessage(e.target.value)}
              m="1"
              placeholder="Enter the message"
              bg="whiteAlpha.800"
            />
            <button
              type="submit"
              onClick={submitHandler}
              style={{
                padding: "7px",
                color: "white",
                backgroundColor: "rgb(9, 74, 134)",
                borderRadius: "5px",
                margin: "2px",
              }}
            >
              Send
            </button>
          </HStack>
        </form>
      </VStack>
    </Container>:
    <Container>
      <VStack h={"100vh"} justifyContent={"center"}>
        <Button onClick={loginGoogle} bg={"purple.500"} color="white">
          Sign in with Google
        </Button>
      </VStack>
    </Container>
     }
    </Box>
  );
}

export default App;
