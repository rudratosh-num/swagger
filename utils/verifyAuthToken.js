const axios = require('axios')
const { fbAccessToken } = require('./config')

const validateAuth = async (token, provider)=>{
  if(provider == 'GOOGLE'){
    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${ token }`)
                .catch(err=>{
                  console.log(err);
                })
    if(res && res.data && res.data.verified_email){
      return true
    } else {
      return false
    }
  }else if(provider == 'FACEBOOK'){
    const res = await axios.get(`https://graph.facebook.com/v6.0/debug_token?input_token=${ token }&access_token=${ fbAccessToken }`)
                .catch(err=>{
                  console.log(err);
                })
                console.log(res.data);
    if(res && res.data && res.data.data && res.data.data.is_valid){
      return true
    } else {
      return false
    }
  }else {
    return false
  }
}

module.exports = {
  validateAuth: validateAuth
}
//
// https://graph.facebook.com/v6.0/debug_token?input_token=
// EAAHwVZBtyZBUIBAML1lOkni5jV8BtnweYxeNRFkHz34KZCJ5YtU4O16xvehQfoAnrLXufc0WO7xjyuv6g1WZAN7gQETEXPUxhZAb1Ip9QfKiD3SvOILozG5i65mNG1rkJpNTkZAZCHPcWjGd2pYqntJivPZBBXl5n8w3TwRrrOutG0FfnYgIbnIJ
// &access_token=EAAHwVZBtyZBUIBAKTMc5E7lnROEXzPcWGyIW9JgS829jqwRsNpYunWIy6ccgeUg65A07Cmk0lg4tBkJiPmAw2OSDAPT7RVYwBp4yLHB9aKCCREZBrIthQCF1gXYfQmVHuG3lXekmpHsT3etajnNtAZBdb0rnItzxcAUJOcDVLeVzq0xalascYkoePlznBygZD

//ya29.a0Ae4lvC2om1S85Y4UWnhchTnFzA6O7kUuqjMT_WLMnLztlxv8pnfAbBo1_K9-9k6WaTOrBhFvNUxMeKkUTe9wrb5tFCI2DTVgJrYtfeNUz-cp7LYXknKvIoIjjje-M2QSPH3vXfz6EvzQ-sZJ_7QIxha-eHTIeNv4Zpg
//
//
// authToken: "ya29.a0Ae4lvC2om1S85Y4UWnhchTnFzA6O7kUuqjMT_WLMnLztlxv8pnfAbBo1_K9-9k6WaTOrBhFvNUxMeKkUTe9wrb5tFCI2DTVgJrYtfeNUz-cp7LYXknKvIoIjjje-M2QSPH3vXfz6EvzQ-sZJ_7QIxha-eHTIeNv4Zpg"
// email: "chandelishika@gmail.com"
// firstName: "ISHIKA"
// id: "112324476596772913220"
// idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Yjc0MWU4ZGU5ODRhNDcxNTlmMTllNmQ3NzgzZTlkNGZhODEwZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTI4OTYxMTg3OTIxLWxkMjRiMjU0NjZ1NHQybGFjbjlyMzVhc2cwMDBsZmlzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTI4OTYxMTg3OTIxLWxkMjRiMjU0NjZ1NHQybGFjbjlyMzVhc2cwMDBsZmlzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyMzI0NDc2NTk2NzcyOTEzMjIwIiwiZW1haWwiOiJjaGFuZGVsaXNoaWthQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUHFjeUtPd2hGVTRQRmxHLXlDSDdFZyIsIm5hbWUiOiJJU0hJS0EgQ0hBTkRFTCIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLTBHZHoxYTBUMFBjL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FBS1dKSk5ZZnNuVFpwd2ZBTk81c2JVSTlrYXFzcC1WV0Evczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IklTSElLQSIsImZhbWlseV9uYW1lIjoiQ0hBTkRFTCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTg4MzI4MzYwLCJleHAiOjE1ODgzMzE5NjAsImp0aSI6IjQ1M2QxOTI4M2M1NjAxYzY3YjQ3NWI4MGJjMWQzNTZkYWUxN2RlNDEifQ.hSCjGsZ1-CqfUx7lOrXyAJq862E8FxUZtOGehHsYcJDHgWjq4Y3XtNWLfKEnI3-AVPnZAPqkUOa9C3d8CKwwD9dZYyKZ62buZHR5tQe0LoSHFH9KloutJLg9Xq_W7WHGLfPMB2RU3xKv9irjLQPLt1Cl3NEJRJlCTgvSjmqUgG9gizyu8k6Zj8bc2UscSokCfFliSyLER8UtLpOIQY4Ai1jEZTD7MCL5UsnSV1t72hO0u0Mr5jIj2SPKh485kadyDW-c8Fp830XOC133y2zd8FJjpG0lwlrt49n1H4kd4jjQfnF2pPvE0kiH828cZijItbKC-ozXvavssLznLvtIXQ"
// lastName: "CHANDEL"
// name: "ISHIKA CHANDEL"
// photoUrl: "https://lh6.googleusercontent.com/-0Gdz1a0T0Pc/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJNYfsnTZpwfANO5sbUI9kaqsp-VWA/s96-c/photo.jpg"
// provider: "GOOGLE"
//
//
// https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ya29.a0Ae4lvC2om1S85Y4UWnhchTnFzA6O7kUuqjMT_WLMnLztlxv8pnfAbBo1_K9-9k6WaTOrBhFvNUxMeKkUTe9wrb5tFCI2DTVgJrYtfeNUz-cp7LYXknKvIoIjjje-M2QSPH3vXfz6EvzQ-sZJ_7QIxha-eHTIeNv4Zpg
//
// {
//   "issued_to": "528961187921-ld24b25466u4t2lacn9r35asg000lfis.apps.googleusercontent.com",
//   "audience": "528961187921-ld24b25466u4t2lacn9r35asg000lfis.apps.googleusercontent.com",
//   "user_id": "112324476596772913220",
//   "scope": "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//   "expires_in": 3368,
//   "email": "chandelishika@gmail.com",
//   "verified_email": true,
//   "access_type": "online"
// }
//
// {
//   email: "chandelishika@gmail.com"
//   name: "ISHIKA CHANDEL"
//   photoUrl: "https://lh6.googleusercontent.com/-0Gdz1a0T0Pc/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJNYfsnTZpwfANO5sbUI9kaqsp-VWA/s96-c/photo.jpg"
// }





/* {
  "id":"1912483808885199",
  "name":"Ishika Chandel",
  "email":"chandelishika@gmail.com",
  "photoUrl":"https://graph.facebook.com/1912483808885199/picture?type=normal",
  "firstName":"Ishika",
  "lastName":"Chandel",
  "authToken":"EAAHwVZBtyZBUIBAML1lOkni5jV8BtnweYxeNRFkHz34KZCJ5YtU4O16xvehQfoAnrLXufc0WO7xjyuv6g1WZAN7gQETEXPUxhZAb1Ip9QfKiD3SvOILozG5i65mNG1rkJpNTkZAZCHPcWjGd2pYqntJivPZBBXl5n8w3TwRrrOutG0FfnYgIbnIJ",
  "facebook": {
    "name":"Ishika Chandel",
    "email":"chandelishika@gmail.com",
    "picture":{
      "data":{
        "height":50,
        "is_silhouette":false,
        "url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1912483808885199&height=50&width=50&ext=1590923365&hash=AeT2NNBFYPUpbiKS",
        "width":50
      }
    },
    "first_name":"Ishika",
    "last_name":"Chandel",
    "id":"1912483808885199"
  },
  "provider":"FACEBOOK"
}
*/
