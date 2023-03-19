const UserCharacter = ({ data}) => {
        
return(
    <div className="container">
    <div className="container user has-text-centered">
       <div className="user-name"><span>NAME:  </span><span>{data.me.name}</span></div> 
       <div className="user-gold"><span>GOLD:  </span><span>{data.me.gold }</span></div> 
       <div className="user-wins"><span>WINS:  </span><span>{data.me.wins }</span></div> 
       <div className="user-deaths"><span>DEATHS:  </span><span>{data.me.deaths }</span></div> 
       <div className="user-rating"><span>RATING:  </span><span>{data.me.rating }</span></div> 
         </div>

          <div className="container statblock has-text-centered">
          <div className="user-name"><span>ATTACK:  </span><span>{data.me.statblock.attack }</span></div> 
          <div className="user-gold"><span>CRIT:  </span><span>{data.me.statblock.crit }</span></div> 
          <div className="user-wins"><span>WINS:  </span><span>{data.me.statblock.defense }</span></div> 
          <div className="user-deaths"><span>HP:  </span><span>{data.me.statblock.hp }</span></div> 
          <div className="user-rating"><span>PARRY:  </span><span>{data.me.statblock.parry }</span></div> 
            </div>
</div>
    )

}
export default UserCharacter;