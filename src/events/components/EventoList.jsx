import '../styles/EventoList.css'

function EventoList({children}){
    return <div className="event-list">
        {children}
    </div>
}

export {EventoList};