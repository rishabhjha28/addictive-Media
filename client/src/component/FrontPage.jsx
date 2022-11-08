import { useEffect, useState } from 'react';
import {countries} from '../countrylist';
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const [details,setDetails] = useState({
    name:'',
    dob:'',
    country:'',
  })
  const [resume,setResume] = useState(null)
  const [searchList,setSearchList] = useState(countries);
  const [isSearching,setIsSearching] = useState(false);
  const [search,setSearch] = useState('')
  useEffect(()=>{
    if(search){
      let arr = [];
      for(let i = 0;i < countries.length;i++){
        countries[i].name.toLowerCase().includes(search.toLowerCase()) && arr.push(countries[i])
      }
      setSearchList(arr)
    }
    else{
      setSearchList(countries)
    }
  },[search])
  const saveCountry =(country)=>{
    setDetails((prev)=>{
      return({
        ...prev,
        country:country
      })
    })
    setIsSearching(false)
    setSearch(country)
  }
  const handleSearch =(e)=>{
    setSearch(e.target.value)
  }
  const changeDetails =(e)=>{
    const {name,value} = e.target
    setDetails((prev)=>{
      return({
        ...prev,
        [name]:value
      })
    })
  }
  const handleIsSearch = ()=>{
    setIsSearching(!isSearching)
  }
  const addresume =(e)=>{
    setResume(e.target.files[0])
  }
  const saveData =async(e)=>{
    e.preventDefault()
    var formData = new FormData()
    formData.append('resume',resume)
    formData.append('name',details.name)
    formData.append('dob',details.dob)
    formData.append('country',details.country)
    formData.append('time',new Date())
    const config = {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }
    await axios.post("/data",formData,config).then(response=>{
      if(response.data.msg){
        navigate('/success')
      }
      else{
        navigate('/failure')
      }
    }).catch(err=>{
      console.log(err)
      navigate('/failure')
    })
  }
  return (
    <div className="frontpage">
      <form onSubmit={saveData}>
        <input required type="text" name="name" value = {details.name} placeholder='Enter the name' onChange={changeDetails}/>
        <input required type="date" name="dob" value = {details.dob}  onChange ={changeDetails}/>
        <div className='searchList'>
          <input required type="search" name="search"placeholder='Select Your Country' onFocus={()=>setIsSearching(true)} value = {search} onChange = {handleSearch}/>
          <div className="list">
            {isSearching &&
              searchList.map((country)=>{
                return <div className='element' onClick={()=>saveCountry(country.name)} key={country.code} value={country.code}>{country.name}</div>
              })
            }
          </div>
        </div>
        <input required accept="application/pdf"  type="file" onChange={addresume} name="resume"/>
        <button type="submit">Save</button>
      </form>
      <Link to = {'/dashboard'}>Go to Dashboard</Link>
    </div>
  );
}
export default App;