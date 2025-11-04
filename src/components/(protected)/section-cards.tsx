"use client";


export function SectionCards() {
 

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
  
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Statistiques générales</h2>
           <select
      
        className="bg-[#CDFCE3] rounded-md p-2  w-[100px]  text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#15662A]"
      >
        <option value="Tous">Filtre</option>
        <option value="Aujourd'hui">Aujourd'hui</option>
        <option value="Cette semaine">Cette semaine</option>
        <option value="Ce mois-ci">Ce mois-ci</option>
      </select>

      </div>

      
    </div>
  );
}
