import {useState} from "react";
import {Link, NavLink} from "react-router-dom";

function Nav({changeContent}){
    const [isLogIn,setIsLogIn] = useState(true);

    function moveToAdministrar(){
        changeContent("admin");
    }
    function moveToHome(){
        changeContent("home")
    }
    return(
        <nav className="navbar navbar-expand-lg " style={{backgroundColor: "#e3f2fd"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Peliculas <br/>100% no piratas</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/"}>Inicio</NavLink>
                        </li>
                            <a className="nav-link" href="#">Peliculas</a>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Series</a>
                        </li>
                        {isLogIn && <NavLink className="nav-link" to={"/administrar"}>Administar</NavLink>}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar peliculas o series" aria-label="Buscar peliculas o series"/>
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

function NavForAdmin({onClickAdmin}){
    return(
        <li className="nav-item">
            <a role="button" className="nav-link" onClick={onClickAdmin}>Administrar</a>
        </li>
    );
}

export default Nav;