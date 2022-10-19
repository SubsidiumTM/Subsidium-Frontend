// Standard imports 
import './TableOne.css'
// Chart import 
import { Chart } from 'react-google-charts'

import { APImethods } from '../api/APImethods'

import React, { useState, useEffect } from 'react'


function TableUserReservations(props){

    const [dato, setDato] = useState(0);  

    const [userInfo, setUserInfo] = useState(0);
    
    useEffect (() => {
            getReservationsInfo();
            getUser(props.userID);
        },[])

    async function getReservationsInfo(){
        const response = await APImethods.allReservations();
        setDato(response);
    } 
    
    async function getUser(id) {
        const response = await APImethods.getUserByID(id);
        setUserInfo(response);
      }
    
    function getUserReservations(){
        
        var listaReservas = [];

        for(var i = 0; i < dato.length; i++){
            if(dato[i].userID == userInfo.id){
                listaReservas.push(dato[i]);
            }
        }

        console.log("Cuantas rerservas owowowoowowowowoowowowowowoo", listaReservas.length);

        var listaR = [0];
        var listaD = [0];
        var listaL = [0];
        var listaGeneral = [];

        for(var i = 0; i < listaReservas.length; i++){
            if(listaReservas[i].deviceID != null){
                listaD[0] = listaD[0] + 1;
            }
            if(listaReservas[i].roomID != null){
                listaR[0] = listaR[0] + 1;
            }
            if(listaReservas[i].licenceID != null){
                listaL[0] = listaL[0] + 1;
            }
        }

        listaGeneral.push(listaR);
        listaGeneral.push(listaD);
        listaGeneral.push(listaL);

        return listaGeneral;
        
    }

    var reservasUser = getUserReservations();
    console.log("El user: ", userInfo.id)
    console.log("sus reservas", reservasUser);

    // indice 0 = Rooms
    // indice 1 = Devices
    // indice 2 = Licenceses

    const data = [
        ["Reserva", "Porcentaje de reservas"],
        ["Espacios", reservasUser[0][0]],
        ["Dispositivos", reservasUser[1][0]],
        ["Licencias", reservasUser[2][0]],
      ];
      
    const options = {
        title: "Reservas de " + userInfo.name,
      };

      return(
        <div className='TableView'>
            <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
            />
        </div>
    )
      


}

export default TableUserReservations