import axios from "axios";

export async function searchMedia(parametros){
    let result =[];
    await axios.get("media/",{params:parametros}).then(res =>{
        result= res.data;
    }).catch(error =>{
        console.log("error obteniendo all media\n"+error);
    })
    return result;
}
export async function postMedia(media){
    let result =false;
    console.log(media)
    media.generos = [media.generos]
    media.productoras = [media.productoras]
    console.log(media)
    await axios.post("media",media).then(res =>{
        result= true;
    }).catch(error =>{
        console.log(error);
    })
    return result;
}
export async function putMedia(id,media){
    let result = false;
    console.log(id)
    media.generos = [media.generos]
    media.productoras = [media.productoras]
    console.log(media)
    await axios.put("media/"+id,media).then(res =>{
        result= true;
    }).catch(error =>{
        console.log(error);
    })
    return result;
}
export async function deleteMedia(id){
    let result = false;
    console.log(id)
    await axios.delete("media/"+id).then(res =>{
        result= true;
    }).catch(error =>{
        console.log(error);
    })
    return result;
}
export async function getAllGeneros(){
    let result =[];
    await axios.get("genero/").then(res =>{
        result= res.data;
    }).catch(error =>{
        console.log("error obteniendo all generos\n"+error);
    })
    return result;
}
export async function getAllProductoras(){
    let result =[];
    await axios.get("productora/").then(res =>{
        result= res.data;
    }).catch(error =>{
        console.log("error obteniendo all Productoras\n"+error);
    })
    return result;
}
export async function getAllDirectores(){
    let result =[];
    await axios.get("director/").then(res =>{
        result= res.data;
    }).catch(error =>{
        console.log("error obteniendo all Directores\n"+error);
    })
    return result;
}
export async function getAllTMedia(){
    let result =[];
    await axios.get("tmedia/").then(res =>{
        result= res.data;
    }).catch(error =>{
        console.log("error obteniendo all TMedia\n"+error);
    })
    return result;
}

export async function searchTmbd(movie,titulo){
    let result =[];
    let urlMovie="tmbd/movie/";
    let urlSerie="tmbd/serie/";
    let urlSearch = movie ? urlMovie:urlSerie;
    await axios.get(urlSearch+titulo).then((res)=>{
        result = res.data;
    }).catch((error) =>{
        console.log(error)
    })
    return result;
}
