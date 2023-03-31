import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import ServiceList from "../../components/ServiceList";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
        <ServiceList />
    </div>
  );
}
