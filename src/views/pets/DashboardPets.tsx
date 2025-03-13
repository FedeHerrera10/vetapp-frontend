import { getPets } from "@/api/PetApi";
import { CardPets } from "@/components/ui/profile/CardPets";
import { PetSchema } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { PawPrint, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardPets = () => {
  const { data } = useQuery({
    queryKey: ["pets"],
    queryFn: () => getPets(),
  });

  if (data)
    return (
      <section className="px-0 md:px-6">
        <div className="flex flex-col md:justify-between gap-4 md:flex-row items-center md:gap-10 dark:text-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold  flex">
            {" "}
            <PawPrint className="size-8 mx-2 inline-block" /> Administra tus
            mascostas
          </h2>
          <Link
            to="/app/pets/add"
            className=" py-2 px-4 text-md -tracking-wide font-semibold bg-indigo-500 text-gray-100   md:col-span-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-gray-100"
          >
            <Plus className="size-5  inline-block" />
            Agregar Mascota
          </Link>
        </div>
        <div className="rounded-xl mt-10 bg-slate-200/40 text-gray-800 p-8 dark:bg-gray-800 dark:text-slate-50">
          <div className="  ">
            {data.length === 0 ? (
              <h2 className="text-gray-600 dark:text-slate-50/80">
                No tienes mascotas registradas
              </h2>
            ) : (
              data.map((pet: PetSchema) => <CardPets key={pet.id} pet={pet} />)
            )}
          </div>
        </div>
      </section>
    );
};
