import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";


export default function ReviewPage(){
    const [responses, setResponses] = useState<Record<string, string>>({});

    useEffect(()=>{
        const stored = localStorage.getItem("surveyResponses");
        if (stored) {
            setResponses(JSON.parse(stored));
        }
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow space-y-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Your Survey Responses
            </h1>
            {Object.entries(responses).length === 0 ? (
                <p className="">No responses found.</p>
            ) : (
                <ul className="space-y-4">
                    {Object.entries(responses).map(([key,value]) => (
                        <li key={key} className="border-b pb-2">
                            <p className="text-sm text-gray-600">{key}</p>
                            <p className="text-lg font-medium text-gray-800">{value}</p>
                        </li>
                    ))}
                </ul>
            )}
          </div>
        </div>
      );
}