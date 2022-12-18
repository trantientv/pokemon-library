function Notfound() {
    let notFoundStyle = {
        backgroundColor: "#ccc",
        with: '100%',
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems :"center"
    }
    return ( 
        <div style={notFoundStyle}>
            <h1 >Not Found, We are Sorry</h1>
        </div>
     );
}

export default Notfound;