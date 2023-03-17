



export function verPerfilDoctor() {
    return(
        <div id="main-container" className="flex flex-col">
            
            <div id="top-container" className="flex flex-row">
                <div id="left-side">
                    <img id="foto">

                    </img>
                    <button>
                        Reservar Cita
                    </button>
                </div>

                <div id="right-side">
                    <hr />
                    <h1>Doctor:</h1>
                    <h2>Nombre doctor</h2>
                    <hr />
                    <p>Especialidad:</p>
                    <p>Ranking:</p>
                    <p>Precio consulta:</p>
                </div>
            </div>
            <hr />
            <div id="middle-container" className="flex flex-row">
                <div id="bio" className="flex flex-col">
                    <h2>Biografia:</h2>
                    <p></p>
                </div>
                <div id="descripcion" className="flex flex-col">
                    <h2>Descripcion:</h2>
                    <p></p>
                </div>
            </div>
            <hr/>
            <div id="bottom-container" className="flex flex-row">
                <div id="feedback">
                    <h2>Feedback:</h2>
                    <p></p>
                </div>
            </div>
        </div>
    )
}