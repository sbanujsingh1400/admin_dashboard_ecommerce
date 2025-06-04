import { lazy } from "react";


export default  function useLazy  ( path:string){

    return lazy(()=>import(path))

}