import { Route, Routes } from "react-router-dom"
import { Page } from "./config"
import { EmployeeList } from "../web/components/employeeList"
import { RegistrationForm } from "../web/components/employeeRegister"
import { EmployeeDetailsForm } from "../web/components/employeeDetails"

export const AppRoutes = () => {
  return (
    <Routes>
          <Route element={<EmployeeList />} path={Page.HOME} />
          <Route element={<RegistrationForm/>} path={Page.REGISTER}/>
          <Route element={<EmployeeDetailsForm/>} path={Page.DETAILS}/>

    </ Routes>
  )
}