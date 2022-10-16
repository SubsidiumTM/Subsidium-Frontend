// Chart import 
import { Chart } from 'react-google-charts'

import { APImethods } from '../api/APImethods'

import React, { useState, useEffect } from 'react'


function TableTopRooms(){

    const [dato, setDato] = useState(0);  

    const [roomInfo, setRoomsInfo] = useState(0);
    
    useEffect (() => {
            getReservationsInfo();
            getRoomsInfo();
        },[])

    async function getReservationsInfo(){
        const response = await APImethods.allReservations();
        setDato(response);
    } 
    
    async function getRoomsInfo() {
        const response = await APImethods.allRooms();
        setRoomsInfo(response);
      }
    
    function getNumberOfReservations(){

        var dict = {};

        var TopReservation = [];

        var key;

        for(var i = 0; i < dato.length; i++)
        {
            if(dato[i].roomID != null)
            {
                if(TopReservation.includes(dato[i].roomID) == true){
                    
                    key = dato[i].roomID;

                    dict[key] = dict[key] + 1;

                }
                else{
                    key = dato[i].roomID;
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

        keys.reverse();

        console.log("Sorted keys", keys);
        console.log("top 1", keys[0]);
        console.log("value 1", reservations[keys[0]])
        console.log("top 2", keys[1]);
        console.log("value 2", reservations[keys[1]])
        console.log("top 3", keys[2]);
        console.log("value 3", reservations[keys[2]])

        return keys
    }

    var sortedKeys = getKeys();

    function getNames(){

        var names_ID = {}
        var key;

        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < roomInfo.length; j++)
            {
                if(sortedKeys[i] == roomInfo[j].id)
                {
                    key = sortedKeys[i];
                    names_ID[key] = roomInfo[j].name
                }
            }
        }

        return names_ID;

    }

    var names_ID = getNames();

    const data = [
        ["Salones", 
        sortedKeys[0], 
        names_ID[sortedKeys[1]], 
        sortedKeys[2]],
        ["Salon", reservations[sortedKeys[0]], reservations[sortedKeys[1]], reservations[sortedKeys[2]]]
      ];
    
      const options = {
        chart: {
          title: "Top 3 salones mas usados",
          subtitle: "Salones",
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

export default TableTopRooms