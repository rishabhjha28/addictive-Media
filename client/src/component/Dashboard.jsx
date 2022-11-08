import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom' 
import FIleDownload from 'js-file-download'

export const Dashboard = () => {
    const BaseUrl = 'http://localhost:3001'
    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }    
    const [data,setData] = useState([])
    const getData = ()=>{
        axios.get('/data').then((res)=>{
          setData(res.data)  
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getData()
    },[])
    const dateFormater=(today)=>{
        let ans = '';
        for(let i =0;i < today.length;i++){
            if(today[i] === 'T'){
                break;
            }
            else{
                ans = ans + today[i];
            }
        }
        return(ans)
    }
    const sortBy =(element)=>{
        let arr = data;
        arr.sort(GetSortOrder(element))
        setData([...arr])
    }
    const deleteData = (id)=>{
        axios.delete('/data/'+id)
        .then((res)=>{
            if(res.data === 1){
                getData()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const downloadResume=(fileLink)=>{
        axios({
            method:"GET",
            url:'/data/getResume/'+fileLink,
            responseType:'blob'
        }).then(res=>{
            FIleDownload(res.data,fileLink)
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    const viewResume = async(fileLink)=>{
        try {
            await axios
              .get('/data/getResume/'+fileLink, {
                responseType: "blob",
              })
              .then((response) => {
                const file = new Blob([response.data], { type: "application/pdf" });
                console.log(file)
                const fileURL = URL.createObjectURL(file);
                const pdfWindow = window.open();
                pdfWindow.location.href = fileURL;     
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            return { error };
          }
    }
      return (
    <div>
        <button onClick={()=>sortBy('name')}>sort by name</button>
        <button onClick={()=>sortBy('time')}>sort by data added</button>
        <table>
            <tr>
                <th>Name</th>
                <th>Data Of Birth</th>
                <th>Country</th>
                <th>View Resume</th>
                <th>Time when added</th>
                <th>Download</th>
                <th>Delete</th>
            </tr>
            {
                data.map((element)=>{
                    return(
                        <tr key={element.id}>
                            <td>{element.name}</td>
                            <td>{dateFormater(element.dob)}</td>
                            <td>{element.country}</td>
                            <td className='element' onClick={()=>{viewResume(element.fileLink)}}> {element.fileLink}</td>
                            <td>{element.time}</td>
                            <td className='element' onClick={()=>{downloadResume(element.fileLink)}}>download</td>
                            <td className='element' onClick={()=>{deleteData(element.id)}}>delete</td>
                        </tr>
                    )
                })
            }
        </table>
        <Link to = '/'>Add more people</Link>
    </div>
      )}
