
export default function SimpleLoader({loading = true}){
    if(loading) {
        return (
            <>
                <div className="modal-mask">
                    <div className="modal-wrapper">
                        <div className="modal-container" style={{display:"grid",placeItems:"center"}}>
                            <div className="spinner-border text-secondary" role="status" style={{width: "4rem", height: "4rem"}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}