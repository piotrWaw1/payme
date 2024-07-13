import bgImg from "/bg-image.jpg"
import {Outlet} from "react-router-dom";

export default function AuthComponent() {
  return (
      <div className="container flex justify-center items-center h-screen ">
        <div className=" absolute w-screen h-screen bg-gray-400 dark:bg-slate-950"></div>
        <img className="absolute z-0 object-cover h-full w-screen opacity-30" src={bgImg} alt="bg"/>
        <Outlet/>
      </div>
  )
}