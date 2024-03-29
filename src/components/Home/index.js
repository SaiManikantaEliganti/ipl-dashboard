import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const teamApiUrl='https://apis.ccbp.in/ipl'

class Home extends Component{
   state={
       isLoading:true,
       teamData:[],
   }
   
   componentDidCatch(){
       this.getTeams()
   }

   getTeams=async ()=>{
       const response=await fetch(teamApiUrl)
       const fetchedData=await response.json()
       const formattedData=fetchedData.teams.map(team=>({
           name:team.name,
           id:team.id,
           teamImageUrl:team.team_image_url,
       }))

       this.setState({
           teamData:formattedData,
           isLoading:false,
       })
   }

   renderTeamList=()=>{
       const {teamData}=this.state

       return(
           <ul className="team-list">
               {teamData.map(team=>(
                   <TeamCard teamDetails={team} key={team.id}/>
               ))}
           </ul>
       )
   }

   renderLoader = () => (
       <div testid="loader" className="loader-container">
           <Loader type="Oval" color="#ffffff" height={50}/>
       </div>
   )
   
    render(){
        const{isLoading}=this.state
           return(
        <div className="home-route-container">
            <div className="teams-list-container">
                <div className="ipl-dashboard-heading-container">
                    <img
                        className="ipl-logo"
                        src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                        alt="ipl logo"
                    />
                    <h1 className="heading">IPL Dashboard</h1>
                </div>
                {isLoading ? this.renderLoader() : this.renderTeamList()}
            </div>
        </div>
        )
    }
}

export default Home
