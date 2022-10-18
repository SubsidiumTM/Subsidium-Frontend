// Standard imports 
import './TableOne.css'
// Chart import 
import { Chart } from 'react-google-charts'

import { APImethods } from '../api/APImethods'

import React, { useState, useEffect } from 'react'


function TableLeastUsedLicences(){

    const [dato, setDato] = useState(0);  

    const [licenceInfo, setLicenceInfo] = useState(0);
    
    useEffect (() => {
            getReservationsInfo();
            getLicenceInfo();
        },[])

    async function getReservationsInfo(){
        const response = await APImethods.allReservations();
        setDato(response);
    } 
    
    async function getLicenceInfo() {
        const response = await APImethods.allLicences();
        setLicenceInfo(response);
      }
    
    function getNumberOfReservations(){

        var dict = {};

        var TopReservation = [];

        var key;

        for(var i = 0; i < dato.length; i++)
        {
            if(dato[i].licenceID != null)
            {
                if(TopReservation.includes(dato[i].licenceID) == true){
                    
                    key = dato[i].licenceID;

                    dict[key] = dict[key] + 1;

                }
                else{
                    key = dato[i].licenceID;
                    dict[key] = 1;
                    TopReservation.push(key);
                }
            }
        }

        return dict;
    }

    var reservations = getNumberOfReservations(); 

    function getKeys(){

        var items = Object.keys(reservations).map(
            (key) => { return [key, reservations[key]] });
        
        items.sort(
            (first, second) => { return first[1] - second[1] }
        );
        
        var keys = items.map(
            (e) => { return e[0] });


        console.log("Sorted keys", keys);
        console.log("least 1", keys[0]);
        console.log("value 1", reservations[keys[0]])
        console.log("least 2", keys[1]);
        console.log("value 2", reservations[keys[1]])
        console.log("least 3", keys[2]);
        console.log("value 3", reservations[keys[2]])

        return keys
    }

    var sortedKeys = getKeys();

    function getNames(){

        var names_ID = {}
        var key;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < licenceInfo.length; j++)
            {
                if(sortedKeys[i] == licenceInfo[j].id)
                {
                    key = sortedKeys[i];
                    names_ID[key] = licenceInfo[j].name
                }
            }
        }

        return names_ID;

    }

    var names_ID = getNames();

    const data = [
        ["Licencias", 
        names_ID[sortedKeys[0]], 
        names_ID[sortedKeys[1]], 
        names_ID[sortedKeys[2]]],
        ["Licencia", reservations[sortedKeys[0]], reservations[sortedKeys[1]], reservations[sortedKeys[2]]]
      ];
    
      const options = {
        chart: {
          title: "Top 3 licencias menos usadas",
          subtitle: "Licencias",
        },
      };

    return(
        <div className='TableView'>
            <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
            />
        </div>
    )
}

export default TableLeastUsedLicences