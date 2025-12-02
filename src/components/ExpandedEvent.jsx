import '../styles/ExpandedEvent.css'
import { ClarkeButton, IS_CONFIRM } from './Button';

function ExpandedEvent({name, descrip, location, date, imageUrl, patr_list, tag_list, objective_recaudation, actual_recaudation, close_action}){

    const percentage = ""+Math.trunc(actual_recaudation/objective_recaudation*100)+"%";

    
    return (
        <div className="expanded-event-div">
            <div className='expanded-event-nav-bar'>
                <div className='expanded-event-close-button' title='volver' onClick={()=>close_action()}></div>
            </div>
            <div className='expanded-event-content'>
                <div className='expanded-event-content-upper-half'>
                    <div className='expanded-event-img-wrap'>
                        <img className='expanded-event-img' src={imageUrl}>
                        </img>
                    </div>

                    <div className='expanded-event-info'>

                        <div className='expanded-event-info-header'>
                            <div className='expanded-event-info-header-data'>
                                <h2>📍 {location}</h2>
                                <h2>🕖 {date}</h2>
                                <div className='expanded-event-info-tags'>
                                    {
                                        tag_list.map(e=>{return <p id={e}># {e}</p>})
                                    }
                                </div>
                            </div>
                            <div className='expanded-event-patros-list'>
                                <div className='expanded-event-patro-wrap'>
                                    <img className="expanded-event-patro-img" src='https://design.penpot.app/assets/by-file-media-id/8fd8c29f-33f9-8038-8007-20feabeb6e15'></img>
                                </div>
                                <div className='expanded-event-patro-wrap'>
                                    <img className="expanded-event-patro-img" src='https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-20fe3f63b2e1'></img>
                                </div>
                                <div className='expanded-event-patro-wrap'>
                                    <img className="expanded-event-patro-img" src='https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-20fe50652b98'></img>
                                </div>

                                <div className='expanded-event-patro-wrap'>
                                    <img className="expanded-event-patro-img" src='https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-20fe50652b98'></img>
                                </div>
                            </div>
                        </div>

                        <h2 className='expanded-event-description'>
                            {descrip}
                        </h2>
                    </div>

                </div>
                <div className='expanded-event-content-bottom-half'>
                    <div className='expanded-event-content-bottom-left'>
                        <h1>{name}</h1>
                        <ClarkeButton text={"Comprar Ticket"} type={IS_CONFIRM} size={"1rem"}></ClarkeButton>
                    </div>

                    <div className='expanded-event-content-bottom-right'>
                        <div className='expanded-event-recaudation-bar'>
                            <div className='expanded-event-recaudation-outer-bar'>
                                <div className='expanded-event-recaudation-inner-bar' style={{width:percentage}}>
                                    <div className='expanded-event-recaudation-percentage'>
                                        <p>{percentage}</p>
                                    </div>
                                    <p>
                                        {actual_recaudation}€
                                    </p>
                                </div>
                            </div>
                            <p>
                                {objective_recaudation}€
                            </p>
                        </div>
                        <div className='expanded-event-sunflower-wrap'>
                            <img src="https://design.penpot.app/assets/by-file-media-id/fffce8d7-4b40-8153-8007-1ed23b72deff" alt="" className='expanded-event-sunflower-img'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export {ExpandedEvent};