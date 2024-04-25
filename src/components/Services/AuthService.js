import axios from "axios"

const login = (user ) => {
    let data = JSON.stringify(user);
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: localStorage.getItem("api_path")+'login',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };
  
      return axios.request(config)
        .then((response) => {
          if(response.request.status == 200) { 
          console.log("user login ok!" );
          console.log(response.data );
          
          sessionStorage.setItem("user_jwt", response.data)
          window.location.reload()
          //getCurrentUser()
          //var user = JSON.parse(sessionStorage.getItem('user'))
          //if (user.Role = 4 ){ //user is locked
            //sessionStorage.removeItem("user_jwt")
          //}else {
           // sessionStorage.setItem("user_jwt", response.data)
          //}
          
          
          }
        }      
    )
        .catch((error) => {
          console.log(error);
        });      
}

const register = (user) => {
  let data = JSON.stringify(user);
    
  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: localStorage.getItem("api_path")+'register',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    return axios.request(config)
      .then((response) => {
        if(response.request.status == 200) { 
        console.log("user registered ok!");

        //sessionStorage.setItem("user_jwt", response.data)
        //window.location.reload()
        }
      }      
  )
      .catch((error) => {
        console.log(error);
      });      


} 

const usercurrent = {Name:"Pawel", Surname:"Wojcik", Email:"pawel@gmail.com", Role:0}
const getCurrentUser = () => { //get information about current loged user
    if (sessionStorage.getItem("user_jwt")){
       sessionStorage.setItem('user', JSON.stringify(usercurrent))
    }  
};

const logout = () => {
  sessionStorage.removeItem("user_jwt");
    window.location.reload();
  };

const AuthService = {
    login,
    register,
    logout,
    getCurrentUser
  };

export default AuthService