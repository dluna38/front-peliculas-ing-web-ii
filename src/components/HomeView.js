import {useEffect, useState} from "react";
import {searchMedia} from "./MediaAxios";
import SimpleLoader from "./helpers/loading2";

function HomeHtml(){
    const [listaMovies, setListaMovies] = useState([])
    const [listaSeries, setListaSerires] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        cargarContenido();
    }, []);
    async function cargarContenido() {
        setLoading(true);
        let resultMovies = await searchMedia({limit:6,tipo:"pelicula"});
        console.log(resultMovies)
        let resultSeries = await searchMedia({limit:6,tipo:"serie"});
        setListaSerires(resultSeries);
        setListaMovies(resultMovies);
        setLoading(false);
    }
    return(
        <>
            <div className="container">
                <h3>Ultimas peliculas</h3>
                <CarrielContenido mediaArray={listaMovies}/>
                <h3>Ultimas series</h3>
                <CarrielContenido mediaArray={listaSeries}/>
            </div>
            <SimpleLoader loading={loading}/>
        </>
    )
}


function CarrielContenido({mediaArray}){
    return(
        <div className="row">
            {mediaArray.map((media,index) =>
                <div key={index} className="col-2" >
                    <div className="card mb-3 text-center" style={{width:"210px"}}>
                        <img loading="lazy" src={
                            media.imgUrlPortada ?"http://localhost:5000/api/tmbd/images/w342"+media.imgUrlPortada:process.env.PUBLIC_URL+'/imgs/img-not-found.jpg'}
                             onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.src = process.env.PUBLIC_URL+'/imgs/img-not-found.jpg';
                             }} className="card-img-top" alt="no Imagen" />
                            <div className="card-body">
                                <h5 className="card-title">{media.titulo}</h5>
                                <h6 className="card-text">{media.releaseYear}</h6>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default HomeHtml;
