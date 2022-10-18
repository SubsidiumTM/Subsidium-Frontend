// Chart import 
import { Chart } from 'react-google-charts'

import { APImethods } from '../api/APImethods'

import React, { useState, useEffect } from 'react'


function TableLeastDevices(){

    const [dato, setDato] = useState(0);  

    const [deviceInfo, setDeviceInfo] = useState(0);
    
    useEffect (() => {
            getReservationsInfo();
            getDevicesInfo();
        },[])

    async function getReservationsInfo(){
        const response = await APImethods.allReservations();
        setDato(response);
    } 
    
    async function getDevicesInfo() {
        const response = await APImethods.allDevices();
        setDeviceInfo(response);
      }
    
    function getNumberOfReservations(){

        var dict = {};

        var TopReservation = [];

        var key;

        for(var i = 0; i < dato.length; i++)
        {
            if(dato[i].deviceID != null)
            {
                if(TopReservation.includes(dato[i].deviceID) == true){
                    
                    key = dato[i].deviceID;

                    dict[key] = dict[key] + 1;

                }
                else{
                    key = dato[i].deviceID;
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
        console.log("Least 1", keys[0]);
        console.log("value 1", reservations[keys[0]])
        console.log("Least 2", keys[1]);
        console.log("value 2", reservations[keys[1]])
        console.log("Least 3", keys[2]);
        console.log("value 3", reservations[keys[2]])

        return keys
    }

    var sortedKeys = getKeys();

    function getNames(){

        var names_ID = {}
        var key;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < deviceInfo.length; j++)
            {
                if(sortedKeys[i] == deviceInfo[j].id)
                {
                    key = sortedKeys[i];
                    names_ID[key] = deviceInfo[j].name
                }
            }
        }

        return names_ID;

    }

    var names_ID = getNames();

    const data = [
        ["Equipos", 
        names_ID[sortedKeys[0]], 
        names_ID[sortedKeys[1]], 
        names_ID[sortedKeys[2]]],
        ["Equipo", reservations[sortedKeys[0]], reservations[sortedKeys[1]], reservations[sortedKeys[2]]]
      ];
    
      const options = {
        chart: {
          title: "Top 3 equipos menos usados",
          subtitle: "Equipo",
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

export default TableLeastDevices