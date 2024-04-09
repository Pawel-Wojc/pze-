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
          console.log("user login ok!");
          localStorage.setItem("user_jwt", response.data)
          }
        }
        
    )
        .catch((error) => {
          console.log(error);
        });
        
}

const usercurrent = '{"Name":"Pawel", "Surname":"Wojcik", "Email":"pawel@gmail.com", "Role":0}'
const getCurrentUser = () => { //get information about current loged user
    if (localStorage.getItem("user_jwt")){
        return JSON.parse(usercurrent);
    } 
   
};

const logout = () => {
    localStorage.removeItem("user_jwt");
    window.location.reload();
  };

const AuthService = {
    login,
    logout,
    getCurrentUser
  };

export default AuthService