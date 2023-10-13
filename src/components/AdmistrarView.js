import {useEffect, useState} from "react";
import {
    searchMedia,
    getAllTMedia,
    getAllProductoras,
    getAllGeneros,
    getAllDirectores,
    postMedia,
    deleteMedia, putMedia, searchTmbd
} from "./MediaAxios";
import SimpleLoader from "./helpers/loading2";

let loading = false;
function AdmistrarView() {
    const bordes = {border: "1px solid"}
    return (
        <div className="container-fluid">
            <div className="row" style={bordes}>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-multimedia" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                            Multimedia</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-genero" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            Generos</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-director" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                            Directores</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-productor" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                            Productoras</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-tipo" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                            Tipos</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-multimedia" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                        <MultimediaAdmin/>
                    </div>
                    <div className="tab-pane fade" id="nav-genero" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="1">generos</div>
                    <div className="tab-pane fade" id="nav-director" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="2">..asdasd.</div>
                    <div className="tab-pane fade" id="nav-productor" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="2">..asdasd.</div>
                    <div className="tab-pane fade" id="nav-tipo" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="2">..asdasd.</div>
                </div>
            </div>
            <SimpleLoader loading={loading}/>
        </div>

    );
}

function MultimediaAdmin() {
    const bordes = {border: "1px solid"}
    const [resultSearch,setResultSearch] = useState([])
    const [noData,setNoData] = useState(true);
    const [isEditing,setIsEditing] = useState(false);
    const [extraStringEdit,setExtraStringEdit] = useState("");
    const [lengthTextArea,setLengthTextArea] = useState(0);
    const [listGeneros,setListGeneros] = useState([]);
    const [listProductoras,setListProductoras] = useState([]);
    const [listDirectores,setDirectores] = useState([]);
    const [listTMedia,setListTMedia] = useState([]);
    const [serial,setSerial] = useState("");
    const [titulo,setTitulo] = useState("");
    const [releaseYear,setReleaseYear] = useState("");
    const [sinopsis,setSinopsis] = useState("");
    const [urlMedia,setUrlMedia] = useState("");
    const [backgroundColorState,setBackgroundColorState] = useState("#BBED9D")
    const [defaSelectGenero,setDefaSelectGenero]=useState("");
    const [defaSelectTipo,setDefaSelectTipo]=useState("");
    const [defaSelectDirector,setDefaSelectDirector]=useState("");
    const [defaSelectProductora,setDefaSelectProductora]=useState("");
    const [editId,setEditId]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const [loadingData,setLoadingData]=useState(false);
    useEffect(() => {
        loadSelects();
        cargarTabla();
    }, []);
    async function submitForm(event) {
        let result = false;
        event.preventDefault();
        let form = event.target;
        console.log(form)
        let objMedia = Object.fromEntries(new FormData(form).entries());
        if (isEditing) {
            result = await putMedia(editId,objMedia);
        } else {
            result = await postMedia(objMedia);
        }
        console.log("post: "+result)
        if(result){
            alert(isEditing ? "EDITADO":"CREADO");
            cleanForm();
            if(isEditing) backToCrear();
            await cargarTabla();
            return;
        }
        alert("ERROR");
    }
    async function loadSelects() {
        await Promise.allSettled([getAllGeneros(), getAllDirectores(), getAllProductoras(), getAllTMedia()])
            .then((results) => {
                setListGeneros(results[0].value);
                setDirectores(results[1].value);
                setListProductoras(results[2].value);
                setListTMedia(results[3].value);
            })
    }
    async function cargarTabla(event) {
        setLoadingData(true);
        let objMedia= null;
        if(event) {
            event.preventDefault();
            let form = event.target;
            objMedia = Object.fromEntries(new FormData(form).entries());
            console.log(form)
        }
        console.log("send request")


        let result = await searchMedia(objMedia);
        if(!result) setNoData(true);
        else setNoData(false);
        setResultSearch(result);
        setLoadingData(false);
    }
    function editMedia(elemento){
        console.log(elemento)
        setEditId(elemento._id);
        setSerial(elemento.serial);
        setTitulo(elemento.titulo);
        setReleaseYear(elemento.releaseYear);
        setUrlMedia(elemento.urlMedia);
        setSinopsis(elemento.sinopsis);
        setLengthTextArea(elemento.sinopsis.length)
        setIsEditing(true);
        setExtraStringEdit(elemento.serial)
        setImageUrl(elemento.imgUrlPortada || "")
        setBackgroundColorState("#E9ED9D")
        setDefaSelectGenero(elemento.generos[0]._id)
        setDefaSelectTipo(elemento.tipo._id)
        setDefaSelectDirector(elemento.director._id)
        setDefaSelectProductora(elemento.productoras[0]._id)
        loadSelects();
    }
    async function borrarMedia(id){
        let result = await deleteMedia(id)
        if(result){
            alert("Eliminado");
            cleanForm();
            await cargarTabla();
            return;
        }
        alert("ERROR");
    }
    function cleanForm(){
        setSerial("");
        setTitulo("");
        setReleaseYear("");
        setUrlMedia("");
        setSinopsis("");
        setLengthTextArea(0);
        setImageUrl("");
    }
    function backToCrear(){
        setIsEditing(false);
        setBackgroundColorState("#BBED9D");
        cleanForm();
    }

    function insertTmbd(e){
        console.log(e);
        setTitulo(e.original_title);
        if(e.overview){
            if(e.overview.length >300){
                setSinopsis(e.overview.slice(0,300));
                setLengthTextArea(300)
            }else {
                setSinopsis(e.overview);
                setLengthTextArea(e.overview.length)
            }

        }
        if(e.release_date) {
            setReleaseYear(e.release_date.slice(0, 4));
        }
        if(e.poster_path){
            setImageUrl(e.poster_path);
        }
    }
    return (<div className="row">
            <div className="col-6" style={bordes}>
                <form onSubmit={cargarTabla}>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="inputNameMovie" className="form-label">Por nombre:</label>
                            <input type="text" name="titulo" className="form-control" id="inputNameMovie" aria-label="input name"/>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: "10px",borderBottom:"solid 1px black", marginBottom:"15px"}}>
                        <div className="col-3"></div>
                        <div className="col-6">
                            <button className="btn btn-success" style={{marginBottom:"10px"}}>Buscar</button>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </form>
                <DisplayFormState isEditing={isEditing} extraString={extraStringEdit} backToCrear={backToCrear} colorBack={backgroundColorState} TmbdSeleccionado={insertTmbd}/>
                <div className="row" style={{marginTop:"10px"}}>
                    <form onSubmit={submitForm}>
                        <div className="row">
                            <div className="col-3">
                                <input disabled={isEditing} value={serial} onChange={(e) => setSerial(e.target.value)} type="text" name={"serial"} className="form-control" id="inputSerial" placeholder="Serial"/>
                            </div>
                            <div className="col-7">
                                <input value={titulo} onChange={(e) => setTitulo(e.target.value)} type="text" name={"titulo"} className="form-control" id="inputTitulo" placeholder="Titulo"/>
                            </div>
                            <div className="col-2">
                                <input value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} type="number" name={"releaseYear"} className="form-control" id="inputYear" min={1900} max={2023} placeholder="Año"/>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col">
                                <label htmlFor="inputSinopis">Sinopsis</label>
                                <div className="form-floating">
                            <textarea value={sinopsis}  name={"sinopsis"} className="form-control" placeholder="..." id="inputSinopis" maxLength={300}
                                      onChange={(e) =>{
                                          setLengthTextArea(e.target.value.length);
                                          setSinopsis(e.target.value)}
                                        }
                                      style={{resize:"none",height:"100px"}} rows={50} cols={30}></textarea>
                                    <label htmlFor="inputSinopis">{lengthTextArea}/300</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="inputUrlMedia" className="form-label">media link:</label>
                                <input value={urlMedia} onChange={(e) => setUrlMedia(e.target.value)} name={"urlMedia"} type="url" className="form-control" id="inputUrlMedia"/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="formFile" className="form-label">Poster (uri):</label>
                                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} name="imgUrlPortada" className="form-control" type="text" id="formFile"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="formFile" id="inputGenero" className="form-label">Genero:</label>
                                <GetSelectsComplete name={"generos"} array={listGeneros} defaultValue={defaSelectGenero} setDefaultValue={setDefaSelectGenero}/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="formFile" className="form-label">Tipo de media:</label>
                                <GetSelectsComplete name={"tipo"} array={listTMedia} defaultValue={defaSelectTipo} setDefaultValue={setDefaSelectTipo}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="formFile" id="inputDirector" className="form-label">Director:</label>
                                <GetSelectsComplete name={"director"} array={listDirectores} defaultValue={defaSelectDirector} setDefaultValue={setDefaSelectDirector}/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="formFile" className="form-label">Productora:</label>
                                <GetSelectsComplete name={"productoras"} array={listProductoras} defaultValue={defaSelectProductora} setDefaultValue={setDefaSelectProductora}/>
                            </div>
                        </div>
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-4"></div>
                            <div className="col-4">
                                <button className="btn btn-success" style={{marginBottom:"10px"}}>{isEditing? "Editar": "Enviar"}</button>
                            </div>
                            <div className="col-4"></div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-6" style={bordes}>
                <TableMedia lista={resultSearch} editMedia={editMedia} borrarMedia={borrarMedia}/>
                {noData && <NoDataFound isLoading={loadingData}/>}
            </div>
        </div>

    );
}
function TableMedia({lista,editMedia,borrarMedia}){
    return(
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Serial</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Creación</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {lista.map((elemento) =>
                    <tr key={elemento._id}>
                        <th scope="row">{elemento.serial}</th>
                        <td>{elemento.titulo}</td>
                        <td>{elemento.fechaCreacion}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => editMedia(elemento)}><i className="bi bi-pencil-square"></i></button>
                            <button className="btn btn-danger" onClick={() => borrarMedia(elemento._id)} style={{marginLeft:"5px"}}><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

function DisplayFormState({isEditing,extraString,backToCrear,colorBack,TmbdSeleccionado}){

    if(isEditing){
        return (
            <div className="row" style={{background:colorBack}}>
                <div className="col-8">
                    <h3>Ahora editando {extraString.length ? "("+extraString+")" : ""}</h3>
                </div>
                <div className="col-4">
                    <button className="btn btn-info" onClick={backToCrear}>volver a crear</button>
                </div>
            </div>
        )
    }
    return(
        <div className="row">
            <div className="col-8">
                <h3>Ahora creando</h3>
            </div>
            <div className="col-4">
                <ModalTmbd TmbdSeleccionado={TmbdSeleccionado}/>
            </div>
        </div>
    );
}

function GetSelectsComplete({array,defaultValue,setDefaultValue,name}){
    if(!array.length){
        return (
            <>
                <select className="form-select" >
                    <option value={null}>No se encontro registros</option>
                </select>
            </>
        );
    }
    return(
        <>
            <select name={name} value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} className="form-select">
            {
                array.map((elemento) =>
                    <option key={elemento._id} value={elemento._id}>{elemento.nombre}</option>
                )
            }
            </select>
        </>
    );
}
function NoDataFound({isLoading}){
    if(isLoading){
        return null;
    }
    return(
        <h1>No se encontró información :(</h1>
    );
}

function ModalTmbd({TmbdSeleccionado}){
    const [checkTypeMedia,setCheckTypeMedia] = useState(false);
    const [listaResultados,setListaResultados] = useState([]);
    const [query,setQuery]=useState("");


    async function submitForm(event) {
        event.preventDefault();
        let form = event.target;
        let objMedia = Object.fromEntries(new FormData(form).entries());
        if(objMedia.titulo.length === 0) return;
        let response = checkTypeMedia ? await searchTmbd(false,objMedia.titulo):await searchTmbd(true,objMedia.titulo)

        if(checkTypeMedia){
            response.results.map((elem) =>{
                elem["original_title"] = elem["name"];
                elem["release_date"] = elem["first_air_date"];
            })
        }
        setListaResultados(response.results);
        console.log(response);
        console.log(checkTypeMedia)
    }

    function cleanModal(){
       setListaResultados([]);
       setQuery("");
       document.getElementById("closeModalCorner").click();
    }

    return(
        <>
            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalTmbd">TMBD</button>
            <div className="modal fade" id="modalTmbd" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Busqueda TMBD</h1>
                            <button type="button" onClick={cleanModal} id="closeModalCorner" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitForm} id="searchForm">
                                <div className="row">
                                    <div className="col-9">
                                        <label htmlFor="inputNameMovie" className="form-label">Titulo:</label>
                                        <input type="text" value={query} onChange={e => setQuery(e.target.value) } name="titulo" className="form-control" id="inputNameMovie" aria-label="input name"/>
                                    </div>
                                    <div className="col-3 align-self-end">
                                        <div className="form-check form-switch">
                                            <input onChange={e => setCheckTypeMedia(!checkTypeMedia)} name="check-type-media" className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{checkTypeMedia ? "Buscando Series" : "Buscando Peliculas"}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop:"10px"}}>
                                    <div className="col-3">
                                        <button className="btn btn-info">Buscar</button>
                                    </div>
                                </div>
                            </form>

                            <div className="row">
                                <TablaTmbd lista={listaResultados} forSerie={checkTypeMedia} emitSeleccionar={(e)=>{cleanModal();TmbdSeleccionado(e)}}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function TablaTmbd({lista=[],emitSeleccionar}){
    return(
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Fecha estreno</th>
                    <th scope="col">Sinopsis</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {lista.map((elemento) =>
                    <tr key={elemento.id} style={{maxHeight:"115px"}}>
                        <td>{elemento.original_title}</td>
                        <td>{elemento.release_date}</td>
                        <td>{elemento.overview}</td>
                        <td>
                            <button className="btn btn-success" onClick={() => emitSeleccionar(elemento)}>Seleccionar</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}
export default AdmistrarView;