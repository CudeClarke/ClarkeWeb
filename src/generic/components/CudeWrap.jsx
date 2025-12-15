import Cabecera from './Cabecera'
import Footer from './Footer'

function CudeWrap({children}){
    return (
        <>
            <Cabecera></Cabecera>
            {children}
            <Footer></Footer>
        </>
        
    )
}

export default CudeWrap;