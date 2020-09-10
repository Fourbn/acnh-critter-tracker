import React, { Fragment } from 'react';

function CritterDisplay(props) {
   return(
      <Fragment>
         <h2>{props.displayTitle}</h2>
         <ul className="displayBox">
            {
               props.critter.map(critter => {
                  return(
                     <li key={`${critter.id}${critter['file-name']}`}>{critter.name['name-USen']}</li>
                  ) 
               })
            }
         </ul>
      </Fragment>
   )
}

export default CritterDisplay;