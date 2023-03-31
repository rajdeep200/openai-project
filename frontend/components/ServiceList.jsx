import React from 'react';
import { services } from "../utils/constants";
import Service from '../components/Service'

const ServiceList = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        {
            services.map(service => {
                return <Service key={service.id} title={service.title} path={service.path} />
            })
        }
    </div>
  )
}

export default ServiceList