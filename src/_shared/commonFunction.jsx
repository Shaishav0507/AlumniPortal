


export const logOut = (value) => {
    // localStorage.removeItem('userType');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    value.props.history.push('/');

}

export const validEmail = async (value)=>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!value.match(mailformat)){
        return false
    }
    else{
        return true
    }
}
