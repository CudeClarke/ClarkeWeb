function SubTotalPrice({name, total}){
    return <div style={{display: "flex", justifyContent:"space-between", width: "100%"}}>
        <h3>{name}</h3>
        <h2>{total}€</h2>
    </div>
}

export default SubTotalPrice;