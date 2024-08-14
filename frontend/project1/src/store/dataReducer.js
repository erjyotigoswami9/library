let data = [] ;

export const data_reducer = (state=data, action)=>{
  switch(action.type){
    case "initialise" : data = action.payload ;
    // console.log(action.payload) ;
                        return data ;
    default : return data ; 
  }
}