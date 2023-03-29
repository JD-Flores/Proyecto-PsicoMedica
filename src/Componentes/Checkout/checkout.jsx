//import { CLIENT_ID } from '../../Config/config.jsx'
import React, { useState, useEffect, useContext } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useUser } from "../../contexts/UserContext";
import { docContext } from "../../contexts/DoctorContext";
import { useNavigate } from "react-router";
import { BUSCAR_DOC, CHAT } from "../../constantes/urls";
import { reserveContext } from "../../contexts/ReserveContext";
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { v4 as uuid} from "uuid";

export function Checkout({price}) {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const {user}=useUser();
    const [context, setContext] = useContext(docContext);
    const [reservationContext, setReservationContext] = useContext(reserveContext);
    const navigate = useNavigate();

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Terapia",
                    amount: {
                        currency_code: "USD",
                        value: price,
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    const setChatReserve = async ()=>{
        // genera el chat
        const combinedID = user.uid > context.uid ? 
        user.uid + context.uid : 
        context.uid + user.uid;
        const res = await getDoc(doc(db,"chats",combinedID));
        // try{    
            
            if(!res.exists()){
                //crea el chat
                await setDoc(doc(db,"chats",combinedID),{messages:[]});
            
                //crea user chats
                console.log(user)
                console.log(context)
                await updateDoc(doc(db,"userChat",user.uid),{
                    [combinedID+".userInfo"]:{
                        uid:context.uid,
                        name:context.name,
                        photoURL:context.profilePic
                    },
                    [combinedID+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db,"userChat",context.uid),{
                    [combinedID+".userInfo"]:{
                        uid:user.uid,
                        name:user.name,
                        photoURL:user.profilePic
                    },
                    [combinedID+".date"]: serverTimestamp()
                })
                
            }
            // busca si el documento exist o ya esta creado
                const res2 = await getDoc(doc(db,"calendarios",context.uid)); 
                    
                if(!res2.exists()){
                    //si no esta creado lo creo con el id del Doctor
                    await setDoc(doc(db,"calendarios",context.uid),{citas:[]});   
                }
                // Si ya existe o fue creado agrega al array de citas la nueva cita
                    await updateDoc(doc(db,"calendarios",context.uid),{
                    citas:arrayUnion({
                        ["id"]:uuid(),
                        ["completed"]:false,
                        ["ranked"]:"undefined",
                        ["uid"]:user.uid,
                        ["info"]:{title: reservationContext.title,
                        start:reservationContext.start,
                        end:reservationContext.end,}
                        })
                    })
            navigate(CHAT)
        // }catch{
        //     console.error("error")
        // }
        

    }

    useEffect(() => {
        if (success) {
            
            console.log('Order successful . Your order id is--', orderID);
            setChatReserve()
        }
        
    },[success]);

    return (
        <div>
        {context &&
            <PayPalScriptProvider options={{ "client-id": "AXm3WFSs3svhfaRCWAVdgFsCyc0_GJ12yG3OXCHBZ6a7bO-d9DcKv8cCPTW_Vv6t2bt9Gt0XtTdqTU5H" }}>
            <div>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </div>
        </PayPalScriptProvider>
    }
    {context == null && 
    navigate(BUSCAR_DOC)}
    </div>
        
    );
}