"use client";
import { useEffect, useContext, useState } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import AddService from "@/app/components/adminlists/Services/AddService";
import { ServiceContext } from "@/app/context/ServicesContext";
import Image from "next/image";
import ServicesList from "@/app/components/adminlists/Services/ServiceList";
import DeleteService from "@/app/components/adminlists/Services/DeleteService";
import ServiceUpdate from "@/app/components/adminlists/Services/UpdateService";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function Services({params}) {
    const {setActivePage, setServices} = useContext(AdminContext);
    const {addService, setAddService, serviceActions, modifySuccessful} = useContext(ServiceContext);
    const [error, setError] = useState("");

    useEffect(() => {
        setActivePage("Services");
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/services/all/${params.id}`, null)).then(
                res => {
                    setServices(res?.data?.services);
                }
            ).catch(err => {
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            });
        };
        fetchData();
    }, [modifySuccessful]);

    return (
        <div className="flex flex-col text-white md:p-5">
        {addService && <AddService id={params.id} />}
        {serviceActions == "delete" && <DeleteService />}
        {serviceActions == "update" && <ServiceUpdate />}
        <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
            <h3 className="font-extralight text-4xl">Services</h3>
            <button onClick={() => {setAddService(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                <Image src="/plus.svg" alt="plus icon" width={12} height={12} />
                New Service
            </button>
        </div>
        <div className="h-full rounded-2xl overflow-hidden p-1 relative">
            <ServicesList />
        </div>
        </div>
    )
}