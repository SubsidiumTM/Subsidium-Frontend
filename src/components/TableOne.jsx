// Standard imports 
import './TableOne.css'
// Chart import 
import { Chart } from 'react-google-charts'

import { APImethods } from '../api/APImethods'

import React, { useState, useEffect } from 'react'


function TableOne(){

    const [dato, setDato] = useState(0);  

    const [licenceInfo, setLicenceInfo] = useState(0);
    
    useEffect (() => {
            awadeowo();
        },[])

    async function awadeowo(){
        const response = await APImethods.allReservations();
        setDato(response);
    } 
    
    async function getLicenceInfo(id) {
        const response = await APImethods.getLicence(id);
        //console.log("Licence: ", response);
        setLicenceInfo(response);
      }
    
    function getNumberOfReservations(){

        /*var key = "keyOne";
        var key2 = "keyTwo";
        var key3 = "KeyThree";
        var obj = {};
        obj[key] = 15;
        obj[key2] = 33;
        obj[key3] = 44;
        
        return obj;*/


        /*var key = "L1";
        var obj = {};
        obj[key] = 14;
        key = "L2";
        obj[key] = 33;
        key = "L3";
        obj[key] = 44;
        obj["L1"] = obj["L1"] + 13;
        
        return obj;*/

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

    function getKeys(){
        //var list = Object.keys(getNumberOfReservations())

        var dict = getNumberOfReservations();

        var items = Object.keys(dict).map(
            (key) => { return [key, dict[key]] });
        
        items.sort(
            (first, second) => { return first[1] - second[1] }
        );
        
        var keys = items.map(
            (e) => { return e[0] });

        keys.reverse();

        console.log("Aqui debgeando un diccionario qleao", keys);
        console.log("top 1", keys[0]);
        console.log("value 1", dict[keys[0]])
        console.log("top 2", keys[1]);
        console.log("value 1", dict[keys[1]])
        console.log("top 3", keys[2]);
        console.log("value 1", dict[keys[2]])

        return keys
    }

    var sortedKeys = getKeys();
    var reservations = getNumberOfReservations(); 

    function getNames(id){

        getLicenceInfo(id)

        console.log("Respuesta de name", licenceInfo.name);

        return licenceInfo.name;

    }

    //const IdNameTopOne = getNames(sortedKeys[0]);
    //var IdNameTopTwo = getNames(sortedKeys[1]);
    //var IdNameTopThree = getNames(sortedKeys[2]);

    const data = [
        /*["Licencias", getKeys()[0], getKeys()[1], getKeys()[2]],
        ["Licencia", getNumberOfReservations()[getKeys()[0]], getNumberOfReservations()[getKeys()[1]], getNumberOfReservations()[getKeys()[2]]]*/
        ["Licencias", 
        sortedKeys[0], 
        sortedKeys[1], 
        sortedKeys[2]],
        ["Licencia", reservations[sortedKeys[0]], reservations[sortedKeys[1]], reservations[sortedKeys[2]]]
      ];
    
      const options = {
        chart: {
          title: "Top devices 3 devices",
          subtitle: "Devices",
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

export default TableOne