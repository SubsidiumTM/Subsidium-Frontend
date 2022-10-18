// Standard imports 
import './TableOne.css'
// Chart import 
import { Chart } from 'react-google-charts'

import { APImethods } from '../api/APImethods'

import React, { useState, useEffect } from 'react'


function TableUserReservations(){

    const [datos, setDato] = useState(0);  
    
    useEffect (() => {
            getUsers();
        },[])

    async function getUsers(){
        const response = await APImethods.allUsers();
        setDato(response);
    } 

    function setData(){
        
        var yes = [0];
        var no = [0];
        var listaG = [];

        for(var i = 0; i < datos.length; i++)
        {
            if(datos[i].active == true){
                yes[0] = yes[0] + 1;
            }
            else{
                no[0] = no[0] + 1;
            }
        }

        listaG.push(no);
        listaG.push(yes);
        
        return listaG;
    }

    var listaG = setData();

    const data = [
        ["Estatus", "Estatus"],
        ["INACTIVO", listaG[0][0]],
        ["ACTIVO", listaG[1][0]],
      ];
      
    const options = {
        title: "Porcentaje de usurios activos",
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